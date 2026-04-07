// @ts-nocheck
'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { rateLimit } from '@/lib/rate-limit'
import { getPuzzleById } from '@/lib/chess/puzzles'
import { getChessPlayerStats } from '@/lib/chess/queries'

// ─── Validation ──────────────────────────────────────────────────────────────

const submitPuzzleSchema = z.object({
  puzzleId: z.string().min(1, 'Puzzle ID is required'),
  solved: z.boolean(),
  timeMs: z.number().min(0).max(600_000), // max 10 minutes
  studentId: z.string().min(1, 'Student ID is required'),
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

function supabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

/**
 * Simplified Elo rating calculation.
 * K=32 for beginners (<1400), K=16 for experienced players.
 */
function calculateNewRating(
  currentRating: number,
  puzzleRating: number,
  solved: boolean,
): number {
  const K = currentRating < 1400 ? 32 : 16
  const expected = 1 / (1 + Math.pow(10, (puzzleRating - currentRating) / 400))
  const score = solved ? 1 : 0
  const newRating = Math.round(currentRating + K * (score - expected))
  return Math.max(100, newRating) // Floor at 100
}

/**
 * Calculate XP earned based on puzzle difficulty relative to player rating.
 * Harder puzzles = more XP. Range: 10–50 XP.
 */
function calculateXpEarned(
  playerRating: number,
  puzzleRating: number,
  solved: boolean,
): number {
  if (!solved) return 0
  const diff = puzzleRating - playerRating
  // Base 10 XP, +1 per 10 rating points the puzzle is above the player, capped at 50
  const bonus = Math.max(0, Math.floor(diff / 10))
  return Math.min(50, 10 + bonus)
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SubmitPuzzleResult {
  success: boolean
  message: string
  newRating?: number
  ratingChange?: number
  xpEarned?: number
  solved?: boolean
  correctMoves?: string[]
}

// ─── Server Action ───────────────────────────────────────────────────────────

export async function submitPuzzleAttempt(data: {
  puzzleId: string
  solved: boolean
  timeMs: number
  studentId: string
}): Promise<SubmitPuzzleResult> {
  // --- Rate limiting ---
  try {
    const headersList = await headers()
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headersList.get('x-real-ip') ??
      'unknown'
    const limiter = rateLimit(`chess-puzzle:${ip}`, {
      windowSeconds: 60,
      maxRequests: 30,
    })
    if (!limiter.success) {
      return {
        success: false,
        message: 'Too many attempts. Please wait a minute and try again.',
      }
    }
  } catch {
    // Skip in tests
  }

  // --- Validate input ---
  const parsed = submitPuzzleSchema.safeParse(data)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid input.'
    return { success: false, message: firstError }
  }

  const { puzzleId, solved, timeMs, studentId } = parsed.data

  // --- Look up puzzle ---
  const puzzle = getPuzzleById(puzzleId)
  if (!puzzle) {
    return { success: false, message: 'Puzzle not found.' }
  }

  // --- Get current stats ---
  const stats = await getChessPlayerStats(studentId)
  const currentRating = stats.rating

  // --- Calculate new rating (SERVER-SIDE ONLY) ---
  const newRating = calculateNewRating(currentRating, puzzle.rating, solved)
  const ratingChange = newRating - currentRating
  const xpEarned = calculateXpEarned(currentRating, puzzle.rating, solved)

  // The correct solution moves (excluding the setup move)
  const correctMoves = puzzle.moves.slice(1)

  // --- Persist to Supabase when configured ---
  if (supabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()

      // Insert puzzle attempt
      await supabase.from('chess_puzzle_attempts').insert({
        student_id: studentId,
        puzzle_id: puzzleId,
        solved,
        time_ms: timeMs,
        rating_before: currentRating,
        rating_after: newRating,
      })

      // Award XP if solved
      if (xpEarned > 0) {
        await supabase.from('xp_events').insert({
          student_id: studentId,
          xp_amount: xpEarned,
          source: 'chess_puzzle',
          description: `Solved puzzle ${puzzleId} (rating ${puzzle.rating})`,
        })
      }
    } catch {
      // Tables may not exist yet — still return the result
    }
  }

  return {
    success: true,
    message: solved
      ? `Correct! Rating ${ratingChange >= 0 ? '+' : ''}${ratingChange}`
      : `Not quite. The answer was a different move.`,
    newRating,
    ratingChange,
    xpEarned,
    solved,
    correctMoves,
  }
}
