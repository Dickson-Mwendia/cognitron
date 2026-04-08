'use client'

import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-coral" />
        </div>
        <h2 className="font-heading text-xl font-bold text-navy mb-3">
          Something went wrong
        </h2>
        <p className="text-slate text-sm mb-6">
          We hit an unexpected error loading this page. This is usually temporary —
          please try again.
        </p>
        {error.digest && (
          <p className="text-xs text-slate/50 mb-4 font-mono">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-gold-light active:scale-[0.97]"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
          <a
            href="https://wa.me/254710643847?text=Hi%2C%20I%20encountered%20an%20error%20on%20the%20Cognitron%20dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy px-6 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white active:scale-[0.97]"
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  )
}
