import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Session Management | Cognitron',
}

export default async function CoachSessionsPage() {
  await requireRole(['coach'])

  return (
    <ComingSoon
      title="Session Management"
      description="View, manage, and prepare for your upcoming teaching sessions."
      icon={Calendar}
      backHref="/coach"
      backLabel="Back to Coach Dashboard"
    />
  )
}
