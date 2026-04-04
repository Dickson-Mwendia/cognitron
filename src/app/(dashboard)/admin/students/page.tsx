import { requireRole } from '@/lib/auth'
import { mockAdminStudents } from '@/lib/mock-data'
import AdminStudentsClient from './AdminStudentsClient'

export const metadata = { title: 'Student Management' }

export default async function AdminStudentsPage() {
  await requireRole(['admin'])

  return <AdminStudentsClient students={mockAdminStudents} />
}
