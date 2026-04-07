import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Auth callback handler — Supabase redirects here after email confirmation.
 * Exchanges the auth code for a session, then redirects to pending-approval.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/pending-approval'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    console.error('[auth/callback] Code exchange failed:', error.message)
  }

  // If code exchange fails or no code, redirect to signup with error
  return NextResponse.redirect(
    `${origin}/signup?error=${encodeURIComponent('Email confirmation failed. Please try signing up again.')}`
  )
}
