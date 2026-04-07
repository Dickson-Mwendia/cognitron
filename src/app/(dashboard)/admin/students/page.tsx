import { requireRole } from '@/lib/auth'
import { getAdminStudents } from '@/lib/queries'
import AdminStudentsClient from './AdminStudentsClient'

export const metadata = { title: 'Student Management' }

export default async function AdminStudentsPage() {
  await requireRole(['admin'])
  const students = await getAdminStudents()

  return <AdminStudentsClient students={students} />
}
