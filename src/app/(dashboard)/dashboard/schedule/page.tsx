import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { getStudentSchedule } from '@/lib/queries'
import { StudentScheduleClient } from '@/components/dashboard/StudentScheduleClient'

export const metadata: Metadata = {
  title: 'My Schedule | Cognitron',
}

export default async function SchedulePage() {
  const user = await requireRole(['student'])
  const schedule = await getStudentSchedule(user.id)

  const upcoming = schedule.filter((s) => !s.isPast)
  const past = schedule.filter((s) => s.isPast)

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          My Schedule
        </h1>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          View your upcoming sessions and recent learning history.
        </p>
      </div>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-teal/30">
          <p className="text-3xl font-bold text-[#2a9d8f]">{upcoming.length}</p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Upcoming</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-navy/20">
          <p className="text-3xl font-bold text-[#0c1b33]">{past.length}</p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Completed</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-gold/30">
          <p className="text-3xl font-bold text-[#d4a843]">{schedule.length}</p>
          <p className="mt-1 text-sm text-[#0c1b33]/50">Total Sessions</p>
        </div>
      </section>

      <StudentScheduleClient upcoming={upcoming} past={past} />
    </div>
  )
}
