import { requireRole } from '@/lib/auth'
import { mockAdminSessions } from '@/lib/mock-data'
import AdminSessionsClient from './AdminSessionsClient'

export const metadata = { title: 'Session Management' }

export default async function AdminSessionsPage() {
  await requireRole(['admin'])

  return <AdminSessionsClient sessions={mockAdminSessions} />
}
