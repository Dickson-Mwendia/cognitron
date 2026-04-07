import { requireRole } from '@/lib/auth'
import {
  getAdminKPIs,
  getAdminAlerts,
  getAdminStudents,
  getAdminSparklines,
} from '@/lib/queries'
import AdminOverviewClient from './AdminOverviewClient'

export const metadata = { title: 'Admin Dashboard' }

export default async function AdminOverview() {
  await requireRole(['admin'])
  const kpis = await getAdminKPIs()
  const alerts = await getAdminAlerts()
  const students = await getAdminStudents()
  const sparklines = await getAdminSparklines()

  const recentSignups = students
    .filter((s) => s.status === 'trial')
    .slice(0, 3)

  return (
    <AdminOverviewClient
      kpis={kpis}
      alerts={alerts}
      enrollmentSparkline={sparklines.enrollment}
      revenueSparkline={sparklines.revenue}
      engagementSparkline={sparklines.engagement}
      recentSignups={recentSignups}
    />
  )
}
