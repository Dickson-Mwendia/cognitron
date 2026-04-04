import { requireAuth } from '@/lib/auth'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'

export const metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Cognitron',
  },
}

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()

  return (
    <DashboardLayout
      role={user.role}
      userName={`${user.firstName} ${user.lastName}`}
      userAvatar={user.avatarUrl}
    >
      {children}
    </DashboardLayout>
  )
}
