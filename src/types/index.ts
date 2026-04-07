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
  approved: boolean
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

// ---------------------------------------------------------------------------
// Coach session management types
// ---------------------------------------------------------------------------

export interface CoachSession {
  id: string
  date: string
  time: string
  studentName: string
  studentId: string
  track: TrackName
  status: 'scheduled' | 'completed' | 'cancelled'
  locationType: 'home' | 'online'
  durationMinutes: number
  notes: string | null
  studentProgress: string | null
}

// ---------------------------------------------------------------------------
// Coach notes library types
// ---------------------------------------------------------------------------

export interface CoachNoteEntry {
  id: string
  studentName: string
  studentId: string
  date: string
  track: TrackName
  content: string
}

// ---------------------------------------------------------------------------
// Parent children management types
// ---------------------------------------------------------------------------

export interface ParentChild {
  id: string
  firstName: string
  lastName: string
  age: number
  avatarUrl: string | null
  enrolledTracks: TrackName[]
  currentXp: number
  streak: number
}

// ---------------------------------------------------------------------------
// Parent messages types
// ---------------------------------------------------------------------------

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: 'parent' | 'coach'
  text: string
  timestamp: string
}

export interface Conversation {
  id: string
  coachName: string
  coachId: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  messages: Message[]
}

// ---------------------------------------------------------------------------
// Parent progress reports types
// ---------------------------------------------------------------------------

export interface ParentReport {
  id: string
  childName: string
  childId: string
  period: string
  overallRating: number
  dateGenerated: string
  summary: string
}

// ---------------------------------------------------------------------------
// Billing types
// ---------------------------------------------------------------------------

export interface BillingPlanSummary {
  childrenEnrolled: number
  sessionsPerWeek: number
  monthlyTotalKes: number
  planName: string
}

export interface PaymentRecord {
  id: string
  date: string
  amountKes: number
  mpesaRef: string
  status: 'paid' | 'pending' | 'overdue'
}

export interface BillingData {
  plan: BillingPlanSummary
  payments: PaymentRecord[]
  outstandingBalanceKes: number
  nextPayment: {
    dueDate: string
    amountKes: number
  }
}

// ---------------------------------------------------------------------------
// Student schedule types
// ---------------------------------------------------------------------------

export interface StudentScheduleSession {
  id: string
  date: string
  time: string
  track: TrackName
  coachName: string
  locationType: 'home' | 'online'
  lessonName: string
  isPast: boolean
}

// ---------------------------------------------------------------------------
// Track browse types
// ---------------------------------------------------------------------------

export interface TrackInfo {
  id: string
  name: TrackName
  title: string
  description: string
  icon: string
  tiers: string[]
  moduleCount: number
  enrolled: boolean
  accentColor: string
}

// ---------------------------------------------------------------------------
// Chess puzzle types
// ---------------------------------------------------------------------------

export interface ChessPuzzle {
  id: string
  fen: string
  moves: string[]  // UCI format, first move is setup, rest are solution
  rating: number
  themes: string[]
  popularity: number
}

export interface PuzzleAttempt {
  puzzleId: string
  solved: boolean
  timeMs: number
  ratingBefore: number
  ratingAfter: number
}

export interface ChessPlayerStats {
  rating: number
  puzzlesSolved: number
  puzzlesAttempted: number
  currentStreak: number
  bestStreak: number
  totalXpEarned: number
}
