import { requireRole } from '@/lib/auth'
import {
  mockAdminKPIs,
  mockAdminAlerts,
  mockEnrollmentSparkline,
  mockRevenueSparkline,
  mockEngagementSparkline,
  mockAdminStudents,
} from '@/lib/mock-data'
import AdminOverviewClient from './AdminOverviewClient'

export const metadata = { title: 'Admin Dashboard' }

export default async function AdminOverview() {
  await requireRole(['admin'])

  const recentSignups = mockAdminStudents
    .filter((s) => s.status === 'trial')
    .slice(0, 3)

  return (
    <AdminOverviewClient
      kpis={mockAdminKPIs}
      alerts={mockAdminAlerts}
      enrollmentSparkline={mockEnrollmentSparkline}
      revenueSparkline={mockRevenueSparkline}
      engagementSparkline={mockEngagementSparkline}
      recentSignups={recentSignups}
    />
  )
}
