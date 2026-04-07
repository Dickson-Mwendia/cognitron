'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { addChild, type AddChildResult } from './actions'
import { User, Calendar, Mail, ArrowLeft, UserPlus } from 'lucide-react'

export default function AddChildClient() {
  const [result, setResult] = useState<AddChildResult | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const res = await addChild(formData)
    setResult(res)
    setLoading(false)

    if (res.success) {
      // Redirect back to parent dashboard after a short delay
      setTimeout(() => {
        router.push('/parent')
        router.refresh()
      }, 2000)
    }
  }

  // Today as max for date input
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* Back link */}
      <Link
        href="/parent"
        className="inline-flex items-center gap-1 text-sm text-[#0c1b33]/60 hover:text-[#0c1b33] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] mb-2">
          Add a Child
        </h1>
        <p className="text-sm text-[#0c1b33]/60 mb-6">
          Enrol your child on the Cognitron platform. Students under 16 must be
          added by a parent account (Kenya Data Protection Act 2019, §33).
        </p>

        {/* Success message */}
        {result?.success && (
          <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">
            ✅ {result.message} Redirecting to your dashboard…
          </div>
        )}

        {/* Error message */}
        {result && !result.success && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">
            {result.message}
          </div>
        )}

        {!result?.success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-[#0c1b33] mb-1.5"
                >
                  First name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0c1b33]/40" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Amara"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-[#0c1b33] placeholder:text-[#0c1b33]/30 focus:outline-none focus:ring-2 focus:ring-[#d4a843] focus:border-transparent transition-shadow"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-[#0c1b33] mb-1.5"
                >
                  Last name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0c1b33]/40" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Kamau"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-[#0c1b33] placeholder:text-[#0c1b33]/30 focus:outline-none focus:ring-2 focus:ring-[#d4a843] focus:border-transparent transition-shadow"
                  />
                </div>
              </div>
            </div>

            {/* Date of birth */}
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-[#0c1b33] mb-1.5"
              >
                Date of birth <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0c1b33]/40" />
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  max={today}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-[#0c1b33] focus:outline-none focus:ring-2 focus:ring-[#d4a843] focus:border-transparent transition-shadow"
                />
              </div>
              <p className="mt-1 text-xs text-[#0c1b33]/50">
                Used to assign age-appropriate content and curriculum.
              </p>
            </div>

            {/* Email (optional) */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#0c1b33] mb-1.5"
              >
                Email{' '}
                <span className="font-normal text-[#0c1b33]/50">
                  (optional — for older kids who want login access)
                </span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0c1b33]/40" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="child@example.com"
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-[#0c1b33] placeholder:text-[#0c1b33]/30 focus:outline-none focus:ring-2 focus:ring-[#d4a843] focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#d4a843] hover:bg-[#d4a843]/90 text-[#0c1b33] font-semibold py-2.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-[#0c1b33]/30 border-t-[#0c1b33] rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Add Child
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
