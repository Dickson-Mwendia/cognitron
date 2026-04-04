import type { Metadata } from 'next'
import { requireAuth } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Practice Arena | Cognitron',
}

export default async function PracticePage() {
  await requireAuth()

  return (
    <ComingSoon
      title="Practice Arena"
      description="Coding challenges, chess puzzles, and AI experiments to sharpen your skills."
      icon={GraduationCap}
      backHref="/dashboard"
      backLabel="Back to Dashboard"
    />
  )
}
