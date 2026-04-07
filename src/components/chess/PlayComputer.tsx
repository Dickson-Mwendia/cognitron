'use client'

import { useState, useCallback, useRef, useTransition } from 'react'
import { Chess } from 'chess.js'
import type { Color } from 'chess.js'
import { GameBoard } from './GameBoard'
import { GameControls } from './GameControls'
import { GameSidebar } from './GameSidebar'
import { GameResult } from './GameResult'
import { OpponentSelect } from './OpponentSelect'
import { useStockfish } from '@/lib/chess/useStockfish'
import { opponents, type ChessOpponent } from '@/lib/chess/opponents'
import { submitGameResult } from '@/app/(dashboard)/dashboard/practice/play-computer/actions'
import type { ChessGameStats } from '@/types'

interface PlayComputerProps {
  initialStats: ChessGameStats
  initialOpponentStats: Record<string, { wins: number; losses: number; draws: number }>
  studentId: string
}

type GameState = 'selecting' | 'playing' | 'finished'

interface CapturedPiece {
  type: string
  color: Color
}

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export function PlayComputer({
  initialStats,
  initialOpponentStats,
  studentId,
}: PlayComputerProps) {
  const [gameState, setGameState] = useState<GameState>('selecting')
  const [stats, setStats] = useState(initialStats)
  const [opponentStats, setOpponentStats] = useState(initialOpponentStats)
  const [opponent, setOpponent] = useState<ChessOpponent | null>(null)
  const [game, setGame] = useState(() => new Chess())
  const [boardFen, setBoardFen] = useState(STARTING_FEN)
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null)
  const [hintSquare, setHintSquare] = useState<string | null>(null)
  const [isThinking, setIsThinking] = useState(false)
  const [moveCount, setMoveCount] = useState(0)
  const [capturedByPlayer, setCapturedByPlayer] = useState<CapturedPiece[]>([])
  const [capturedByEngine, setCapturedByEngine] = useState<CapturedPiece[]>([])
  const [gameResult, setGameResult] = useState<'win' | 'loss' | 'draw' | null>(null)
  const [ratingChange, setRatingChange] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [engineFailed, setEngineFailed] = useState(false)
  const [isPending, startTransition] = useTransition()
  const undoStackRef = useRef<string[]>([])

  const { getBestMove, stop: stopEngine } = useStockfish()

  // Player always plays white (simpler for kids)
  const playerColor = 'white' as const
  const engineColor = 'b' as const

  const startGame = useCallback(
    (selectedOpponent: ChessOpponent) => {
      const newGame = new Chess()
      setOpponent(selectedOpponent)
      setGame(newGame)
      setBoardFen(newGame.fen())
      setLastMove(null)
      setHintSquare(null)
      setIsThinking(false)
      setMoveCount(0)
      setCapturedByPlayer([])
      setCapturedByEngine([])
      setGameResult(null)
      setRatingChange(0)
      setXpEarned(0)
      setEngineFailed(false)
      undoStackRef.current = []
      setGameState('playing')
    },
    [],
  )

  const handleGameEnd = useCallback(
    (result: 'win' | 'loss' | 'draw', currentGame: Chess) => {
      setGameResult(result)
      setGameState('finished')

      startTransition(async () => {
        try {
          const res = await submitGameResult({
            studentId,
            opponentId: opponent?.id ?? '',
            pgn: currentGame.pgn(),
            result,
            moves: currentGame.moveNumber(),
          })

          if (res.success) {
            setRatingChange(res.ratingChange ?? 0)
            setXpEarned(res.xpEarned ?? 0)
            setStats((prev) => ({
              ...prev,
              rating: res.newRating ?? prev.rating,
              gamesPlayed: prev.gamesPlayed + 1,
              wins: prev.wins + (result === 'win' ? 1 : 0),
              losses: prev.losses + (result === 'loss' ? 1 : 0),
              draws: prev.draws + (result === 'draw' ? 1 : 0),
              totalXpEarned: prev.totalXpEarned + (res.xpEarned ?? 0),
              currentWinStreak:
                result === 'win' ? prev.currentWinStreak + 1 : 0,
            }))
            // Update opponent record
            if (opponent) {
              setOpponentStats((prev) => {
                const existing = prev[opponent.id] ?? { wins: 0, losses: 0, draws: 0 }
                return {
                  ...prev,
                  [opponent.id]: {
                    wins: existing.wins + (result === 'win' ? 1 : 0),
                    losses: existing.losses + (result === 'loss' ? 1 : 0),
                    draws: existing.draws + (result === 'draw' ? 1 : 0),
                  },
                }
              })
            }
          }
        } catch {
          // Still show result even if persistence fails
        }
      })
    },
    [studentId, opponent],
  )

  const makeEngineMove = useCallback(
    async (currentGame: Chess) => {
      if (!opponent || currentGame.isGameOver()) return

      setIsThinking(true)

      try {
        const bestMove = await getBestMove(
          currentGame.fen(),
          opponent.skillLevel,
          opponent.depth,
        )

        if (bestMove === '0000' || !bestMove) {
          setIsThinking(false)
          return
        }

        const from = bestMove.slice(0, 2)
        const to = bestMove.slice(2, 4)
        const promotion = bestMove.length > 4 ? bestMove[4] : undefined

        // Check if target square has a piece (capture)
        const targetPiece = currentGame.get(to as any)

        const move = currentGame.move({ from, to, promotion })

        if (move) {
          if (targetPiece) {
            setCapturedByEngine((prev) => [
              ...prev,
              { type: targetPiece.type, color: targetPiece.color },
            ])
          }

          setGame(new Chess(currentGame.fen()))
          setBoardFen(currentGame.fen())
          setLastMove({ from, to })
          setMoveCount(currentGame.moveNumber() * 2 - 1)
          setHintSquare(null)

          // Check for game end
          if (currentGame.isGameOver()) {
            if (currentGame.isCheckmate()) {
              handleGameEnd('loss', currentGame)
            } else {
              handleGameEnd('draw', currentGame)
            }
          }
        }
      } catch {
        // Engine failed — set flag for fallback UI
        setEngineFailed(true)
      }

      setIsThinking(false)
    },
    [opponent, getBestMove, handleGameEnd],
  )

  const handlePlayerMove = useCallback(
    (from: string, to: string): boolean => {
      if (isThinking || gameState !== 'playing') return false

      const gameCopy = new Chess(game.fen())

      // Check if target square has a piece (capture)
      const targetPiece = gameCopy.get(to as any)

      let move
      try {
        move = gameCopy.move({ from, to, promotion: 'q' })
      } catch {
        return false
      }

      if (!move) return false

      // Save fen for undo
      undoStackRef.current.push(game.fen())

      if (targetPiece) {
        setCapturedByPlayer((prev) => [
          ...prev,
          { type: targetPiece.type, color: targetPiece.color },
        ])
      }

      setGame(new Chess(gameCopy.fen()))
      setBoardFen(gameCopy.fen())
      setLastMove({ from, to })
      setMoveCount(gameCopy.moveNumber() * 2 - (gameCopy.turn() === 'w' ? 0 : 1))
      setHintSquare(null)

      // Check for game end after player move
      if (gameCopy.isGameOver()) {
        if (gameCopy.isCheckmate()) {
          handleGameEnd('win', gameCopy)
        } else {
          handleGameEnd('draw', gameCopy)
        }
        return true
      }

      // Let the engine respond
      setTimeout(() => makeEngineMove(gameCopy), 300)

      return true
    },
    [game, isThinking, gameState, handleGameEnd, makeEngineMove],
  )

  const handleUndo = useCallback(() => {
    // Undo both the engine's move and the player's move
    const prevFen = undoStackRef.current.pop()
    if (!prevFen) return

    stopEngine()

    const restored = new Chess(prevFen)
    setGame(restored)
    setBoardFen(restored.fen())
    setLastMove(null)
    setHintSquare(null)
    setIsThinking(false)
    setMoveCount(restored.moveNumber() * 2 - (restored.turn() === 'w' ? 0 : 1))

    // Approximate captured pieces reset — just pop the last captures
    setCapturedByPlayer((prev) => prev.slice(0, -1))
    setCapturedByEngine((prev) => prev.slice(0, -1))
  }, [stopEngine])

  const handleHint = useCallback(async () => {
    if (isThinking || !opponent) return

    try {
      // Use a higher skill level for hints so kids get good suggestions
      const hintMove = await getBestMove(game.fen(), 15, 10)
      if (hintMove && hintMove !== '0000') {
        const from = hintMove.slice(0, 2)
        setHintSquare(from)
        // Clear hint after 3 seconds
        setTimeout(() => setHintSquare(null), 3000)
      }
    } catch {
      // Hint failed silently
    }
  }, [isThinking, opponent, game, getBestMove])

  const handleResign = useCallback(() => {
    if (gameState !== 'playing') return
    handleGameEnd('loss', game)
  }, [game, gameState, handleGameEnd])

  const handlePlayAgain = useCallback(() => {
    if (opponent) {
      startGame(opponent)
    }
  }, [opponent, startGame])

  const handleChangeOpponent = useCallback(() => {
    stopEngine()
    setGameState('selecting')
    setGameResult(null)
  }, [stopEngine])

  // ---------- RENDER ----------

  // Engine failure fallback
  if (engineFailed) {
    return (
      <div className="rounded-2xl border border-[#e8614d]/20 bg-[#e8614d]/5 p-8 text-center">
        <span className="text-5xl">😅</span>
        <h2 className="mt-3 font-heading text-xl font-bold text-[#0c1b33]">
          Oops! The chess engine couldn&apos;t load
        </h2>
        <p className="mt-2 text-sm text-[#0c1b33]/60">
          Your browser might not support WebAssembly. Try using Chrome or Edge!
        </p>
        <a
          href="/dashboard/practice/chess-puzzles"
          className="mt-4 inline-block rounded-xl bg-[#d4a843] px-6 py-3 text-sm font-semibold text-[#0c1b33] transition-colors hover:bg-[#d4a843]/90"
        >
          ♟️ Try Chess Puzzles Instead
        </a>
      </div>
    )
  }

  // Opponent selection screen
  if (gameState === 'selecting') {
    return (
      <OpponentSelect
        onSelect={startGame}
        opponentStats={opponentStats}
      />
    )
  }

  if (!opponent) return null

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Board + Controls */}
        <div className="flex-1 min-w-0">
          <GameBoard
            fen={boardFen}
            orientation={playerColor}
            onMove={handlePlayerMove}
            disabled={isThinking || gameState === 'finished'}
            lastMove={lastMove}
            hintSquare={hintSquare}
          />
          <div className="mt-4">
            <GameControls
              moveCount={moveCount}
              onNewGame={handlePlayAgain}
              onUndo={handleUndo}
              onHint={handleHint}
              onResign={handleResign}
              canUndo={undoStackRef.current.length > 0}
              isThinking={isThinking}
              gameOver={gameState === 'finished'}
              capturedByPlayer={capturedByPlayer}
              capturedByEngine={capturedByEngine}
              playerColor={playerColor}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <GameSidebar
            opponent={opponent}
            isThinking={isThinking}
            stats={stats}
            opponentRecord={opponentStats[opponent.id] ?? { wins: 0, losses: 0, draws: 0 }}
            onChangeOpponent={handleChangeOpponent}
          />
        </div>
      </div>

      {/* Game Result Overlay */}
      {gameResult && (
        <GameResult
          result={gameResult}
          opponent={opponent}
          ratingChange={ratingChange}
          xpEarned={xpEarned}
          onPlayAgain={handlePlayAgain}
          onChangeOpponent={handleChangeOpponent}
        />
      )}
    </div>
  )
}
