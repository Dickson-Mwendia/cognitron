import { requireRole } from '@/lib/auth'
import { mockAdminStudents, mockProgressReport } from '@/lib/mock-data'
import { ProgressReportEditor } from '@/components/dashboard/ProgressReportEditor'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const student = mockAdminStudents.find((s) => s.id === id)
  return {
    title: student
      ? `Report — ${student.firstName} ${student.lastName}`
      : 'Progress Report',
  }
}

export default async function AdminStudentReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireRole(['admin'])
  const { id } = await params

  const student = mockAdminStudents.find((s) => s.id === id)
  if (!student) notFound()

  // In production, fetch or create a report for this student.
  // For now, overlay student info onto the shared mock report.
  const reportData = {
    ...mockProgressReport,
    studentId: student.id,
    studentName: `${student.firstName} ${student.lastName}`,
    ageTier: student.ageTier ?? 'N/A',
    enrolledTracks: student.tracks.map(
      (t) => ({ coding: 'Coding', ai: 'AI & ML', chess: 'Chess' })[t] ?? t,
    ),
    enrollmentDate: student.enrollmentDate,
    coachName: student.coachName,
  }

  return (
    <ProgressReportEditor
      initialData={reportData}
      backHref={`/admin/students/${student.id}`}
      backLabel={`Back to ${student.firstName}'s Dashboard`}
    />
  )
}
