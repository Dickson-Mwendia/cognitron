'use client'

import { useEffect, useState, useCallback } from 'react'
import { checkApprovalStatus } from './actions'
import { Logo } from '@/components/Logo'
import { Clock, Mail, LogOut } from 'lucide-react'

interface PendingApprovalClientProps {
  firstName: string
}

export default function PendingApprovalClient({ firstName }: PendingApprovalClientProps) {
  const [checking, setChecking] = useState(false)

  const poll = useCallback(async () => {
    setChecking(true)
    try {
      const { approved } = await checkApprovalStatus()
      if (approved) {
        window.location.href = '/dashboard'
        return
      }
    } catch {
      // Silently ignore — will retry next interval
    }
    setChecking(false)
  }, [])

  useEffect(() => {
    const interval = setInterval(poll, 15000)
    return () => clearInterval(interval)
  }, [poll])

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-dark to-navy flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <Logo size="lg" on="dark" />
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-gold animate-pulse" />
          </div>

          <h1 className="font-heading text-2xl font-bold text-white mb-3">
            Account Under Review
          </h1>

          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Thanks for signing up, {firstName}! Your account is being reviewed by our team.
            We&apos;ll notify you once it&apos;s approved — this usually takes less than 24 hours.
          </p>

          {/* Polling status indicator */}
          <div className="flex items-center justify-center gap-2 mb-6 h-5">
            {checking && (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-white/40 text-xs">Checking...</span>
              </>
            )}
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 text-left">
              <Mail className="w-5 h-5 text-gold shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Questions?</p>
                <p className="text-white/50 text-xs">
                  WhatsApp us at{' '}
                  <a
                    href="https://wa.me/254710643847"
                    className="text-gold hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +254 710 643 847
                  </a>
                </p>
              </div>
            </div>
          </div>

          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
