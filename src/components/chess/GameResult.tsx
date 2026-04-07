'use client'

import { useEffect, useState } from 'react'
import type { ChessOpponent } from '@/lib/chess/opponents'

interface GameResultProps {
  result: 'win' | 'loss' | 'draw'
  opponent: ChessOpponent
  ratingChange: number
  xpEarned: number
  onPlayAgain: () => void
  onChangeOpponent: () => void
}

export function GameResult({
  result,
  opponent,
  ratingChange,
  xpEarned,
  onPlayAgain,
  onChangeOpponent,
}: GameResultProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (result === 'win') {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [result])

  const message =
    result === 'win'
      ? opponent.winMessage
      : result === 'loss'
        ? opponent.loseMessage
        : opponent.drawMessage

  const title =
    result === 'win'
      ? '🎉 You Won!'
      : result === 'loss'
        ? '💪 Good Game!'
        : '🤝 It\'s a Draw!'

  const titleColor =
    result === 'win'
      ? 'text-[#2a9d8f]'
      : result === 'loss'
        ? 'text-[#d4a843]'
        : 'text-[#d4a843]'

  const bgColor =
    result === 'win'
      ? 'bg-[#2a9d8f]/5 border-[#2a9d8f]/20'
      : result === 'loss'
        ? 'bg-[#d4a843]/5 border-[#d4a843]/20'
        : 'bg-[#d4a843]/5 border-[#d4a843]/20'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* CSS-only confetti for wins */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${12 + Math.random() * 12}px`,
                color: ['#d4a843', '#2a9d8f', '#e8614d', '#0c1b33', '#fff'][
                  Math.floor(Math.random() * 5)
                ],
              }}
            >
              {['🎉', '⭐', '🏆', '✨', '🌟', '♔', '🎊'][Math.floor(Math.random() * 7)]}
            </span>
          ))}
        </div>
      )}

      <div
        className={`relative mx-4 w-full max-w-md rounded-2xl border ${bgColor} bg-white p-6 shadow-2xl`}
      >
        {/* Opponent Emoji */}
        <div className="text-center mb-2">
          <span className="text-6xl">{opponent.emoji}</span>
        </div>

        {/* Title */}
        <h2 className={`text-center font-heading text-2xl font-bold ${titleColor}`}>
          {title}
        </h2>

        {/* Opponent Message */}
        <div className="mt-3 rounded-xl bg-[#0c1b33]/5 p-4">
          <p className="text-sm text-[#0c1b33]/70 text-center italic">
            &ldquo;{message}&rdquo;
          </p>
          <p className="text-xs text-[#0c1b33]/40 text-center mt-1">
            — {opponent.name}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-4 flex justify-center gap-6">
          <div className="text-center">
            <p className="text-xs text-[#0c1b33]/40">Rating</p>
            <p
              className={`font-heading text-lg font-bold ${
                ratingChange >= 0 ? 'text-[#2a9d8f]' : 'text-[#e8614d]'
              }`}
            >
              {ratingChange >= 0 ? '+' : ''}{ratingChange}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[#0c1b33]/40">XP Earned</p>
            <p className="font-heading text-lg font-bold text-[#d4a843]">
              +{xpEarned}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 rounded-xl bg-[#0c1b33] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0c1b33]/90"
          >
            🎮 Play Again
          </button>
          <button
            onClick={onChangeOpponent}
            className="flex-1 rounded-xl border border-[#0c1b33]/10 bg-white px-4 py-3 text-sm font-semibold text-[#0c1b33]/70 transition-colors hover:bg-[#0c1b33]/5"
          >
            🔄 Change Opponent
          </button>
        </div>
      </div>

      {/* Confetti animation keyframes — injected once via style tag */}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti-fall linear forwards;
        }
      `}</style>
    </div>
  )
}
