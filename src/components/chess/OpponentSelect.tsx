'use client'

import { opponents, type ChessOpponent } from '@/lib/chess/opponents'

interface OpponentSelectProps {
  onSelect: (opponent: ChessOpponent) => void
  opponentStats: Record<string, { wins: number; losses: number; draws: number }>
}

export function OpponentSelect({ onSelect, opponentStats }: OpponentSelectProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-[#0c1b33]">
          Choose Your Opponent
        </h2>
        <p className="mt-1 text-sm text-[#0c1b33]/60">
          Pick a challenger that matches your skill level. You can always change later!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {opponents.map((opponent) => {
          const stats = opponentStats[opponent.id]
          const totalGames = stats
            ? stats.wins + stats.losses + stats.draws
            : 0

          return (
            <button
              key={opponent.id}
              onClick={() => onSelect(opponent)}
              className="group rounded-2xl border border-[#0c1b33]/10 bg-white p-5 text-left transition-all duration-200 hover:shadow-lg hover:border-[#d4a843] hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {opponent.emoji}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#0c1b33] group-hover:text-[#d4a843] transition-colors">
                    {opponent.name}
                  </h3>
                  <p className="text-xs text-[#0c1b33]/40">{opponent.title}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-[#0c1b33]/60">
                {opponent.description}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#0c1b33]/40">
                  <span>~{opponent.rating} Elo</span>
                  <span>•</span>
                  <span>Ages {opponent.ageRange}</span>
                </div>
              </div>

              {totalGames > 0 && stats && (
                <div className="mt-2 rounded-xl bg-[#0c1b33]/5 px-3 py-1.5 text-xs text-[#0c1b33]/50">
                  {stats.wins}W · {stats.losses}L · {stats.draws}D
                </div>
              )}

              <div className="mt-3">
                <span className="inline-block rounded-full bg-[#d4a843]/10 px-4 py-1.5 text-xs font-semibold text-[#d4a843] group-hover:bg-[#d4a843] group-hover:text-[#0c1b33] transition-colors">
                  Challenge →
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
