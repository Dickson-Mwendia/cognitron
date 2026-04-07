import { requireRole } from '@/lib/auth'
import {
  getStudentDashboardData,
  getStudentAchievements,
  getStudentRecentActivity,
  getStudentStreakDays,
} from '@/lib/queries'
import { XPBar } from '@/components/dashboard/XPBar'
import { StreakCounter } from '@/components/dashboard/StreakCounter'
import { AchievementBadge } from '@/components/dashboard/AchievementBadge'
import { TrackCard } from '@/components/dashboard/TrackCard'
import { XPCelebration } from '@/components/dashboard/XPCelebration'
import Link from 'next/link'

export const metadata = { title: 'Dashboard' }

export default async function StudentDashboard() {
  const user = await requireRole(['student'])
  const data = await getStudentDashboardData(user)
  const achievements = await getStudentAchievements(user.id)
  const recentActivity = await getStudentRecentActivity(user.id)
  const streakDays = await getStudentStreakDays(user.id)

  const nextSession = data.nextSession

  return (
    <div className="space-y-8">
      <XPCelebration currentXP={data.totalXp} />

      {/* Section A: Your Next Move — hero CTA */}
      {nextSession ? (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1b33] to-[#162d50] p-6 md:p-8 shadow-lg">
          <div
            className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at top right, #d4a843 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">
              Your Next Move
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
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
              href="/dashboard/schedule"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-gold-light hover:shadow-md hover:shadow-gold/20 active:scale-[0.98]"
            >
              Join Lesson →
            </Link>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
          <span className="text-4xl mb-3 block">📅</span>
          <h2 className="font-heading text-xl font-bold text-navy mb-2">
            No upcoming sessions
          </h2>
          <p className="text-sm text-navy/60 mb-4">
            Book a session with your coach to keep your learning streak going!
          </p>
          <Link
            href="/dashboard/schedule"
            className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-light"
          >
            📅 Book a Session
          </Link>
        </section>
      )}

      {/* Section B: Your Tracks */}
      <section>
        <h2 className="font-heading text-xl font-bold text-navy mb-4">
          Your Tracks
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible snap-x snap-mandatory md:snap-none">
          {data.tracks.map((track) => (
            <Link
              key={track.trackId}
              href={`/dashboard/${track.trackName}`}
              className="min-w-[260px] md:min-w-0 snap-start transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
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

      {/* Section C: Streak, XP & Daily Challenge — gamification strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Streak card — dark themed for gamification excitement */}
        <div className="rounded-2xl bg-navy p-5 shadow-md flex items-center justify-center">
          <StreakCounter streak={data.streak} days={streakDays} />
        </div>

        {/* XP Bar card — dark themed */}
        <div className="rounded-2xl bg-navy p-5 shadow-md flex flex-col justify-center">
          <XPBar
            current={data.totalXp}
            max={6000}
            currentLevelName={`Level ${data.currentLevel}`}
            nextLevelName={`Level ${data.currentLevel + 1}`}
          />
        </div>

        {/* Daily Challenge — vibrant accent card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-coral/10 to-gold/10 border border-gold/20 p-5 flex flex-col items-center justify-center text-center transition-all hover:shadow-md hover:border-gold/40">
          <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚡</span>
          <p className="font-heading font-bold text-navy">
            Daily Challenge
          </p>
          <p className="text-sm text-navy/60 mb-3">
            Solve a Python puzzle
          </p>
          <Link
            href="/dashboard/practice"
            className="rounded-full bg-coral px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-coral-light hover:shadow-sm active:scale-[0.97]"
          >
            Start Now
          </Link>
        </div>
      </section>

      {/* Section D: Recent Activity Timeline */}
      <section>
        <h2 className="font-heading text-xl font-bold text-navy mb-4">
          Recent Activity
        </h2>
        {recentActivity.length > 0 ? (
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gold/20 rounded-full" />
            <ul className="space-y-3">
              {recentActivity.map((activity: { id: string; description: string; timestamp: string; xp: number; icon: string }) => (
                <li key={activity.id} className="relative group">
                  <span className="absolute -left-8 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-sm ring-2 ring-gold/30 transition-all group-hover:ring-gold/60 group-hover:bg-gold/20">
                    {activity.icon}
                  </span>
                  <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all group-hover:shadow-md group-hover:border-gold/20">
                    <p className="text-sm font-medium text-navy">
                      {activity.description}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-navy/50">
                      <span>{activity.timestamp}</span>
                      {activity.xp > 0 && (
                        <span className="font-semibold text-gold-dark">
                          +{activity.xp} XP
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
            <span className="text-3xl mb-2 block">📝</span>
            <p className="text-sm text-navy/50">
              Complete a lesson to see your activity here!
            </p>
          </div>
        )}
      </section>

      {/* Section E: Achievements Spotlight */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-navy">
            Achievements
          </h2>
          <Link
            href="/dashboard/achievements"
            className="text-sm font-medium text-teal hover:text-teal-light transition-colors"
          >
            View All →
          </Link>
        </div>
        {achievements.filter((a: { earned: boolean }) => a.earned).length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {achievements
              .filter((a: { earned: boolean }) => a.earned)
              .map((achievement: { id: string; name: string; description: string; icon: string; earned: boolean; earnedAt: string | null }) => (
                <div
                  key={achievement.id}
                  className="min-w-[180px] snap-start transition-transform hover:scale-[1.03]"
                >
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
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
            <span className="text-3xl mb-2 block">🏆</span>
            <p className="text-sm text-navy/50">
              Earn your first badge by completing a lesson!
            </p>
          </div>
        )}
      </section>

      {/* Section F: Quick Actions */}
      <section className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/practice"
          className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-light hover:shadow-md active:scale-[0.97]"
        >
          🎮 Practice Now
        </Link>
        <Link
          href="/dashboard/schedule"
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-navy-light hover:shadow-md active:scale-[0.97]"
        >
          📅 My Schedule
        </Link>
        <Link
          href="/dashboard/schedule"
          className="rounded-full border-2 border-gold px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-gold/10 hover:shadow-sm active:scale-[0.97]"
        >
          💬 Ask Coach
        </Link>
      </section>
    </div>
  )
}
