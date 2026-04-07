'use client'

import type { ChessOpponent } from '@/lib/chess/opponents'

interface OpponentCardProps {
  opponent: ChessOpponent
  isThinking?: boolean
}

export function OpponentCard({ opponent, isThinking = false }: OpponentCardProps) {
  return (
    <div className="rounded-2xl bg-[#0c1b33] p-5 text-white">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{opponent.emoji}</span>
        <div>
          <h3 className="font-heading text-lg font-bold">{opponent.name}</h3>
          <p className="text-xs text-white/50">{opponent.title}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-white/60">{opponent.description}</p>

      <div className="mt-3 flex items-center gap-3 text-xs text-white/40">
        <span>Rating ~{opponent.rating}</span>
        <span>•</span>
        <span>Ages {opponent.ageRange}</span>
      </div>

      {isThinking && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-[#d4a843] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="inline-block h-2 w-2 rounded-full bg-[#d4a843] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="inline-block h-2 w-2 rounded-full bg-[#d4a843] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm text-[#d4a843]">
            {opponent.name} is thinking...
          </span>
        </div>
      )}
    </div>
  )
}
