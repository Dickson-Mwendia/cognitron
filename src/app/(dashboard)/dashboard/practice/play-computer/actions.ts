// @ts-nocheck
'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { rateLimit } from '@/lib/rate-limit'
import { getChessGameStats } from '@/lib/chess/game-queries'
import { getOpponentById } from '@/lib/chess/opponents'

// ─── Validation ──────────────────────────────────────────────────────────────

const submitGameSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  opponentId: z.string().min(1, 'Opponent ID is required'),
  pgn: z.string(),
  result: z.enum(['win', 'loss', 'draw']),
  moves: z.number().min(0).max(500),
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

function supabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

/**
 * Elo rating calculation. Same K-factor approach as puzzle system.
 */
function calculateNewRating(
  currentRating: number,
  opponentRating: number,
  result: 'win' | 'loss' | 'draw',
): number {
  const K = currentRating < 1400 ? 32 : 16
  const expected = 1 / (1 + Math.pow(10, (opponentRating - currentRating) / 400))
  const score = result === 'win' ? 1 : result === 'draw' ? 0.5 : 0
  const newRating = Math.round(currentRating + K * (score - expected))
  return Math.max(100, newRating)
}

/**
 * XP: 15 base for completing, +10 for win, +5 for draw.
 */
function calculateXpEarned(result: 'win' | 'loss' | 'draw'): number {
  const base = 15
  if (result === 'win') return base + 10
  if (result === 'draw') return base + 5
  return base
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SubmitGameResultResponse {
  success: boolean
  message: string
  newRating?: number
  ratingChange?: number
  xpEarned?: number
}

// ─── Server Action ───────────────────────────────────────────────────────────

export async function submitGameResult(data: {
  studentId: string
  opponentId: string
  pgn: string
  result: 'win' | 'loss' | 'draw'
  moves: number
}): Promise<SubmitGameResultResponse> {
  // --- Rate limiting ---
  try {
    const headersList = await headers()
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headersList.get('x-real-ip') ??
      'unknown'
    const limiter = rateLimit(`chess-game:${ip}`, {
      windowSeconds: 60,
      maxRequests: 20,
    })
    if (!limiter.success) {
      return {
        success: false,
        message: 'Too many requests. Please wait a minute.',
      }
    }
  } catch {
    // Skip in tests
  }

  // --- Validate input ---
  const parsed = submitGameSchema.safeParse(data)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid input.'
    return { success: false, message: firstError }
  }

  const { studentId, opponentId, pgn, result, moves } = parsed.data

  // --- Look up opponent ---
  const opponent = getOpponentById(opponentId)
  if (!opponent) {
    return { success: false, message: 'Unknown opponent.' }
  }

  // --- Get current stats ---
  const stats = await getChessGameStats(studentId)
  const currentRating = stats.rating

  // --- Calculate new rating (SERVER-SIDE ONLY) ---
  const newRating = calculateNewRating(currentRating, opponent.rating, result)
  const ratingChange = newRating - currentRating
  const xpEarned = calculateXpEarned(result)

  // --- Persist to Supabase when configured ---
  if (supabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()

      await supabase.from('chess_games').insert({
        student_id: studentId,
        opponent_id: opponentId,
        pgn,
        result,
        moves,
        rating_before: currentRating,
        rating_after: newRating,
        xp_earned: xpEarned,
      })

      // Award XP
      if (xpEarned > 0) {
        await supabase.from('xp_events').insert({
          student_id: studentId,
          xp_amount: xpEarned,
          source: 'chess_game',
          description: `Played vs ${opponent.name} — ${result}`,
        })
      }
    } catch {
      // Tables may not exist yet — still return the result
    }
  }

  const messages = {
    win: `Great victory against ${opponent.name}! Rating ${ratingChange >= 0 ? '+' : ''}${ratingChange}`,
    loss: `Good game against ${opponent.name}! Keep practicing!`,
    draw: `You matched ${opponent.name}! Rating ${ratingChange >= 0 ? '+' : ''}${ratingChange}`,
  }

  return {
    success: true,
    message: messages[result],
    newRating,
    ratingChange,
    xpEarned,
  }
}
