import type { Metadata } from 'next'
import { requireAuth } from '@/lib/auth'
import { ComingSoon } from '@/components/dashboard/ComingSoon'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Browse All Tracks | Cognitron',
}

export default async function TracksPage() {
  await requireAuth()

  return (
    <ComingSoon
      title="Browse All Tracks"
      description="Explore available coding, AI, and chess tracks tailored to your skill level."
      icon={BookOpen}
      backHref="/dashboard"
      backLabel="Back to Dashboard"
    />
  )
}
