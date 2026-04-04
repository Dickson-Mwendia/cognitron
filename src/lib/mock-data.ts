import type { TrackProgress, DashboardUser, StudentDashboardData } from '@/types'

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
  email: 'david@cognitron.co.ke',
  role: 'coach',
  firstName: 'David',
  lastName: 'Mutua',
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
