'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'

/** Map role → home path (mirrors server-side roleHomePath in auth.ts). */
function roleHome(role: string): string {
  switch (role) {
    case 'admin':  return '/admin'
    case 'coach':  return '/coach'
    case 'parent': return '/parent'
    default:       return '/dashboard'
  }
}

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!supabaseConfigured) {
      router.push('/dashboard')
      return
    }

    try {
      const supabase = createClient()
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        setError(signInError.message)
      } else {
        // Determine where to send the user based on their role
        const redirectTo = searchParams.get('redirectTo')
        if (redirectTo && redirectTo.startsWith('/')) {
          router.push(redirectTo)
        } else {
          // Fetch role from profile to redirect to the correct dashboard
          const userId = data.user?.id
          if (userId) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role, approved')
              .eq('user_id', userId)
              .single() as { data: { role: string; approved: boolean } | null }

            if (profile && !profile.approved) {
              router.push('/pending-approval')
            } else {
              router.push(roleHome(profile?.role ?? 'student'))
            }
          } else {
            router.push('/dashboard')
          }
        }
        router.refresh()
      }
    } catch (err) {
      console.error('[login] Unexpected error:', err)
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="font-heading text-2xl text-navy font-bold text-center mb-2">
        Welcome back
      </h1>
      <p className="text-slate text-center text-sm mb-6">
        Sign in to continue learning
      </p>

      {/* Dev mode notice — hidden in production */}
      {process.env.NODE_ENV === 'development' && !supabaseConfigured && (
        <div className="mb-4 p-3 bg-gold/10 border border-gold/30 rounded-lg text-sm text-navy">
          <strong>Demo Mode:</strong> Supabase not configured. Click sign in to
          view the dashboard with sample data.
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-navy mb-1.5"
          >
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-navy placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-navy mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-navy placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-navy transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Help link */}
        <div className="flex items-center justify-end">
          <Link
            href="/contact"
            className="text-sm text-gold hover:text-gold-dark transition-colors"
          >
            Need help signing in? Contact us
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-semibold py-2.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="h-5 w-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Sign in
            </>
          )}
        </button>
      </form>

      {/* Sign up link */}
      <p className="mt-6 text-center text-sm text-slate">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="text-gold font-medium hover:text-gold-dark transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
