import { notFound } from 'next/navigation'
import { requireRole } from '@/lib/auth'
import { getStudentTrackProgress, getTrackCurriculum } from '@/lib/queries'
import { ProgressRing } from '@/components/dashboard/ProgressRing'

/* ------------------------------------------------------------------ */
/*  Track configuration                                                */
/* ------------------------------------------------------------------ */

const trackConfig = {
  coding: {
    name: 'Coding & Apps',
    icon: '💻',
    gradient: 'from-[#0c1b33] to-[#2a9d8f]',
    accent: '#2a9d8f',
  },
  ai: {
    name: 'AI & Machine Learning',
    icon: '🤖',
    gradient: 'from-[#0c1b33] to-[#d4a843]',
    accent: '#d4a843',
  },
  chess: {
    name: 'Chess & Strategy',
    icon: '♟️',
    gradient: 'from-[#0c1b33] to-[#e8614d]',
    accent: '#e8614d',
  },
} as const

type TrackSlug = keyof typeof trackConfig

/* ------------------------------------------------------------------ */
/*  Dynamic metadata                                                   */
/* ------------------------------------------------------------------ */

export async function generateMetadata(props: {
  params: Promise<{ track: string }>
}) {
  const { track } = await props.params
  const trackNames: Record<string, string> = {
    coding: 'Coding & Apps',
    ai: 'AI & Machine Learning',
    chess: 'Chess & Strategy',
  }
  return { title: trackNames[track] || 'Track' }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function TrackPage(props: {
  params: Promise<{ track: string }>
}) {
  const { track } = await props.params

  if (!Object.keys(trackConfig).includes(track)) {
    notFound()
  }

  const slug = track as TrackSlug
  const user = await requireRole(['student'])
  const config = trackConfig[slug]
  const allTracks = await getStudentTrackProgress(user.id)
  const trackData = allTracks.find((t) => t.trackName === slug) ?? {
    trackId: slug,
    trackName: slug,
    currentLevel: 1,
    currentLevelName: 'Beginner',
    totalXp: 0,
    levelXp: 0,
    xpToNextLevel: 1000,
    completedLessons: 0,
    totalLessons: 0,
    progressPercent: 0,
  }
  const curriculum = await getTrackCurriculum(slug, user.id)

  return (
    <div className="space-y-6 md:space-y-8">
      {/* ── Track Header ── */}
      <section
        className={`rounded-2xl bg-gradient-to-br ${config.gradient} p-6 md:p-10 text-white`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <span className="text-7xl">{config.icon}</span>

          <div className="flex-1">
            <h1 className="font-heading text-[32px] leading-tight font-bold mb-2">
              {config.name}
            </h1>
            <p className="text-white/70 mb-1">
              Level {trackData.currentLevel} · {trackData.currentLevelName}
            </p>
            <p className="text-white/50 text-sm">
              {trackData.completedLessons} of {trackData.totalLessons} lessons
              completed
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <ProgressRing
              progress={trackData.progressPercent}
              size={100}
              strokeWidth={8}
              color="#d4a843"
              trackColor="rgba(255,255,255,0.15)"
            />
            <span
              title="Coming soon"
              className="whitespace-nowrap rounded-full bg-[#d4a843] px-6 py-3 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-[#d4a843]/90 cursor-default opacity-70"
            >
              Continue Learning →
            </span>
          </div>
        </div>
      </section>

      {/* ── Curriculum Map ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-6">
          Curriculum Map
        </h2>

        <div className="relative space-y-8 pl-8 md:pl-12">
          {/* Vertical connector line */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-0.5 bg-[#d4a843]/20" />

          {curriculum.levels.map((level: any) => (
            <div key={level.id} className="relative">
              {/* Level node on the connector */}
              <div
                className="absolute -left-8 md:-left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border-2"
                style={{ borderColor: config.accent }}
              >
                <span className="text-lg">{level.badgeEmoji}</span>
              </div>

              <div
                className={`rounded-2xl border p-5 md:p-6 ${
                  level.completed
                    ? 'border-[#2a9d8f]/30 bg-[#2a9d8f]/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-heading text-lg font-bold text-[#0c1b33]">
                    Level {level.levelOrder}: {level.name}
                  </h3>
                  {level.completed && (
                    <span className="rounded-full bg-[#2a9d8f]/20 px-2.5 py-0.5 text-xs font-semibold text-[#2a9d8f]">
                      ✓ Complete
                    </span>
                  )}
                </div>

                <div className="space-y-5">
                  {level.modules.map((mod: any) => (
                    <div key={mod.id}>
                      <h4 className="text-sm font-semibold text-[#0c1b33]/70 mb-2">
                        {mod.name}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {mod.lessons.map((lesson: any) => (
                          <div
                            key={lesson.id}
                            className={`flex items-center gap-2 rounded-lg p-2.5 text-sm ${
                              lesson.status === 'completed'
                                ? 'bg-[#2a9d8f]/10 text-[#2a9d8f]'
                                : lesson.status === 'in_progress'
                                  ? 'bg-[#d4a843]/10 text-[#d4a843] ring-1 ring-[#d4a843]/30'
                                  : 'bg-gray-50 text-[#0c1b33]/40'
                            }`}
                          >
                            <span>
                              {lesson.status === 'completed'
                                ? '✅'
                                : lesson.status === 'in_progress'
                                  ? '▶️'
                                  : '🔒'}
                            </span>
                            <span className="truncate">{lesson.name}</span>
                            {lesson.score != null && (
                              <span className="ml-auto text-xs font-semibold">
                                {lesson.score}%
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Practice Challenges ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Practice Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Quick Quiz',
              desc: 'Test your knowledge with 10 questions',
              icon: '❓',
            },
            {
              title: 'Code Challenge',
              desc: 'Solve a hands-on puzzle',
              icon: '🧩',
            },
            {
              title: 'Project Lab',
              desc: 'Build a mini-project from scratch',
              icon: '🔬',
            },
          ].map((challenge) => (
            <button
              key={challenge.title}
              disabled
              title="Coming soon"
              className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:shadow-lg hover:border-gray-300 text-left cursor-default"
            >
              <span className="text-3xl block group-hover:scale-110 transition-transform origin-left">{challenge.icon}</span>
              <h3 className="mt-3 font-heading font-bold text-[#0c1b33] transition-colors group-hover:text-[#2a9d8f]">
                {challenge.title}
              </h3>
              <p className="mt-1 text-sm text-[#0c1b33]/60">
                {challenge.desc}
              </p>
              <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-wider text-[#0c1b33]/30">
                Coming Soon
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
