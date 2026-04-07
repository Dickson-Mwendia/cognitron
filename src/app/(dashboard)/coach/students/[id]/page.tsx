import { requireRole } from '@/lib/auth'
import {
  getCoachStudentRoster,
  getStudentDashboardData,
  getStudentAchievements,
  getStudentRecentActivity,
  getStudentStreakDays,
} from '@/lib/queries'
import { StudentDashboardView } from '@/components/dashboard/StudentDashboardView'
import { ViewingAsBanner } from '@/components/dashboard/ViewingAsBanner'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // Use a simple title since we can't easily pre-fetch
  return { title: 'Student Dashboard' }
}

export default async function CoachStudentDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await requireRole(['coach'])
  const { id } = await params

  const roster = await getCoachStudentRoster(user.id)
  const student = roster.find((s) => s.id === id)
  if (!student) notFound()

  // Build a DashboardUser-like object from the roster entry
  const studentUser = {
    id: student.id,
    email: '',
    role: 'student' as const,
    firstName: student.firstName,
    lastName: student.lastName,
    avatarUrl: student.avatarUrl,
    ageTier: student.ageTier as import('@/types').AgeTier | null,
    approved: true,
  }

  const data = await getStudentDashboardData(studentUser)
  const achievements = await getStudentAchievements(student.id)
  const recentActivity = await getStudentRecentActivity(student.id)
  const streakDays = await getStudentStreakDays(student.id)

  return (
    <div className="space-y-6">
      <ViewingAsBanner
        studentName={`${student.firstName} ${student.lastName}`}
        backHref="/coach"
        backLabel="Back to Roster"
        reportHref={`/coach/students/${student.id}/report`}
      />
      <StudentDashboardView
        data={data}
        tracks={data.tracks}
        achievements={achievements}
        recentActivity={recentActivity}
        streakDays={streakDays}
        streakCount={data.streak}
        viewOnly
      />
    </div>
  )
}
