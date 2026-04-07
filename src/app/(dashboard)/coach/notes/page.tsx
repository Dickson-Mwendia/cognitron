import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { getCoachNotesLibrary } from '@/lib/queries'
import { CoachNotesLibraryClient } from '@/components/dashboard/CoachNotesLibraryClient'

export const metadata: Metadata = {
  title: 'Student Notes | Cognitron',
}

export default async function CoachNotesPage() {
  const user = await requireRole(['coach'])
  const notesLibrary = await getCoachNotesLibrary(user.id)

  const uniqueStudents = [...new Set(notesLibrary.map((n) => n.studentName))].sort()
  const uniqueTracks = [...new Set(notesLibrary.map((n) => n.track))].length

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          Student Notes Library
        </h1>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          Your notes library — track observations and progress for all your students.
        </p>
      </div>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md">
          <p className="text-3xl font-bold text-[#0c1b33]">{notesLibrary.length}</p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Total Notes</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md">
          <p className="text-3xl font-bold text-[#2a9d8f]">{uniqueStudents.length}</p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Students</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md">
          <p className="text-3xl font-bold text-[#d4a843]">{uniqueTracks}</p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Tracks</p>
        </div>
      </section>

      <CoachNotesLibraryClient notes={notesLibrary} studentNames={uniqueStudents} />
    </div>
  )
}
