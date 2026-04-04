export * from './database'
import type { UserRole, AgeTier, TrackName, SessionLocationType } from './database'

export interface DashboardUser {
  id: string
  email: string
  role: UserRole
  firstName: string
  lastName: string
  avatarUrl: string | null
  ageTier: AgeTier | null
}

export interface TrackProgress {
  trackId: string
  trackName: TrackName
  currentLevel: number
  currentLevelName: string
  totalXp: number
  levelXp: number
  xpToNextLevel: number
  completedLessons: number
  totalLessons: number
  progressPercent: number
}

export interface StudentDashboardData {
  user: DashboardUser
  tracks: TrackProgress[]
  streak: number
  totalXp: number
  currentLevel: number
  recentAchievements: Array<{
    id: string
    name: string
    icon: string
    earnedAt: string
  }>
  nextSession: {
    id: string
    trackName: TrackName
    lessonName: string
    coachName: string
    scheduledAt: string
    locationType: SessionLocationType
    durationMinutes: number
  } | null
  xpThisWeek: number
}
