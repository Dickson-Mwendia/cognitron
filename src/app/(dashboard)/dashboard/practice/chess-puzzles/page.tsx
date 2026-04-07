import type { Metadata } from 'next'
import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { getNextPuzzle, getChessPlayerStats } from '@/lib/chess/queries'
import { PuzzleGame } from '@/components/chess/PuzzleGame'
import type { ChessPuzzle } from '@/types'

export const metadata: Metadata = {
  title: 'Chess Puzzles | Cognitron',
}

async function fetchNextPuzzleAction(): Promise<ChessPuzzle> {
  'use server'
  // This is called without a specific student context for simplicity;
  // rating defaults to 1200 for the random selection
  const puzzle = await getNextPuzzle('anonymous', 1200)
  return puzzle
}

export default async function ChessPuzzlesPage() {
  const user = await requireRole(['student'])

  const [stats, puzzle] = await Promise.all([
    getChessPlayerStats(user.id),
    getNextPuzzle(user.id, 1200),
  ])

  // Create a server action bound to the user's context
  async function getNextPuzzleForUser(): Promise<ChessPuzzle> {
    'use server'
    const { getNextPuzzle: gnp, getChessPlayerStats: gps } = await import(
      '@/lib/chess/queries'
    )
    const currentStats = await gps(user.id)
    return gnp(user.id, currentStats.rating)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard/practice"
              className="text-sm text-[#0c1b33]/50 hover:text-[#0c1b33]/80 transition-colors"
            >
              ← Practice Arena
            </Link>
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#0c1b33]">
            ♟️ Chess Puzzles
          </h1>
          <p className="text-sm text-[#0c1b33]/60 mt-1">
            Sharpen your tactical vision. Solve puzzles to increase your rating.
          </p>
        </div>
      </div>

      {/* Game */}
      <PuzzleGame
        initialPuzzle={puzzle}
        initialStats={stats}
        studentId={user.id}
        fetchNextPuzzleAction={getNextPuzzleForUser}
      />
    </div>
  )
}
