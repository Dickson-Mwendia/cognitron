import { requireRole } from '@/lib/auth'
import { getAdminCoaches } from '@/lib/queries'
import AdminCoachesClient from './AdminCoachesClient'

export const metadata = { title: 'Coach Management' }

export default async function AdminCoachesPage() {
  await requireRole(['admin'])
  const coaches = await getAdminCoaches()

  return <AdminCoachesClient coaches={coaches} />
}
