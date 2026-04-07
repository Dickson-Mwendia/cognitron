'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'

interface PuzzleBoardProps {
  fen: string
  onMove: (from: string, to: string, isCorrect: boolean) => void
  orientation: 'white' | 'black'
  disabled?: boolean
  expectedMove?: string // UCI format e.g. "e2e4"
  highlightSquares?: string[] // squares to highlight (for hints)
}

export function PuzzleBoard({
  fen,
  onMove,
  orientation,
  disabled = false,
  expectedMove,
  highlightSquares = [],
}: PuzzleBoardProps) {
  const [game, setGame] = useState(() => new Chess(fen))
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null)
  const [incorrectSquare, setIncorrectSquare] = useState<string | null>(null)

  // Reset game when FEN changes
  useEffect(() => {
    const newGame = new Chess(fen)
    setGame(newGame)
    setLastMove(null)
    setIncorrectSquare(null)
  }, [fen])

  // Build custom square styles
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {}

    // Highlight last move
    if (lastMove) {
      styles[lastMove.from] = { backgroundColor: 'rgba(212, 168, 67, 0.35)' }
      styles[lastMove.to] = { backgroundColor: 'rgba(212, 168, 67, 0.45)' }
    }

    // Highlight king if in check
    if (game.inCheck()) {
      const board = game.board()
      const turn = game.turn()
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const piece = board[r][c]
          if (piece && piece.type === 'k' && piece.color === turn) {
            const file = String.fromCharCode(97 + c)
            const rank = String(8 - r)
            styles[`${file}${rank}`] = {
              backgroundColor: 'rgba(232, 97, 77, 0.6)',
              borderRadius: '50%',
            }
          }
        }
      }
    }

    // Highlight hint squares
    for (const sq of highlightSquares) {
      styles[sq] = {
        ...styles[sq],
        backgroundColor: 'rgba(42, 157, 143, 0.5)',
        borderRadius: '50%',
      }
    }

    // Flash incorrect square
    if (incorrectSquare) {
      styles[incorrectSquare] = {
        backgroundColor: 'rgba(232, 97, 77, 0.6)',
      }
    }

    return styles
  }, [game, lastMove, highlightSquares, incorrectSquare])

  const onDrop = useCallback(
    ({ sourceSquare, targetSquare }: { piece: string; sourceSquare: string; targetSquare: string }): boolean => {
      if (disabled) return false

      // Check if the move is legal
      const gameCopy = new Chess(game.fen())
      let move
      try {
        move = gameCopy.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q', // always promote to queen for simplicity
        })
      } catch {
        return false
      }

      if (!move) return false

      // Check if this is the expected move
      const uciMove = `${sourceSquare}${targetSquare}`
      const isCorrect = expectedMove
        ? uciMove === expectedMove ||
          `${uciMove}q` === expectedMove ||
          uciMove === expectedMove.slice(0, 4)
        : true

      if (isCorrect) {
        setGame(gameCopy)
        setLastMove({ from: sourceSquare, to: targetSquare })
        setIncorrectSquare(null)
      } else {
        // Flash the target square red briefly
        setIncorrectSquare(targetSquare)
        setTimeout(() => setIncorrectSquare(null), 800)
      }

      onMove(sourceSquare, targetSquare, isCorrect)
      return isCorrect
    },
    [game, disabled, expectedMove, onMove],
  )

  return (
    <div className="w-full max-w-[560px]">
      <Chessboard
        options={{
          id: 'puzzle-board',
          position: game.fen(),
          onPieceDrop: onDrop as any,
          boardOrientation: orientation,
          boardStyle: {
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(12, 27, 51, 0.15)',
          },
          darkSquareStyle: { backgroundColor: '#0c1b33' },
          lightSquareStyle: { backgroundColor: '#e8dcc8' },
          squareStyles: customSquareStyles,
          animationDurationInMs: 200,
          allowDragging: !disabled,
        }}
      />
    </div>
  )
}
