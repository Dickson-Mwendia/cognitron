'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  UserPlus,
  GraduationCap,
  Users,
} from 'lucide-react'

type AccountRole = 'student' | 'parent'

export function SignupForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<AccountRole>('student')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const passwordStrength = getPasswordStrength(password)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    if (!supabaseConfigured) {
      router.push('/dashboard')
      return
    }

    try {
      const supabase = createClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role,
            date_of_birth: dateOfBirth || null,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="font-heading text-2xl text-navy font-bold text-center mb-2">
        Create your account
      </h1>
      <p className="text-slate text-center text-sm mb-6">
        Join Cognitron and start your journey
      </p>

      {/* Dev mode notice */}
      {!supabaseConfigured && (
        <div className="mb-4 p-3 bg-gold/10 border border-gold/30 rounded-lg text-sm text-navy">
          <strong>Demo Mode:</strong> Supabase not configured. Click create
          account to view the dashboard with sample data.
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-navy mb-1.5"
            >
              First name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Amara"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-navy placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-navy mb-1.5"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Okonkwo"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-navy placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
            />
          </div>
        </div>

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
              placeholder="Min. 8 characters"
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
          {/* Strength indicator */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      level <= passwordStrength.level
                        ? passwordStrength.color
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p
                className={`text-xs mt-1 ${
                  passwordStrength.level <= 1
                    ? 'text-red-500'
                    : passwordStrength.level <= 2
                      ? 'text-orange-500'
                      : passwordStrength.level <= 3
                        ? 'text-yellow-600'
                        : 'text-green-600'
                }`}
              >
                {passwordStrength.label}
              </p>
            </div>
          )}
        </div>

        {/* Role selection */}
        <div>
          <label className="block text-sm font-medium text-navy mb-2">
            I am a…
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all ${
                role === 'student'
                  ? 'border-gold bg-gold/5 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <GraduationCap
                className={`h-6 w-6 ${role === 'student' ? 'text-gold' : 'text-slate'}`}
              />
              <span
                className={`text-sm font-medium ${role === 'student' ? 'text-navy' : 'text-slate'}`}
              >
                Student
              </span>
            </button>
            <button
              type="button"
              onClick={() => setRole('parent')}
              className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all ${
                role === 'parent'
                  ? 'border-gold bg-gold/5 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Users
                className={`h-6 w-6 ${role === 'parent' ? 'text-gold' : 'text-slate'}`}
              />
              <span
                className={`text-sm font-medium ${role === 'parent' ? 'text-navy' : 'text-slate'}`}
              >
                Parent
              </span>
            </button>
          </div>
          <p className="mt-2 text-xs text-slate">
            Coach accounts are created by administrators.{' '}
            <Link href="/contact" className="text-gold hover:text-gold-dark">
              Contact us
            </Link>{' '}
            if you&apos;re a coach.
          </p>
        </div>

        {/* Date of birth (students only) */}
        {role === 'student' && (
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-navy mb-1.5"
            >
              Date of birth{' '}
              <span className="text-slate font-normal">(optional)</span>
            </label>
            <input
              id="dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
            />
          </div>
        )}

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
              <UserPlus className="h-4 w-4" />
              Create account
            </>
          )}
        </button>
      </form>

      {/* Sign in link */}
      <p className="mt-6 text-center text-sm text-slate">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-gold font-medium hover:text-gold-dark transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

function getPasswordStrength(password: string): {
  level: number
  label: string
  color: string
} {
  if (password.length === 0) return { level: 0, label: '', color: '' }
  if (password.length < 6)
    return { level: 1, label: 'Too short', color: 'bg-red-400' }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-red-400' }
  if (score <= 2) return { level: 2, label: 'Fair', color: 'bg-orange-400' }
  if (score <= 3) return { level: 3, label: 'Good', color: 'bg-yellow-400' }
  return { level: 4, label: 'Strong', color: 'bg-green-400' }
}
