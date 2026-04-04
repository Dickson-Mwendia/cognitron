import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Availability | Cognitron',
}

export default async function CoachSchedulePage() {
  await requireRole(['coach'])

  return (
    <ComingSoon
      title="My Availability"
      description="Set your available times so students and parents can book sessions with you."
      icon={Calendar}
      backHref="/coach"
      backLabel="Back to Coach Dashboard"
    />
  )
}
