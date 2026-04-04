import type { Metadata } from 'next'
import { requireRole } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { CreditCard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Billing & Payments | Cognitron',
}

export default async function BillingPage() {
  await requireRole(['parent'])

  return (
    <ComingSoon
      title="Billing & Payments"
      description="Manage invoices, payment history, and subscription details."
      icon={CreditCard}
      backHref="/parent"
      backLabel="Back to Parent Dashboard"
    />
  )
}
