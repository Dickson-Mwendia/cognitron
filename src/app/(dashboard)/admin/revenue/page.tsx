import { requireRole } from '@/lib/auth'
import { getAdminRevenue } from '@/lib/queries'
import AdminRevenueClient from './AdminRevenueClient'

export const metadata = { title: 'Revenue Overview' }

export default async function AdminRevenuePage() {
  await requireRole(['admin'])
  const revenue = await getAdminRevenue()

  return (
    <AdminRevenueClient
      revenueByTrack={revenue.revenueByTrack}
      monthlyRevenue={revenue.monthlyRevenue}
      invoices={revenue.invoices}
      mrrKpi={revenue.mrrKpi}
    />
  )
}
