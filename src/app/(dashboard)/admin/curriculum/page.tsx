import { requireRole } from '@/lib/auth'
import { mockCurriculumTree } from '@/lib/mock-data'
import AdminCurriculumClient from './AdminCurriculumClient'

export const metadata = { title: 'Curriculum Management' }

export default async function AdminCurriculumPage() {
  await requireRole(['admin'])

  return <AdminCurriculumClient curriculum={mockCurriculumTree} />
}
