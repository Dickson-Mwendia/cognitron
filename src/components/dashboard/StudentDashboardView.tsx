import { XPBar } from '@/components/dashboard/XPBar'
import { StreakCounter } from '@/components/dashboard/StreakCounter'
import { AchievementBadge } from '@/components/dashboard/AchievementBadge'
import { TrackCard } from '@/components/dashboard/TrackCard'
import type { StudentDashboardData, TrackProgress } from '@/types'

interface StudentDashboardViewProps {
  data: StudentDashboardData
  tracks: TrackProgress[]
  achievements: Array<{
    id: string
    name: string
    description: string
    icon: string
    category: string
    trackName: string | null
    earned: boolean
    earnedAt: string | null
  }>
  recentActivity: Array<{
    id: string
    type: string
    description: string
    xp: number
    timestamp: string
    icon: string
  }>
  streakDays: Array<{ day: string; active: boolean }>
  streakCount: number
  /** When true, links are disabled (admin/coach viewing as student) */
  viewOnly?: boolean
}

export function StudentDashboardView({
  data,
  tracks,
  achievements,
  recentActivity,
  streakDays,
  streakCount,
  viewOnly = false,
}: StudentDashboardViewProps) {
  const nextSession = data.nextSession

  return (
    <div className="space-y-8">
      {/* Section A: Next Session */}
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
              {viewOnly ? 'Next Scheduled Session' : 'Your Next Move'}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
              {nextSession.lessonName}
            </h2>
            <p className="text-white/70 text-sm mb-1">
              with {nextSession.coachName}
            </p>
            <p className="text-white/50 text-sm">
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
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
          <span className="text-4xl mb-3 block">📅</span>
          <h2 className="font-heading text-xl font-bold text-navy mb-2">
            No upcoming sessions
          </h2>
          <p className="text-sm text-navy/60">
            No sessions currently scheduled.
          </p>
        </section>
      )}

      {/* Section B: Tracks */}
      <section>
        <h2 className="font-heading text-xl font-bold text-navy mb-4">
          {viewOnly ? 'Enrolled Tracks' : 'Your Tracks'}
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible snap-x snap-mandatory md:snap-none">
          {tracks.map((track) => (
            <div
              key={track.trackId}
              className="min-w-[260px] md:min-w-0 snap-start"
            >
              <TrackCard
                trackName={track.trackName}
                currentLevel={track.currentLevel}
                currentLevelName={track.currentLevelName}
                progressPercent={track.progressPercent}
                xpThisWeek={data.xpThisWeek}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Section C: Streak & XP */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-navy p-5 shadow-md flex items-center justify-center">
          <StreakCounter streak={streakCount} days={streakDays} />
        </div>
        <div className="rounded-2xl bg-navy p-5 shadow-md flex flex-col justify-center">
          <XPBar
            current={data.totalXp}
            max={6000}
            currentLevelName={`Level ${data.currentLevel}`}
            nextLevelName={`Level ${data.currentLevel + 1}`}
          />
        </div>
      </section>

      {/* Section D: Recent Activity */}
      <section>
        <h2 className="font-heading text-xl font-bold text-navy mb-4">
          Recent Activity
        </h2>
        {recentActivity.length > 0 ? (
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gold/20 rounded-full" />
            <ul className="space-y-3">
              {recentActivity.map((activity) => (
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
            <p className="text-sm text-navy/50">No recent activity.</p>
          </div>
        )}
      </section>

      {/* Section E: Achievements */}
      <section>
        <h2 className="font-heading text-xl font-bold text-navy mb-4">
          Achievements
        </h2>
        {achievements.filter((a) => a.earned).length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {achievements
              .filter((a) => a.earned)
              .map((achievement) => (
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
            <p className="text-sm text-navy/50">No achievements yet.</p>
          </div>
        )}
      </section>
    </div>
  )
}
