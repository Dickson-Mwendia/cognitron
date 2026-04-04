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

// ---------------------------------------------------------------------------
// Admin dashboard types
// ---------------------------------------------------------------------------

export interface AdminKPI {
  label: string
  value: string | number
  change: number
  changeLabel: string
  trend: 'up' | 'down' | 'flat'
  trendIsPositive: boolean
}

export interface AdminAlert {
  id: string
  type: 'churn_risk' | 'payment_failed' | 'low_engagement' | 'no_show' | 'system'
  severity: 'info' | 'warning' | 'critical'
  title: string
  description: string
  entityType: string | null
  entityId: string | null
  createdAt: string
  isRead: boolean
}

export interface AdminStudentRow {
  id: string
  firstName: string
  lastName: string
  email: string
  ageTier: AgeTier | null
  tracks: TrackName[]
  enrollmentDate: string
  status: 'active' | 'trial' | 'churned' | 'paused'
  lastActive: string
  coachName: string
  totalXp: number
}

export interface AdminCoachRow {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl: string | null
  studentCount: number
  sessionsThisWeek: number
  avgRating: number
  tracks: TrackName[]
  utilization: number
  status: 'active' | 'inactive'
}

export interface AdminRevenueByTrack {
  track: TrackName | 'bundle'
  mrr: number
  students: number
  percentage: number
}

export interface AdminInvoiceRow {
  id: string
  invoiceNumber: string
  parentName: string
  amountKes: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  dueDate: string
  paidAt: string | null
}

export interface AdminSessionRow {
  id: string
  coachName: string
  studentNames: string[]
  trackName: TrackName
  lessonName: string
  scheduledAt: string
  durationMinutes: number
  locationType: 'home' | 'online'
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
}

export interface CurriculumNode {
  id: string
  name: string
  type: 'track' | 'level' | 'module' | 'lesson'
  order: number
  children?: CurriculumNode[]
  meta?: Record<string, string | number>
}

export interface SparklinePoint {
  label: string
  value: number
}
