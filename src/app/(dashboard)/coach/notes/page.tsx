import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Student Notes | Cognitron',
}

export default async function CoachNotesPage() {
  await requireRole(['coach'])

  return (
    <ComingSoon
      title="Student Notes"
      description="Your notes library — track observations and progress for all your students."
      icon={FileText}
      backHref="/coach"
      backLabel="Back to Coach Dashboard"
    />
  )
}
