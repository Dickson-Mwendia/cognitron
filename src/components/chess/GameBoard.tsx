'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, type Square } from 'chess.js'

interface GameBoardProps {
  fen: string
  orientation: 'white' | 'black'
  onMove: (from: string, to: string, promotion?: string) => boolean
  disabled?: boolean
  lastMove?: { from: string; to: string } | null
  hintSquare?: string | null
}

export function GameBoard({
  fen,
  orientation,
  onMove,
  disabled = false,
  lastMove = null,
  hintSquare = null,
}: GameBoardProps) {
  const [game, setGame] = useState(() => new Chess(fen))
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [legalMoves, setLegalMoves] = useState<string[]>([])

  // Sync game state when FEN changes from outside
  useEffect(() => {
    try {
      const newGame = new Chess(fen)
      setGame(newGame)
      setSelectedSquare(null)
      setLegalMoves([])
    } catch {
      // Invalid FEN — ignore
    }
  }, [fen])

  // Build custom square styles for highlights and legal move dots
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {}

    // Highlight last move
    if (lastMove) {
      styles[lastMove.from] = { backgroundColor: 'rgba(212, 168, 67, 0.35)' }
      styles[lastMove.to] = { backgroundColor: 'rgba(212, 168, 67, 0.45)' }
    }

    // Highlight selected square
    if (selectedSquare) {
      styles[selectedSquare] = {
        ...styles[selectedSquare],
        backgroundColor: 'rgba(42, 157, 143, 0.45)',
      }
    }

    // Show legal move dots (important for kids!)
    for (const sq of legalMoves) {
      const piece = game.get(sq as Square)
      if (piece) {
        // Capture target — ring highlight
        styles[sq] = {
          ...styles[sq],
          background: 'radial-gradient(transparent 55%, rgba(42, 157, 143, 0.4) 55%)',
          borderRadius: '50%',
        }
      } else {
        // Empty square — small dot
        styles[sq] = {
          ...styles[sq],
          background: 'radial-gradient(circle, rgba(42, 157, 143, 0.4) 25%, transparent 25%)',
        }
      }
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
              ...styles[`${file}${rank}`],
              backgroundColor: 'rgba(232, 97, 77, 0.6)',
              borderRadius: '50%',
            }
          }
        }
      }
    }

    // Hint square glow
    if (hintSquare) {
      styles[hintSquare] = {
        ...styles[hintSquare],
        backgroundColor: 'rgba(42, 157, 143, 0.5)',
        boxShadow: '0 0 12px rgba(42, 157, 143, 0.6)',
      }
    }

    return styles
  }, [game, lastMove, selectedSquare, legalMoves, hintSquare])

  // Show legal moves on square click
  const onSquareClick = useCallback(
    ({ square }: { piece: string; square: string }) => {
      if (disabled) return

      // If clicking a legal move target, make the move
      if (selectedSquare && legalMoves.includes(square)) {
        const success = onMove(selectedSquare, square)
        if (success) {
          setSelectedSquare(null)
          setLegalMoves([])
        }
        return
      }

      // Select a new piece
      const piece = game.get(square as Square)
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square)
        const moves = game.moves({ square: square as Square, verbose: true })
        setLegalMoves(moves.map((m) => m.to))
      } else {
        setSelectedSquare(null)
        setLegalMoves([])
      }
    },
    [disabled, game, selectedSquare, legalMoves, onMove],
  )

  // Show legal moves on piece drag start
  const onPieceDrag = useCallback(
    ({ square }: { isSparePiece: boolean; piece: string; square: string }) => {
      if (disabled) return
      const piece = game.get(square as Square)
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square)
        const moves = game.moves({ square: square as Square, verbose: true })
        setLegalMoves(moves.map((m) => m.to))
      }
    },
    [disabled, game],
  )

  const handleDrop = useCallback(
    ({ sourceSquare, targetSquare }: { piece: string; sourceSquare: string; targetSquare: string }): boolean => {
      if (disabled) return false

      const success = onMove(sourceSquare, targetSquare)
      if (success) {
        setSelectedSquare(null)
        setLegalMoves([])
      }
      return success
    },
    [disabled, onMove],
  )

  return (
    <div className="w-full max-w-[560px]">
      <Chessboard
        options={{
          id: 'game-board',
          position: fen,
          onPieceDrop: handleDrop as any,
          onSquareClick: onSquareClick as any,
          onPieceDrag: onPieceDrag as any,
          boardOrientation: orientation,
          boardStyle: {
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(12, 27, 51, 0.15)',
          },
          darkSquareStyle: { backgroundColor: '#0c1b33' },
          lightSquareStyle: { backgroundColor: '#e8dcc8' },
          squareStyles: customSquareStyles,
          animationDurationInMs: 300,
          allowDragging: !disabled,
        }}
      />
    </div>
  )
}
