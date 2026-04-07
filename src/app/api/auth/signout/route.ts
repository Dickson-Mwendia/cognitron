import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/auth/signout
 * Signs the user out of Supabase and redirects to the login page.
 */
export async function POST(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const { origin } = new URL(request.url)
  return NextResponse.redirect(`${origin}/login`, { status: 303 })
}
