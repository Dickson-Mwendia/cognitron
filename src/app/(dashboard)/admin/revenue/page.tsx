import { requireRole } from '@/lib/auth'
import { mockRevenueByTrack, mockMonthlyRevenue, mockAdminInvoices, mockAdminKPIs } from '@/lib/mock-data'
import AdminRevenueClient from './AdminRevenueClient'

export const metadata = { title: 'Revenue Overview' }

export default async function AdminRevenuePage() {
  await requireRole(['admin'])

  return (
    <AdminRevenueClient
      revenueByTrack={mockRevenueByTrack}
      monthlyRevenue={mockMonthlyRevenue}
      invoices={mockAdminInvoices}
      mrrKpi={mockAdminKPIs[1]}
    />
  )
}
