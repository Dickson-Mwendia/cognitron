import { requireRole } from '@/lib/auth'
import {
  getAdminStudents,
  getStudentDashboardData,
  getStudentAchievements,
  getStudentRecentActivity,
  getStudentStreakDays,
} from '@/lib/queries'
import { StudentDashboardView } from '@/components/dashboard/StudentDashboardView'
import { ViewingAsBanner } from '@/components/dashboard/ViewingAsBanner'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return { title: 'Student Dashboard' }
}

export default async function AdminStudentDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireRole(['admin'])
  const { id } = await params

  const students = await getAdminStudents()
  const student = students.find((s) => s.id === id)
  if (!student) notFound()

  const studentUser = {
    id: student.id,
    email: student.email,
    role: 'student' as const,
    firstName: student.firstName,
    lastName: student.lastName,
    avatarUrl: null,
    ageTier: student.ageTier,
    approved: true,
    createdAt: student.enrollmentDate,
  }

  const data = await getStudentDashboardData(studentUser)
  const achievements = await getStudentAchievements(student.id)
  const recentActivity = await getStudentRecentActivity(student.id)
  const streakDays = await getStudentStreakDays(student.id)

  return (
    <div className="space-y-6">
      <ViewingAsBanner
        studentName={`${student.firstName} ${student.lastName}`}
        backHref="/admin/students"
        backLabel="Back to Students"
        reportHref={`/admin/students/${student.id}/report`}
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
