import { requireRole } from '@/lib/auth'
import { getPendingUsers } from './actions'
import { mockPendingUsers } from '@/lib/mock-data'
import ApprovalsClient from './approvals-client'

export const metadata = { title: 'Approvals' }

export default async function ApprovalsPage() {
  await requireRole(['admin'])

  // Use real data when Supabase is configured, mock data in dev
  const pendingUsers = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? await getPendingUsers()
    : mockPendingUsers

  return <ApprovalsClient initialUsers={pendingUsers} />
}

