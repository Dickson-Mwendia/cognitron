'use client'

import { OpponentCard } from './OpponentCard'
import type { ChessOpponent } from '@/lib/chess/opponents'
import type { ChessGameStats } from '@/types'

interface GameSidebarProps {
  opponent: ChessOpponent
  isThinking: boolean
  stats: ChessGameStats
  opponentRecord: { wins: number; losses: number; draws: number }
  onChangeOpponent: () => void
}

export function GameSidebar({
  opponent,
  isThinking,
  stats,
  opponentRecord,
  onChangeOpponent,
}: GameSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Current Opponent */}
      <OpponentCard opponent={opponent} isThinking={isThinking} />

      {/* Record vs This Opponent */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-[#0c1b33]/50 mb-2">
          Record vs {opponent.name}
        </p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-heading text-xl font-bold text-[#2a9d8f]">
              {opponentRecord.wins}
            </p>
            <p className="text-xs text-[#0c1b33]/40">Wins</p>
          </div>
          <div>
            <p className="font-heading text-xl font-bold text-[#e8614d]">
              {opponentRecord.losses}
            </p>
            <p className="text-xs text-[#0c1b33]/40">Losses</p>
          </div>
          <div>
            <p className="font-heading text-xl font-bold text-[#d4a843]">
              {opponentRecord.draws}
            </p>
            <p className="text-xs text-[#0c1b33]/40">Draws</p>
          </div>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="rounded-2xl bg-[#0c1b33] p-5 text-white">
        <p className="text-sm text-white/50 mb-1">Your Game Rating</p>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-4xl font-bold">{stats.rating}</span>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-[#0c1b33]/50">Games Played</p>
          <p className="font-heading text-2xl font-bold text-[#0c1b33]">
            {stats.gamesPlayed}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-[#0c1b33]/50">Win Streak</p>
          <p className="font-heading text-2xl font-bold text-[#0c1b33]">
            {stats.currentWinStreak}{' '}
            {stats.currentWinStreak > 0 && <span className="text-base">🔥</span>}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-[#0c1b33]/50">Total Wins</p>
          <p className="font-heading text-2xl font-bold text-[#2a9d8f]">
            {stats.wins}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-[#0c1b33]/50">XP Earned</p>
          <p className="font-heading text-2xl font-bold text-[#d4a843]">
            {stats.totalXpEarned}
          </p>
        </div>
      </div>

      {/* Change Opponent Button */}
      <button
        onClick={onChangeOpponent}
        className="w-full rounded-xl border border-[#0c1b33]/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#0c1b33]/60 transition-colors hover:bg-[#0c1b33]/5"
      >
        🔄 Choose a Different Opponent
      </button>
    </div>
  )
}
