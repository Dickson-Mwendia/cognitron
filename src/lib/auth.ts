import { createClient } from '@/lib/supabase/server'
import type { DashboardUser, UserRole, Profile } from '@/types'
import { mockStudent, mockParent, mockCoach, mockAdmin } from '@/lib/mock-data'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

const isProduction = process.env.NODE_ENV === 'production'

/** Map a user role to its home page path. */
export function roleHomePath(role: UserRole): string {
  switch (role) {
    case 'admin':  return '/admin'
    case 'coach':  return '/coach'
    case 'parent': return '/parent'
    default:       return '/dashboard'
  }
}

/**
 * Get the current authenticated user with their profile.
 * Falls back to null when Supabase isn't configured.
 */
export async function getCurrentUser(): Promise<DashboardUser | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null
  }

  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return null

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    const profile = data as Profile | null
    if (!profile) return null

    return {
      id: profile.id,
      email: user.email ?? '',
      role: profile.role as UserRole,
      firstName: profile.first_name,
      lastName: profile.last_name,
      avatarUrl: profile.avatar_url,
      ageTier: profile.age_tier as DashboardUser['ageTier'],
      approved: profile.approved ?? false,
      createdAt: profile.created_at,
    }
  } catch {
    return null
  }
}

/** Return a mock user for local development (no Supabase). */
export function getMockUser(role: UserRole = 'student'): DashboardUser {
  switch (role) {
    case 'parent':
      return mockParent
    case 'coach':
      return mockCoach
    case 'admin':
      return mockAdmin
    default:
      return mockStudent
  }
}

/**
 * Detect the appropriate mock role from the current request path.
 * Used in dev mode so visiting /admin shows admin data, /parent shows
 * parent data, etc.
 */
async function getMockRoleFromPath(): Promise<UserRole> {
  try {
    const headersList = await headers()
    // Next.js sets x-invoke-path or we can use x-url / referer as fallback
    const pathname =
      headersList.get('x-invoke-path') ??
      headersList.get('x-pathname') ??
      headersList.get('x-next-url') ??
      ''

    // Also check referer as a secondary signal
    const referer = headersList.get('referer') ?? ''
    const path = pathname || new URL(referer, 'http://localhost').pathname

    if (path.startsWith('/admin')) return 'admin'
    if (path.startsWith('/coach')) return 'coach'
    if (path.startsWith('/parent')) return 'parent'
  } catch {
    // headers() may throw outside of a request context — fall back to student
  }
  return 'student'
}

/** Require an authenticated user or redirect to /login. */
export async function requireAuth(): Promise<DashboardUser> {
  const user = await getCurrentUser()

  if (!user) {
    // In dev without Supabase, return a route-appropriate mock user.
    // NEVER allow mock users in production — misconfigured env = hard fail.
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (isProduction) {
        throw new Error(
          'NEXT_PUBLIC_SUPABASE_URL is not configured. Cannot serve dashboard in production without Supabase.',
        )
      }
      const role = await getMockRoleFromPath()
      return getMockUser(role)
    }
    redirect('/login')
  }

  // Unapproved users get sent to the pending page
  if (!user.approved) {
    redirect('/pending-approval')
  }

  return user
}

/** Require one of the given roles or redirect to /dashboard. */
export async function requireRole(
  allowedRoles: UserRole[],
): Promise<DashboardUser> {
  const user = await requireAuth()

  // Approval check (requireAuth already redirects, but belt-and-suspenders)
  if (!user.approved) {
    redirect('/pending-approval')
  }

  // In dev mode without Supabase, requireAuth returns a mock user based on
  // the current route. If that mock role isn't in allowedRoles, override with
  // the first allowed role so the page renders correctly in dev.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    if (!allowedRoles.includes(user.role)) {
      return getMockUser(allowedRoles[0])
    }
    return user
  }

  if (!allowedRoles.includes(user.role)) {
    redirect(roleHomePath(user.role))
  }

  return user
}
