// @ts-nocheck
/**
 * Server-side queries for the chess game system (Play vs Computer).
 *
 * When Supabase is configured, queries the database for game stats.
 * Without Supabase, returns sensible defaults for new players.
 */

import type { ChessGameStats } from '@/types'

function supabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

const DEFAULT_RATING = 1200

/**
 * Return the student's game stats. Without Supabase, returns new-player defaults.
 */
export async function getChessGameStats(
  studentId: string,
): Promise<ChessGameStats> {
  const defaults: ChessGameStats = {
    rating: DEFAULT_RATING,
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    totalXpEarned: 0,
    currentWinStreak: 0,
  }

  if (!supabaseConfigured()) {
    return defaults
  }

  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    const { data: games } = await supabase
      .from('chess_games')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })

    if (!games || games.length === 0) {
      return defaults
    }

    const wins = games.filter((g) => g.result === 'win').length
    const losses = games.filter((g) => g.result === 'loss').length
    const draws = games.filter((g) => g.result === 'draw').length

    // Current win streak (consecutive wins from most recent)
    let currentWinStreak = 0
    for (const game of games) {
      if (game.result === 'win') {
        currentWinStreak++
      } else {
        break
      }
    }

    // Get latest rating
    const latestRating = games[0]?.rating_after ?? DEFAULT_RATING

    // Total XP from chess games
    const totalXpEarned = games.reduce(
      (sum: number, g: { xp_earned: number }) => sum + g.xp_earned,
      0,
    )

    return {
      rating: latestRating,
      gamesPlayed: games.length,
      wins,
      losses,
      draws,
      totalXpEarned,
      currentWinStreak,
    }
  } catch {
    return defaults
  }
}

/**
 * Get stats broken down by opponent.
 */
export async function getOpponentStats(
  studentId: string,
): Promise<Record<string, { wins: number; losses: number; draws: number }>> {
  const empty: Record<string, { wins: number; losses: number; draws: number }> = {}

  if (!supabaseConfigured()) return empty

  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    const { data: games } = await supabase
      .from('chess_games')
      .select('opponent_id, result')
      .eq('student_id', studentId)

    if (!games) return empty

    const stats: Record<string, { wins: number; losses: number; draws: number }> = {}

    for (const game of games) {
      if (!stats[game.opponent_id]) {
        stats[game.opponent_id] = { wins: 0, losses: 0, draws: 0 }
      }
      if (game.result === 'win') stats[game.opponent_id].wins++
      else if (game.result === 'loss') stats[game.opponent_id].losses++
      else stats[game.opponent_id].draws++
    }

    return stats
  } catch {
    return empty
  }
}
