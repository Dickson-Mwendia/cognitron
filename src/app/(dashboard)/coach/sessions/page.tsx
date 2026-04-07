import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { getCoachSessions } from '@/lib/queries'
import { CoachSessionsClient } from '@/components/dashboard/CoachSessionsClient'

export const metadata: Metadata = {
  title: 'Session Management | Cognitron',
}

export default async function CoachSessionsPage() {
  const user = await requireRole(['coach'])
  const sessions = await getCoachSessions(user.id)

  const upcoming = sessions.filter((s) => s.status === 'scheduled').length
  const completed = sessions.filter((s) => s.status === 'completed').length
  const cancelled = sessions.filter((s) => s.status === 'cancelled').length

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          Session Management
        </h1>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          View, manage, and review your teaching sessions.
        </p>
      </div>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-teal/30">
          <p className="text-3xl font-bold text-[#2a9d8f]">{upcoming}</p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Upcoming</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-navy/20">
          <p className="text-3xl font-bold text-[#0c1b33]">{completed}</p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Completed</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-coral/30">
          <p className="text-3xl font-bold text-[#e8614d]">{cancelled}</p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Cancelled</p>
        </div>
      </section>

      <CoachSessionsClient sessions={sessions} />
    </div>
  )
}
