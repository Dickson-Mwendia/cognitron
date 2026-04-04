import { requireRole } from '@/lib/auth'
import { mockAdminCoaches } from '@/lib/mock-data'
import AdminCoachesClient from './AdminCoachesClient'

export const metadata = { title: 'Coach Management' }

export default async function AdminCoachesPage() {
  await requireRole(['admin'])

  return <AdminCoachesClient coaches={mockAdminCoaches} />
}
