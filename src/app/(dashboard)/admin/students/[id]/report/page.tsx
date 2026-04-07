import { requireRole } from '@/lib/auth'
import { getAdminStudents } from '@/lib/queries'
import { mockProgressReport } from '@/lib/mock-data'
import { ProgressReportEditor } from '@/components/dashboard/ProgressReportEditor'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return { title: 'Progress Report' }
}

export default async function AdminStudentReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireRole(['admin'])
  const { id } = await params

  const students = await getAdminStudents()
  const student = students.find((s) => s.id === id)
  if (!student) notFound()

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
