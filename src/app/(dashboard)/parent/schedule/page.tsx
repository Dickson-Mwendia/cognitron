import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { getParentFamilySessions } from '@/lib/queries'
import { ParentScheduleClient } from '@/components/dashboard/ParentScheduleClient'

export const metadata: Metadata = {
  title: 'Family Schedule | Cognitron',
}

export default async function ParentSchedulePage() {
  const user = await requireRole(['parent'])
  const familySessions = await getParentFamilySessions(user.id)

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#0c1b33] md:text-3xl">
          Family Schedule
        </h1>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          All your children&apos;s upcoming sessions in one view.
        </p>
      </div>

      <ParentScheduleClient sessions={familySessions} />
    </div>
  )
}
