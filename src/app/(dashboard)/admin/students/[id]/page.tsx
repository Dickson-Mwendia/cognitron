import { requireRole } from '@/lib/auth'
import {
  mockAdminStudents,
  mockStudentDashboard,
  mockTracks,
  mockRecentActivity,
  mockStreakDays,
  mockStreakCount,
  mockAchievements,
} from '@/lib/mock-data'
import { StudentDashboardView } from '@/components/dashboard/StudentDashboardView'
import { ViewingAsBanner } from '@/components/dashboard/ViewingAsBanner'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const student = mockAdminStudents.find((s) => s.id === id)
  return { title: student ? `${student.firstName} ${student.lastName}` : 'Student' }
}

export default async function AdminStudentDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireRole(['admin'])
  const { id } = await params

  const student = mockAdminStudents.find((s) => s.id === id)
  if (!student) notFound()

  // In production, fetch real student data by id. For now, use shared mock data.
  const data = {
    ...mockStudentDashboard,
    user: {
      ...mockStudentDashboard.user,
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      ageTier: student.ageTier,
    },
  }

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
        tracks={mockTracks}
        achievements={mockAchievements}
        recentActivity={mockRecentActivity}
        streakDays={mockStreakDays}
        streakCount={mockStreakCount}
        viewOnly
      />
    </div>
  )
}
