import type { Metadata } from 'next'
import Link from 'next/link'
import { requireRole } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Practice Arena | Cognitron',
}

export default async function PracticePage() {
  await requireRole(['student'])

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <section>
        <div className="flex items-center gap-2 mb-1">
          <Link
            href="/dashboard"
            className="text-sm text-[#0c1b33]/50 hover:text-[#0c1b33]/80 transition-colors"
          >
            ← Dashboard
          </Link>
        </div>
        <h1 className="font-heading text-[28px] leading-tight font-bold text-[#0c1b33]">
          Practice Arena
        </h1>
        <p className="text-sm text-[#0c1b33]/60 mt-1">
          Coding challenges, chess puzzles, and AI experiments to sharpen your skills.
        </p>
      </section>

      {/* Activity Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Chess Puzzles — Active */}
        <Link
          href="/dashboard/practice/chess-puzzles"
          className="group rounded-2xl border border-[#d4a843]/30 bg-white p-6 transition-all duration-200 hover:shadow-lg hover:border-[#d4a843] text-left"
        >
          <span className="text-4xl block group-hover:scale-110 transition-transform origin-left">♟️</span>
          <h2 className="mt-3 font-heading text-lg font-bold text-[#0c1b33] group-hover:text-[#d4a843] transition-colors">
            Chess Puzzles
          </h2>
          <p className="mt-1 text-sm text-[#0c1b33]/60">
            Solve tactical puzzles to improve your chess rating and earn XP.
          </p>
          <span className="mt-3 inline-block rounded-full bg-[#d4a843] px-4 py-1.5 text-xs font-semibold text-[#0c1b33] group-hover:bg-[#d4a843]/90 transition-colors">
            Solve Puzzles →
          </span>
        </Link>

        {/* Coding Challenges — Coming Soon */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 opacity-60 cursor-default">
          <span className="text-4xl block">💻</span>
          <h2 className="mt-3 font-heading text-lg font-bold text-[#0c1b33]">
            Coding Challenges
          </h2>
          <p className="mt-1 text-sm text-[#0c1b33]/60">
            Solve hands-on coding puzzles and build real projects.
          </p>
          <span className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-wider text-[#0c1b33]/30">
            Coming Soon
          </span>
        </div>

        {/* AI Experiments — Coming Soon */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 opacity-60 cursor-default">
          <span className="text-4xl block">🤖</span>
          <h2 className="mt-3 font-heading text-lg font-bold text-[#0c1b33]">
            AI Experiments
          </h2>
          <p className="mt-1 text-sm text-[#0c1b33]/60">
            Explore machine learning concepts with interactive experiments.
          </p>
          <span className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-wider text-[#0c1b33]/30">
            Coming Soon
          </span>
        </div>
      </section>
    </div>
  )
}
