import { requireAuth } from '@/lib/auth'
import {
  mockStudentDashboard,
  mockAchievements,
  mockStreakDays,
  mockStreakCount,
} from '@/lib/mock-data'
import { ProgressRing } from '@/components/dashboard/ProgressRing'
import { XPBar } from '@/components/dashboard/XPBar'
import { AchievementsClient } from '@/components/dashboard/AchievementsClient'

export const metadata = { title: 'Achievements' }

export default async function AchievementsPage() {
  const user = await requireAuth()
  const data = mockStudentDashboard

  return (
    <div className="space-y-6 md:space-y-8">
      {/* ── Profile Header ── */}
      <section className="flex items-center gap-4 md:gap-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#0c1b33] text-2xl font-semibold text-white md:h-20 md:w-20 md:text-3xl">
          {data.user.firstName[0]}
          {data.user.lastName[0]}
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
            {data.user.firstName} {data.user.lastName}
          </h1>
          <p className="text-sm text-[#0c1b33]/60">
            Level {data.currentLevel} ·{' '}
            {data.totalXp.toLocaleString()} XP total
          </p>
        </div>
      </section>

      {/* ── XP & Level Progress ── */}
      <section className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 md:flex-row md:p-8 shadow-sm">
        <ProgressRing
          progress={Math.round((data.totalXp / 6000) * 100)}
          size={200}
          strokeWidth={12}
          color="#d4a843"
          trackColor="#e8e8e8"
          textColor="#0c1b33"
        />
        <div className="w-full flex-1">
          <h2 className="font-heading text-lg font-bold text-[#0c1b33] mb-2">
            Level {data.currentLevel} Progress
          </h2>
          <XPBar
            current={data.totalXp}
            max={6000}
            currentLevelName={`Level ${data.currentLevel}`}
            nextLevelName={`Level ${data.currentLevel + 1}`}
            variant="light"
          />
          <p className="mt-2 text-sm text-[#0c1b33]/50">
            {(6000 - data.totalXp).toLocaleString()} XP to next level
          </p>
        </div>
      </section>

      {/* ── Badge Collection with Filtering + Modals ── */}
      <AchievementsClient achievements={mockAchievements} />

      {/* ── Streak Calendar ── */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-[#0c1b33] mb-4">
          🔥 Streak Calendar
        </h2>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {mockStreakDays.map((d) => (
            <div key={d.day} className="flex flex-col items-center gap-1">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  d.active
                    ? 'bg-[#d4a843] text-white shadow-md shadow-[#d4a843]/20'
                    : 'bg-gray-100 text-[#0c1b33]/30'
                }`}
              >
                {d.active ? '🔥' : d.day[0]}
              </div>
              <span className="text-xs text-[#0c1b33]/50">{d.day}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-[#0c1b33]/60">
          <span className="font-semibold text-[#d4a843]">
            {mockStreakCount}-day
          </span>{' '}
          streak! Keep it going to earn the Month Warrior badge.
        </p>
      </section>
    </div>
  )
}
