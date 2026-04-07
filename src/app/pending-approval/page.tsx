import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import PendingApprovalClient from './PendingApprovalClient'

export const metadata = { title: 'Account Pending Approval' }

export default async function PendingApprovalPage() {
  // If user is already approved, redirect them to dashboard
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  if (user.approved) redirect('/dashboard')

  return <PendingApprovalClient firstName={user.firstName} />
}
