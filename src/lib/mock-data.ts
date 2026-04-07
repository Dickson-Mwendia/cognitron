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
  CoachSession,
  CoachNoteEntry,
  ParentChild,
  Conversation,
  ParentReport,
  BillingData,
  StudentScheduleSession,
  TrackInfo,
} from '@/types'

// ---------------------------------------------------------------------------
// Mock users
// ---------------------------------------------------------------------------

export const mockStudent: DashboardUser = {
  id: '1',
  email: 'amara@example.com',
  role: 'student',
  firstName: 'Amara',
  lastName: 'Kamau',
  avatarUrl: null,
  ageTier: '9-12',
  approved: true,
  createdAt: '2025-06-01T10:00:00Z',
}

export const mockParent: DashboardUser = {
  id: '2',
  email: 'fatima@example.com',
  role: 'parent',
  firstName: 'Fatima',
  lastName: 'Kamau',
  avatarUrl: null,
  ageTier: null,
  approved: true,
  createdAt: '2025-06-01T10:00:00Z',
}

export const mockCoach: DashboardUser = {
  id: '3',
  email: 'david@cognitron.tech',
  role: 'coach',
  firstName: 'David',
  lastName: 'Mutua',
  avatarUrl: null,
  ageTier: null,
  approved: true,
  createdAt: '2025-05-15T08:00:00Z',
}

export const mockAdmin: DashboardUser = {
  id: '4',
  email: 'dickson@cognitron.tech',
  role: 'admin',
  firstName: 'Dickson',
  lastName: 'Ochieng',
  avatarUrl: null,
  ageTier: null,
  approved: true,
  createdAt: '2025-04-01T08:00:00Z',
}

// ---------------------------------------------------------------------------
// Pending approval users (for admin approvals page)
// ---------------------------------------------------------------------------

export const mockPendingUsers = [
  {
    id: 'pending-1',
    firstName: 'Grace',
    lastName: 'Wanjiru',
    email: 'grace.wanjiru@gmail.com',
    role: 'parent' as const,
    signedUpAt: '2026-04-03',
  },
  {
    id: 'pending-2',
    firstName: 'Kevin',
    lastName: 'Otieno',
    email: 'kevin.otieno@outlook.com',
    role: 'parent' as const,
    signedUpAt: '2026-04-02',
  },
  {
    id: 'pending-3',
    firstName: 'Akinyi',
    lastName: 'Odera',
    email: 'akinyi.odera@yahoo.com',
    role: 'student' as const,
    signedUpAt: '2026-04-01',
  },
  {
    id: 'pending-4',
    firstName: 'Brian',
    lastName: 'Njoroge',
    email: 'brian.njoroge@gmail.com',
    role: 'parent' as const,
    signedUpAt: '2026-03-30',
  },
]

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
    lastName: 'Kamau',
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
    lastName: 'Kamau',
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
  { id: 's1', firstName: 'Amara', lastName: 'Kamau', avatarUrl: null, ageTier: '9-12' as const, tracks: ['coding', 'ai', 'chess'] as const, totalXp: 5390, streak: 5, currentLevel: 11, lastActive: '2 hours ago' },
  { id: 's2', firstName: 'Jabari', lastName: 'Kamau', avatarUrl: null, ageTier: '9-12' as const, tracks: ['coding', 'chess'] as const, totalXp: 3200, streak: 3, currentLevel: 8, lastActive: '1 day ago' },
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
// Coach view — editable session notes
// ---------------------------------------------------------------------------

export const mockCoachEditableNotes = [
  {
    id: 'cn1',
    studentName: 'Amara Kamau',
    content: 'Excellent progress on Python functions today. She independently wrote a reusable function with parameters and return values. Next session: introduce list comprehensions.',
    updatedAt: '2 hours ago',
  },
  {
    id: 'cn2',
    studentName: 'Jabari Kamau',
    content: 'Working on chess opening repertoire. Jabari is strong with the Italian Game but needs more practice with the Sicilian Defense. Assigned 3 puzzles for homework.',
    updatedAt: '1 day ago',
  },
  {
    id: 'cn3',
    studentName: 'Wanjiku Kamau',
    content: 'Started the ML Playground module. Wanjiku grasped supervised vs unsupervised learning quickly. She asked great questions about bias in training data — very engaged.',
    updatedAt: '3 days ago',
  },
  {
    id: 'cn4',
    studentName: 'Nia Mwangi',
    content: 'Nia was a bit distracted today. We reviewed ScratchJr basics and she completed 2 motion block exercises. Consider shorter sessions (45 min) to maintain focus.',
    updatedAt: '5 days ago',
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
  { id: 'al2', type: 'payment_failed', severity: 'warning', title: 'Payment failed: Kamau family', description: 'M-Pesa payment of KES 12,000 failed. Invoice #INV-2025-042 is now overdue.', entityType: 'invoice', entityId: 'inv3', createdAt: new Date(Date.now() - 7200000).toISOString(), isRead: false },
  { id: 'al3', type: 'low_engagement', severity: 'warning', title: 'Low engagement: Chess track', description: 'Chess track has 23% lower completion than average this week.', entityType: 'track', entityId: 'chess', createdAt: new Date(Date.now() - 86400000).toISOString(), isRead: true },
  { id: 'al4', type: 'no_show', severity: 'info', title: 'No-show: Jabari Kamau', description: 'Missed scheduled coding session on Monday.', entityType: 'student', entityId: 's2', createdAt: new Date(Date.now() - 172800000).toISOString(), isRead: true },
  { id: 'al5', type: 'system', severity: 'info', title: 'New signup: Wanjiru family', description: 'Trial started. 2 students enrolled in coding + chess.', entityType: 'student', entityId: 's5', createdAt: new Date(Date.now() - 259200000).toISOString(), isRead: true },
]

// ---------------------------------------------------------------------------
// Admin Student Table
// ---------------------------------------------------------------------------

export const mockAdminStudents: AdminStudentRow[] = [
  { id: 's1', firstName: 'Amara', lastName: 'Kamau', email: 'amara@example.com', ageTier: '9-12', tracks: ['coding', 'ai', 'chess'], enrollmentDate: '2025-03-01', status: 'active', lastActive: '2 hours ago', coachName: 'David Mutua', totalXp: 5390 },
  { id: 's2', firstName: 'Jabari', lastName: 'Kamau', email: 'jabari@example.com', ageTier: '9-12', tracks: ['coding', 'chess'], enrollmentDate: '2025-03-01', status: 'active', lastActive: '1 day ago', coachName: 'David Mutua', totalXp: 3200 },
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
  { id: 'inv1', invoiceNumber: 'INV-2025-038', parentName: 'Fatima Kamau', amountKes: 24000, status: 'paid', dueDate: '2025-06-15', paidAt: '2025-06-14' },
  { id: 'inv2', invoiceNumber: 'INV-2025-039', parentName: 'Alice Kamau', amountKes: 18000, status: 'paid', dueDate: '2025-06-15', paidAt: '2025-06-15' },
  { id: 'inv3', invoiceNumber: 'INV-2025-042', parentName: 'Fatima Kamau', amountKes: 12000, status: 'overdue', dueDate: '2025-07-01', paidAt: null },
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

// ---------------------------------------------------------------------------
// Progress Report
// ---------------------------------------------------------------------------

export interface ProgressReportData {
  studentId: string
  studentName: string
  ageTier: string
  enrolledTracks: string[]
  enrollmentDate: string
  coachName: string
  period: string
  periodStart: string
  periodEnd: string
  overallAssessment: string
  trackProgress: Array<{
    trackName: string
    currentLevel: string
    skills: Array<{ name: string; demonstrated: boolean }>
    strengths: string
    improvements: string
    projects: string[]
  }>
  attendance: {
    sessionsAttended: number
    sessionsTotal: number
    engagementRating: number
  }
  achievementsEarned: Array<{ id: string; name: string; icon: string; earnedAt: string }>
  goalsForNextPeriod: string
  coachNotes: string
  recommendations: string
}

export const mockProgressReport: ProgressReportData = {
  studentId: 's1',
  studentName: 'Amara Kamau',
  ageTier: '9-12',
  enrolledTracks: ['Coding', 'AI & ML', 'Chess'],
  enrollmentDate: '2025-03-01',
  coachName: 'David Mutua',
  period: 'Term 1: Jan–Mar 2026',
  periodStart: '2026-01-06',
  periodEnd: '2026-03-28',
  overallAssessment:
    'Amara has had an outstanding term. She consistently demonstrates curiosity and persistence across all three tracks. Her problem-solving skills have matured significantly — she now independently decomposes complex tasks and systematically debugs her work. She is a positive influence on peers during group activities.',
  trackProgress: [
    {
      trackName: 'Coding',
      currentLevel: 'Level 5 — Bridge to Text Coding',
      skills: [
        { name: 'Sequential logic', demonstrated: true },
        { name: 'Loop constructs (for/while)', demonstrated: true },
        { name: 'Variable assignment & types', demonstrated: true },
        { name: 'Function definition', demonstrated: true },
        { name: 'Debugging strategies', demonstrated: true },
        { name: 'List operations', demonstrated: false },
        { name: 'File I/O basics', demonstrated: false },
      ],
      strengths:
        'Amara shows strong intuition for control flow. She independently wrote a reusable function with parameters and return values during her last session. Her code is well-structured for her age group.',
      improvements:
        'She occasionally struggles with data type conversions and could benefit from more practice with list/array manipulation before progressing to data structures.',
      projects: [
        'Mad Libs Generator (Python)',
        'Number Guessing Game',
        'Personal Homepage (HTML/CSS)',
      ],
    },
    {
      trackName: 'AI & ML',
      currentLevel: 'Level 3 — ML Playground',
      skills: [
        { name: 'Supervised vs unsupervised learning', demonstrated: true },
        { name: 'Training data concepts', demonstrated: true },
        { name: 'Bias awareness', demonstrated: true },
        { name: 'Image classification', demonstrated: false },
        { name: 'Model evaluation basics', demonstrated: false },
      ],
      strengths:
        'Amara grasped the concept of supervised vs unsupervised learning quickly and asked insightful questions about bias in training data. She connects AI concepts to real-world scenarios naturally.',
      improvements:
        'The mathematical foundations for model evaluation (accuracy, precision) need reinforcement. Recommend integrating more visual and hands-on examples.',
      projects: [
        'Teachable Machine — Pet Classifier',
        'AI Ethics Poster (class presentation)',
      ],
    },
    {
      trackName: 'Chess',
      currentLevel: 'Level 4 — Tactical Mastery',
      skills: [
        { name: 'Opening principles', demonstrated: true },
        { name: 'Basic tactics (pins, forks)', demonstrated: true },
        { name: 'Piece development', demonstrated: true },
        { name: 'Endgame strategy (K+R vs K)', demonstrated: true },
        { name: 'Tournament preparation', demonstrated: false },
        { name: 'Time management (clock play)', demonstrated: false },
      ],
      strengths:
        'Amara has developed a solid opening repertoire with the Italian Game. Her tactical awareness has improved markedly — she now spots pins and forks within 2-3 moves.',
      improvements:
        'Endgame technique needs more work, particularly King and Pawn endings. She sometimes rushes her moves when under time pressure.',
      projects: [
        'Completed 50+ tactical puzzles on Lichess',
        'Participated in internal mini-tournament (3rd place)',
      ],
    },
  ],
  attendance: {
    sessionsAttended: 34,
    sessionsTotal: 36,
    engagementRating: 5,
  },
  achievementsEarned: [
    { id: 'a1', name: 'First Code', icon: '🚀', earnedAt: '2025-03-15' },
    { id: 'a2', name: 'Bug Squasher', icon: '🐛', earnedAt: '2025-04-20' },
    { id: 'a3', name: 'Chess Knight', icon: '♞', earnedAt: '2025-05-01' },
    { id: 'a4', name: 'AI Explorer', icon: '🤖', earnedAt: '2025-04-10' },
    { id: 'a5', name: 'Week Warrior', icon: '🔥', earnedAt: '2025-06-01' },
  ],
  goalsForNextPeriod:
    'Complete Python Level 5 and begin Level 6 (Data Structures). Achieve a stable chess rating of 800+ on Lichess. Complete the Image Classification module in AI. Participate in at least one external coding competition.',
  coachNotes:
    'Amara is one of the most engaged students in the programme. She often stays after sessions to ask additional questions. I recommend moving her to the advanced group for chess next term. Her parents are supportive and responsive to session feedback. Consider her for the "Student Ambassador" role if the programme launches one.',
  recommendations:
    'Continue all three tracks next term. Increase session frequency for chess from 1x to 2x per week to capitalise on her rapid improvement. Introduce pair programming sessions with an older peer to stretch her coding abilities. Schedule a parent meeting mid-term to discuss long-term pathway (she shows potential for competitive programming).',
}

// ===========================================================================
// NEW DASHBOARD MOCK DATA
// ===========================================================================

// ---------------------------------------------------------------------------
// Coach Sessions (15 sessions — mix of past/upcoming, different tracks/students)
// ---------------------------------------------------------------------------

export const mockCoachSessions: CoachSession[] = [
  { id: 'cs1', date: '2025-07-21', time: '09:00', studentName: 'Amara Kamau', studentId: 's1', track: 'coding', status: 'scheduled', locationType: 'home', durationMinutes: 90, notes: null, studentProgress: null },
  { id: 'cs2', date: '2025-07-21', time: '14:00', studentName: 'Wanjiku Kamau', studentId: 's3', track: 'ai', status: 'scheduled', locationType: 'online', durationMinutes: 90, notes: null, studentProgress: null },
  { id: 'cs3', date: '2025-07-22', time: '10:00', studentName: 'Jabari Kamau', studentId: 's2', track: 'chess', status: 'scheduled', locationType: 'home', durationMinutes: 60, notes: null, studentProgress: null },
  { id: 'cs4', date: '2025-07-22', time: '15:00', studentName: 'Nia Mwangi', studentId: 's4', track: 'coding', status: 'scheduled', locationType: 'home', durationMinutes: 60, notes: null, studentProgress: null },
  { id: 'cs5', date: '2025-07-23', time: '09:00', studentName: 'Kofi Asante', studentId: 's5', track: 'coding', status: 'scheduled', locationType: 'online', durationMinutes: 90, notes: null, studentProgress: null },
  { id: 'cs6', date: '2025-07-23', time: '14:00', studentName: 'Zuri Odhiambo', studentId: 's6', track: 'ai', status: 'scheduled', locationType: 'online', durationMinutes: 90, notes: null, studentProgress: null },
  { id: 'cs7', date: '2025-07-24', time: '10:00', studentName: 'Aisha Hassan', studentId: 's9', track: 'coding', status: 'scheduled', locationType: 'home', durationMinutes: 90, notes: null, studentProgress: null },
  { id: 'cs8', date: '2025-07-18', time: '09:00', studentName: 'Amara Kamau', studentId: 's1', track: 'coding', status: 'completed', locationType: 'home', durationMinutes: 90, notes: 'Excellent progress on Python functions. Independently wrote a reusable function with parameters and return values.', studentProgress: 'Moved from Level 4 to Level 5. Ready for list comprehensions next session.' },
  { id: 'cs9', date: '2025-07-17', time: '14:00', studentName: 'Wanjiku Kamau', studentId: 's3', track: 'ai', status: 'completed', locationType: 'online', durationMinutes: 90, notes: 'Covered supervised vs unsupervised learning. Wanjiku asked great questions about bias in training data.', studentProgress: 'Grasped key concepts quickly. Ready for image classification module.' },
  { id: 'cs10', date: '2025-07-16', time: '10:00', studentName: 'Jabari Kamau', studentId: 's2', track: 'chess', status: 'completed', locationType: 'home', durationMinutes: 60, notes: 'Practiced Italian Game opening. Jabari is getting more confident with piece development.', studentProgress: 'Improving tactical awareness. Needs more work on endgame strategy.' },
  { id: 'cs11', date: '2025-07-15', time: '15:00', studentName: 'Nia Mwangi', studentId: 's4', track: 'coding', status: 'cancelled', locationType: 'home', durationMinutes: 60, notes: 'Student unwell. Rescheduled to next week.', studentProgress: null },
  { id: 'cs12', date: '2025-07-14', time: '09:00', studentName: 'Kofi Asante', studentId: 's5', track: 'coding', status: 'completed', locationType: 'online', durationMinutes: 90, notes: 'Introduced ScratchJr. Kofi was very excited about creating his first animation.', studentProgress: 'Completed Motion Blocks module. Good understanding of sequences.' },
  { id: 'cs13', date: '2025-07-14', time: '14:00', studentName: 'Zuri Odhiambo', studentId: 's6', track: 'chess', status: 'completed', locationType: 'home', durationMinutes: 60, notes: 'Worked on endgame strategy — King and Rook vs King. Zuri finding it challenging but persisting.', studentProgress: 'Endgame needs reinforcement. Schedule extra practice puzzles.' },
  { id: 'cs14', date: '2025-07-12', time: '10:00', studentName: 'Amara Kamau', studentId: 's1', track: 'ai', status: 'completed', locationType: 'home', durationMinutes: 90, notes: 'Built a pet classifier with Teachable Machine. Amara loved seeing the model learn from her photos.', studentProgress: 'Excellent engagement. Moving to ML Playground module next.' },
  { id: 'cs15', date: '2025-07-11', time: '14:00', studentName: 'Aisha Hassan', studentId: 's9', track: 'coding', status: 'completed', locationType: 'online', durationMinutes: 90, notes: 'Functions & Modules lesson. Aisha is progressing well through Bridge to Text Coding.', studentProgress: 'Completed Functions module. Ready for file I/O basics.' },
]

// ---------------------------------------------------------------------------
// Coach Notes Library (10+ notes across students/tracks)
// ---------------------------------------------------------------------------

export const mockCoachNotesLibrary: CoachNoteEntry[] = [
  { id: 'cnl1', studentName: 'Amara Kamau', studentId: 's1', date: '2025-07-18', track: 'coding', content: 'Excellent progress on Python functions today. She independently wrote a reusable function with parameters and return values. Her code structure is remarkably clean for her age group. Next session: introduce list comprehensions and basic data structures.' },
  { id: 'cnl2', studentName: 'Amara Kamau', studentId: 's1', date: '2025-07-12', track: 'ai', content: 'Built a pet classifier with Teachable Machine. Amara was fascinated by the training process and asked insightful questions about how the model "learns". She connected AI concepts to everyday life — mentioned how YouTube recommendations work similarly.' },
  { id: 'cnl3', studentName: 'Jabari Kamau', studentId: 's2', date: '2025-07-16', track: 'chess', content: 'Practiced Italian Game opening. Jabari is getting more confident with piece development. His tactical awareness has improved — he now spots basic pins within 2 moves. Needs more practice with endgame strategy, particularly King and Pawn endings.' },
  { id: 'cnl4', studentName: 'Wanjiku Kamau', studentId: 's3', date: '2025-07-17', track: 'ai', content: 'Covered supervised vs unsupervised learning concepts. Wanjiku asked excellent questions about bias in training data — she brought up examples from social media algorithms. She grasps abstract concepts quickly. Ready for the image classification hands-on module.' },
  { id: 'cnl5', studentName: 'Nia Mwangi', studentId: 's4', date: '2025-07-10', track: 'coding', content: 'Reviewed ScratchJr basics. Nia completed 2 motion block exercises but was a bit distracted today. Consider shorter sessions (45 min) to maintain focus. She responds well to gamified challenges — use the star reward system next time.' },
  { id: 'cnl6', studentName: 'Kofi Asante', studentId: 's5', date: '2025-07-14', track: 'coding', content: 'Introduced ScratchJr Adventures module. Kofi was incredibly excited about creating his first animation — a cat walking across the screen. His understanding of sequences is solid. He finished the Motion Blocks exercise ahead of time and helped a peer.' },
  { id: 'cnl7', studentName: 'Zuri Odhiambo', studentId: 's6', date: '2025-07-14', track: 'chess', content: 'Worked on endgame strategy — King and Rook vs King. Zuri is finding it challenging but showing good persistence. Assigned 5 endgame puzzles on Lichess for practice. She expressed interest in entering the school chess tournament.' },
  { id: 'cnl8', studentName: 'Aisha Hassan', studentId: 's9', date: '2025-07-11', track: 'coding', content: 'Functions & Modules lesson went very well. Aisha is progressing steadily through Bridge to Text Coding. She wrote a temperature converter function without prompting. Her logical thinking is strong — consider accelerating her curriculum.' },
  { id: 'cnl9', studentName: 'Wanjiku Kamau', studentId: 's3', date: '2025-07-10', track: 'coding', content: 'Wanjiku completed the Variables & Types module. She struggled initially with type conversion (int to string) but understood after working through 3 examples. Assigned practice exercises focusing on string formatting.' },
  { id: 'cnl10', studentName: 'Jabari Kamau', studentId: 's2', date: '2025-07-09', track: 'coding', content: 'Jabari worked on HTML basics today. He built a simple personal webpage with headings, paragraphs, and an image. He was excited to see his page render in the browser. Next: introduce CSS for styling.' },
  { id: 'cnl11', studentName: 'Amara Kamau', studentId: 's1', date: '2025-07-05', track: 'chess', content: 'Tactical training session — focused on forks and pins. Amara solved 8 out of 10 puzzles correctly. Her pattern recognition is improving rapidly. She beat Jabari in a practice game using a knight fork on move 12. Ready for tournament prep.' },
]

// ---------------------------------------------------------------------------
// Parent Children (2 children with different ages/tracks)
// ---------------------------------------------------------------------------

export const mockParentChildren: ParentChild[] = [
  { id: 'pc1', firstName: 'Amara', lastName: 'Kamau', age: 10, avatarUrl: null, enrolledTracks: ['coding', 'ai', 'chess'], currentXp: 5390, streak: 5 },
  { id: 'pc2', firstName: 'Jabari', lastName: 'Kamau', age: 8, avatarUrl: null, enrolledTracks: ['coding', 'chess'], currentXp: 3200, streak: 3 },
]

// ---------------------------------------------------------------------------
// Parent Messages (conversation with coach, 8-10 messages)
// ---------------------------------------------------------------------------

export const mockParentConversations: Conversation[] = [
  {
    id: 'conv1',
    coachName: 'Coach David Mutua',
    coachId: 'coach1',
    lastMessage: 'Amara did brilliantly today! She wrote her first Python function independently.',
    lastMessageAt: '2025-07-18T16:30:00Z',
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'coach1', senderName: 'Coach David', senderRole: 'coach', text: 'Hi Fatima! Just wanted to introduce myself. I\'ll be coaching Amara and Jabari this term. Looking forward to working with them!', timestamp: '2025-07-01T09:00:00Z' },
      { id: 'm2', senderId: 'parent1', senderName: 'Fatima', senderRole: 'parent', text: 'Welcome, Coach David! The children are very excited to start. Amara has been talking about coding all week.', timestamp: '2025-07-01T10:15:00Z' },
      { id: 'm3', senderId: 'coach1', senderName: 'Coach David', senderRole: 'coach', text: 'That\'s wonderful to hear! For our first session on Monday, I\'ll need a laptop or tablet for Amara. Jabari can start with paper-based activities for chess.', timestamp: '2025-07-01T11:00:00Z' },
      { id: 'm4', senderId: 'parent1', senderName: 'Fatima', senderRole: 'parent', text: 'We have a laptop ready. What time should we expect you?', timestamp: '2025-07-01T11:30:00Z' },
      { id: 'm5', senderId: 'coach1', senderName: 'Coach David', senderRole: 'coach', text: 'I\'ll be there at 9am sharp. Sessions run 90 minutes for coding and 60 minutes for chess. See you Monday!', timestamp: '2025-07-01T12:00:00Z' },
      { id: 'm6', senderId: 'parent1', senderName: 'Fatima', senderRole: 'parent', text: 'Perfect. One question — Amara has been doing some Scratch on her own. Should she continue or wait for your guidance?', timestamp: '2025-07-03T08:00:00Z' },
      { id: 'm7', senderId: 'coach1', senderName: 'Coach David', senderRole: 'coach', text: 'Definitely encourage her! Self-directed exploration is fantastic. I\'ll assess where she is on Monday and tailor the curriculum accordingly. If she\'s already comfortable with Scratch, we might move to Python sooner.', timestamp: '2025-07-03T09:30:00Z' },
      { id: 'm8', senderId: 'parent1', senderName: 'Fatima', senderRole: 'parent', text: 'How did today\'s session go? Amara seemed very happy when she came out.', timestamp: '2025-07-18T15:00:00Z' },
      { id: 'm9', senderId: 'coach1', senderName: 'Coach David', senderRole: 'coach', text: 'Amara did brilliantly today! She wrote her first Python function independently. I\'m really impressed with her progress — she\'s one of the fastest learners I\'ve worked with at her age.', timestamp: '2025-07-18T16:30:00Z' },
    ],
  },
  {
    id: 'conv2',
    coachName: 'Coach Sarah Njeri',
    coachId: 'coach2',
    lastMessage: 'Jabari\'s chess is improving nicely. He beat two opponents in practice today!',
    lastMessageAt: '2025-07-16T17:00:00Z',
    unreadCount: 0,
    messages: [
      { id: 'm10', senderId: 'coach2', senderName: 'Coach Sarah', senderRole: 'coach', text: 'Hello Fatima! I\'m Sarah, Jabari\'s chess coach. We had a great first session today.', timestamp: '2025-07-07T16:00:00Z' },
      { id: 'm11', senderId: 'parent1', senderName: 'Fatima', senderRole: 'parent', text: 'Hi Coach Sarah! Jabari told me he learned about the Italian Game. He\'s been setting up the board and practising at home!', timestamp: '2025-07-07T18:00:00Z' },
      { id: 'm12', senderId: 'coach2', senderName: 'Coach Sarah', senderRole: 'coach', text: 'That\'s excellent! Home practice makes a huge difference. I\'ve set up a Lichess account for him — I\'ll send the login details. He can do puzzles between sessions.', timestamp: '2025-07-08T09:00:00Z' },
      { id: 'm13', senderId: 'coach2', senderName: 'Coach Sarah', senderRole: 'coach', text: 'Jabari\'s chess is improving nicely. He beat two opponents in practice today! His opening game is solid. We\'ll focus on endgame strategy next.', timestamp: '2025-07-16T17:00:00Z' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Parent Progress Reports (3-4 reports across children/terms)
// ---------------------------------------------------------------------------

export const mockParentReports: ParentReport[] = [
  { id: 'pr1', childName: 'Amara Kamau', childId: 'pc1', period: 'Term 1: Jan–Mar 2025', overallRating: 5, dateGenerated: '2025-04-05', summary: 'Outstanding term. Amara consistently demonstrates curiosity and persistence across all three tracks. Problem-solving skills have matured significantly.' },
  { id: 'pr2', childName: 'Amara Kamau', childId: 'pc1', period: 'Term 2: Apr–Jun 2025', overallRating: 5, dateGenerated: '2025-07-05', summary: 'Exceptional progress. Moved from Scratch to Python coding. Built 3 independent projects. Chess rating improved from 500 to 750 on Lichess.' },
  { id: 'pr3', childName: 'Jabari Kamau', childId: 'pc2', period: 'Term 1: Jan–Mar 2025', overallRating: 4, dateGenerated: '2025-04-05', summary: 'Strong start. Jabari shows natural talent for chess and enjoys the competitive element. Coding progress is steady — he completed the ScratchJr module.' },
  { id: 'pr4', childName: 'Jabari Kamau', childId: 'pc2', period: 'Term 2: Apr–Jun 2025', overallRating: 4, dateGenerated: '2025-07-05', summary: 'Good progress across both tracks. Chess opening repertoire is developing well. Started HTML basics in coding and built his first webpage. Recommend adding AI track next term.' },
]

// ---------------------------------------------------------------------------
// Billing Data
// ---------------------------------------------------------------------------

export const mockBillingData: BillingData = {
  plan: {
    childrenEnrolled: 2,
    sessionsPerWeek: 5,
    monthlyTotalKes: 33000,
    planName: 'Family Bundle',
  },
  payments: [
    { id: 'pay1', date: '2025-07-01', amountKes: 33000, mpesaRef: 'QJK7B2TXRM', status: 'paid' },
    { id: 'pay2', date: '2025-06-01', amountKes: 33000, mpesaRef: 'PLM4N8WVCS', status: 'paid' },
    { id: 'pay3', date: '2025-05-01', amountKes: 33000, mpesaRef: 'RHT6D3FXKP', status: 'paid' },
    { id: 'pay4', date: '2025-04-01', amountKes: 33000, mpesaRef: 'WBN9G5JYMA', status: 'paid' },
    { id: 'pay5', date: '2025-03-01', amountKes: 24000, mpesaRef: 'XCF2K7LQDS', status: 'paid' },
    { id: 'pay6', date: '2025-08-01', amountKes: 33000, mpesaRef: '', status: 'pending' },
  ],
  outstandingBalanceKes: 33000,
  nextPayment: {
    dueDate: '2025-08-01',
    amountKes: 33000,
  },
}

// ---------------------------------------------------------------------------
// Student Schedule (5 upcoming + 5 past sessions)
// ---------------------------------------------------------------------------

export const mockStudentSchedule: StudentScheduleSession[] = [
  { id: 'ss1', date: '2025-07-21', time: '09:00', track: 'coding', coachName: 'Coach David', locationType: 'home', lessonName: 'Python Lists & Loops', isPast: false },
  { id: 'ss2', date: '2025-07-22', time: '14:00', track: 'chess', coachName: 'Coach Sarah', locationType: 'home', lessonName: 'Endgame Strategy', isPast: false },
  { id: 'ss3', date: '2025-07-24', time: '09:00', track: 'ai', coachName: 'Coach David', locationType: 'online', lessonName: 'Image Classification', isPast: false },
  { id: 'ss4', date: '2025-07-28', time: '09:00', track: 'coding', coachName: 'Coach David', locationType: 'home', lessonName: 'Data Structures Intro', isPast: false },
  { id: 'ss5', date: '2025-07-29', time: '14:00', track: 'chess', coachName: 'Coach Sarah', locationType: 'home', lessonName: 'Tournament Prep', isPast: false },
  { id: 'ss6', date: '2025-07-18', time: '09:00', track: 'coding', coachName: 'Coach David', locationType: 'home', lessonName: 'Python Functions', isPast: true },
  { id: 'ss7', date: '2025-07-17', time: '14:00', track: 'ai', coachName: 'Coach David', locationType: 'online', lessonName: 'ML Playground Intro', isPast: true },
  { id: 'ss8', date: '2025-07-15', time: '14:00', track: 'chess', coachName: 'Coach Sarah', locationType: 'home', lessonName: 'Tactical Puzzles', isPast: true },
  { id: 'ss9', date: '2025-07-14', time: '09:00', track: 'coding', coachName: 'Coach David', locationType: 'home', lessonName: 'Print & Input', isPast: true },
  { id: 'ss10', date: '2025-07-12', time: '09:00', track: 'ai', coachName: 'Coach David', locationType: 'home', lessonName: 'Teachable Machine', isPast: true },
]

// ---------------------------------------------------------------------------
// Track Info (for browsing all tracks)
// ---------------------------------------------------------------------------

export const mockTrackInfo: TrackInfo[] = [
  {
    id: 'track-coding',
    name: 'coding',
    title: 'Coding',
    description: 'Learn to code from scratch! Start with visual programming in ScratchJr, progress through Python, and build real projects including websites and apps. By the end, you\'ll have a portfolio to show off.',
    icon: '💻',
    tiers: ['Explorers (ages 5–9)', 'Builders (ages 10–13)', 'Innovators (ages 14–17)'],
    moduleCount: 24,
    enrolled: true,
    accentColor: '#2a9d8f',
  },
  {
    id: 'track-ai',
    name: 'ai',
    title: 'AI & Machine Learning',
    description: 'Discover how artificial intelligence works! Train your own models, build image classifiers, and learn about the ethics of AI. No prior coding experience needed for the first tier.',
    icon: '🤖',
    tiers: ['AI Explorers (ages 8–11)', 'AI Builders (ages 11–14)', 'AI Innovators (ages 14–17)'],
    moduleCount: 18,
    enrolled: true,
    accentColor: '#e8614d',
  },
  {
    id: 'track-chess',
    name: 'chess',
    title: 'Chess',
    description: 'Master the royal game! Learn openings, tactics, and strategy from beginner to tournament level. Includes Lichess integration for practice between sessions and KCF tournament preparation.',
    icon: '♟️',
    tiers: ['Learn (ages 5–8)', 'Play (ages 9–12)', 'Compete (ages 12–15)', 'Excel (ages 15–17)'],
    moduleCount: 20,
    enrolled: true,
    accentColor: '#d4a843',
  },
]
