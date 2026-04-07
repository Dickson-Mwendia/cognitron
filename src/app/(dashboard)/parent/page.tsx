import { requireRole } from '@/lib/auth'
import {
  getParentOverviewChildren,
  getUpcomingSessions,
  getParentCoachNotes,
} from '@/lib/queries'
import { SessionCard } from '@/components/dashboard/SessionCard'
import { ProgressComparison } from '@/components/dashboard/ProgressComparison'
import Link from 'next/link'

const paymentStatus: Record<string, 'paid' | 'due' | 'overdue'> = {}

export const metadata = { title: 'Parent Dashboard' }

const trackIcons: Record<string, string> = {
  coding: '💻',
  ai: '🤖',
  chess: '♟️',
}

export default async function ParentDashboard() {
  const user = await requireRole(['parent'])
  const children = await getParentOverviewChildren(user.id)
  const upcomingSessions = await getUpcomingSessions(user.id, 'student')
  const coachNotes = await getParentCoachNotes(user.id)

  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
        Welcome back, {user.firstName}
      </h1>

      {/* ── Children Overview Cards ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-[#0c1b33]">
            Your Children
          </h2>
          <Link
            href="/parent/add-child"
            className="inline-flex items-center gap-2 rounded-full bg-[#d4a843] px-5 py-2.5 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-[#d4a843]/90"
          >
            ➕ Add Child
          </Link>
        </div>
        {children.length === 0 ? (
          <section className="rounded-2xl border-2 border-dashed border-[#d4a843]/30 bg-white p-8 md:p-12 text-center">
            <span className="text-5xl mb-4 block">👨‍👩‍👧‍👦</span>
            <h2 className="font-heading text-2xl font-bold text-[#0c1b33] mb-3">
              Welcome to Cognitron!
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {children.map((child) => (
              <div
                key={child.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gold/30 md:p-6"
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0c1b33] text-lg font-semibold text-white">
                    {child.firstName[0]}
                    {child.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#0c1b33]">
                      {child.firstName} {child.lastName}
                    </h3>
                    <p className="text-xs text-[#0c1b33]/50">
                      Age {child.ageTier}
                    </p>
                  </div>
                </div>

                {/* Enrolled track badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {child.tracks.map((t) => (
                    <span
                      key={t.trackId}
                      className="rounded-full bg-[#0c1b33]/5 px-3 py-1 text-xs font-medium text-[#0c1b33]"
                    >
                      {trackIcons[t.trackName]} {t.trackName}
                    </span>
                  ))}
                </div>

                {/* Sparkline stats */}
                <div className="mb-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-[#d4a843]/10 p-2">
                    <p className="text-lg font-bold text-[#d4a843]">
                      {child.totalXp.toLocaleString()}
                    </p>
                    <p className="text-[10px] uppercase text-[#0c1b33]/50">XP</p>
                  </div>
                  <div className="rounded-xl bg-[#e8614d]/10 p-2">
                    <p className="text-lg font-bold text-[#e8614d]">
                      {child.streak}
                    </p>
                    <p className="text-[10px] uppercase text-[#0c1b33]/50">
                      Streak
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#2a9d8f]/10 p-2">
                    <p className="text-lg font-bold text-[#2a9d8f]">
                      Lv {child.currentLevel}
                    </p>
                    <p className="text-[10px] uppercase text-[#0c1b33]/50">
                      Level
                    </p>
                  </div>
                </div>

                {/* Payment status badge */}
                {(() => {
                  const status = paymentStatus[child.id] ?? 'due'
                  const styles = {
                    paid: 'bg-emerald-100 text-emerald-700',
                    due: 'bg-amber-100 text-amber-700',
                    overdue: 'bg-red-100 text-red-700',
                  }
                  const labels = {
                    paid: '✓ Paid',
                    due: '🕐 Payment Due',
                    overdue: '⚠ Overdue',
                  }
                  return (
                    <span
                      className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
                    >
                      {labels[status]}
                    </span>
                  )
                })()}

                <Link
                  href="/parent/children"
                  className="inline-block rounded-full bg-[#0c1b33] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-navy-light hover:shadow-md active:scale-[0.97]"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Progress Comparison (2+ children) ── */}
      {children.length >= 2 && (
        <ProgressComparison
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          children={children.map((c) => ({
            id: c.id,
            firstName: c.firstName,
            totalXp: c.totalXp,
            streak: c.streak,
            currentLevel: c.currentLevel,
          }))}
        />
      )}

      {/* ── Upcoming Sessions ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Upcoming Sessions
        </h2>
        {upcomingSessions.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[#2a9d8f]/30 bg-white p-8 text-center">
            <span className="text-4xl mb-3 block">📅</span>
            <h3 className="font-heading text-lg font-bold text-[#0c1b33] mb-2">
              No upcoming sessions
            </h3>
            <p className="text-[#0c1b33]/60 text-sm mb-4 max-w-sm mx-auto">
              Sessions will appear here once your child is enrolled in a track and a coach is assigned.
            </p>
            <Link
              href="/parent/schedule"
              className="inline-flex items-center gap-2 rounded-full bg-[#2a9d8f] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2a9d8f]/90 hover:shadow-md active:scale-[0.98]"
            >
              📅 View Schedule
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingSessions.map((session: { id: string; trackName: string; lessonName: string; coachName: string; scheduledAt: string; locationType: 'home' | 'online'; durationMinutes: number }) => (
              <SessionCard
                key={session.id}
                trackName={session.trackName}
                lessonName={session.lessonName}
                coachName={session.coachName}
                scheduledAt={session.scheduledAt}
                locationType={session.locationType}
                durationMinutes={session.durationMinutes}
                variant="compact"
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Coach Notes ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Coach Notes
        </h2>
        {coachNotes.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[#0c1b33]/15 bg-white p-8 text-center">
            <span className="text-4xl mb-3 block">📝</span>
            <h3 className="font-heading text-lg font-bold text-[#0c1b33] mb-2">
              No coach notes yet
            </h3>
            <p className="text-[#0c1b33]/60 text-sm max-w-sm mx-auto">
              After your child&apos;s first session, their coach will share progress notes and recommendations here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {coachNotes.map((note: { id: string; coachName: string; date: string; text: string; childName: string; track: string }) => (
              <div
                key={note.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-gray-300"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#0c1b33]">
                      {note.coachName}
                    </span>
                    <span className="rounded-full bg-[#0c1b33]/5 px-2 py-0.5 text-[10px] font-medium text-[#0c1b33]/60">
                      {trackIcons[note.track]} {note.track}
                    </span>
                  </div>
                  <span className="text-xs text-[#0c1b33]/40">{note.date}</span>
                </div>
                <p className="mb-1 text-sm text-[#0c1b33]/60">
                  Re:{' '}
                  <span className="font-medium text-[#0c1b33]">
                    {note.childName}
                  </span>
                </p>
                <p className="text-sm leading-relaxed text-[#0c1b33]/80">
                  {note.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Quick Actions ── */}
      <section className="flex flex-wrap gap-3">
        <Link
          href="/parent/schedule"
          className="rounded-full bg-[#2a9d8f] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2a9d8f]/90 hover:shadow-md active:scale-[0.97]"
        >
          📅 View Schedule
        </Link>
        <Link
          href="/parent/messages"
          className="rounded-full bg-[#0c1b33] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0c1b33]/90 hover:shadow-md active:scale-[0.97]"
        >
          💬 Message Coach
        </Link>
        <Link
          href="/parent/billing"
          className="rounded-full border-2 border-[#d4a843] px-5 py-2.5 text-sm font-semibold text-[#0c1b33] transition-all hover:bg-[#d4a843]/10 hover:shadow-sm active:scale-[0.97]"
        >
          💳 View Billing
        </Link>
      </section>
    </div>
  )
}
