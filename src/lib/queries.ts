// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Server-side data-fetching layer.
 *
 * Each function queries Supabase when configured, otherwise falls back to
 * mock data for local development. Returned shapes match what dashboard
 * components already expect so pages can swap mock → real with no component
 * changes.
 *
 * Note: We use `as any` for Supabase query results because the generated
 * Database type sometimes conflicts with select() column subsets and joins.
 * This is safe because we explicitly type every return value.
 */

import { createClient as createTypedClient } from '@/lib/supabase/server'
import { createClient as createServiceRoleClient } from '@supabase/supabase-js'
import type {
  DashboardUser,
  TrackProgress,
  StudentDashboardData,
  StudentScheduleSession,
  TrackInfo,
  AdminKPI,
  AdminAlert,
  AdminStudentRow,
  AdminCoachRow,
  AdminRevenueByTrack,
  AdminInvoiceRow,
  AdminSessionRow,
  CurriculumNode,
  SparklinePoint,
  CoachSession,
  CoachNoteEntry,
  ParentChild,
  Conversation,
  ParentReport,
  BillingData,
  TrackName,
} from '@/types'

// ─── helpers ─────────────────────────────────────────────────────────────────

function supabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

/**
 * Untyped Supabase client wrapper — avoids `never` errors from strict
 * Database generic when using `.select()` column subsets or relation joins.
 */
async function db() {
  return (await createTypedClient()) as any
}

/** Service-role client for admin queries (auth.users access). Returns null if not configured. */
function serviceDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceRoleClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/** Batch-fetch emails from auth.users via the service-role admin API. */
async function fetchUserEmails(userIds: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  const admin = serviceDb()
  if (!admin || userIds.length === 0) return map

  for (const uid of userIds) {
    try {
      const { data } = await admin.auth.admin.getUserById(uid)
      if (data?.user?.email) map.set(uid, data.user.email)
    } catch { /* skip */ }
  }
  return map
}

// ═══════════════════════════════════════════════════════════════════════════════
// STUDENT QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

/** Full student dashboard payload. */
export async function getStudentDashboardData(
  user: DashboardUser,
): Promise<StudentDashboardData> {
  if (!supabaseConfigured()) {
    const { mockStudentDashboard } = await import('@/lib/mock-data')
    return mockStudentDashboard
  }

  const sb = await db()
  const profileId = user.id

  // Total XP
  const { data: xpRows } = await sb
    .from('xp_events')
    .select('xp_amount')
    .eq('student_id', profileId)
  const totalXp = xpRows?.reduce((s, r) => s + r.xp_amount, 0) ?? 0

  // XP this week (last 7 days)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const { data: weekXpRows } = await sb
    .from('xp_events')
    .select('xp_amount')
    .eq('student_id', profileId)
    .gte('created_at', weekAgo.toISOString())
  const xpThisWeek = weekXpRows?.reduce((s, r) => s + r.xp_amount, 0) ?? 0

  // Determine level from XP
  const { data: allLevels } = await sb
    .from('levels')
    .select('level_order, name, xp_required')
    .order('xp_required', { ascending: true })
  let currentLevel = 1
  let currentLevelName = 'Beginner'
  if (allLevels) {
    for (const lv of allLevels) {
      if (totalXp >= lv.xp_required) {
        currentLevel = lv.level_order
        currentLevelName = lv.name
      }
    }
  }

  // Track progress
  const tracks = await getStudentTrackProgress(profileId)

  // Streak (consecutive days with XP events)
  const streak = await getStudentStreak(profileId)

  // Next session
  const nextSession = await getStudentNextSession(profileId)

  // Recent achievements
  const { data: earnedRows } = await sb
    .from('student_achievements')
    .select('achievement_id, earned_at, achievements(name, icon)')
    .eq('student_id', profileId)
    .order('earned_at', { ascending: false })
    .limit(5)
  const recentAchievements = (earnedRows ?? []).map((r) => {
    const a = r.achievements as unknown as { name: string; icon: string } | null
    return {
      id: r.achievement_id,
      name: a?.name ?? '',
      icon: a?.icon ?? '⭐',
      earnedAt: r.earned_at,
    }
  })

  return {
    user,
    tracks,
    streak,
    totalXp,
    currentLevel,
    recentAchievements,
    nextSession,
    xpThisWeek,
  }
}

/** Track progress for a student. */
export async function getStudentTrackProgress(
  profileId: string,
): Promise<TrackProgress[]> {
  if (!supabaseConfigured()) {
    const { mockTracks } = await import('@/lib/mock-data')
    return mockTracks
  }

  const sb = await db()

  const { data: trackRows } = await sb.from('tracks').select('id, name')
  if (!trackRows || trackRows.length === 0) return []

  const results: TrackProgress[] = []

  for (const track of trackRows) {
    // Get all lessons in this track via levels→modules→lessons
    const { data: levels } = await sb
      .from('levels')
      .select('id, name, level_order, xp_required')
      .eq('track_id', track.id)
      .order('level_order')
    if (!levels || levels.length === 0) continue

    const levelIds = levels.map((l) => l.id)
    const { data: modules } = await sb
      .from('modules')
      .select('id, level_id')
      .in('level_id', levelIds)
    const moduleIds = modules?.map((m) => m.id) ?? []

    const { data: lessons } = await sb
      .from('lessons')
      .select('id')
      .in('module_id', moduleIds.length > 0 ? moduleIds : ['__none__'])
    const totalLessons = lessons?.length ?? 0

    // Student progress on those lessons
    const lessonIds = lessons?.map((l) => l.id) ?? []
    let completedLessons = 0
    if (lessonIds.length > 0) {
      const { data: progress } = await sb
        .from('student_progress')
        .select('id')
        .eq('student_id', profileId)
        .eq('status', 'completed')
        .in('lesson_id', lessonIds)
      completedLessons = progress?.length ?? 0
    }

    // Total XP for this track
    const { data: trackXpRows } = await sb
      .from('xp_events')
      .select('xp_amount')
      .eq('student_id', profileId)
      .eq('track_id', track.id)
    const trackXp = trackXpRows?.reduce((s, r) => s + r.xp_amount, 0) ?? 0

    // Determine current level for this track based on XP
    let lvl = 1
    let lvlName = levels[0]?.name ?? 'Beginner'
    let xpToNext = levels[0]?.xp_required ?? 0
    for (const l of levels) {
      if (trackXp >= l.xp_required) {
        lvl = l.level_order
        lvlName = l.name
        const nextLvl = levels.find((x) => x.level_order === l.level_order + 1)
        xpToNext = nextLvl?.xp_required ?? l.xp_required
      }
    }

    const progressPercent = totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0

    results.push({
      trackId: track.id,
      trackName: track.name as TrackName,
      currentLevel: lvl,
      currentLevelName: lvlName,
      totalXp: trackXp,
      levelXp: trackXp,
      xpToNextLevel: xpToNext,
      completedLessons,
      totalLessons,
      progressPercent,
    })
  }

  return results
}

/** Calculate a student's streak (consecutive days with XP events). */
async function getStudentStreak(profileId: string): Promise<number> {
  const sb = await db()
  const { data: events } = await sb
    .from('xp_events')
    .select('created_at')
    .eq('student_id', profileId)
    .order('created_at', { ascending: false })
    .limit(90) // last 90 days max

  if (!events || events.length === 0) return 0

  // Collect unique dates
  const dates = [
    ...new Set(events.map((e) => e.created_at.slice(0, 10))),
  ].sort((a, b) => (a < b ? 1 : -1)) // descending

  let streak = 0
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  // Streak must include today or yesterday
  if (dates[0] !== today && dates[0] !== yesterday) return 0

  let expected = new Date(dates[0])
  for (const d of dates) {
    const current = new Date(d)
    const diff = Math.round(
      (expected.getTime() - current.getTime()) / 86400000,
    )
    if (diff > 1) break
    streak++
    expected = current
  }

  return streak
}

/** Streak calendar (last 7 days with active flags). */
export async function getStudentStreakDays(
  profileId: string,
): Promise<{ day: string; active: boolean }[]> {
  if (!supabaseConfigured()) {
    const { mockStreakDays } = await import('@/lib/mock-data')
    return mockStreakDays
  }

  const sb = await db()
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const days: { day: string; active: boolean }[] = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    const { count } = await sb
      .from('xp_events')
      .select('id', { count: 'exact', head: true })
      .eq('student_id', profileId)
      .gte('created_at', `${dateStr}T00:00:00`)
      .lt('created_at', `${dateStr}T23:59:59`)
    days.push({
      day: dayNames[d.getDay()],
      active: (count ?? 0) > 0,
    })
  }

  return days
}

/** Next upcoming session for a student. */
async function getStudentNextSession(profileId: string) {
  const sb = await db()
  const now = new Date().toISOString()

  const { data: sessionLinks } = await sb
    .from('session_students')
    .select('session_id')
    .eq('student_id', profileId)

  if (!sessionLinks || sessionLinks.length === 0) return null

  const sessionIds = sessionLinks.map((s) => s.session_id)

  const { data: sessions } = await sb
    .from('sessions_schedule')
    .select('id, scheduled_at, duration_minutes, location_type, status, coach_id, track_id, notes')
    .in('id', sessionIds)
    .eq('status', 'scheduled')
    .gte('scheduled_at', now)
    .order('scheduled_at', { ascending: true })
    .limit(1)

  if (!sessions || sessions.length === 0) return null

  const session = sessions[0]

  // Get coach name
  const { data: coachProfile } = await sb
    .from('profiles')
    .select('first_name, last_name')
    .eq('id', session.coach_id)
    .single()

  // Get track name
  const { data: track } = await sb
    .from('tracks')
    .select('name')
    .eq('id', session.track_id)
    .single()

  return {
    id: session.id,
    trackName: (track?.name ?? 'coding') as TrackName,
    lessonName: session.notes ?? `${track?.name ?? 'Coding'} Session`,
    coachName: coachProfile
      ? `${coachProfile.first_name} ${coachProfile.last_name}`
      : 'Coach',
    scheduledAt: session.scheduled_at,
    locationType: session.location_type as 'home' | 'online',
    durationMinutes: session.duration_minutes,
  }
}

/** All achievements with student's earned status. */
export async function getStudentAchievements(profileId: string) {
  if (!supabaseConfigured()) {
    const { mockAchievements } = await import('@/lib/mock-data')
    return mockAchievements
  }

  const sb = await db()

  const { data: allAchievements } = await sb
    .from('achievements')
    .select('id, name, description, icon, category, track_id')

  const { data: earned } = await sb
    .from('student_achievements')
    .select('achievement_id, earned_at')
    .eq('student_id', profileId)

  const earnedMap = new Map(
    (earned ?? []).map((e) => [e.achievement_id, e.earned_at]),
  )

  // Get track names for track_id mapping
  const { data: tracks } = await sb.from('tracks').select('id, name')
  const trackMap = new Map((tracks ?? []).map((t) => [t.id, t.name]))

  return (allAchievements ?? []).map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    icon: a.icon,
    category: a.category,
    trackName: a.track_id ? trackMap.get(a.track_id) ?? null : null,
    earned: earnedMap.has(a.id),
    earnedAt: earnedMap.get(a.id) ?? null,
  }))
}

/** Recent activity (XP events). */
export async function getStudentRecentActivity(profileId: string) {
  if (!supabaseConfigured()) {
    const { mockRecentActivity } = await import('@/lib/mock-data')
    return mockRecentActivity
  }

  const sb = await db()
  const { data: events } = await sb
    .from('xp_events')
    .select('id, event_type, xp_amount, description, created_at')
    .eq('student_id', profileId)
    .order('created_at', { ascending: false })
    .limit(10)

  const typeIcons: Record<string, string> = {
    lesson_complete: '✅',
    achievement: '🏆',
    streak: '🔥',
    quiz: '❓',
    challenge: '⚡',
  }

  return (events ?? []).map((e) => ({
    id: e.id,
    type: e.event_type,
    description: e.description ?? e.event_type.replace(/_/g, ' '),
    xp: e.xp_amount,
    timestamp: new Date(e.created_at).toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric',
    }),
    icon: typeIcons[e.event_type] ?? '⭐',
  }))
}

/** Student schedule (upcoming + past sessions). */
export async function getStudentSchedule(
  profileId: string,
): Promise<StudentScheduleSession[]> {
  if (!supabaseConfigured()) {
    const { mockStudentSchedule } = await import('@/lib/mock-data')
    return mockStudentSchedule
  }

  const sb = await db()
  const now = new Date().toISOString()

  const { data: sessionLinks } = await sb
    .from('session_students')
    .select('session_id')
    .eq('student_id', profileId)

  if (!sessionLinks || sessionLinks.length === 0) return []

  const sessionIds = sessionLinks.map((s) => s.session_id)

  const { data: sessions } = await sb
    .from('sessions_schedule')
    .select('id, scheduled_at, duration_minutes, location_type, status, coach_id, track_id, notes')
    .in('id', sessionIds)
    .neq('status', 'cancelled')
    .order('scheduled_at', { ascending: false })
    .limit(30)

  if (!sessions || sessions.length === 0) return []

  // Bulk-fetch coach profiles and tracks
  const coachIds = [...new Set(sessions.map((s) => s.coach_id))]
  const trackIds = [...new Set(sessions.map((s) => s.track_id))]

  const { data: coaches } = await sb
    .from('profiles')
    .select('id, first_name, last_name')
    .in('id', coachIds)
  const coachMap = new Map(
    (coaches ?? []).map((c) => [c.id, `${c.first_name} ${c.last_name}`]),
  )

  const { data: tracks } = await sb
    .from('tracks')
    .select('id, name')
    .in('id', trackIds)
  const trackMap = new Map((tracks ?? []).map((t) => [t.id, t.name]))

  return sessions.map((s) => {
    const dt = new Date(s.scheduled_at)
    return {
      id: s.id,
      date: dt.toLocaleDateString('en-GB', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      time: dt.toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
      }),
      track: (trackMap.get(s.track_id) ?? 'coding') as TrackName,
      coachName: coachMap.get(s.coach_id) ?? 'Coach',
      locationType: s.location_type as 'home' | 'online',
      lessonName: s.notes ?? 'Session',
      isPast: dt < new Date(now),
    }
  })
}

/** Browse tracks with enrollment status. */
export async function getTrackInfo(
  profileId: string,
): Promise<TrackInfo[]> {
  if (!supabaseConfigured()) {
    const { mockTrackInfo } = await import('@/lib/mock-data')
    return mockTrackInfo
  }

  const sb = await db()

  const { data: tracks } = await sb.from('tracks').select('id, name, description, icon, color')
  if (!tracks) return []

  // Check enrollment via coach_assignments or student_progress
  const { data: assignments } = await sb
    .from('coach_assignments')
    .select('track')
    .eq('student_id', profileId)
    .eq('active', true)

  const enrolledTracks = new Set((assignments ?? []).map((a) => a.track))

  const trackMeta: Record<string, { title: string; tiers: string[]; accent: string }> = {
    coding: {
      title: 'Coding & App Development',
      tiers: ['Scratch Jr', 'Scratch', 'App Inventor', 'Python', 'Web Dev'],
      accent: '#2a9d8f',
    },
    ai: {
      title: 'AI & Machine Learning',
      tiers: ['AI Explorers', 'ML Basics', 'Data Science', 'Neural Networks'],
      accent: '#e8614d',
    },
    chess: {
      title: 'Chess & Strategy',
      tiers: ['Pawns', 'Knights', 'Bishops', 'Rooks', 'Queens'],
      accent: '#d4a843',
    },
  }

  // Count modules per track
  const results: TrackInfo[] = []
  for (const t of tracks) {
    const { data: levels } = await sb
      .from('levels')
      .select('id')
      .eq('track_id', t.id)
    const levelIds = levels?.map((l) => l.id) ?? []
    let moduleCount = 0
    if (levelIds.length > 0) {
      const { count } = await sb
        .from('modules')
        .select('id', { count: 'exact', head: true })
        .in('level_id', levelIds)
      moduleCount = count ?? 0
    }

    const meta = trackMeta[t.name] ?? { title: t.description, tiers: [], accent: t.color }
    results.push({
      id: t.id,
      name: t.name as TrackName,
      title: meta.title,
      description: t.description,
      icon: t.icon,
      tiers: meta.tiers,
      moduleCount,
      enrolled: enrolledTracks.has(t.name),
      accentColor: meta.accent,
    })
  }

  return results
}

/** Curriculum map for a specific track (levels→modules→lessons + student progress). */
export async function getTrackCurriculum(
  trackSlug: string,
  profileId: string,
) {
  if (!supabaseConfigured()) {
    const { mockCodingCurriculum } = await import('@/lib/mock-data')
    return mockCodingCurriculum
  }

  const sb = await db()

  const { data: track } = await sb
    .from('tracks')
    .select('id, name')
    .eq('name', trackSlug)
    .single()
  if (!track) return { trackName: trackSlug, currentLevelOrder: 1, levels: [] }

  const { data: levels } = await sb
    .from('levels')
    .select('id, name, level_order, badge_emoji')
    .eq('track_id', track.id)
    .order('level_order')

  if (!levels || levels.length === 0)
    return { trackName: trackSlug, currentLevelOrder: 1, levels: [] }

  const levelIds = levels.map((l) => l.id)
  const { data: modules } = await sb
    .from('modules')
    .select('id, name, module_order, level_id')
    .in('level_id', levelIds)
    .order('module_order')

  const moduleIds = (modules ?? []).map((m) => m.id)
  const { data: lessons } = await sb
    .from('lessons')
    .select('id, name, lesson_order, module_id')
    .in('module_id', moduleIds.length > 0 ? moduleIds : ['__none__'])
    .order('lesson_order')

  // Student progress
  const lessonIds = (lessons ?? []).map((l) => l.id)
  const { data: progress } = await sb
    .from('student_progress')
    .select('lesson_id, status, score')
    .eq('student_id', profileId)
    .in('lesson_id', lessonIds.length > 0 ? lessonIds : ['__none__'])

  const progressMap = new Map(
    (progress ?? []).map((p) => [p.lesson_id, { status: p.status, score: p.score }]),
  )

  // Build tree
  const levelData = levels.map((level) => {
    const levelModules = (modules ?? [])
      .filter((m) => m.level_id === level.id)
      .map((mod) => {
        const modLessons = (lessons ?? [])
          .filter((l) => l.module_id === mod.id)
          .map((lesson) => {
            const prog = progressMap.get(lesson.id)
            return {
              id: lesson.id,
              name: lesson.name,
              status: (prog?.status ?? 'not_started') as 'not_started' | 'in_progress' | 'completed',
              score: prog?.score ?? null,
            }
          })
        return { id: mod.id, name: mod.name, moduleOrder: mod.module_order, lessons: modLessons }
      })

    const allLessonsInLevel = levelModules.flatMap((m) => m.lessons)
    const completed = allLessonsInLevel.length > 0 && allLessonsInLevel.every((l) => l.status === 'completed')

    return {
      id: level.id,
      name: level.name,
      levelOrder: level.level_order,
      badgeEmoji: level.badge_emoji,
      completed,
      modules: levelModules,
    }
  })

  // Current level order
  let currentLevelOrder = 1
  for (const l of levelData) {
    if (l.completed) currentLevelOrder = l.levelOrder + 1
  }

  return { trackName: trackSlug, currentLevelOrder, levels: levelData }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PARENT QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

/** Get parent's linked children with stats. */
export async function getParentChildren(
  profileId: string,
): Promise<ParentChild[]> {
  if (!supabaseConfigured()) {
    const { mockParentChildren } = await import('@/lib/mock-data')
    return mockParentChildren
  }

  const sb = await db()

  const { data: links } = await sb
    .from('parent_student_links')
    .select('student_id')
    .eq('parent_id', profileId)

  if (!links || links.length === 0) return []

  const childIds = links.map((l) => l.student_id)
  const { data: children } = await sb
    .from('profiles')
    .select('id, first_name, last_name, avatar_url, date_of_birth, age_tier')
    .in('id', childIds)

  if (!children) return []

  const results: ParentChild[] = []
  for (const child of children) {
    // Enrolled tracks
    const { data: assignments } = await sb
      .from('coach_assignments')
      .select('track')
      .eq('student_id', child.id)
      .eq('active', true)
    const enrolledTracks = (assignments ?? []).map((a) => a.track as TrackName)

    // XP
    const { data: xpRows } = await sb
      .from('xp_events')
      .select('xp_amount')
      .eq('student_id', child.id)
    const currentXp = xpRows?.reduce((s, r) => s + r.xp_amount, 0) ?? 0

    // Streak
    const streak = await getStudentStreak(child.id)

    // Age
    let age = 0
    if (child.date_of_birth) {
      const birth = new Date(child.date_of_birth)
      const today = new Date()
      age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--
    }

    results.push({
      id: child.id,
      firstName: child.first_name,
      lastName: child.last_name,
      age,
      avatarUrl: child.avatar_url,
      enrolledTracks,
      currentXp,
      streak,
    })
  }

  return results
}

/** Parent overview children (richer shape used by parent home page). */
export async function getParentOverviewChildren(profileId: string) {
  if (!supabaseConfigured()) {
    const { mockChildren } = await import('@/lib/mock-data')
    return mockChildren
  }

  const children = await getParentChildren(profileId)
  return children.map((c) => ({
    id: c.id,
    firstName: c.firstName,
    lastName: c.lastName,
    avatarUrl: c.avatarUrl,
    ageTier: c.age > 12 ? '13-17' : c.age > 8 ? '9-12' : '5-8',
    tracks: [] as TrackProgress[],
    streak: c.streak,
    totalXp: c.currentXp,
    lessonsCompleted: 0,
    currentLevel: 1,
  }))
}

/** Parent schedule — sessions for all children. */
export async function getParentFamilySessions(profileId: string) {
  if (!supabaseConfigured()) {
    const { mockCoachSessions } = await import('@/lib/mock-data')
    return mockCoachSessions
      .filter((s) => s.status !== 'cancelled')
      .map((s) => ({
        id: s.id,
        childName: s.studentName.split(' ')[0],
        track: s.track,
        coachName: `Coach ${s.studentName.includes('Kamau') ? 'David' : 'Sarah'}`,
        date: s.date,
        time: s.time,
        locationType: s.locationType,
        durationMinutes: s.durationMinutes,
      }))
  }

  const sb = await db()
  const children = await getParentChildren(profileId)
  if (children.length === 0) return []

  const childIds = children.map((c) => c.id)
  const childNameMap = new Map(children.map((c) => [c.id, c.firstName]))

  // Get session links for all children
  const { data: sessionLinks } = await sb
    .from('session_students')
    .select('session_id, student_id')
    .in('student_id', childIds)

  if (!sessionLinks || sessionLinks.length === 0) return []

  const sessionIds = [...new Set(sessionLinks.map((s) => s.session_id))]
  const sessionChildMap = new Map<string, string>()
  for (const sl of sessionLinks) {
    sessionChildMap.set(sl.session_id, sl.student_id)
  }

  const { data: sessions } = await sb
    .from('sessions_schedule')
    .select('id, scheduled_at, duration_minutes, location_type, status, coach_id, track_id')
    .in('id', sessionIds)
    .neq('status', 'cancelled')
    .order('scheduled_at')

  if (!sessions) return []

  const coachIds = [...new Set(sessions.map((s) => s.coach_id))]
  const trackIds = [...new Set(sessions.map((s) => s.track_id))]

  const { data: coaches } = await sb.from('profiles').select('id, first_name, last_name').in('id', coachIds)
  const coachMap = new Map((coaches ?? []).map((c) => [c.id, `${c.first_name} ${c.last_name}`]))

  const { data: tracks } = await sb.from('tracks').select('id, name').in('id', trackIds)
  const trackMap = new Map((tracks ?? []).map((t) => [t.id, t.name]))

  return sessions.map((s) => {
    const dt = new Date(s.scheduled_at)
    const childId = sessionChildMap.get(s.id) ?? ''
    return {
      id: s.id,
      childName: childNameMap.get(childId) ?? 'Child',
      track: (trackMap.get(s.track_id) ?? 'coding') as TrackName,
      coachName: coachMap.get(s.coach_id) ?? 'Coach',
      date: dt.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: dt.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' }),
      locationType: s.location_type as 'home' | 'online',
      durationMinutes: s.duration_minutes,
    }
  })
}

/** Coach notes visible to parent — fetches from coach_notes for linked children. */
export async function getParentCoachNotes(profileId: string) {
  if (!supabaseConfigured()) {
    const { mockCoachNotes } = await import('@/lib/mock-data')
    return mockCoachNotes
  }

  const sb = await db()

  // Get children
  const { data: links } = await sb
    .from('parent_student_links')
    .select('student_id')
    .eq('parent_id', profileId)
  if (!links || links.length === 0) return []

  const childIds = links.map((l) => l.student_id)

  // Fetch notes for those children
  const { data: notes } = await sb
    .from('coach_notes')
    .select('id, coach_id, student_id, track_id, content, created_at')
    .in('student_id', childIds)
    .order('created_at', { ascending: false })
    .limit(20)

  if (!notes || notes.length === 0) return []

  // Get coach names, student names, track names
  const coachIds = [...new Set(notes.map((n) => n.coach_id))]
  const trackIds = [...new Set(notes.map((n) => n.track_id).filter(Boolean))]

  const { data: coachProfiles } = await sb
    .from('profiles')
    .select('id, first_name, last_name')
    .in('id', coachIds)
  const coachMap = new Map((coachProfiles ?? []).map((c) => [c.id, `${c.first_name} ${c.last_name}`]))

  const { data: childProfiles } = await sb
    .from('profiles')
    .select('id, first_name')
    .in('id', childIds)
  const childMap = new Map((childProfiles ?? []).map((c) => [c.id, c.first_name]))

  let trackMap = new Map()
  if (trackIds.length > 0) {
    const { data: tracks } = await sb.from('tracks').select('id, name').in('id', trackIds)
    trackMap = new Map((tracks ?? []).map((t) => [t.id, t.name]))
  }

  return notes.map((n) => ({
    id: n.id,
    coachName: coachMap.get(n.coach_id) ?? 'Coach',
    date: new Date(n.created_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
    text: n.content,
    childName: childMap.get(n.student_id) ?? 'Student',
    track: n.track_id ? (trackMap.get(n.track_id) ?? 'coding') : 'coding',
  }))
}

/** Parent billing data. */
export async function getParentBilling(profileId: string): Promise<BillingData> {
  if (!supabaseConfigured()) {
    const { mockBillingData } = await import('@/lib/mock-data')
    return mockBillingData
  }

  const sb = await db()

  // Count children
  const { count: childCount } = await sb
    .from('parent_student_links')
    .select('id', { count: 'exact', head: true })
    .eq('parent_id', profileId)

  // Latest invoice
  const { data: invoices } = await sb
    .from('invoices')
    .select('*')
    .eq('parent_id', profileId)
    .order('created_at', { ascending: false })
    .limit(10)

  // Payments
  const { data: payments } = await sb
    .from('payments')
    .select('*')
    .eq('parent_id', profileId)
    .order('created_at', { ascending: false })
    .limit(10)

  const outstanding = (invoices ?? [])
    .filter((i) => i.status === 'sent' || i.status === 'overdue')
    .reduce((s, i) => s + i.amount_kes, 0)

  const nextInvoice = (invoices ?? []).find(
    (i) => i.status === 'sent' || i.status === 'draft',
  )

  return {
    plan: {
      childrenEnrolled: childCount ?? 0,
      sessionsPerWeek: 0,
      monthlyTotalKes: 0,
      planName: childCount && childCount > 0 ? 'Active Plan' : 'No Plan',
    },
    payments: (payments ?? []).map((p) => ({
      id: p.id,
      date: new Date(p.created_at).toLocaleDateString('en-GB', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      amountKes: p.amount_kes,
      mpesaRef: p.reference ?? '',
      status: p.status === 'completed' ? 'paid' as const : 'pending' as const,
    })),
    outstandingBalanceKes: outstanding,
    nextPayment: nextInvoice
      ? { dueDate: nextInvoice.due_date, amountKes: nextInvoice.amount_kes }
      : { dueDate: '', amountKes: 0 },
  }
}

/** Parent reports — fetches sent progress reports for linked children. */
export async function getParentReports(profileId: string): Promise<ParentReport[]> {
  if (!supabaseConfigured()) {
    const { mockParentReports } = await import('@/lib/mock-data')
    return mockParentReports
  }

  const sb = await db()

  // Get children
  const { data: links } = await sb
    .from('parent_student_links')
    .select('student_id')
    .eq('parent_id', profileId)
  if (!links || links.length === 0) return []

  const childIds = links.map((l) => l.student_id)

  // Fetch sent reports for those children
  const { data: reports } = await sb
    .from('progress_reports')
    .select('id, student_id, period, report_data, sent_at, created_at')
    .in('student_id', childIds)
    .eq('status', 'sent')
    .order('sent_at', { ascending: false })
    .limit(20)

  if (!reports || reports.length === 0) return []

  // Get child names
  const { data: childProfiles } = await sb
    .from('profiles')
    .select('id, first_name, last_name')
    .in('id', childIds)
  const childMap = new Map(
    (childProfiles ?? []).map((c) => [c.id, `${c.first_name} ${c.last_name}`]),
  )

  return reports.map((r) => ({
    id: r.id,
    childName: childMap.get(r.student_id) ?? 'Student',
    childId: r.student_id,
    period: r.period,
    overallRating: (r.report_data as any)?.overallRating ?? 3,
    dateGenerated: r.sent_at ?? r.created_at,
    summary: (r.report_data as any)?.overallAssessment ?? 'Progress report available.',
  }))
}

/** Parent conversations — built from messages grouped by coach. */
export async function getParentConversations(profileId: string): Promise<Conversation[]> {
  if (!supabaseConfigured()) {
    const { mockParentConversations } = await import('@/lib/mock-data')
    return mockParentConversations
  }

  const sb = await db()

  // Get all messages sent or received by this parent
  const { data: messages } = await sb
    .from('messages')
    .select('id, sender_id, receiver_id, content, is_read, created_at')
    .or(`sender_id.eq.${profileId},receiver_id.eq.${profileId}`)
    .order('created_at', { ascending: true })
    .limit(200)

  if (!messages || messages.length === 0) return []

  // Group by the other party (the coach)
  const conversationMap = new Map<string, typeof messages>()
  for (const msg of messages) {
    const otherId = msg.sender_id === profileId ? msg.receiver_id : msg.sender_id
    if (!conversationMap.has(otherId)) conversationMap.set(otherId, [])
    conversationMap.get(otherId)!.push(msg)
  }

  // Get coach profiles + sender profiles
  const otherIds = [...conversationMap.keys()]
  const { data: profiles } = await sb
    .from('profiles')
    .select('id, first_name, last_name, role')
    .in('id', otherIds)
  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.id, p]),
  )

  const result: Conversation[] = []
  for (const [coachId, msgs] of conversationMap) {
    const coach = profileMap.get(coachId)
    const lastMsg = msgs[msgs.length - 1]
    const unread = msgs.filter((m) => m.receiver_id === profileId && !m.is_read).length

    result.push({
      id: coachId,
      coachName: coach ? `Coach ${coach.first_name} ${coach.last_name}` : 'Coach',
      coachId,
      lastMessage: lastMsg?.content ?? '',
      lastMessageAt: lastMsg?.created_at ?? '',
      unreadCount: unread,
      messages: msgs.map((m) => {
        const sender = m.sender_id === profileId ? null : profileMap.get(m.sender_id)
        return {
          id: m.id,
          senderId: m.sender_id,
          senderName: m.sender_id === profileId ? 'You' : sender ? `${sender.first_name} ${sender.last_name}` : 'Coach',
          senderRole: m.sender_id === profileId ? 'parent' as const : 'coach' as const,
          text: m.content,
          timestamp: m.created_at,
        }
      }),
    })
  }

  // Sort by most recent message
  result.sort((a, b) => (a.lastMessageAt < b.lastMessageAt ? 1 : -1))
  return result
}

// ═══════════════════════════════════════════════════════════════════════════════
// COACH QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

/** Coach's assigned students. */
export async function getCoachStudentRoster(profileId: string) {
  if (!supabaseConfigured()) {
    const { mockStudentRoster } = await import('@/lib/mock-data')
    return mockStudentRoster
  }

  const sb = await db()

  const { data: assignments } = await sb
    .from('coach_assignments')
    .select('student_id, track')
    .eq('coach_id', profileId)
    .eq('active', true)

  if (!assignments || assignments.length === 0) return []

  // Group tracks per student
  const studentTracksMap = new Map<string, string[]>()
  for (const a of assignments) {
    const tracks = studentTracksMap.get(a.student_id) ?? []
    tracks.push(a.track)
    studentTracksMap.set(a.student_id, tracks)
  }

  const studentIds = [...studentTracksMap.keys()]
  const { data: profiles } = await sb
    .from('profiles')
    .select('id, first_name, last_name, avatar_url, age_tier')
    .in('id', studentIds)

  if (!profiles) return []

  const results = []
  for (const p of profiles) {
    const { data: xpRows } = await sb
      .from('xp_events')
      .select('xp_amount')
      .eq('student_id', p.id)
    const totalXp = xpRows?.reduce((s, r) => s + r.xp_amount, 0) ?? 0
    const streak = await getStudentStreak(p.id)

    results.push({
      id: p.id,
      firstName: p.first_name,
      lastName: p.last_name,
      avatarUrl: p.avatar_url,
      ageTier: p.age_tier,
      tracks: studentTracksMap.get(p.id) ?? [],
      totalXp,
      streak,
      currentLevel: 1,
      lastActive: 'N/A',
    })
  }

  return results
}

/** Coach sessions. */
export async function getCoachSessions(profileId: string): Promise<CoachSession[]> {
  if (!supabaseConfigured()) {
    const { mockCoachSessions } = await import('@/lib/mock-data')
    return mockCoachSessions
  }

  const sb = await db()

  const { data: sessions } = await sb
    .from('sessions_schedule')
    .select('id, scheduled_at, duration_minutes, location_type, status, track_id, notes')
    .eq('coach_id', profileId)
    .order('scheduled_at', { ascending: false })
    .limit(50)

  if (!sessions) return []

  // Get student links
  const sessionIds = sessions.map((s) => s.id)
  const { data: sessionStudents } = await sb
    .from('session_students')
    .select('session_id, student_id')
    .in('session_id', sessionIds)

  const sessionStudentMap = new Map<string, string[]>()
  for (const ss of sessionStudents ?? []) {
    const list = sessionStudentMap.get(ss.session_id) ?? []
    list.push(ss.student_id)
    sessionStudentMap.set(ss.session_id, list)
  }

  // Get profiles
  const allStudentIds = [...new Set((sessionStudents ?? []).map((ss) => ss.student_id))]
  const { data: profiles } = await sb
    .from('profiles')
    .select('id, first_name, last_name')
    .in('id', allStudentIds.length > 0 ? allStudentIds : ['__none__'])
  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.id, `${p.first_name} ${p.last_name}`]),
  )

  // Track names
  const trackIds = [...new Set(sessions.map((s) => s.track_id))]
  const { data: tracks } = await sb.from('tracks').select('id, name').in('id', trackIds)
  const trackMap = new Map((tracks ?? []).map((t) => [t.id, t.name]))

  return sessions.map((s) => {
    const dt = new Date(s.scheduled_at)
    const studentIds = sessionStudentMap.get(s.id) ?? []
    const studentName = studentIds.map((id) => profileMap.get(id) ?? 'Student').join(', ') || 'TBD'
    return {
      id: s.id,
      date: dt.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: dt.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' }),
      studentName,
      studentId: studentIds[0] ?? '',
      track: (trackMap.get(s.track_id) ?? 'coding') as TrackName,
      status: s.status as 'scheduled' | 'completed' | 'cancelled',
      locationType: s.location_type as 'home' | 'online',
      durationMinutes: s.duration_minutes,
      notes: s.notes,
      studentProgress: null,
    }
  })
}

/** Coach editable notes — recent notes by this coach. */
export async function getCoachEditableNotes(profileId: string) {
  if (!supabaseConfigured()) {
    const { mockCoachEditableNotes } = await import('@/lib/mock-data')
    return mockCoachEditableNotes
  }

  const sb = await db()

  const { data: notes } = await sb
    .from('coach_notes')
    .select('id, student_id, content, updated_at')
    .eq('coach_id', profileId)
    .order('updated_at', { ascending: false })
    .limit(10)

  if (!notes || notes.length === 0) return []

  // Get student names
  const studentIds = [...new Set(notes.map((n) => n.student_id))]
  const { data: profiles } = await sb
    .from('profiles')
    .select('id, first_name, last_name')
    .in('id', studentIds)
  const nameMap = new Map(
    (profiles ?? []).map((p) => [p.id, `${p.first_name} ${p.last_name}`]),
  )

  return notes.map((n) => ({
    id: n.id,
    studentName: nameMap.get(n.student_id) ?? 'Student',
    content: n.content,
    updatedAt: new Date(n.updated_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
  }))
}

/** Coach notes library — all notes by this coach, grouped for filtering. */
export async function getCoachNotesLibrary(profileId: string): Promise<CoachNoteEntry[]> {
  if (!supabaseConfigured()) {
    const { mockCoachNotesLibrary } = await import('@/lib/mock-data')
    return mockCoachNotesLibrary
  }

  const sb = await db()

  const { data: notes } = await sb
    .from('coach_notes')
    .select('id, student_id, track_id, content, created_at')
    .eq('coach_id', profileId)
    .order('created_at', { ascending: false })
    .limit(100)

  if (!notes || notes.length === 0) return []

  // Get student names + tracks
  const studentIds = [...new Set(notes.map((n) => n.student_id))]
  const trackIds = [...new Set(notes.map((n) => n.track_id).filter(Boolean))]

  const { data: profiles } = await sb
    .from('profiles')
    .select('id, first_name, last_name')
    .in('id', studentIds)
  const nameMap = new Map(
    (profiles ?? []).map((p) => [p.id, `${p.first_name} ${p.last_name}`]),
  )

  let trackMap = new Map()
  if (trackIds.length > 0) {
    const { data: tracks } = await sb.from('tracks').select('id, name').in('id', trackIds)
    trackMap = new Map((tracks ?? []).map((t) => [t.id, t.name]))
  }

  return notes.map((n) => ({
    id: n.id,
    studentName: nameMap.get(n.student_id) ?? 'Student',
    studentId: n.student_id,
    date: new Date(n.created_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }),
    track: (n.track_id ? trackMap.get(n.track_id) ?? 'coding' : 'coding') as TrackName,
    content: n.content,
  }))
}

/** Upcoming sessions in the card format used by coach/parent home pages. */
export async function getUpcomingSessions(profileId: string, role: 'coach' | 'student') {
  if (!supabaseConfigured()) {
    const { mockUpcomingSessions } = await import('@/lib/mock-data')
    return mockUpcomingSessions
  }

  const sb = await db()
  const now = new Date().toISOString()

  let sessionIds: string[] = []

  if (role === 'coach') {
    const { data } = await sb
      .from('sessions_schedule')
      .select('id')
      .eq('coach_id', profileId)
      .eq('status', 'scheduled')
      .gte('scheduled_at', now)
      .order('scheduled_at')
      .limit(5)
    sessionIds = (data ?? []).map((s) => s.id)
  } else {
    const { data: links } = await sb
      .from('session_students')
      .select('session_id')
      .eq('student_id', profileId)
    const allIds = (links ?? []).map((l) => l.session_id)
    if (allIds.length > 0) {
      const { data } = await sb
        .from('sessions_schedule')
        .select('id')
        .in('id', allIds)
        .eq('status', 'scheduled')
        .gte('scheduled_at', now)
        .order('scheduled_at')
        .limit(5)
      sessionIds = (data ?? []).map((s) => s.id)
    }
  }

  if (sessionIds.length === 0) return []

  const { data: sessions } = await sb
    .from('sessions_schedule')
    .select('id, scheduled_at, duration_minutes, location_type, coach_id, track_id, notes')
    .in('id', sessionIds)
    .order('scheduled_at')

  if (!sessions) return []

  const coachIds = [...new Set(sessions.map((s) => s.coach_id))]
  const trackIds = [...new Set(sessions.map((s) => s.track_id))]

  const { data: coaches } = await sb.from('profiles').select('id, first_name, last_name').in('id', coachIds)
  const coachMap = new Map((coaches ?? []).map((c) => [c.id, `${c.first_name} ${c.last_name}`]))

  const { data: tracks } = await sb.from('tracks').select('id, name').in('id', trackIds)
  const trackMap = new Map((tracks ?? []).map((t) => [t.id, t.name]))

  return sessions.map((s) => ({
    id: s.id,
    trackName: (trackMap.get(s.track_id) ?? 'coding') as TrackName,
    lessonName: s.notes ?? 'Session',
    coachName: coachMap.get(s.coach_id) ?? 'Coach',
    scheduledAt: s.scheduled_at,
    locationType: s.location_type as 'home' | 'online',
    durationMinutes: s.duration_minutes,
  }))
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

/** Admin KPI stats from real data. */
export async function getAdminKPIs(): Promise<AdminKPI[]> {
  if (!supabaseConfigured()) {
    const { mockAdminKPIs } = await import('@/lib/mock-data')
    return mockAdminKPIs
  }

  const sb = await db()

  const { count: studentCount } = await sb
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'student')
    .eq('approved', true)

  const { count: coachCount } = await sb
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'coach')
    .eq('approved', true)

  const { data: paidInvoices } = await sb
    .from('invoices')
    .select('amount_kes')
    .eq('status', 'paid')
  const totalRevenue = paidInvoices?.reduce((s, i) => s + i.amount_kes, 0) ?? 0

  const { count: sessionCount } = await sb
    .from('sessions_schedule')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'completed')

  return [
    {
      label: 'Active Students',
      value: studentCount ?? 0,
      change: 0,
      changeLabel: 'current',
      trend: 'flat' as const,
      trendIsPositive: true,
    },
    {
      label: 'Monthly Revenue',
      value: `KES ${(totalRevenue).toLocaleString()}`,
      change: 0,
      changeLabel: 'total',
      trend: 'flat' as const,
      trendIsPositive: true,
    },
    {
      label: 'Active Coaches',
      value: coachCount ?? 0,
      change: 0,
      changeLabel: 'current',
      trend: 'flat' as const,
      trendIsPositive: true,
    },
    {
      label: 'Sessions Completed',
      value: sessionCount ?? 0,
      change: 0,
      changeLabel: 'total',
      trend: 'flat' as const,
      trendIsPositive: true,
    },
  ]
}

/** Admin alerts. */
export async function getAdminAlerts(): Promise<AdminAlert[]> {
  if (!supabaseConfigured()) {
    const { mockAdminAlerts } = await import('@/lib/mock-data')
    return mockAdminAlerts
  }

  const sb = await db()
  const { data } = await sb
    .from('alerts')
    .select('*')
    .eq('is_resolved', false)
    .order('created_at', { ascending: false })
    .limit(10)

  return (data ?? []).map((a) => ({
    id: a.id,
    type: a.type,
    severity: a.severity,
    title: a.title,
    description: a.description ?? '',
    entityType: a.entity_type,
    entityId: a.entity_id,
    createdAt: a.created_at,
    isRead: a.is_read,
  }))
}

/** Admin student list. */
export async function getAdminStudents(): Promise<AdminStudentRow[]> {
  if (!supabaseConfigured()) {
    const { mockAdminStudents } = await import('@/lib/mock-data')
    return mockAdminStudents
  }

  const sb = await db()
  const { data: students } = await sb
    .from('profiles')
    .select('id, user_id, first_name, last_name, age_tier, created_at, approved')
    .eq('role', 'student')
    .order('created_at', { ascending: false })

  if (!students) return []

  // Batch-fetch emails from auth.users
  const userIds = students.map((s) => s.user_id)
  const emailMap = await fetchUserEmails(userIds)

  const results: AdminStudentRow[] = []
  for (const s of students) {
    const email = emailMap.get(s.user_id) ?? ''

    // Track assignments
    const { data: assignments } = await sb
      .from('coach_assignments')
      .select('track, coach_id')
      .eq('student_id', s.id)
      .eq('active', true)
    const tracks = (assignments ?? []).map((a) => a.track as TrackName)

    // Coach name
    let coachName = 'Unassigned'
    if (assignments && assignments.length > 0) {
      const { data: coach } = await sb
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', assignments[0].coach_id)
        .single()
      if (coach) coachName = `${coach.first_name} ${coach.last_name}`
    }

    // XP
    const { data: xpRows } = await sb
      .from('xp_events')
      .select('xp_amount')
      .eq('student_id', s.id)
    const totalXp = xpRows?.reduce((sum, r) => sum + r.xp_amount, 0) ?? 0

    results.push({
      id: s.id,
      firstName: s.first_name,
      lastName: s.last_name,
      email,
      ageTier: s.age_tier as AdminStudentRow['ageTier'],
      tracks,
      enrollmentDate: new Date(s.created_at).toISOString().split('T')[0],
      status: s.approved ? 'active' : 'trial',
      lastActive: 'N/A',
      coachName,
      totalXp,
    })
  }

  return results
}

/** Admin coach list. */
export async function getAdminCoaches(): Promise<AdminCoachRow[]> {
  if (!supabaseConfigured()) {
    const { mockAdminCoaches } = await import('@/lib/mock-data')
    return mockAdminCoaches
  }

  const sb = await db()
  const { data: coaches } = await sb
    .from('profiles')
    .select('id, user_id, first_name, last_name, avatar_url, approved')
    .eq('role', 'coach')
    .order('created_at', { ascending: false })

  if (!coaches) return []

  // Batch-fetch emails
  const coachEmailMap = await fetchUserEmails(coaches.map((c) => c.user_id))

  const results: AdminCoachRow[] = []
  for (const c of coaches) {
    const { count: studentCount } = await sb
      .from('coach_assignments')
      .select('id', { count: 'exact', head: true })
      .eq('coach_id', c.id)
      .eq('active', true)

    const { data: assignments } = await sb
      .from('coach_assignments')
      .select('track')
      .eq('coach_id', c.id)
      .eq('active', true)
    const tracks = [...new Set((assignments ?? []).map((a) => a.track as TrackName))]

    results.push({
      id: c.id,
      firstName: c.first_name,
      lastName: c.last_name,
      email: coachEmailMap.get(c.user_id) ?? '',
      avatarUrl: c.avatar_url,
      studentCount: studentCount ?? 0,
      sessionsThisWeek: 0,
      avgRating: 0,
      tracks,
      utilization: 0,
      status: c.approved ? 'active' : 'inactive',
    })
  }

  return results
}

/** Admin sessions. */
export async function getAdminSessions(): Promise<AdminSessionRow[]> {
  if (!supabaseConfigured()) {
    const { mockAdminSessions } = await import('@/lib/mock-data')
    return mockAdminSessions
  }

  const sb = await db()
  const { data: sessions } = await sb
    .from('sessions_schedule')
    .select('id, scheduled_at, duration_minutes, location_type, status, coach_id, track_id, notes')
    .order('scheduled_at', { ascending: false })
    .limit(50)

  if (!sessions) return []

  const coachIds = [...new Set(sessions.map((s) => s.coach_id))]
  const trackIds = [...new Set(sessions.map((s) => s.track_id))]
  const sessionIds = sessions.map((s) => s.id)

  const { data: coaches } = await sb.from('profiles').select('id, first_name, last_name').in('id', coachIds)
  const coachMap = new Map((coaches ?? []).map((c) => [c.id, `${c.first_name} ${c.last_name}`]))

  const { data: tracks } = await sb.from('tracks').select('id, name').in('id', trackIds)
  const trackMap = new Map((tracks ?? []).map((t) => [t.id, t.name]))

  const { data: sessionStudents } = await sb
    .from('session_students')
    .select('session_id, student_id')
    .in('session_id', sessionIds)

  const sessionStudentMap = new Map<string, string[]>()
  for (const ss of sessionStudents ?? []) {
    const list = sessionStudentMap.get(ss.session_id) ?? []
    list.push(ss.student_id)
    sessionStudentMap.set(ss.session_id, list)
  }

  const allStudentIds = [...new Set((sessionStudents ?? []).map((ss) => ss.student_id))]
  const { data: studentProfiles } = await sb
    .from('profiles')
    .select('id, first_name, last_name')
    .in('id', allStudentIds.length > 0 ? allStudentIds : ['__none__'])
  const studentMap = new Map(
    (studentProfiles ?? []).map((p) => [p.id, `${p.first_name} ${p.last_name}`]),
  )

  return sessions.map((s) => {
    const studentIds = sessionStudentMap.get(s.id) ?? []
    return {
      id: s.id,
      coachName: coachMap.get(s.coach_id) ?? 'Coach',
      studentNames: studentIds.map((id) => studentMap.get(id) ?? 'Student'),
      trackName: (trackMap.get(s.track_id) ?? 'coding') as TrackName,
      lessonName: s.notes ?? 'Session',
      scheduledAt: s.scheduled_at,
      durationMinutes: s.duration_minutes,
      locationType: s.location_type as 'home' | 'online',
      status: s.status as AdminSessionRow['status'],
    }
  })
}

/** Admin revenue data. */
export async function getAdminRevenue() {
  if (!supabaseConfigured()) {
    const { mockRevenueByTrack, mockMonthlyRevenue, mockAdminInvoices, mockAdminKPIs } =
      await import('@/lib/mock-data')
    return {
      revenueByTrack: mockRevenueByTrack,
      monthlyRevenue: mockMonthlyRevenue,
      invoices: mockAdminInvoices,
      mrrKpi: mockAdminKPIs[1],
    }
  }

  const sb = await db()

  // Invoices
  const { data: invoices } = await sb
    .from('invoices')
    .select('id, invoice_number, amount_kes, status, due_date, paid_at, parent_id')
    .order('created_at', { ascending: false })
    .limit(50)

  // Parent names
  const parentIds = [...new Set((invoices ?? []).map((i) => i.parent_id).filter(Boolean))] as string[]
  const { data: parents } = await sb.from('profiles').select('id, first_name, last_name').in('id', parentIds.length > 0 ? parentIds : ['__none__'])
  const parentMap = new Map((parents ?? []).map((p) => [p.id, `${p.first_name} ${p.last_name}`]))

  const mappedInvoices: AdminInvoiceRow[] = (invoices ?? []).map((i) => ({
    id: i.id,
    invoiceNumber: i.invoice_number,
    parentName: i.parent_id ? parentMap.get(i.parent_id) ?? 'Unknown' : 'Unknown',
    amountKes: i.amount_kes,
    status: i.status as AdminInvoiceRow['status'],
    dueDate: i.due_date,
    paidAt: i.paid_at,
  }))

  const totalRevenue = (invoices ?? [])
    .filter((i) => i.status === 'paid')
    .reduce((s, i) => s + i.amount_kes, 0)

  return {
    revenueByTrack: [] as AdminRevenueByTrack[],
    monthlyRevenue: [] as SparklinePoint[],
    invoices: mappedInvoices,
    mrrKpi: {
      label: 'Total Revenue',
      value: `KES ${totalRevenue.toLocaleString()}`,
      change: 0,
      changeLabel: 'total',
      trend: 'flat' as const,
      trendIsPositive: true,
    },
  }
}

/** Fetch the latest progress report draft/sent for a student, or return null. */
export async function getProgressReportForStudent(studentId: string, coachId: string) {
  if (!supabaseConfigured()) return null

  const sb = await db()

  const { data } = await sb
    .from('progress_reports')
    .select('id, period, status, report_data, created_at')
    .eq('student_id', studentId)
    .eq('coach_id', coachId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!data) return null

  return {
    id: data.id as string,
    reportData: data.report_data as Record<string, unknown>,
    period: data.period as string,
    status: data.status as string,
  }
}

/** Admin sparkline data. (Needs historical aggregation — returns empty for now.) */
export async function getAdminSparklines() {
  if (!supabaseConfigured()) {
    const {
      mockEnrollmentSparkline,
      mockRevenueSparkline,
      mockEngagementSparkline,
    } = await import('@/lib/mock-data')
    return {
      enrollment: mockEnrollmentSparkline,
      revenue: mockRevenueSparkline,
      engagement: mockEngagementSparkline,
    }
  }
  return {
    enrollment: [] as SparklinePoint[],
    revenue: [] as SparklinePoint[],
    engagement: [] as SparklinePoint[],
  }
}

/** Curriculum tree for admin management. */
export async function getCurriculumTree(): Promise<CurriculumNode[]> {
  if (!supabaseConfigured()) {
    const { mockCurriculumTree } = await import('@/lib/mock-data')
    return mockCurriculumTree
  }

  const sb = await db()

  const { data: tracks } = await sb.from('tracks').select('id, name, icon').order('name')
  if (!tracks) return []

  const result: CurriculumNode[] = []

  for (const track of tracks) {
    const { data: levels } = await sb
      .from('levels')
      .select('id, name, level_order')
      .eq('track_id', track.id)
      .order('level_order')

    const levelNodes: CurriculumNode[] = []
    for (const level of levels ?? []) {
      const { data: modules } = await sb
        .from('modules')
        .select('id, name, module_order, lesson_count')
        .eq('level_id', level.id)
        .order('module_order')

      const moduleNodes: CurriculumNode[] = []
      for (const mod of modules ?? []) {
        const { data: lessons } = await sb
          .from('lessons')
          .select('id, name, lesson_order, content_type, duration_minutes')
          .eq('module_id', mod.id)
          .order('lesson_order')

        moduleNodes.push({
          id: mod.id,
          name: mod.name,
          type: 'module',
          order: mod.module_order,
          meta: { lessons: mod.lesson_count },
          children: (lessons ?? []).map((l) => ({
            id: l.id,
            name: l.name,
            type: 'lesson' as const,
            order: l.lesson_order,
            meta: { type: l.content_type, duration: l.duration_minutes },
          })),
        })
      }

      levelNodes.push({
        id: level.id,
        name: level.name,
        type: 'level',
        order: level.level_order,
        children: moduleNodes,
      })
    }

    result.push({
      id: track.id,
      name: `${track.icon} ${track.name.charAt(0).toUpperCase() + track.name.slice(1)}`,
      type: 'track',
      order: 0,
      children: levelNodes,
    })
  }

  return result
}

/** Admin settings — pricing plans, templates, platform settings. */
export async function getAdminSettings() {
  if (!supabaseConfigured()) {
    const { mockPricingPlans, mockNotificationTemplates, mockPlatformSettings } =
      await import('@/lib/mock-data')
    return {
      pricingPlans: mockPricingPlans,
      notificationTemplates: mockNotificationTemplates,
      platformSettings: mockPlatformSettings,
    }
  }

  const sb = await db()

  const { data: plans } = await sb.from('pricing_plans').select('*').order('price_kes')
  const { data: templates } = await sb.from('notification_templates').select('*').order('name')
  const { data: settings } = await sb.from('platform_settings').select('*')

  return {
    pricingPlans: (plans ?? []).map((p) => ({
      id: p.id,
      name: p.name,
      priceKes: p.price_kes,
      billingPeriod: p.billing_period,
      track: p.track,
      isActive: p.is_active,
      features: p.features,
    })),
    notificationTemplates: (templates ?? []).map((t) => ({
      id: t.id,
      name: t.name,
      subject: t.subject,
      channel: t.channel,
      isActive: t.is_active,
    })),
    platformSettings: (settings ?? []).map((s) => ({
      key: s.key,
      value: typeof s.value === 'object' ? JSON.stringify(s.value) : String(s.value),
      description: s.description ?? '',
    })),
  }
}
