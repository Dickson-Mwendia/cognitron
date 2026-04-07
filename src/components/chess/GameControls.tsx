'use client'

import { useState } from 'react'
import type { Color } from 'chess.js'

interface CapturedPiece {
  type: string
  color: Color
}

interface GameControlsProps {
  moveCount: number
  onNewGame: () => void
  onUndo: () => void
  onHint: () => void
  onResign: () => void
  canUndo: boolean
  isThinking: boolean
  gameOver: boolean
  capturedByPlayer: CapturedPiece[]
  capturedByEngine: CapturedPiece[]
  playerColor: 'white' | 'black'
}

const pieceSymbols: Record<string, Record<string, string>> = {
  w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' },
  b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' },
}

function CapturedPieces({ pieces, label }: { pieces: CapturedPiece[]; label: string }) {
  if (pieces.length === 0) return null

  // Sort by value: q > r > b > n > p
  const order = { q: 5, r: 4, b: 3, n: 2, p: 1, k: 0 }
  const sorted = [...pieces].sort(
    (a, b) => (order[b.type as keyof typeof order] ?? 0) - (order[a.type as keyof typeof order] ?? 0),
  )

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-[#0c1b33]/40">{label}:</span>
      <div className="flex gap-0.5 flex-wrap">
        {sorted.map((piece, i) => (
          <span key={i} className="text-lg leading-none opacity-60">
            {pieceSymbols[piece.color]?.[piece.type] ?? '?'}
          </span>
        ))}
      </div>
    </div>
  )
}

export function GameControls({
  moveCount,
  onNewGame,
  onUndo,
  onHint,
  onResign,
  canUndo,
  isThinking,
  gameOver,
  capturedByPlayer,
  capturedByEngine,
  playerColor,
}: GameControlsProps) {
  const [showResignConfirm, setShowResignConfirm] = useState(false)

  const handleResign = () => {
    if (showResignConfirm) {
      setShowResignConfirm(false)
      onResign()
    } else {
      setShowResignConfirm(true)
    }
  }

  return (
    <div className="space-y-4">
      {/* Move Counter */}
      <div className="rounded-2xl bg-[#0c1b33]/5 p-4 text-center">
        <p className="text-sm text-[#0c1b33]/50">
          {gameOver ? 'Game Over' : isThinking ? 'Opponent is thinking...' : 'Your turn!'}
        </p>
        <p className="font-heading text-lg font-bold text-[#0c1b33]">
          Move {Math.ceil(moveCount / 2) || 1}
        </p>
      </div>

      {/* Captured Pieces */}
      <div className="rounded-2xl border border-gray-200 bg-white p-3 space-y-1">
        <CapturedPieces
          pieces={capturedByPlayer}
          label={playerColor === 'white' ? 'You captured' : 'You captured'}
        />
        <CapturedPieces
          pieces={capturedByEngine}
          label="Opponent captured"
        />
        {capturedByPlayer.length === 0 && capturedByEngine.length === 0 && (
          <p className="text-xs text-[#0c1b33]/30 text-center py-1">No captures yet</p>
        )}
      </div>

      {/* Action Buttons */}
      {!gameOver ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={onUndo}
              disabled={!canUndo || isThinking}
              className="flex-1 rounded-xl border border-[#0c1b33]/10 bg-white px-3 py-2.5 text-sm font-semibold text-[#0c1b33]/60 transition-colors hover:bg-[#0c1b33]/5 disabled:opacity-30 disabled:cursor-default"
            >
              ↩️ Undo
            </button>
            <button
              onClick={onHint}
              disabled={isThinking}
              className="flex-1 rounded-xl border border-[#d4a843]/30 bg-white px-3 py-2.5 text-sm font-semibold text-[#d4a843] transition-colors hover:bg-[#d4a843]/5 disabled:opacity-30 disabled:cursor-default"
            >
              💡 Hint
            </button>
          </div>

          {!showResignConfirm ? (
            <button
              onClick={handleResign}
              disabled={isThinking || moveCount < 2}
              className="rounded-xl border border-[#e8614d]/20 bg-white px-3 py-2.5 text-sm font-semibold text-[#e8614d]/60 transition-colors hover:bg-[#e8614d]/5 disabled:opacity-30 disabled:cursor-default"
            >
              🏳️ Resign
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleResign}
                className="flex-1 rounded-xl bg-[#e8614d] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e8614d]/90"
              >
                Yes, resign
              </button>
              <button
                onClick={() => setShowResignConfirm(false)}
                className="flex-1 rounded-xl border border-[#0c1b33]/10 bg-white px-3 py-2.5 text-sm font-semibold text-[#0c1b33]/60 transition-colors hover:bg-[#0c1b33]/5"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={onNewGame}
          className="w-full rounded-xl bg-[#0c1b33] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0c1b33]/90"
        >
          🎮 New Game
        </button>
      )}
    </div>
  )
}
