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
  const protectedPaths = ['/dashboard', '/parent', '/coach', '/admin']
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
  // Role-based authorization — only runs on gated paths, only when authed.
  // Queries profiles.role (indexed by user_id, single-row lookup ≈ 2-5 ms).
  // -------------------------------------------------------------------------
  if (user && isProtected) {
    const pathname = request.nextUrl.pathname

    for (const [pathPrefix, allowedRoles] of Object.entries(ROLE_GATES)) {
      if (pathname.startsWith(pathPrefix)) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .single()

        if (!profile || !allowedRoles.includes(profile.role)) {
          const url = request.nextUrl.clone()
          url.pathname = '/dashboard'
          return NextResponse.redirect(url)
        }
        break // matched a gate — no need to check the rest
      }
    }
  }

  // Redirect logged-in users away from auth pages
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
