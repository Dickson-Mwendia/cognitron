import type {
  TrackProgress,
  DashboardUser,
  StudentDashboardData,
  AdminKPI,
  AdminAlert,
  AdminStudentRow,
  AdminCoachRow,
  AdminRevenueByTrack,
  AdminInvoiceRow,
  AdminSessionRow,
  CurriculumNode,
  SparklinePoint,
} from '@/types'

// ---------------------------------------------------------------------------
// Mock users
// ---------------------------------------------------------------------------

export const mockStudent: DashboardUser = {
  id: '1',
  email: 'amara@example.com',
  role: 'student',
  firstName: 'Amara',
  lastName: 'Okonkwo',
  avatarUrl: null,
  ageTier: '9-12',
}

export const mockParent: DashboardUser = {
  id: '2',
  email: 'fatima@example.com',
  role: 'parent',
  firstName: 'Fatima',
  lastName: 'Okonkwo',
  avatarUrl: null,
  ageTier: null,
}

export const mockCoach: DashboardUser = {
  id: '3',
  email: 'david@cognitron.tech',
  role: 'coach',
  firstName: 'David',
  lastName: 'Mutua',
  avatarUrl: null,
  ageTier: null,
}

export const mockAdmin: DashboardUser = {
  id: '4',
  email: 'dickson@cognitron.tech',
  role: 'admin',
  firstName: 'Dickson',
  lastName: 'Ochieng',
  avatarUrl: null,
  ageTier: null,
}

// ---------------------------------------------------------------------------
// Track progress
// ---------------------------------------------------------------------------

export const mockTracks: TrackProgress[] = [
  {
    trackId: 'coding-1',
    trackName: 'coding',
    currentLevel: 5,
    currentLevelName: 'Bridge to Text Coding',
    totalXp: 2340,
    levelXp: 2340,
    xpToNextLevel: 3000,
    completedLessons: 42,
    totalLessons: 60,
    progressPercent: 78,
  },
  {
    trackId: 'ai-1',
    trackName: 'ai',
    currentLevel: 3,
    currentLevelName: 'ML Playground',
    totalXp: 1200,
    levelXp: 1200,
    xpToNextLevel: 2000,
    completedLessons: 18,
    totalLessons: 48,
    progressPercent: 60,
  },
  {
    trackId: 'chess-1',
    trackName: 'chess',
    currentLevel: 4,
    currentLevelName: 'Tactical Mastery',
    totalXp: 1850,
    levelXp: 1850,
    xpToNextLevel: 2500,
    completedLessons: 30,
    totalLessons: 48,
    progressPercent: 74,
  },
]

// ---------------------------------------------------------------------------
// Achievements
// ---------------------------------------------------------------------------

export const mockAchievements = [
  { id: 'a1', name: 'First Code', description: 'Write your first program', icon: '🚀', category: 'special' as const, trackName: 'coding' as const, earned: true, earnedAt: '2025-03-15' },
  { id: 'a2', name: 'Bug Squasher', description: 'Debug 10 programs successfully', icon: '🐛', category: 'practice' as const, trackName: 'coding' as const, earned: true, earnedAt: '2025-04-20' },
  { id: 'a3', name: 'Chess Knight', description: 'Win 5 chess matches', icon: '♞', category: 'competition' as const, trackName: 'chess' as const, earned: true, earnedAt: '2025-05-01' },
  { id: 'a4', name: 'AI Explorer', description: 'Complete AI Level 1', icon: '🤖', category: 'mastery' as const, trackName: 'ai' as const, earned: true, earnedAt: '2025-04-10' },
  { id: 'a5', name: 'Week Warrior', description: '7-day practice streak', icon: '🔥', category: 'streak' as const, trackName: null, earned: true, earnedAt: '2025-06-01' },
  { id: 'a6', name: 'Speed Demon', description: 'Complete a lesson in record time', icon: '⚡', category: 'speed' as const, trackName: null, earned: false, earnedAt: null, progress: { current: 2, total: 5 } },
  { id: 'a7', name: 'Mentor', description: 'Help a peer with a challenge', icon: '🤝', category: 'mentor' as const, trackName: null, earned: false, earnedAt: null },
  { id: 'a8', name: 'Full Stack', description: 'Complete all coding levels', icon: '🏆', category: 'mastery' as const, trackName: 'coding' as const, earned: false, earnedAt: null },
  { id: 'a9', name: 'Grandmaster', description: 'Reach chess level 10', icon: '👑', category: 'mastery' as const, trackName: 'chess' as const, earned: false, earnedAt: null },
  { id: 'a10', name: 'Month Warrior', description: '30-day practice streak', icon: '💪', category: 'streak' as const, trackName: null, earned: false, earnedAt: null, progress: { current: 12, total: 30 } },
]

// ---------------------------------------------------------------------------
// Sessions & schedule
// ---------------------------------------------------------------------------

export const mockNextSession = {
  id: 's1',
  trackName: 'coding' as const,
  lessonName: 'Python Lists & Loops',
  coachName: 'Coach David',
  coachAvatar: null,
  scheduledAt: new Date(Date.now() + 86400000).toISOString(),
  locationType: 'home' as const,
  durationMinutes: 90,
}

export const mockUpcomingSessions = [
  mockNextSession,
  {
    id: 's2',
    trackName: 'chess' as const,
    lessonName: 'Opening Principles',
    coachName: 'Coach Sarah',
    coachAvatar: null,
    scheduledAt: new Date(Date.now() + 172800000).toISOString(),
    locationType: 'online' as const,
    durationMinutes: 60,
  },
  {
    id: 's3',
    trackName: 'ai' as const,
    lessonName: 'Image Classification',
    coachName: 'Coach James',
    coachAvatar: null,
    scheduledAt: new Date(Date.now() + 345600000).toISOString(),
    locationType: 'home' as const,
    durationMinutes: 90,
  },
]

// ---------------------------------------------------------------------------
// Recent activity
// ---------------------------------------------------------------------------

export const mockRecentActivity = [
  { id: 'act1', type: 'lesson_completed', description: 'Completed Lesson 4.2: CSS Flexbox', xp: 25, timestamp: '2 hours ago', icon: '✅' },
  { id: 'act2', type: 'achievement_earned', description: 'Earned badge: Week Warrior', xp: 50, timestamp: '1 day ago', icon: '🏅' },
  { id: 'act3', type: 'practice_completed', description: 'Solved 3 Python challenges', xp: 30, timestamp: '1 day ago', icon: '🎯' },
  { id: 'act4', type: 'lesson_started', description: 'Started Lesson 5.1: Functions', xp: 0, timestamp: '2 days ago', icon: '📖' },
  { id: 'act5', type: 'xp_bonus', description: 'Streak bonus: 5 days!', xp: 25, timestamp: '3 days ago', icon: '🔥' },
]

// ---------------------------------------------------------------------------
// Streak
// ---------------------------------------------------------------------------

export const mockStreakDays = [
  { day: 'Mon', active: true },
  { day: 'Tue', active: true },
  { day: 'Wed', active: true },
  { day: 'Thu', active: true },
  { day: 'Fri', active: true },
  { day: 'Sat', active: false },
  { day: 'Sun', active: false },
]
export const mockStreakCount = 5

// ---------------------------------------------------------------------------
// Student dashboard (assembled)
// ---------------------------------------------------------------------------

export const mockStudentDashboard: StudentDashboardData = {
  user: mockStudent,
  tracks: mockTracks,
  streak: 5,
  totalXp: 5390,
  currentLevel: 11,
  recentAchievements: mockAchievements
    .filter((a) => a.earned)
    .slice(0, 3)
    .map((a) => ({
      id: a.id,
      name: a.name,
      icon: a.icon,
      earnedAt: a.earnedAt!,
    })),
  nextSession: mockNextSession,
  xpThisWeek: 130,
}

// ---------------------------------------------------------------------------
// Parent view — children
// ---------------------------------------------------------------------------

export const mockChildren = [
  {
    id: 'c1',
    firstName: 'Amara',
    lastName: 'Okonkwo',
    avatarUrl: null,
    ageTier: '9-12' as const,
    tracks: mockTracks,
    streak: 5,
    totalXp: 5390,
    lessonsCompleted: 90,
    currentLevel: 11,
  },
  {
    id: 'c2',
    firstName: 'Jabari',
    lastName: 'Okonkwo',
    avatarUrl: null,
    ageTier: '9-12' as const,
    tracks: [mockTracks[0], mockTracks[2]],
    streak: 3,
    totalXp: 3200,
    lessonsCompleted: 52,
    currentLevel: 8,
  },
]

// ---------------------------------------------------------------------------
// Coach view — student roster
// ---------------------------------------------------------------------------

export const mockStudentRoster = [
  { id: 's1', firstName: 'Amara', lastName: 'Okonkwo', avatarUrl: null, ageTier: '9-12' as const, tracks: ['coding', 'ai', 'chess'] as const, totalXp: 5390, streak: 5, currentLevel: 11, lastActive: '2 hours ago' },
  { id: 's2', firstName: 'Jabari', lastName: 'Okonkwo', avatarUrl: null, ageTier: '9-12' as const, tracks: ['coding', 'chess'] as const, totalXp: 3200, streak: 3, currentLevel: 8, lastActive: '1 day ago' },
  { id: 's3', firstName: 'Wanjiku', lastName: 'Kamau', avatarUrl: null, ageTier: '13-17' as const, tracks: ['coding', 'ai'] as const, totalXp: 7800, streak: 12, currentLevel: 14, lastActive: '3 hours ago' },
  { id: 's4', firstName: 'Nia', lastName: 'Mwangi', avatarUrl: null, ageTier: '5-8' as const, tracks: ['coding', 'chess'] as const, totalXp: 850, streak: 2, currentLevel: 3, lastActive: '5 hours ago' },
]

// ---------------------------------------------------------------------------
// Parent view — coach notes
// ---------------------------------------------------------------------------

export const mockCoachNotes = [
  {
    id: 'n1',
    coachName: 'Coach David',
    date: '2025-06-10',
    text: 'Amara showed excellent problem decomposition today. She independently debugged a loop error in her Python code. Recommend adding 15 minutes of practice between sessions.',
    childName: 'Amara',
    track: 'coding' as const,
  },
  {
    id: 'n2',
    coachName: 'Coach Sarah',
    date: '2025-06-08',
    text: 'Jabari is progressing well in chess. His opening game has improved significantly. Working on endgame strategy next.',
    childName: 'Jabari',
    track: 'chess' as const,
  },
]

// ---------------------------------------------------------------------------
// Curriculum map (coding track)
// ---------------------------------------------------------------------------

export const mockCodingCurriculum = {
  trackName: 'coding' as const,
  currentLevelOrder: 5,
  levels: [
    {
      id: 'l1',
      name: 'My First Code',
      levelOrder: 1,
      badgeEmoji: '🌱',
      completed: true,
      modules: [
        {
          id: 'm1',
          name: 'Thinking Like a Computer',
          moduleOrder: 1,
          lessons: [
            { id: 'ls1', name: 'Sequencing', status: 'completed' as const, score: 95 },
            { id: 'ls2', name: 'Algorithms', status: 'completed' as const, score: 88 },
            { id: 'ls3', name: 'Cause & Effect', status: 'completed' as const, score: 92 },
          ],
        },
        {
          id: 'm2',
          name: 'ScratchJr Adventures',
          moduleOrder: 2,
          lessons: [
            { id: 'ls4', name: 'Characters', status: 'completed' as const, score: 90 },
            { id: 'ls5', name: 'Motion Blocks', status: 'completed' as const, score: 85 },
            { id: 'ls6', name: 'Simple Sequences', status: 'completed' as const, score: 88 },
            { id: 'ls7', name: 'My Story', status: 'completed' as const, score: 94 },
            { id: 'ls8', name: 'Animation Fun', status: 'completed' as const, score: 91 },
          ],
        },
      ],
    },
    {
      id: 'l5',
      name: 'Bridge to Text Coding',
      levelOrder: 5,
      badgeEmoji: '🔨',
      completed: false,
      modules: [
        {
          id: 'm_current',
          name: 'Python First Steps',
          moduleOrder: 1,
          lessons: [
            { id: 'ls_c1', name: 'Print & Input', status: 'completed' as const, score: 90 },
            { id: 'ls_c2', name: 'Variables & Types', status: 'completed' as const, score: 85 },
            { id: 'ls_c3', name: 'Operators', status: 'in_progress' as const, score: null },
            { id: 'ls_c4', name: 'Mad Libs Generator', status: 'not_started' as const, score: null },
          ],
        },
        {
          id: 'm_next1',
          name: 'Decisions & Loops',
          moduleOrder: 2,
          lessons: [
            { id: 'ls_n1', name: 'If/Elif/Else', status: 'not_started' as const, score: null },
            { id: 'ls_n2', name: 'While Loops', status: 'not_started' as const, score: null },
            { id: 'ls_n3', name: 'For Loops', status: 'not_started' as const, score: null },
            { id: 'ls_n4', name: 'Number Guessing Game', status: 'not_started' as const, score: null },
          ],
        },
      ],
    },
  ],
}

// ===========================================================================
// ADMIN DASHBOARD MOCK DATA
// ===========================================================================

// ---------------------------------------------------------------------------
// KPI Cards
// ---------------------------------------------------------------------------

export const mockAdminKPIs: AdminKPI[] = [
  { label: 'Total Students', value: 47, change: 12.5, changeLabel: 'vs last month', trend: 'up', trendIsPositive: true },
  { label: 'Monthly Revenue', value: 'KES 423,500', change: 8.3, changeLabel: 'vs last month', trend: 'up', trendIsPositive: true },
  { label: 'Active Coaches', value: 6, change: 0, changeLabel: 'no change', trend: 'flat', trendIsPositive: true },
  { label: 'Completion Rate', value: '78%', change: -2.1, changeLabel: 'vs last month', trend: 'down', trendIsPositive: false },
]

// ---------------------------------------------------------------------------
// Sparkline data (30 days)
// ---------------------------------------------------------------------------

function generateSparkline(base: number, variance: number, trend: number, count: number): SparklinePoint[] {
  const points: SparklinePoint[] = []
  let seed = 42
  for (let i = 0; i < count; i++) {
    seed = (seed * 16807 + 0) % 2147483647
    const rand = (seed / 2147483647) - 0.5
    points.push({
      label: `Day ${i + 1}`,
      value: Math.max(0, Math.round(base + trend * i + rand * variance)),
    })
  }
  return points
}

export const mockEnrollmentSparkline: SparklinePoint[] = generateSparkline(1, 2, 0.05, 30)
export const mockRevenueSparkline: SparklinePoint[] = generateSparkline(12000, 4000, 200, 30)
export const mockEngagementSparkline: SparklinePoint[] = generateSparkline(70, 15, 0.2, 30)

// ---------------------------------------------------------------------------
// Alerts
// ---------------------------------------------------------------------------

export const mockAdminAlerts: AdminAlert[] = [
  { id: 'al1', type: 'churn_risk', severity: 'critical', title: 'High churn risk: Nia Mwangi', description: 'No activity in 12 days. Last session was cancelled.', entityType: 'student', entityId: 's4', createdAt: new Date(Date.now() - 3600000).toISOString(), isRead: false },
  { id: 'al2', type: 'payment_failed', severity: 'warning', title: 'Payment failed: Okonkwo family', description: 'M-Pesa payment of KES 12,000 failed. Invoice #INV-2025-042 is now overdue.', entityType: 'invoice', entityId: 'inv3', createdAt: new Date(Date.now() - 7200000).toISOString(), isRead: false },
  { id: 'al3', type: 'low_engagement', severity: 'warning', title: 'Low engagement: Chess track', description: 'Chess track has 23% lower completion than average this week.', entityType: 'track', entityId: 'chess', createdAt: new Date(Date.now() - 86400000).toISOString(), isRead: true },
  { id: 'al4', type: 'no_show', severity: 'info', title: 'No-show: Jabari Okonkwo', description: 'Missed scheduled coding session on Monday.', entityType: 'student', entityId: 's2', createdAt: new Date(Date.now() - 172800000).toISOString(), isRead: true },
  { id: 'al5', type: 'system', severity: 'info', title: 'New signup: Wanjiru family', description: 'Trial started. 2 students enrolled in coding + chess.', entityType: 'student', entityId: 's5', createdAt: new Date(Date.now() - 259200000).toISOString(), isRead: true },
]

// ---------------------------------------------------------------------------
// Admin Student Table
// ---------------------------------------------------------------------------

export const mockAdminStudents: AdminStudentRow[] = [
  { id: 's1', firstName: 'Amara', lastName: 'Okonkwo', email: 'amara@example.com', ageTier: '9-12', tracks: ['coding', 'ai', 'chess'], enrollmentDate: '2025-03-01', status: 'active', lastActive: '2 hours ago', coachName: 'David Mutua', totalXp: 5390 },
  { id: 's2', firstName: 'Jabari', lastName: 'Okonkwo', email: 'jabari@example.com', ageTier: '9-12', tracks: ['coding', 'chess'], enrollmentDate: '2025-03-01', status: 'active', lastActive: '1 day ago', coachName: 'David Mutua', totalXp: 3200 },
  { id: 's3', firstName: 'Wanjiku', lastName: 'Kamau', email: 'wanjiku@example.com', ageTier: '13-17', tracks: ['coding', 'ai'], enrollmentDate: '2025-01-15', status: 'active', lastActive: '3 hours ago', coachName: 'Sarah Njeri', totalXp: 7800 },
  { id: 's4', firstName: 'Nia', lastName: 'Mwangi', email: 'nia@example.com', ageTier: '5-8', tracks: ['coding', 'chess'], enrollmentDate: '2025-04-10', status: 'active', lastActive: '12 days ago', coachName: 'James Otieno', totalXp: 850 },
  { id: 's5', firstName: 'Kofi', lastName: 'Asante', email: 'kofi@example.com', ageTier: '9-12', tracks: ['coding'], enrollmentDate: '2025-06-01', status: 'trial', lastActive: '5 hours ago', coachName: 'David Mutua', totalXp: 220 },
  { id: 's6', firstName: 'Zuri', lastName: 'Odhiambo', email: 'zuri@example.com', ageTier: '13-17', tracks: ['ai', 'chess'], enrollmentDate: '2025-02-20', status: 'active', lastActive: '1 day ago', coachName: 'Sarah Njeri', totalXp: 4100 },
  { id: 's7', firstName: 'Imani', lastName: 'Wekesa', email: 'imani@example.com', ageTier: '9-12', tracks: ['coding', 'ai', 'chess'], enrollmentDate: '2024-11-01', status: 'churned', lastActive: '45 days ago', coachName: 'James Otieno', totalXp: 6200 },
  { id: 's8', firstName: 'Baraka', lastName: 'Kimani', email: 'baraka@example.com', ageTier: '5-8', tracks: ['coding'], enrollmentDate: '2025-05-15', status: 'trial', lastActive: '8 hours ago', coachName: 'David Mutua', totalXp: 150 },
  { id: 's9', firstName: 'Aisha', lastName: 'Hassan', email: 'aisha@example.com', ageTier: '13-17', tracks: ['coding', 'ai'], enrollmentDate: '2025-01-10', status: 'active', lastActive: '6 hours ago', coachName: 'Sarah Njeri', totalXp: 5800 },
  { id: 's10', firstName: 'Tendai', lastName: 'Mugo', email: 'tendai@example.com', ageTier: '9-12', tracks: ['chess'], enrollmentDate: '2025-04-01', status: 'paused', lastActive: '20 days ago', coachName: 'James Otieno', totalXp: 1200 },
]

// ---------------------------------------------------------------------------
// Admin Coach Table
// ---------------------------------------------------------------------------

export const mockAdminCoaches: AdminCoachRow[] = [
  { id: 'c1', firstName: 'David', lastName: 'Mutua', email: 'david@cognitron.tech', avatarUrl: null, studentCount: 12, sessionsThisWeek: 8, avgRating: 4.8, tracks: ['coding', 'ai'], utilization: 85, status: 'active' },
  { id: 'c2', firstName: 'Sarah', lastName: 'Njeri', email: 'sarah@cognitron.tech', avatarUrl: null, studentCount: 10, sessionsThisWeek: 7, avgRating: 4.9, tracks: ['coding', 'ai', 'chess'], utilization: 78, status: 'active' },
  { id: 'c3', firstName: 'James', lastName: 'Otieno', email: 'james@cognitron.tech', avatarUrl: null, studentCount: 8, sessionsThisWeek: 5, avgRating: 4.6, tracks: ['chess', 'coding'], utilization: 62, status: 'active' },
  { id: 'c4', firstName: 'Grace', lastName: 'Muthoni', email: 'grace@cognitron.tech', avatarUrl: null, studentCount: 9, sessionsThisWeek: 6, avgRating: 4.7, tracks: ['ai', 'chess'], utilization: 70, status: 'active' },
  { id: 'c5', firstName: 'Peter', lastName: 'Karanja', email: 'peter@cognitron.tech', avatarUrl: null, studentCount: 5, sessionsThisWeek: 3, avgRating: 4.5, tracks: ['coding'], utilization: 45, status: 'active' },
  { id: 'c6', firstName: 'Lucy', lastName: 'Wambui', email: 'lucy@cognitron.tech', avatarUrl: null, studentCount: 3, sessionsThisWeek: 2, avgRating: 4.4, tracks: ['chess'], utilization: 30, status: 'inactive' },
]

// ---------------------------------------------------------------------------
// Revenue data
// ---------------------------------------------------------------------------

export const mockRevenueByTrack: AdminRevenueByTrack[] = [
  { track: 'coding', mrr: 185000, students: 28, percentage: 44 },
  { track: 'ai', mrr: 98000, students: 14, percentage: 23 },
  { track: 'chess', mrr: 72500, students: 12, percentage: 17 },
  { track: 'bundle', mrr: 68000, students: 6, percentage: 16 },
]

export const mockMonthlyRevenue: SparklinePoint[] = [
  { label: 'Jan', value: 280000 },
  { label: 'Feb', value: 305000 },
  { label: 'Mar', value: 342000 },
  { label: 'Apr', value: 368000 },
  { label: 'May', value: 395000 },
  { label: 'Jun', value: 423500 },
]

export const mockAdminInvoices: AdminInvoiceRow[] = [
  { id: 'inv1', invoiceNumber: 'INV-2025-038', parentName: 'Fatima Okonkwo', amountKes: 24000, status: 'paid', dueDate: '2025-06-15', paidAt: '2025-06-14' },
  { id: 'inv2', invoiceNumber: 'INV-2025-039', parentName: 'Alice Kamau', amountKes: 18000, status: 'paid', dueDate: '2025-06-15', paidAt: '2025-06-15' },
  { id: 'inv3', invoiceNumber: 'INV-2025-042', parentName: 'Fatima Okonkwo', amountKes: 12000, status: 'overdue', dueDate: '2025-07-01', paidAt: null },
  { id: 'inv4', invoiceNumber: 'INV-2025-043', parentName: 'Jane Mwangi', amountKes: 9000, status: 'sent', dueDate: '2025-07-15', paidAt: null },
  { id: 'inv5', invoiceNumber: 'INV-2025-044', parentName: 'Rose Asante', amountKes: 9000, status: 'sent', dueDate: '2025-07-15', paidAt: null },
  { id: 'inv6', invoiceNumber: 'INV-2025-045', parentName: 'Mary Odhiambo', amountKes: 15000, status: 'draft', dueDate: '2025-07-15', paidAt: null },
]

// ---------------------------------------------------------------------------
// Admin sessions
// ---------------------------------------------------------------------------

export const mockAdminSessions: AdminSessionRow[] = [
  { id: 'as1', coachName: 'David Mutua', studentNames: ['Amara O.', 'Jabari O.'], trackName: 'coding', lessonName: 'Python Lists & Loops', scheduledAt: new Date(Date.now() + 86400000).toISOString(), durationMinutes: 90, locationType: 'home', status: 'scheduled' },
  { id: 'as2', coachName: 'Sarah Njeri', studentNames: ['Wanjiku K.'], trackName: 'ai', lessonName: 'Image Classification', scheduledAt: new Date(Date.now() + 172800000).toISOString(), durationMinutes: 90, locationType: 'online', status: 'scheduled' },
  { id: 'as3', coachName: 'James Otieno', studentNames: ['Nia M.', 'Tendai M.'], trackName: 'chess', lessonName: 'Opening Principles', scheduledAt: new Date(Date.now() + 259200000).toISOString(), durationMinutes: 60, locationType: 'home', status: 'scheduled' },
  { id: 'as4', coachName: 'Grace Muthoni', studentNames: ['Zuri O.'], trackName: 'ai', lessonName: 'Neural Network Basics', scheduledAt: new Date(Date.now() + 345600000).toISOString(), durationMinutes: 90, locationType: 'online', status: 'scheduled' },
  { id: 'as5', coachName: 'David Mutua', studentNames: ['Kofi A.', 'Baraka K.'], trackName: 'coding', lessonName: 'ScratchJr Adventures', scheduledAt: new Date(Date.now() + 432000000).toISOString(), durationMinutes: 60, locationType: 'home', status: 'scheduled' },
  { id: 'as6', coachName: 'Sarah Njeri', studentNames: ['Aisha H.'], trackName: 'coding', lessonName: 'Functions & Modules', scheduledAt: new Date(Date.now() - 86400000).toISOString(), durationMinutes: 90, locationType: 'home', status: 'completed' },
  { id: 'as7', coachName: 'James Otieno', studentNames: ['Jabari O.'], trackName: 'chess', lessonName: 'Endgame Strategy', scheduledAt: new Date(Date.now() - 172800000).toISOString(), durationMinutes: 60, locationType: 'home', status: 'no_show' },
  { id: 'as8', coachName: 'Peter Karanja', studentNames: ['Amara O.'], trackName: 'coding', lessonName: 'HTML Basics', scheduledAt: new Date(Date.now() - 259200000).toISOString(), durationMinutes: 90, locationType: 'online', status: 'cancelled' },
]

// ---------------------------------------------------------------------------
// Curriculum tree
// ---------------------------------------------------------------------------

export const mockCurriculumTree: CurriculumNode[] = [
  {
    id: 'track-coding', name: 'Coding', type: 'track', order: 1,
    children: [
      {
        id: 'lvl-1', name: 'My First Code', type: 'level', order: 1, meta: { badgeEmoji: '🌱', xpRequired: '500' },
        children: [
          {
            id: 'mod-1', name: 'Thinking Like a Computer', type: 'module', order: 1,
            children: [
              { id: 'les-1', name: 'Sequencing', type: 'lesson', order: 1, meta: { duration: '45', contentType: 'live' } },
              { id: 'les-2', name: 'Algorithms', type: 'lesson', order: 2, meta: { duration: '45', contentType: 'live' } },
              { id: 'les-3', name: 'Cause & Effect', type: 'lesson', order: 3, meta: { duration: '45', contentType: 'practice' } },
            ],
          },
          {
            id: 'mod-2', name: 'ScratchJr Adventures', type: 'module', order: 2,
            children: [
              { id: 'les-4', name: 'Characters', type: 'lesson', order: 1, meta: { duration: '60', contentType: 'live' } },
              { id: 'les-5', name: 'Motion Blocks', type: 'lesson', order: 2, meta: { duration: '60', contentType: 'practice' } },
              { id: 'les-6', name: 'My Story', type: 'lesson', order: 3, meta: { duration: '60', contentType: 'project' } },
            ],
          },
        ],
      },
      {
        id: 'lvl-5', name: 'Bridge to Text Coding', type: 'level', order: 5, meta: { badgeEmoji: '🔨', xpRequired: '3000' },
        children: [
          {
            id: 'mod-c1', name: 'Python First Steps', type: 'module', order: 1,
            children: [
              { id: 'les-c1', name: 'Print & Input', type: 'lesson', order: 1, meta: { duration: '90', contentType: 'live' } },
              { id: 'les-c2', name: 'Variables & Types', type: 'lesson', order: 2, meta: { duration: '90', contentType: 'live' } },
              { id: 'les-c3', name: 'Operators', type: 'lesson', order: 3, meta: { duration: '90', contentType: 'practice' } },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'track-ai', name: 'AI & ML', type: 'track', order: 2,
    children: [
      {
        id: 'lvl-ai1', name: 'AI Explorers', type: 'level', order: 1, meta: { badgeEmoji: '🤖', xpRequired: '500' },
        children: [
          {
            id: 'mod-ai1', name: 'What is AI?', type: 'module', order: 1,
            children: [
              { id: 'les-ai1', name: 'AI Around Us', type: 'lesson', order: 1, meta: { duration: '60', contentType: 'live' } },
              { id: 'les-ai2', name: 'Teaching Machines', type: 'lesson', order: 2, meta: { duration: '60', contentType: 'practice' } },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'track-chess', name: 'Chess', type: 'track', order: 3,
    children: [
      {
        id: 'lvl-ch1', name: 'Learn', type: 'level', order: 1, meta: { badgeEmoji: '♟️', xpRequired: '500' },
        children: [
          {
            id: 'mod-ch1', name: 'The Board & Pieces', type: 'module', order: 1,
            children: [
              { id: 'les-ch1', name: 'Setting Up', type: 'lesson', order: 1, meta: { duration: '45', contentType: 'live' } },
              { id: 'les-ch2', name: 'How Pieces Move', type: 'lesson', order: 2, meta: { duration: '45', contentType: 'live' } },
            ],
          },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Pricing plans (for settings page)
// ---------------------------------------------------------------------------

export const mockPricingPlans = [
  { id: 'pp1', name: 'Coding Explorer', priceKes: 9000, billingPeriod: 'monthly' as const, track: 'coding' as const, isActive: true, features: ['4 sessions/month', '1-on-1 coaching', 'Practice platform access'] },
  { id: 'pp2', name: 'AI Builder', priceKes: 9000, billingPeriod: 'monthly' as const, track: 'ai' as const, isActive: true, features: ['4 sessions/month', '1-on-1 coaching', 'AI lab access'] },
  { id: 'pp3', name: 'Chess Champion', priceKes: 7500, billingPeriod: 'monthly' as const, track: 'chess' as const, isActive: true, features: ['4 sessions/month', '1-on-1 coaching', 'Tournament prep'] },
  { id: 'pp4', name: 'Full Bundle', priceKes: 22000, billingPeriod: 'monthly' as const, track: 'bundle' as const, isActive: true, features: ['12 sessions/month', 'All 3 tracks', 'Priority scheduling', '10% discount'] },
  { id: 'pp5', name: 'Term Bundle', priceKes: 58000, billingPeriod: 'termly' as const, track: 'bundle' as const, isActive: true, features: ['48 sessions/term', 'All 3 tracks', 'Priority scheduling', '15% discount'] },
]

// ---------------------------------------------------------------------------
// Notification templates (for settings page)
// ---------------------------------------------------------------------------

export const mockNotificationTemplates = [
  { id: 'nt1', name: 'Welcome Email', subject: 'Welcome to Cognitron! 🚀', channel: 'email' as const, isActive: true },
  { id: 'nt2', name: 'Session Reminder', subject: 'Your session is tomorrow', channel: 'whatsapp' as const, isActive: true },
  { id: 'nt3', name: 'Payment Reminder', subject: 'Invoice due soon', channel: 'email' as const, isActive: true },
  { id: 'nt4', name: 'Weekly Progress', subject: "This week's progress report", channel: 'email' as const, isActive: true },
  { id: 'nt5', name: 'Re-engagement', subject: 'We miss you!', channel: 'whatsapp' as const, isActive: false },
]

// ---------------------------------------------------------------------------
// Platform settings
// ---------------------------------------------------------------------------

export const mockPlatformSettings = [
  { key: 'platform_name', value: 'Cognitron', description: 'Platform display name' },
  { key: 'support_email', value: 'hello@cognitron.tech', description: 'Support email address' },
  { key: 'support_whatsapp', value: '+254700000000', description: 'WhatsApp support number' },
  { key: 'trial_days', value: '14', description: 'Free trial duration in days' },
  { key: 'max_students_per_coach', value: '15', description: 'Maximum students per coach' },
  { key: 'session_booking_lead_hours', value: '24', description: 'Minimum hours before session booking' },
]
