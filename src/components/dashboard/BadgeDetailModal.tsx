'use client'

import { useEffect, useRef, useCallback } from 'react'

interface BadgeData {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedAt?: string | null
  progress?: { current: number; total: number } | null
  category: string
}

interface BadgeDetailModalProps {
  badge: BadgeData | null
  onClose: () => void
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const howToEarnMap: Record<string, string[]> = {
  'First Code': ['Open the coding track', 'Write and run your first program'],
  'Bug Squasher': ['Practice debugging challenges', 'Successfully debug 10 programs'],
  'Chess Knight': ['Play chess matches against other students', 'Win 5 matches total'],
  'AI Explorer': ['Complete all lessons in AI Level 1', 'Pass the AI Level 1 assessment'],
  'Week Warrior': ['Practice every day for 7 days straight', 'Any track counts!'],
  'Speed Demon': ['Complete lessons quickly', 'Finish 5 lessons in record time'],
  'Mentor': ['Help a classmate with a coding challenge', 'Get confirmed by your coach'],
  'Full Stack': ['Complete all 10 coding levels', 'Master every coding concept'],
  'Grandmaster': ['Advance through all chess levels', 'Reach chess level 10'],
  'Month Warrior': ['Practice every single day for 30 days', 'Keep your streak alive!'],
}

export function BadgeDetailModal({ badge, onClose }: BadgeDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!badge) return
    previousFocus.current = document.activeElement as HTMLElement
    document.addEventListener('keydown', handleKeyDown)
    // Focus the modal
    const timer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector<HTMLElement>('button')
      closeBtn?.focus()
    }, 50)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
      previousFocus.current?.focus()
    }
  }, [badge, handleKeyDown])

  if (!badge) return null

  const progressPercent =
    badge.progress && badge.progress.total > 0
      ? Math.min(100, (badge.progress.current / badge.progress.total) * 100)
      : 0

  const steps = howToEarnMap[badge.name] ?? ['Complete related challenges to earn this badge']

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 animate-[fadeIn_200ms_ease-out]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${badge.name} badge details`}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-[scaleIn_200ms_ease-out]"
      >
        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-[#0c1b33]/40 hover:text-[#0c1b33] transition-colors rounded-full p-1"
            aria-label="Close badge details"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        {/* Badge icon */}
        <div className="flex flex-col items-center text-center mb-4">
          <div
            className={`text-6xl leading-none mb-3 ${badge.earned ? '' : 'grayscale opacity-50'}`}
          >
            {badge.icon}
          </div>
          <h2 className="font-heading text-xl font-bold text-[#0c1b33]">
            {badge.name}
          </h2>
          <p className="text-sm text-[#0c1b33]/60 mt-1">{badge.description}</p>
          <span className="inline-block mt-2 text-xs font-medium rounded-full bg-[#0c1b33]/5 px-3 py-1 text-[#0c1b33]/50 capitalize">
            {badge.category}
          </span>
        </div>

        {/* Earned state */}
        {badge.earned && (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-[#d4a843]/10 border border-[#d4a843]/20 p-3 mb-4">
            <span className="text-xl">✅</span>
            <div>
              <p className="text-sm font-semibold text-[#d4a843]">Earned!</p>
              {badge.earnedAt && (
                <p className="text-xs text-[#0c1b33]/50">
                  {formatDate(badge.earnedAt)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Locked state */}
        {!badge.earned && (
          <div className="space-y-3">
            {/* Progress bar */}
            {badge.progress && badge.progress.total > 0 && (
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                <div className="flex items-center justify-between text-xs text-[#0c1b33]/60 mb-1.5">
                  <span>Progress</span>
                  <span className="font-semibold">
                    {badge.progress.current}/{badge.progress.total}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#d4a843] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* How to earn */}
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
              <p className="text-xs font-semibold text-[#0c1b33]/70 mb-2">
                How to earn:
              </p>
              <ul className="space-y-1.5">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#0c1b33]/60">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0c1b33]/10 text-[10px] font-bold text-[#0c1b33]/40">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
