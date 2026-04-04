import { requireRole } from '@/lib/auth'
import { mockStudentRoster, mockProgressReport } from '@/lib/mock-data'
import { ProgressReportEditor } from '@/components/dashboard/ProgressReportEditor'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const student = mockStudentRoster.find((s) => s.id === id)
  return {
    title: student
      ? `Report — ${student.firstName} ${student.lastName}`
      : 'Progress Report',
  }
}

export default async function CoachStudentReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireRole(['coach'])
  const { id } = await params

  const student = mockStudentRoster.find((s) => s.id === id)
  if (!student) notFound()

  const trackNames: Record<string, string> = {
    coding: 'Coding',
    ai: 'AI & ML',
    chess: 'Chess',
  }

  const reportData = {
    ...mockProgressReport,
    studentId: student.id,
    studentName: `${student.firstName} ${student.lastName}`,
    ageTier: student.ageTier ?? 'N/A',
    enrolledTracks: student.tracks.map((t) => trackNames[t] ?? t),
    coachName: 'David Mutua',
  }

  return (
    <ProgressReportEditor
      initialData={reportData}
      backHref={`/coach/students/${student.id}`}
      backLabel={`Back to ${student.firstName}'s Dashboard`}
    />
  )
}
