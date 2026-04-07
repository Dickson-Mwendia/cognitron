import { requireRole } from '@/lib/auth'
import { getAdminSettings } from '@/lib/queries'
import AdminSettingsClient from './AdminSettingsClient'

export const metadata = { title: 'Platform Settings' }

export default async function AdminSettingsPage() {
  await requireRole(['admin'])
  const settings = await getAdminSettings()

  return (
    <AdminSettingsClient
      pricingPlans={settings.pricingPlans}
      notificationTemplates={settings.notificationTemplates}
      platformSettings={settings.platformSettings}
    />
  )
}
