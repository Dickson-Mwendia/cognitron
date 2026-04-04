import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Manage Children | Cognitron',
}

export default async function ChildrenPage() {
  await requireRole(['parent'])

  return (
    <ComingSoon
      title="Manage Children"
      description="View and manage your enrolled children's profiles and learning paths."
      icon={Users}
      backHref="/parent"
      backLabel="Back to Parent Dashboard"
    />
  )
}
