# Decision: Chess Puzzles Phase 1 — Architecture Choices

**Author:** Rusty (Full-stack Developer)
**Date:** 2026-07-22
**Status:** IMPLEMENTED

---

## Context

Built the Phase 1 chess puzzle system as a production-ready feature for students. Needed to deliver a working puzzle-solving experience that follows quality gates (no mock data, real server actions, server-side rating).

## Key Decisions

### 1. Bundled Puzzle Data (not API)
Chose to bundle ~200 curated puzzles in `src/lib/chess/puzzles.ts` rather than fetch from Lichess API at runtime. Reasons:
- Zero external dependency for core functionality
- Works without Supabase or internet connectivity in dev
- Instant puzzle loading (no API latency)
- Phase 2 can add a Lichess puzzle fetch layer on top

### 2. Server-Side Elo Only
All rating calculation happens in the server action (`submitPuzzleAttempt`). Client never computes or proposes a rating — it only receives the result. This prevents manipulation and follows quality gate §1.3.

### 3. Supabase-Optional Pattern
Used the existing `supabaseConfigured()` pattern:
- Without Supabase: new player defaults (1200 rating, 0 solved), puzzle selection works, XP not persisted
- With Supabase: full persistence to `chess_puzzle_attempts` and `xp_events` tables
- Dynamic imports of Supabase client inside conditionals to avoid build-time errors

### 4. react-chessboard v5 (Options API)
Installed react-chessboard v5.x which uses an `options` prop pattern instead of flat props. This is the version compatible with React 19.

### 5. Puzzle Solution Flow
- First move in `moves[]` is the opponent's setup move (played automatically)
- Remaining moves alternate: player move, opponent response, player move, etc.
- Player sees the position after the setup move and must find the correct continuation

## Files Created/Modified

**New files:**
- `src/lib/chess/puzzles.ts` — 200+ curated puzzles
- `src/lib/chess/queries.ts` — getNextPuzzle, getChessPlayerStats
- `src/app/(dashboard)/dashboard/practice/chess-puzzles/actions.ts` — submitPuzzleAttempt server action
- `src/app/(dashboard)/dashboard/practice/chess-puzzles/page.tsx` — main puzzle page
- `src/components/chess/PuzzleBoard.tsx` — interactive chessboard
- `src/components/chess/PuzzleControls.tsx` — hint/skip/solution buttons
- `src/components/chess/PuzzleStats.tsx` — rating and stats display
- `src/components/chess/PuzzleGame.tsx` — orchestrator client component

**Modified files:**
- `src/types/index.ts` — added ChessPuzzle, PuzzleAttempt, ChessPlayerStats types
- `src/app/(dashboard)/dashboard/practice/page.tsx` — replaced ComingSoon with chess card + coming soon cards
- `src/app/(dashboard)/dashboard/[track]/page.tsx` — chess track gets active Chess Puzzles link

## Phase 2 Opportunities
- Lichess API integration for unlimited puzzles
- Supabase tables: `chess_puzzle_attempts`, expanded `xp_events`
- Puzzle history/review page
- Daily puzzle challenge
- Leaderboard
