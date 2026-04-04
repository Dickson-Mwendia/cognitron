import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Progress Reports | Cognitron',
}

export default async function ReportsPage() {
  await requireRole(['parent'])

  return (
    <ComingSoon
      title="Progress Reports"
      description="Download detailed reports on your children's learning progress and achievements."
      icon={FileText}
      backHref="/parent"
      backLabel="Back to Parent Dashboard"
    />
  )
}
