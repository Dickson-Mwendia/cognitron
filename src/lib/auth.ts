import { createClient } from '@/lib/supabase/server'
import type { DashboardUser, UserRole, Profile } from '@/types'
import { mockStudent, mockParent, mockCoach } from '@/lib/mock-data'
import { redirect } from 'next/navigation'

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
    default:
      return mockStudent
  }
}

/** Require an authenticated user or redirect to /login. */
export async function requireAuth(): Promise<DashboardUser> {
  const user = await getCurrentUser()

  if (!user) {
    // In dev without Supabase, return mock student
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return mockStudent
    }
    redirect('/login')
  }

  return user
}

/** Require one of the given roles or redirect to /dashboard. */
export async function requireRole(
  allowedRoles: UserRole[],
): Promise<DashboardUser> {
  const user = await requireAuth()

  if (!allowedRoles.includes(user.role)) {
    redirect('/dashboard')
  }

  return user
}
