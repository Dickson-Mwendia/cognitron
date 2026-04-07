import { requireRole } from '@/lib/auth'
import { getCurriculumTree } from '@/lib/queries'
import AdminCurriculumClient from './AdminCurriculumClient'

export const metadata = { title: 'Curriculum Management' }

export default async function AdminCurriculumPage() {
  await requireRole(['admin'])
  const curriculum = await getCurriculumTree()

  return <AdminCurriculumClient curriculum={curriculum} />
}
