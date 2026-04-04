import type { Metadata } from 'next'
import { requireAuth } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Schedule | Cognitron',
}

export default async function SchedulePage() {
  await requireAuth()

  return (
    <ComingSoon
      title="My Schedule"
      description="View your upcoming sessions and manage your learning calendar."
      icon={Calendar}
      backHref="/dashboard"
      backLabel="Back to Dashboard"
    />
  )
}
