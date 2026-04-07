// @ts-nocheck
/**
 * Server-side queries for the chess puzzle system.
 *
 * When Supabase is configured, queries the database for player stats and
 * attempted puzzles. Without Supabase, returns sensible defaults for new
 * players (rating 1200, 0 solved).
 */

import type { ChessPuzzle, ChessPlayerStats } from '@/types'
import { allPuzzles, getPuzzlesInRange } from './puzzles'

// ─── helpers ─────────────────────────────────────────────────────────────────

function supabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

const DEFAULT_RATING = 1200
const RATING_RANGE = 200

// ─── queries ─────────────────────────────────────────────────────────────────

/**
 * Select a puzzle near the student's rating (±200), avoiding repeats when
 * Supabase is configured.
 */
export async function getNextPuzzle(
  studentId: string,
  rating: number = DEFAULT_RATING,
): Promise<ChessPuzzle> {
  const minRating = Math.max(400, rating - RATING_RANGE)
  const maxRating = rating + RATING_RANGE

  let candidates = getPuzzlesInRange(minRating, maxRating)

  // When Supabase is configured, exclude already-solved puzzles
  if (supabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data: attempts } = await supabase
        .from('chess_puzzle_attempts')
        .select('puzzle_id')
        .eq('student_id', studentId)
        .eq('solved', true)

      if (attempts && attempts.length > 0) {
        const solvedIds = new Set(attempts.map((a: { puzzle_id: string }) => a.puzzle_id))
        const unsolved = candidates.filter((p) => !solvedIds.has(p.id))
        if (unsolved.length > 0) {
          candidates = unsolved
        }
        // If all in range are solved, allow repeats
      }
    } catch {
      // Table may not exist yet — fall through to random selection
    }
  }

  // If no candidates in range, widen to all puzzles
  if (candidates.length === 0) {
    candidates = allPuzzles
  }

  // Pick a random puzzle, weighted toward the student's rating
  const sorted = candidates.sort(
    (a, b) => Math.abs(a.rating - rating) - Math.abs(b.rating - rating),
  )
  // Pick from the closest 10 puzzles randomly
  const topCandidates = sorted.slice(0, Math.min(10, sorted.length))
  const idx = Math.floor(Math.random() * topCandidates.length)
  return topCandidates[idx]
}

/**
 * Return the student's chess stats. Without Supabase, returns new-player defaults.
 */
export async function getChessPlayerStats(
  studentId: string,
): Promise<ChessPlayerStats> {
  const defaults: ChessPlayerStats = {
    rating: DEFAULT_RATING,
    puzzlesSolved: 0,
    puzzlesAttempted: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalXpEarned: 0,
  }

  if (!supabaseConfigured()) {
    return defaults
  }

  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    // Get puzzle attempts
    const { data: attempts } = await supabase
      .from('chess_puzzle_attempts')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })

    if (!attempts || attempts.length === 0) {
      return defaults
    }

    const solved = attempts.filter((a: { solved: boolean }) => a.solved)

    // Calculate current streak (consecutive solved from most recent)
    let currentStreak = 0
    for (const attempt of attempts) {
      if (attempt.solved) {
        currentStreak++
      } else {
        break
      }
    }

    // Calculate best streak
    let bestStreak = 0
    let streak = 0
    for (const attempt of [...attempts].reverse()) {
      if (attempt.solved) {
        streak++
        bestStreak = Math.max(bestStreak, streak)
      } else {
        streak = 0
      }
    }

    // Get latest rating from most recent attempt
    const latestRating = attempts[0]?.rating_after ?? DEFAULT_RATING

    // Get total XP from chess events
    const { data: xpData } = await supabase
      .from('xp_events')
      .select('xp_amount')
      .eq('student_id', studentId)
      .eq('source', 'chess_puzzle')

    const totalXp = xpData?.reduce(
      (sum: number, e: { xp_amount: number }) => sum + e.xp_amount,
      0,
    ) ?? 0

    return {
      rating: latestRating,
      puzzlesSolved: solved.length,
      puzzlesAttempted: attempts.length,
      currentStreak,
      bestStreak,
      totalXpEarned: totalXp,
    }
  } catch {
    // Tables may not exist yet
    return defaults
  }
}
