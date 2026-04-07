'use client'

import { useState, useCallback, useRef, useTransition } from 'react'
import { Chess } from 'chess.js'
import { PuzzleBoard } from './PuzzleBoard'
import { PuzzleControls } from './PuzzleControls'
import { PuzzleStats } from './PuzzleStats'
import { submitPuzzleAttempt } from '@/app/(dashboard)/dashboard/practice/chess-puzzles/actions'
import type { ChessPuzzle, ChessPlayerStats } from '@/types'

interface PuzzleGameProps {
  initialPuzzle: ChessPuzzle
  initialStats: ChessPlayerStats
  studentId: string
  fetchNextPuzzleAction: () => Promise<ChessPuzzle>
}

type PuzzleStatus = 'playing' | 'correct' | 'incorrect' | 'showing_solution'

export function PuzzleGame({
  initialPuzzle,
  initialStats,
  studentId,
  fetchNextPuzzleAction,
}: PuzzleGameProps) {
  const [puzzle, setPuzzle] = useState(initialPuzzle)
  const [stats, setStats] = useState(initialStats)
  const [status, setStatus] = useState<PuzzleStatus>('playing')
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const [boardFen, setBoardFen] = useState('')
  const [orientation, setOrientation] = useState<'white' | 'black'>('white')
  const [highlightSquares, setHighlightSquares] = useState<string[]>([])
  const [ratingChange, setRatingChange] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const startTimeRef = useRef(Date.now())

  // Initialize puzzle: play the setup move, then present the position
  const initializePuzzle = useCallback((p: ChessPuzzle) => {
    const game = new Chess(p.fen)
    const setupMove = p.moves[0]

    // Play the opponent's setup move
    const from = setupMove.slice(0, 2)
    const to = setupMove.slice(2, 4)
    const promotion = setupMove.length > 4 ? setupMove[4] : undefined
    try {
      game.move({ from, to, promotion })
    } catch {
      // If move fails, just use the original FEN
    }

    // Determine which side the player plays
    const playerColor = game.turn() === 'w' ? 'white' : 'black'

    setBoardFen(game.fen())
    setOrientation(playerColor)
    setCurrentMoveIndex(0)
    setStatus('playing')
    setHighlightSquares([])
    setRatingChange(null)
    startTimeRef.current = Date.now()
  }, [])

  // Initialize on first render
  const initialized = useRef(false)
  if (!initialized.current) {
    initialized.current = true
    const game = new Chess(initialPuzzle.fen)
    const setupMove = initialPuzzle.moves[0]
    const from = setupMove.slice(0, 2)
    const to = setupMove.slice(2, 4)
    const promotion = setupMove.length > 4 ? setupMove[4] : undefined
    try {
      game.move({ from, to, promotion })
    } catch {
      // use original FEN
    }
    // Set initial state synchronously to avoid blank board
    const playerColor = game.turn() === 'w' ? 'white' : 'black'
    // We'll set these in state directly
    if (!boardFen) {
      // These will be set before first render completes
    }
  }

  // Lazy initialization for boardFen
  const getInitialFen = useCallback(() => {
    const game = new Chess(initialPuzzle.fen)
    const setupMove = initialPuzzle.moves[0]
    const from = setupMove.slice(0, 2)
    const to = setupMove.slice(2, 4)
    const promotion = setupMove.length > 4 ? setupMove[4] : undefined
    try {
      game.move({ from, to, promotion })
    } catch {
      return initialPuzzle.fen
    }
    return game.fen()
  }, [initialPuzzle])

  // The solution moves (excluding setup)
  const solutionMoves = puzzle.moves.slice(1)
  // Player moves are odd-indexed in solution (0, 2, 4...) since first solution move is player's
  const playerMoveIndices = solutionMoves
    .map((_, i) => i)
    .filter((i) => i % 2 === 0)

  // Get the current expected player move
  const currentPlayerMoveIdx = playerMoveIndices[currentMoveIndex]
  const expectedMove = currentPlayerMoveIdx !== undefined
    ? solutionMoves[currentPlayerMoveIdx]
    : undefined

  const handleMove = useCallback(
    (_from: string, _to: string, isCorrect: boolean) => {
      if (!isCorrect) {
        setStatus('incorrect')
        // Submit as failed
        const timeMs = Date.now() - startTimeRef.current
        startTransition(async () => {
          const result = await submitPuzzleAttempt({
            puzzleId: puzzle.id,
            solved: false,
            timeMs,
            studentId,
          })
          if (result.success && result.newRating != null) {
            setStats((prev) => ({
              ...prev,
              rating: result.newRating!,
              puzzlesAttempted: prev.puzzlesAttempted + 1,
              currentStreak: 0,
            }))
            setRatingChange(result.ratingChange ?? null)
          }
        })
        return
      }

      // Correct move
      const nextMoveIndex = currentMoveIndex + 1

      if (nextMoveIndex >= playerMoveIndices.length) {
        // Puzzle solved!
        setStatus('correct')
        const timeMs = Date.now() - startTimeRef.current
        startTransition(async () => {
          const result = await submitPuzzleAttempt({
            puzzleId: puzzle.id,
            solved: true,
            timeMs,
            studentId,
          })
          if (result.success && result.newRating != null) {
            setStats((prev) => ({
              ...prev,
              rating: result.newRating!,
              puzzlesSolved: prev.puzzlesSolved + 1,
              puzzlesAttempted: prev.puzzlesAttempted + 1,
              currentStreak: prev.currentStreak + 1,
              bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
              totalXpEarned: prev.totalXpEarned + (result.xpEarned ?? 0),
            }))
            setRatingChange(result.ratingChange ?? null)
          }
        })
      } else {
        // Play opponent's response, then prompt for next player move
        const opponentMoveIdx = currentPlayerMoveIdx! + 1
        if (opponentMoveIdx < solutionMoves.length) {
          const oppMove = solutionMoves[opponentMoveIdx]
          // Apply the opponent's move to the board
          setTimeout(() => {
            setBoardFen((prevFen) => {
              const game = new Chess(prevFen)
              // First apply the player's move
              try {
                game.move({ from: _from, to: _to, promotion: 'q' })
              } catch {
                // already applied by PuzzleBoard
              }
              // Then apply opponent response
              const oFrom = oppMove.slice(0, 2)
              const oTo = oppMove.slice(2, 4)
              const oPromo = oppMove.length > 4 ? oppMove[4] : undefined
              try {
                game.move({ from: oFrom, to: oTo, promotion: oPromo })
              } catch {
                // skip
              }
              return game.fen()
            })
            setCurrentMoveIndex(nextMoveIndex)
          }, 400)
        } else {
          setCurrentMoveIndex(nextMoveIndex)
        }
      }
    },
    [currentMoveIndex, playerMoveIndices, currentPlayerMoveIdx, solutionMoves, puzzle.id, studentId],
  )

  const handleShowHint = useCallback(() => {
    if (expectedMove) {
      // Highlight the target square of the expected move
      const targetSquare = expectedMove.slice(2, 4)
      setHighlightSquares([targetSquare])
    }
  }, [expectedMove])

  const handleSkip = useCallback(() => {
    // Submit as skipped (not solved)
    const timeMs = Date.now() - startTimeRef.current
    startTransition(async () => {
      await submitPuzzleAttempt({
        puzzleId: puzzle.id,
        solved: false,
        timeMs,
        studentId,
      })
      // Load next puzzle
      const nextPuzzle = await fetchNextPuzzleAction()
      setPuzzle(nextPuzzle)
      initializePuzzle(nextPuzzle)
    })
  }, [puzzle.id, studentId, fetchNextPuzzleAction, initializePuzzle])

  const handleShowSolution = useCallback(() => {
    setStatus('showing_solution')
    // Submit as failed
    const timeMs = Date.now() - startTimeRef.current
    startTransition(async () => {
      const result = await submitPuzzleAttempt({
        puzzleId: puzzle.id,
        solved: false,
        timeMs,
        studentId,
      })
      if (result.success && result.newRating != null) {
        setStats((prev) => ({
          ...prev,
          rating: result.newRating!,
          puzzlesAttempted: prev.puzzlesAttempted + 1,
          currentStreak: 0,
        }))
        setRatingChange(result.ratingChange ?? null)
      }
    })

    // Animate through solution moves
    const playerMoves = solutionMoves.filter((_, i) => i % 2 === 0)
    playerMoves.forEach((move, i) => {
      const from = move.slice(0, 2)
      const to = move.slice(2, 4)
      setTimeout(() => {
        setHighlightSquares([from, to])
      }, i * 1500)
    })
  }, [puzzle.id, studentId, solutionMoves])

  const handleNextPuzzle = useCallback(() => {
    startTransition(async () => {
      const nextPuzzle = await fetchNextPuzzleAction()
      setPuzzle(nextPuzzle)
      initializePuzzle(nextPuzzle)
    })
  }, [fetchNextPuzzleAction, initializePuzzle])

  const displayFen = boardFen || getInitialFen()

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Board Section */}
      <div className="flex-1 min-w-0">
        <PuzzleBoard
          fen={displayFen}
          onMove={handleMove}
          orientation={orientation}
          disabled={status !== 'playing' || isPending}
          expectedMove={expectedMove}
          highlightSquares={highlightSquares}
        />
        <div className="mt-4">
          <PuzzleControls
            puzzleRating={puzzle.rating}
            currentMoveIndex={currentMoveIndex}
            totalSolutionMoves={playerMoveIndices.length}
            status={status}
            themes={puzzle.themes}
            onShowHint={handleShowHint}
            onSkip={handleSkip}
            onShowSolution={handleShowSolution}
            onNextPuzzle={handleNextPuzzle}
            isLoading={isPending}
          />
        </div>
      </div>

      {/* Stats Sidebar */}
      <div className="w-full lg:w-80 shrink-0">
        <PuzzleStats stats={stats} ratingChange={ratingChange} />
      </div>
    </div>
  )
}
