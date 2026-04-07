import type { Metadata } from 'next'
import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { getChessGameStats, getOpponentStats } from '@/lib/chess/game-queries'
import { PlayComputer } from '@/components/chess/PlayComputer'

export const metadata: Metadata = {
  title: 'Play vs Computer | Cognitron',
}

export default async function PlayComputerPage() {
  const user = await requireRole(['student'])

  const [stats, opponentStats] = await Promise.all([
    getChessGameStats(user.id),
    getOpponentStats(user.id),
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
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
          ♔ Play vs Computer
        </h1>
        <p className="text-sm text-[#0c1b33]/60 mt-1">
          Challenge fun opponents and improve your chess skills!
        </p>
      </div>

      {/* Game */}
      <PlayComputer
        initialStats={stats}
        initialOpponentStats={opponentStats}
        studentId={user.id}
      />
    </div>
  )
}
