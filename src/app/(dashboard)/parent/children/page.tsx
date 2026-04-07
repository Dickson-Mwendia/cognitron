import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { getParentChildren } from '@/lib/queries'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Manage Children | Cognitron',
}

const trackConfig: Record<string, { icon: string; label: string; color: string }> = {
  coding: { icon: '💻', label: 'Coding', color: '#2a9d8f' },
  ai: { icon: '🤖', label: 'AI', color: '#e8614d' },
  chess: { icon: '♟️', label: 'Chess', color: '#d4a843' },
}

export default async function ChildrenPage() {
  const user = await requireRole(['parent'])
  const children = await getParentChildren(user.id)

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
            My Children
          </h1>
          <p className="mt-1 text-sm text-[#0c1b33]/60">
            View and manage your enrolled children&apos;s profiles and learning progress.
          </p>
        </div>
        <Link
          href="/parent/add-child"
          className="inline-flex items-center gap-2 rounded-full bg-[#d4a843] px-5 py-2.5 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-[#d4a843]/90 hover:shadow-md active:scale-[0.98]"
        >
          ➕ Add Child
        </Link>
      </div>

      {children.length === 0 ? (
        <section className="rounded-2xl border-2 border-dashed border-[#d4a843]/30 bg-white p-8 md:p-12 text-center">
          <span className="text-5xl mb-4 block">👨‍👩‍👧‍👦</span>
          <h2 className="font-heading text-2xl font-bold text-[#0c1b33] mb-3">
            No children enrolled yet
          </h2>
          <p className="text-[#0c1b33]/60 text-sm mb-6 max-w-md mx-auto">
            Add your first child to get started with premium coding, AI, and chess coaching.
          </p>
          <Link
            href="/parent/add-child"
            className="inline-flex items-center gap-2 rounded-full bg-[#d4a843] px-6 py-3 text-sm font-semibold text-[#0c1b33] transition-all hover:bg-[#d4a843]/90 hover:shadow-md hover:shadow-[#d4a843]/20 active:scale-[0.98]"
          >
            ➕ Add Your First Child
          </Link>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {children.map((child) => (
            <div
              key={child.id}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-gold/30 overflow-hidden"
            >
              {/* Header with avatar */}
              <div className="bg-gradient-to-br from-[#0c1b33] to-[#162d50] p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d4a843]/20 ring-2 ring-[#d4a843]/40 text-2xl font-bold text-[#d4a843]">
                    {child.firstName[0]}{child.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">
                      {child.firstName} {child.lastName}
                    </h3>
                    <p className="text-sm text-white/60">Age {child.age}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Enrolled tracks */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50 mb-2">
                    Enrolled Tracks
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {child.enrolledTracks.map((track) => {
                      const config = trackConfig[track]
                      return (
                        <span
                          key={track}
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                          style={{ backgroundColor: `${config?.color}15`, color: config?.color }}
                        >
                          {config?.icon} {config?.label}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#d4a843]/10 p-3 text-center">
                    <p className="text-xl font-bold text-[#d4a843]">{child.currentXp.toLocaleString()}</p>
                    <p className="text-[10px] uppercase text-[#0c1b33]/50 font-medium mt-0.5">Total XP</p>
                  </div>
                  <div className="rounded-xl bg-[#e8614d]/10 p-3 text-center">
                    <p className="text-xl font-bold text-[#e8614d]">{child.streak}</p>
                    <p className="text-[10px] uppercase text-[#0c1b33]/50 font-medium mt-0.5">Day Streak</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link
                    href="/parent/children"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#0c1b33] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-navy-light hover:shadow-md active:scale-[0.97]"
                  >
                    View Dashboard →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
