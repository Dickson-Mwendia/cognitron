import { requireRole } from '@/lib/auth'
import { getCoachStudentRoster, getProgressReportForStudent } from '@/lib/queries'
import type { ProgressReportData } from '@/lib/mock-data'
import { ProgressReportEditor } from '@/components/dashboard/ProgressReportEditor'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return { title: 'Progress Report' }
}

export default async function CoachStudentReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await requireRole(['coach'])
  const { id } = await params

  const roster = await getCoachStudentRoster(user.id)
  const student = roster.find((s) => s.id === id)
  if (!student) notFound()

  const trackNames: Record<string, string> = {
    coding: 'Coding',
    ai: 'AI & ML',
    chess: 'Chess',
  }

  // Try loading an existing report
  const existing = await getProgressReportForStudent(student.id, user.id)

  const reportData: ProgressReportData = existing?.reportData
    ? {
        ...(existing.reportData as unknown as ProgressReportData),
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        coachName: `${user.firstName} ${user.lastName}`,
      }
    : {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        ageTier: student.ageTier ?? 'N/A',
        enrolledTracks: student.tracks.map((t) => trackNames[t] ?? t),
        enrollmentDate: '',
        coachName: `${user.firstName} ${user.lastName}`,
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
      backHref={`/coach/students/${student.id}`}
      backLabel={`Back to ${student.firstName}'s Dashboard`}
    />
  )
}
