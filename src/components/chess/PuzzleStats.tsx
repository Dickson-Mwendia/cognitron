import type { ChessPlayerStats } from '@/types'

interface PuzzleStatsProps {
  stats: ChessPlayerStats
  ratingChange?: number | null
}

export function PuzzleStats({ stats, ratingChange }: PuzzleStatsProps) {
  return (
    <div className="space-y-4">
      {/* Rating Card */}
      <div className="rounded-2xl bg-[#0c1b33] p-5 text-white">
        <p className="text-sm text-white/50 mb-1">Your Puzzle Rating</p>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-4xl font-bold">{stats.rating}</span>
          {ratingChange != null && ratingChange !== 0 && (
            <span
              className={`text-sm font-semibold ${
                ratingChange > 0 ? 'text-[#2a9d8f]' : 'text-[#e8614d]'
              }`}
            >
              {ratingChange > 0 ? '+' : ''}{ratingChange}
            </span>
          )}
        </div>
        <div className="mt-3 h-1 rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#d4a843] transition-all duration-500"
            style={{ width: `${Math.min(100, ((stats.rating - 400) / 2000) * 100)}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-white/30">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Advanced</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-[#0c1b33]/50">Puzzles Solved</p>
          <p className="font-heading text-2xl font-bold text-[#0c1b33]">
            {stats.puzzlesSolved}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-[#0c1b33]/50">Current Streak</p>
          <p className="font-heading text-2xl font-bold text-[#0c1b33]">
            {stats.currentStreak}{' '}
            {stats.currentStreak > 0 && <span className="text-base">🔥</span>}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-[#0c1b33]/50">Best Streak</p>
          <p className="font-heading text-2xl font-bold text-[#0c1b33]">
            {stats.bestStreak}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-[#0c1b33]/50">XP Earned</p>
          <p className="font-heading text-2xl font-bold text-[#d4a843]">
            {stats.totalXpEarned}
          </p>
        </div>
      </div>

      {/* Empty state onboarding */}
      {stats.puzzlesAttempted === 0 && (
        <div className="rounded-2xl border border-[#2a9d8f]/20 bg-[#2a9d8f]/5 p-4">
          <p className="text-sm font-semibold text-[#2a9d8f]">
            Welcome to Chess Puzzles! 👋
          </p>
          <p className="mt-1 text-sm text-[#0c1b33]/60">
            Solve puzzles to improve your tactical vision. Your rating starts at
            1200 and adjusts based on your performance. Each solved puzzle earns
            you XP!
          </p>
        </div>
      )}
    </div>
  )
}
