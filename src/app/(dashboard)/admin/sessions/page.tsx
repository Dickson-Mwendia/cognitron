import { requireRole } from '@/lib/auth'
import { getAdminSessions } from '@/lib/queries'
import AdminSessionsClient from './AdminSessionsClient'

export const metadata = { title: 'Session Management' }

export default async function AdminSessionsPage() {
  await requireRole(['admin'])
  const sessions = await getAdminSessions()

  return <AdminSessionsClient sessions={sessions} />
}
