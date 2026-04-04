import { requireAuth } from '@/lib/auth'
import {
  mockStudentDashboard,
  mockTracks,
  mockRecentActivity,
  mockStreakDays,
  mockStreakCount,
  mockAchievements,
  mockUpcomingSessions,
} from '@/lib/mock-data'
import { XPBar } from '@/components/dashboard/XPBar'
import { StreakCounter } from '@/components/dashboard/StreakCounter'
import { AchievementBadge } from '@/components/dashboard/AchievementBadge'
import { SessionCard } from '@/components/dashboard/SessionCard'
import { TrackCard } from '@/components/dashboard/TrackCard'
import Link from 'next/link'

export const metadata = { title: 'Dashboard' }

export default async function StudentDashboard() {
  const user = await requireAuth()
  const data = mockStudentDashboard

  const nextSession = data.nextSession

  return (
    <div className="space-y-6 md:space-y-8">
      {/* ── Section A: Your Next Move ── */}
      {nextSession && (
        <section className="rounded-2xl bg-[#0c1b33] p-6 md:p-8">
          <p className="text-sm font-medium uppercase tracking-wider text-[#d4a843] mb-2">
            Your Next Move
          </p>
          <h2 className="font-heading text-2xl font-bold text-white mb-2">
            {nextSession.lessonName}
          </h2>
          <p className="text-white/70 text-sm mb-1">
            with {nextSession.coachName}
          </p>
          <p className="text-white/50 text-sm mb-6">
            {new Date(nextSession.scheduledAt).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}{' '}
            ·{' '}
            {new Date(nextSession.scheduledAt).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}{' '}
            · {nextSession.durationMinutes} min
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[#d4a843] px-6 py-3 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-[#d4a843]/90"
          >
            Join Lesson →
          </Link>
        </section>
      )}

      {/* ── Section B: Your Tracks ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Your Tracks
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
          {mockTracks.map((track) => (
            <Link
              key={track.trackId}
              href={`/dashboard/${track.trackName}`}
              className="min-w-[260px] md:min-w-0"
            >
              <TrackCard
                trackName={track.trackName}
                currentLevel={track.currentLevel}
                currentLevelName={track.currentLevelName}
                progressPercent={track.progressPercent}
                xpThisWeek={data.xpThisWeek}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section C: Streak & XP Strip ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StreakCounter streak={mockStreakCount} days={mockStreakDays} />

        <XPBar
          current={data.totalXp}
          max={6000}
          currentLevelName={`Level ${data.currentLevel}`}
          nextLevelName={`Level ${data.currentLevel + 1}`}
        />

        <div className="rounded-2xl border border-[#d4a843]/20 bg-[#d4a843]/5 p-4 flex flex-col items-center justify-center text-center">
          <span className="text-2xl mb-1">⚡</span>
          <p className="font-heading font-bold text-[#0c1b33]">
            Daily Challenge
          </p>
          <p className="text-sm text-[#0c1b33]/60 mb-3">
            Solve a Python puzzle
          </p>
          <Link
            href="#"
            className="rounded-full bg-[#e8614d] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#e8614d]/90"
          >
            Start Now
          </Link>
        </div>
      </section>

      {/* ── Section D: Recent Activity Timeline ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Recent Activity
        </h2>
        <div className="relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[#d4a843]/30" />
          <ul className="space-y-4">
            {mockRecentActivity.map((activity) => (
              <li key={activity.id} className="relative">
                <span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#d4a843]/20 text-sm ring-2 ring-[#d4a843]/40">
                  {activity.icon}
                </span>
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-[#0c1b33]">
                    {activity.description}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[#0c1b33]/50">
                    <span>{activity.timestamp}</span>
                    {activity.xp > 0 && (
                      <span className="font-semibold text-[#d4a843]">
                        +{activity.xp} XP
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Section E: Achievements Spotlight ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-[#0c1b33]">
            Achievements
          </h2>
          <Link
            href="/dashboard/achievements"
            className="text-sm font-medium text-[#2a9d8f] hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {mockAchievements
            .filter((a) => a.earned)
            .map((achievement) => (
              <div key={achievement.id} className="min-w-[200px]">
                <AchievementBadge
                  name={achievement.name}
                  description={achievement.description}
                  icon={achievement.icon}
                  earned={achievement.earned}
                  earnedAt={achievement.earnedAt}
                />
              </div>
            ))}
        </div>
      </section>

      {/* ── Section F: Quick Actions ── */}
      <section className="flex flex-wrap gap-3">
        <Link
          href="#"
          className="rounded-full bg-[#2a9d8f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a9d8f]/90"
        >
          🎮 Practice Now
        </Link>
        <Link
          href="#"
          className="rounded-full bg-[#0c1b33] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0c1b33]/90"
        >
          📅 My Schedule
        </Link>
        <Link
          href="#"
          className="rounded-full border-2 border-[#d4a843] px-5 py-2.5 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-[#d4a843]/10"
        >
          💬 Ask Coach
        </Link>
      </section>
    </div>
  )
}
