import { requireRole } from '@/lib/auth'
import {
  getCoachStudentRoster,
  getUpcomingSessions,
  getCoachEditableNotes,
} from '@/lib/queries'
import { SessionCard } from '@/components/dashboard/SessionCard'
import { CoachNoteEditor } from '@/components/dashboard/CoachNoteEditor'
import StudentRosterClient from './StudentRosterClient'

export const metadata = { title: 'Coach Dashboard' }

export default async function CoachDashboard() {
  const user = await requireRole(['coach'])
  const studentRoster = await getCoachStudentRoster(user.id)
  const upcomingSessions = await getUpcomingSessions(user.id, 'coach')
  const editableNotes = await getCoachEditableNotes(user.id)

  const totalStudents = studentRoster.length
  const sessionsThisWeek = upcomingSessions.length
  const avgXp = totalStudents > 0
    ? Math.round(studentRoster.reduce((sum, s) => sum + s.totalXp, 0) / totalStudents)
    : 0

  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
        Welcome, Coach {user.firstName}
      </h1>

      {/* ── Quick Stats ── */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-navy/20">
          <p className="text-3xl font-bold text-[#0c1b33]">{totalStudents}</p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Total Students</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-teal/30">
          <p className="text-3xl font-bold text-[#2a9d8f]">
            {sessionsThisWeek}
          </p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Sessions This Week</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-gold/30">
          <p className="text-3xl font-bold text-[#d4a843]">
            {avgXp.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Average XP</p>
        </div>
      </section>

      {/* ── Student Roster (client component with search/filter) ── */}
      <StudentRosterClient students={studentRoster} />

      {/* ── Upcoming Sessions ── */}
      <section>
        <h2 className="font-heading text-xl font-bold text-[#0c1b33] mb-4">
          Upcoming Sessions
        </h2>
        <div className="space-y-3">
          {upcomingSessions.map((session: { id: string; trackName: string; lessonName: string; coachName: string; scheduledAt: string; locationType: 'home' | 'online'; durationMinutes: number }) => (
            <SessionCard
              key={session.id}
              trackName={session.trackName}
              lessonName={session.lessonName}
              coachName={session.coachName}
              scheduledAt={session.scheduledAt}
              locationType={session.locationType}
              durationMinutes={session.durationMinutes}
              variant="compact"
            />
          ))}
        </div>
      </section>
      {/* ── Session Notes (inline editing) ── */}
      <CoachNoteEditor notes={editableNotes} />
    </div>
  )
}
