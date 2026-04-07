import { requireRole } from '@/lib/auth'
import { getAdminStudents, getProgressReportForStudent } from '@/lib/queries'
import type { ProgressReportData } from '@/lib/mock-data'
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
  const user = await requireRole(['admin'])
  const { id } = await params

  const students = await getAdminStudents()
  const student = students.find((s) => s.id === id)
  if (!student) notFound()

  // Try loading an existing report (use admin's profile id as coach for the query)
  const existing = await getProgressReportForStudent(student.id, user.id)

  const reportData: ProgressReportData = existing?.reportData
    ? {
        ...(existing.reportData as unknown as ProgressReportData),
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        coachName: student.coachName,
      }
    : {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        ageTier: student.ageTier ?? 'N/A',
        enrolledTracks: student.tracks.map(
          (t) => ({ coding: 'Coding', ai: 'AI & ML', chess: 'Chess' })[t] ?? t,
        ),
        enrollmentDate: student.enrollmentDate,
        coachName: student.coachName,
        period: '',
        periodStart: '',
        periodEnd: '',
        overallAssessment: '',
        trackProgress: [],
        attendance: { sessionsAttended: 0, sessionsTotal: 0, engagementRating: 3 },
        achievementsEarned: [],
        goalsForNextPeriod: '',
        coachNotes: '',
        recommendations: '',
      }

  return (
    <ProgressReportEditor
      initialData={reportData}
      reportId={existing?.id ?? null}
      backHref={`/admin/students/${student.id}`}
      backLabel={`Back to ${student.firstName}'s Dashboard`}
    />
  )
}
