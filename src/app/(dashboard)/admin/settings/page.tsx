import { requireRole } from '@/lib/auth'
import { mockPricingPlans, mockNotificationTemplates, mockPlatformSettings } from '@/lib/mock-data'
import AdminSettingsClient from './AdminSettingsClient'

export const metadata = { title: 'Platform Settings' }

export default async function AdminSettingsPage() {
  await requireRole(['admin'])

  return (
    <AdminSettingsClient
      pricingPlans={mockPricingPlans}
      notificationTemplates={mockNotificationTemplates}
      platformSettings={mockPlatformSettings}
    />
  )
}
