import { requireRole } from '@/lib/auth'
import {
  mockChildren,
  mockUpcomingSessions,
  mockCoachNotes,
} from '@/lib/mock-data'
import { SessionCard } from '@/components/dashboard/SessionCard'
import Link from 'next/link'

export const metadata = { title: 'Parent Dashboard' }

const trackIcons: Record<string, string> = {
  coding: '💻',
  ai: '🤖',
  chess: '♟️',
}

export default async function ParentDashboard() {
  const user = await requireRole(['parent'])

  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
        Welcome back, {user.firstName}
      </h1>

      {/* ── Children Overview Cards ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Your Children
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mockChildren.map((child) => (
            <div
              key={child.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
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

              <Link
                href="#"
                className="inline-block rounded-full bg-[#0c1b33] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0c1b33]/90"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Upcoming Sessions ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Upcoming Sessions
        </h2>
        <div className="space-y-3">
          {mockUpcomingSessions.map((session) => (
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
      </section>

      {/* ── Coach Notes ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Coach Notes
        </h2>
        <div className="space-y-4">
          {mockCoachNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
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
      </section>

      {/* ── Quick Actions ── */}
      <section className="flex flex-wrap gap-3">
        <Link
          href="#"
          className="rounded-full bg-[#2a9d8f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a9d8f]/90"
        >
          📅 Book Extra Session
        </Link>
        <Link
          href="#"
          className="rounded-full bg-[#0c1b33] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0c1b33]/90"
        >
          💬 Message Coach
        </Link>
        <Link
          href="#"
          className="rounded-full border-2 border-[#d4a843] px-5 py-2.5 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-[#d4a843]/10"
        >
          💳 View Billing
        </Link>
      </section>
    </div>
  )
}
