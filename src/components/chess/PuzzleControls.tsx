'use client'

import { useState } from 'react'

interface PuzzleControlsProps {
  puzzleRating: number
  currentMoveIndex: number
  totalSolutionMoves: number
  status: 'playing' | 'correct' | 'incorrect' | 'showing_solution'
  themes: string[]
  onShowHint: () => void
  onSkip: () => void
  onShowSolution: () => void
  onNextPuzzle: () => void
  isLoading?: boolean
}

const themeLabels: Record<string, string> = {
  fork: 'Fork',
  pin: 'Pin',
  skewer: 'Skewer',
  discoveredAttack: 'Discovered Attack',
  doubleCheck: 'Double Check',
  sacrifice: 'Sacrifice',
  mateIn1: 'Mate in 1',
  mateIn2: 'Mate in 2',
  mateIn3: 'Mate in 3',
  backRankMate: 'Back Rank Mate',
  hangingPiece: 'Hanging Piece',
  captureDefender: 'Capture Defender',
  opening: 'Opening',
  short: 'Short',
  recapture: 'Recapture',
  gambit: 'Gambit',
  pawnBreak: 'Pawn Break',
  exchange: 'Exchange',
  centralPawn: 'Central Pawn',
  attack: 'Attack',
  kingsideAttack: 'Kingside Attack',
  queenside: 'Queenside Play',
  knightOutpost: 'Knight Outpost',
  pawnStorm: 'Pawn Storm',
  greekGift: 'Greek Gift Sacrifice',
  counterattack: 'Counterattack',
  counterplay: 'Counterplay',
  bishopPair: 'Bishop Pair',
  bishopExchange: 'Bishop Exchange',
  development: 'Development',
  castling: 'Castling',
  doubledPawns: 'Doubled Pawns',
  knightManeuver: 'Knight Maneuver',
  isolatedPawn: 'Isolated Pawn',
  centralBreak: 'Central Break',
  queenExchange: 'Queen Exchange',
  scholarsMate: "Scholar's Mate",
  checkmate: 'Checkmate',
}

export function PuzzleControls({
  puzzleRating,
  currentMoveIndex,
  totalSolutionMoves,
  status,
  themes,
  onShowHint,
  onSkip,
  onShowSolution,
  onNextPuzzle,
  isLoading = false,
}: PuzzleControlsProps) {
  const [hintUsed, setHintUsed] = useState(false)

  const handleHint = () => {
    setHintUsed(true)
    onShowHint()
  }

  const handleNextPuzzle = () => {
    setHintUsed(false)
    onNextPuzzle()
  }

  // Filter out generic themes
  const displayThemes = themes.filter((t) => t !== 'short' && t !== 'opening')

  return (
    <div className="space-y-4">
      {/* Status Message */}
      <div
        className={`rounded-2xl p-4 text-center font-heading font-bold text-lg transition-colors ${
          status === 'correct'
            ? 'bg-[#2a9d8f]/10 text-[#2a9d8f]'
            : status === 'incorrect'
              ? 'bg-[#e8614d]/10 text-[#e8614d]'
              : status === 'showing_solution'
                ? 'bg-[#d4a843]/10 text-[#d4a843]'
                : 'bg-[#0c1b33]/5 text-[#0c1b33]'
        }`}
      >
        {status === 'playing' && (
          <div>
            <p>Your turn — find the best move</p>
            {totalSolutionMoves > 1 && (
              <p className="text-sm font-normal text-[#0c1b33]/50 mt-1">
                Move {currentMoveIndex + 1} of {totalSolutionMoves}
              </p>
            )}
          </div>
        )}
        {status === 'correct' && (
          <div>
            <p>✓ Correct!</p>
            <p className="text-sm font-normal text-[#2a9d8f]/70 mt-1">
              Well played
            </p>
          </div>
        )}
        {status === 'incorrect' && (
          <div>
            <p>✗ Not quite</p>
            <p className="text-sm font-normal text-[#e8614d]/70 mt-1">
              Try a different move
            </p>
          </div>
        )}
        {status === 'showing_solution' && (
          <div>
            <p>Solution shown</p>
            <p className="text-sm font-normal text-[#d4a843]/70 mt-1">
              Study the correct moves
            </p>
          </div>
        )}
      </div>

      {/* Puzzle Info */}
      <div className="flex items-center justify-between text-sm text-[#0c1b33]/60">
        <span>Puzzle rating: <span className="font-semibold text-[#0c1b33]">{puzzleRating}</span></span>
        {displayThemes.length > 0 && (
          <div className="flex gap-1.5 flex-wrap justify-end">
            {displayThemes.map((theme) => (
              <span
                key={theme}
                className="rounded-full bg-[#0c1b33]/5 px-2.5 py-0.5 text-xs font-medium text-[#0c1b33]/70"
              >
                {themeLabels[theme] ?? theme}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {status === 'playing' && (
          <>
            <button
              onClick={handleHint}
              disabled={hintUsed || isLoading}
              className="flex-1 rounded-xl border border-[#d4a843]/30 bg-white px-4 py-2.5 text-sm font-semibold text-[#d4a843] transition-colors hover:bg-[#d4a843]/5 disabled:opacity-40 disabled:cursor-default"
            >
              💡 Hint
            </button>
            <button
              onClick={onShowSolution}
              disabled={isLoading}
              className="flex-1 rounded-xl border border-[#0c1b33]/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#0c1b33]/60 transition-colors hover:bg-[#0c1b33]/5 disabled:opacity-40 disabled:cursor-default"
            >
              Show Solution
            </button>
            <button
              onClick={onSkip}
              disabled={isLoading}
              className="flex-1 rounded-xl border border-[#0c1b33]/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#0c1b33]/60 transition-colors hover:bg-[#0c1b33]/5 disabled:opacity-40 disabled:cursor-default"
            >
              Skip →
            </button>
          </>
        )}
        {(status === 'correct' || status === 'showing_solution' || status === 'incorrect') && (
          <button
            onClick={handleNextPuzzle}
            disabled={isLoading}
            className="w-full rounded-xl bg-[#0c1b33] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0c1b33]/90 disabled:opacity-60"
          >
            {isLoading ? 'Loading...' : 'Next Puzzle →'}
          </button>
        )}
      </div>
    </div>
  )
}
