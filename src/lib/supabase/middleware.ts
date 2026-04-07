import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// ---------------------------------------------------------------------------
// Role gates — maps URL-prefix → allowed roles.
// Any authenticated user whose role is NOT listed gets bounced to /dashboard.
// Paths not listed here are open to any authenticated user.
// ---------------------------------------------------------------------------
const ROLE_GATES: Record<string, string[]> = {
  '/coach':  ['coach'],
  '/parent': ['parent'],
  '/admin':  ['admin'],
}

export async function updateSession(request: NextRequest) {
  // Skip Supabase entirely in dev when env vars aren't set (mock-data mode)
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Protected routes - redirect to login if not authenticated
    const protectedPaths = ['/dashboard', '/parent', '/coach', '/admin', '/pending-approval']
    const isProtected = protectedPaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    )

    if (isProtected && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // -------------------------------------------------------------------------
    // Approval gate — unapproved users can only see /pending-approval.
    // Queries profiles.approved (single-row lookup by user_id).
    // -------------------------------------------------------------------------
    if (user && isProtected) {
      const isPendingPage = request.nextUrl.pathname.startsWith('/pending-approval')

      // Single query for both approval and role checks
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role, approved')
        .eq('user_id', user.id)
        .single()

      const isApproved = profileData?.approved ?? false

      // Unapproved user trying to access anything other than /pending-approval → redirect
      if (!isApproved && !isPendingPage) {
        const url = request.nextUrl.clone()
        url.pathname = '/pending-approval'
        return NextResponse.redirect(url)
      }

      // Approved user sitting on /pending-approval → send them to dashboard
      if (isApproved && isPendingPage) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
      }

      // -----------------------------------------------------------------------
      // Role-based authorization — only runs on gated paths, only when authed.
      // Uses the profile already fetched above (no extra query).
      // -----------------------------------------------------------------------
      const pathname = request.nextUrl.pathname
      for (const [pathPrefix, allowedRoles] of Object.entries(ROLE_GATES)) {
        if (pathname.startsWith(pathPrefix)) {
          if (!profileData || !allowedRoles.includes(profileData.role)) {
            const url = request.nextUrl.clone()
            url.pathname = '/dashboard'
            return NextResponse.redirect(url)
          }
          break
        }
      }
    }

    // Redirect logged-in users away from auth pages
    if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
      // Check approval status + role so users land on the correct home page.
      const { data: authProfile } = await supabase
        .from('profiles')
        .select('approved, role')
        .eq('user_id', user.id)
        .single()

      const url = request.nextUrl.clone()
      if (!authProfile?.approved) {
        url.pathname = '/pending-approval'
      } else {
        // Send each role to its own home page
        switch (authProfile.role) {
          case 'admin':  url.pathname = '/admin';     break
          case 'coach':  url.pathname = '/coach';     break
          case 'parent': url.pathname = '/parent';    break
          default:       url.pathname = '/dashboard'; break
        }
      }
      return NextResponse.redirect(url)
    }
  } catch (e) {
    // If Supabase calls fail, let the request through rather than crashing the site.
    // Auth will still be enforced server-side by requireAuth() in dashboard layouts.
    console.error('[proxy] Supabase error:', e)
  }

  return supabaseResponse
}
