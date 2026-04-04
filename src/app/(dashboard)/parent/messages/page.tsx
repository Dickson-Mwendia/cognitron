import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Messages | Cognitron',
}

export default async function MessagesPage() {
  await requireRole(['parent'])

  return (
    <ComingSoon
      title="Messages"
      description="Communicate directly with your children's coaches and stay updated on progress."
      icon={MessageSquare}
      backHref="/parent"
      backLabel="Back to Parent Dashboard"
    />
  )
}
