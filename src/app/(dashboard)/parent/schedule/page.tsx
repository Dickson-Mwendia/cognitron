import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Family Schedule | Cognitron',
}

export default async function ParentSchedulePage() {
  await requireRole(['parent'])

  return (
    <ComingSoon
      title="Family Schedule"
      description="Calendar view of all your children's upcoming sessions and events."
      icon={Calendar}
      backHref="/parent"
      backLabel="Back to Parent Dashboard"
    />
  )
}
