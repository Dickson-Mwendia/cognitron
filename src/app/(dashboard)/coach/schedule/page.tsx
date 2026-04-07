import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { getCoachSessions } from '@/lib/queries'
import { CoachScheduleClient } from '@/components/dashboard/CoachScheduleClient'

export const metadata: Metadata = {
  title: 'My Availability | Cognitron',
}

export default async function CoachSchedulePage() {
  const user = await requireRole(['coach'])
  const sessions = await getCoachSessions(user.id)

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          Schedule & Availability
        </h1>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          View your weekly schedule and set available time slots.
        </p>
      </div>

      <CoachScheduleClient sessions={sessions} />
    </div>
  )
}
