# Chess Phase 2 — Play vs Computer: QA Test Plan

**Author:** Frank (QA Engineer)
**Date:** 2026-07-17
**Status:** 📋 Active — ready for test execution
**Feature:** Play vs Computer (Stockfish WASM) at `/dashboard/practice/play-computer`
**References:** DEC-024 (chess playground spec), Livingston's chess playground spec, Scribe history (2026-04-07 sprint), Quality Gates (2025-04-quality-gates.md)

---

## Overview

This test plan covers Chess Phase 2: "Play vs Computer" — a Stockfish WASM–powered chess game where students play against 6 AI opponents of increasing difficulty. Phase 1 (puzzles) is complete and shipped. This plan validates the full play loop: character selection → game start → move validation → game end → rating + XP → persistence.

**Target users:** Nairobi kids aged 5–17, primarily on budget Android phones and tablets over mobile data.

### Priority Key

| Priority | Meaning | Ship-blocking? |
|----------|---------|----------------|
| **P0** | Must pass before any build is deployed to staging | Yes |
| **P1** | Must pass before any real student touches it | Yes |
| **P2** | Should pass before launch; can note and fix | No |

### Device Matrix

| Device | Viewport | Represents |
|--------|----------|------------|
| iPhone SE / budget Android (Tecno, Infinix) | 375×667 | Nairobi kids on budget phones |
| iPad / Galaxy Tab A | 768×1024 | Tablet — common for home coaching sessions |
| MacBook / desktop | 1440×900 | Coach/admin/parent on laptop |
| Low-end Android (2GB RAM, Android 10) | 360×640 | Floor device — if it works here, it works everywhere |

### Browser Matrix

| Browser | Priority | Notes |
|---------|----------|-------|
| Chrome Android 90+ | P0 | Dominant browser in Kenya |
| Safari iOS 15+ | P1 | iPhone/iPad users |
| Chrome Desktop 100+ | P1 | Coach/admin |
| Firefox Desktop 100+ | P2 | Secondary desktop |
| Samsung Internet | P2 | Some Samsung devices in Nairobi |

---

## 1. Engine — Stockfish WASM & Web Worker Lifecycle

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| ENG-001 | Engine | Stockfish WASM loads successfully on page mount | Engine initializes, Web Worker posts `ready` message, UI shows "Engine ready" or enables the Start Game button within 5s on broadband, 10s on 3G | P0 |
| ENG-002 | Engine | Loading state shown while Stockfish WASM initializes | User sees a spinner or "Initializing chess engine..." message — never a blank screen or broken board | P0 |
| ENG-003 | Engine | Stockfish responds to UCI `isready` command | Worker responds with `readyok` — confirms engine is alive and accepting commands | P0 |
| ENG-004 | Engine | Stockfish returns a valid best move for a given FEN position | Send `position fen [valid FEN]` + `go depth 10`, engine returns `bestmove [valid UCI move]` | P0 |
| ENG-005 | Engine | Stockfish respects `Skill Level` UCI option | Set `setoption name Skill Level value 0` — engine plays noticeably weaker than Skill Level 20 (verified by evaluating move quality across 5+ moves) | P0 |
| ENG-006 | Engine | Web Worker does not block the main UI thread | During engine "thinking" (depth 12+ search), UI remains responsive — user can scroll, tap undo, interact with non-board elements without lag | P0 |
| ENG-007 | Engine | Web Worker is terminated on component unmount | Navigate away from `/dashboard/practice/play-computer` → verify Worker is terminated (no lingering processes, memory freed). Check via DevTools > Application > Service Workers or Performance tab | P1 |
| ENG-008 | Engine | Engine handles rapid sequential commands | Send `go` then immediately `stop` then `go` again — engine should not crash or hang, should respond to the final `go` | P1 |
| ENG-009 | Engine | Engine recovers from an invalid FEN | Send `position fen [garbage string]` — engine should not crash. Error should be caught and logged, not surfaced as unhandled exception | P1 |
| ENG-010 | Engine | Engine handles `stop` command mid-search | Send `go depth 20` then `stop` — engine should stop and return the best move found so far | P1 |
| ENG-011 | Engine | WASM binary loads from same origin (not CDN) | Verify in Network tab: `stockfish.wasm` is served from same domain, not a third-party CDN (CSP compliance) | P1 |
| ENG-012 | Engine | Multiple games in one session don't leak Workers | Start a game → resign → start new game → resign → repeat 10x. Memory usage in DevTools should not grow unboundedly. Each new game should terminate the previous Worker | P1 |
| ENG-013 | Engine | Engine timeout fallback | If engine doesn't respond within 30s, show a user-friendly error ("The chess engine is thinking hard! Please wait or try again") — not a silent hang | P2 |

---

## 2. Gameplay — Chess Rules & Move Validation

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| GPL-001 | Gameplay | Legal pawn move (single square forward) | Pawn moves to target square, board updates, move appears in notation panel | P0 |
| GPL-002 | Gameplay | Legal pawn move (double square from starting rank) | Pawn advances two squares from rank 2/7, board updates correctly | P0 |
| GPL-003 | Gameplay | Pawn capture (diagonal) | Pawn captures opponent piece diagonally, captured piece removed from board | P0 |
| GPL-004 | Gameplay | En passant capture | After opponent's pawn double-advance, player's pawn captures en passant — captured pawn removed from correct square (not the destination square) | P1 |
| GPL-005 | Gameplay | Pawn promotion | Pawn reaching rank 8/1 triggers promotion dialog — player can choose Queen, Rook, Bishop, or Knight. Selected piece replaces pawn on the board | P0 |
| GPL-006 | Gameplay | Pawn promotion to underpromotion (Knight) | Player promotes to Knight instead of Queen — piece is correctly a Knight, not auto-promoted to Queen | P1 |
| GPL-007 | Gameplay | Knight movement (L-shape) | Knight moves in valid L-shape, can jump over pieces | P0 |
| GPL-008 | Gameplay | Bishop movement (diagonal) | Bishop moves diagonally, blocked by pieces in path | P0 |
| GPL-009 | Gameplay | Rook movement (straight lines) | Rook moves horizontally/vertically, blocked by pieces in path | P0 |
| GPL-010 | Gameplay | Queen movement (straight + diagonal) | Queen moves in all 8 directions, blocked by pieces in path | P0 |
| GPL-011 | Gameplay | King movement (one square any direction) | King moves one square in any direction | P0 |
| GPL-012 | Gameplay | Illegal move rejected | Attempt to move a piece to an invalid square (e.g., Knight to adjacent square) — move is rejected, piece returns to original square, no state change | P0 |
| GPL-013 | Gameplay | Cannot move into check | Attempt to move King to a square attacked by opponent — move rejected | P0 |
| GPL-014 | Gameplay | Must resolve check | When in check, only legal moves that resolve check are allowed. Attempting any other move is rejected | P0 |
| GPL-015 | Gameplay | Kingside castling (O-O) | King and Kingside Rook haven't moved, no pieces between them, King not in check and doesn't pass through check — castling executes, both pieces move | P0 |
| GPL-016 | Gameplay | Queenside castling (O-O-O) | King and Queenside Rook haven't moved, no pieces between them, King not in check and doesn't pass through check — castling executes, both pieces move | P1 |
| GPL-017 | Gameplay | Castling blocked (King has moved) | If King has moved earlier in the game, castling is rejected even if King returns to original square | P1 |
| GPL-018 | Gameplay | Castling blocked (through check) | If any square between King's start and end is attacked, castling is rejected | P1 |
| GPL-019 | Gameplay | Check detection and visual indicator | When a move puts the opponent's King in check, King square is highlighted (red border/tint), check sound plays | P0 |
| GPL-020 | Gameplay | Checkmate detection | When no legal moves exist and King is in check → game ends, "Checkmate!" displayed, result recorded | P0 |
| GPL-021 | Gameplay | Stalemate detection | When no legal moves exist but King is NOT in check → game ends as draw, "Stalemate" displayed | P0 |
| GPL-022 | Gameplay | Threefold repetition draw | Same position occurs 3 times → draw is offered or auto-triggered | P2 |
| GPL-023 | Gameplay | 50-move rule draw | 50 moves without a pawn move or capture → draw is offered or auto-triggered | P2 |
| GPL-024 | Gameplay | Insufficient material draw | King vs King, King+Bishop vs King, King+Knight vs King → game auto-draws | P2 |
| GPL-025 | Gameplay | Move notation updates in real time | Each move (player and engine) appears in the algebraic notation panel immediately | P0 |
| GPL-026 | Gameplay | Undo button works (player's last move + engine's response) | Pressing undo removes player's last move AND the engine's response — board reverts to state before player's move | P0 |
| GPL-027 | Gameplay | Undo limit enforced (2 undos per game) | After 2 undos, undo button is disabled/grayed out. Counter shows "0 undos remaining" | P1 |
| GPL-028 | Gameplay | Undo disabled while engine is thinking | Undo button is non-interactive during engine's turn — prevents race condition | P1 |
| GPL-029 | Gameplay | Hint button shows a suggested move | Pressing Hint highlights a legal move (source and destination squares) — does not auto-play it | P1 |
| GPL-030 | Gameplay | Hint limit enforced (3 hints per game) | After 3 hints, hint button is disabled. Counter shows "0 hints remaining" | P1 |
| GPL-031 | Gameplay | Resign button ends game as loss | Player confirms resignation → game ends, result = loss, appropriate message shown | P0 |
| GPL-032 | Gameplay | Resign requires confirmation | Resign button shows a confirmation dialog ("Are you sure?") — prevents accidental resignation | P1 |
| GPL-033 | Gameplay | Engine responds within reasonable time | At Skill Level 0–6, engine responds in <3s. At Skill Level 7–12, <5s. At higher levels, <10s (depth capped at 12 for interactive play per spec) | P1 |
| GPL-034 | Gameplay | Game preserves state on page visibility change | Switch to another tab/app and return — game state, clock, move history all intact | P1 |
| GPL-035 | Gameplay | Sound effects play for moves, captures, check, checkmate | Each event triggers the correct sound: move.mp3, capture.mp3, check.mp3, checkmate.mp3 | P2 |
| GPL-036 | Gameplay | Sound can be muted/unmuted | Audio toggle works, preference persists during the session | P2 |

---

## 3. Opponent AI — Characters & Difficulty Levels

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| OPP-001 | Opponent AI | 6 opponent characters are displayed on character selection screen | All 6 characters render with name, avatar/illustration, difficulty label, and approximate Elo range | P0 |
| OPP-002 | Opponent AI | Characters are ordered by increasing difficulty | Easiest character (e.g., Peanut) appears first, hardest (e.g., The Grandmaster) appears last | P0 |
| OPP-003 | Opponent AI | Selecting a character sets the correct Stockfish Skill Level | Verify via UCI command log or engine state: each character maps to a distinct Skill Level (e.g., Character 1 → Skill 0–2, Character 6 → Skill 16–20) | P0 |
| OPP-004 | Opponent AI | Easiest opponent (Skill 0–2) makes frequent blunders | Play 3 games against easiest opponent — engine hangs pieces, misses obvious tactics, allows simple checkmates. A beginner should be able to win | P0 |
| OPP-005 | Opponent AI | Hardest opponent (Skill 16–20) plays near-perfect chess | Play 3 games against hardest opponent — engine finds strong tactical and positional moves. Only very strong players should compete | P1 |
| OPP-006 | Opponent AI | Mid-level opponents show progressive difficulty increase | Play 1 game each against characters 2, 3, 4, 5 — difficulty should be perceptibly increasing (fewer blunders, better tactics at each level) | P1 |
| OPP-007 | Opponent AI | Selected character's name/avatar shown during gameplay | During the game, the opponent area shows the character's name and avatar — not "Stockfish" or a generic label | P0 |
| OPP-008 | Opponent AI | Character-appropriate messages display during gameplay | Kid-friendly encouragement messages appear ("Great strategy!", "You're learning!") — no punishing language, no "You blundered!" | P1 |
| OPP-009 | Opponent AI | Character selection persists into post-game screen | After game ends, the result screen shows which character was played against (name + avatar) | P1 |
| OPP-010 | Opponent AI | Character selection is required before starting a game | User cannot start a game without selecting an opponent — Start Game button disabled until character is chosen | P1 |
| OPP-011 | Opponent AI | Each character has a distinct visual identity | All 6 characters have unique avatars/illustrations — no placeholders, no broken images, no duplicate art | P1 |
| OPP-012 | Opponent AI | Difficulty labels are kid-friendly | Labels use age-appropriate language (e.g., "Beginner", "Tricky", "Expert") — not raw Elo numbers for younger tiers. Learn tier students see level names, not "Skill Level 2" | P1 |

---

## 4. UI/UX — Board Rendering, Interactions, Responsiveness

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| UIX-001 | UI/UX | Chess board renders correctly at `/dashboard/practice/play-computer` | 8×8 board with alternating colored squares, all 32 pieces in correct starting positions | P0 |
| UIX-002 | UI/UX | Pieces can be moved via drag-and-drop (desktop) | Click and drag a piece to a legal square — piece follows cursor smoothly, snaps to target square on release | P0 |
| UIX-003 | UI/UX | Pieces can be moved via tap-tap (mobile) | Tap a piece (highlights it + shows legal move dots), tap a destination square — piece moves. Tap-tap is default on mobile per spec | P0 |
| UIX-004 | UI/UX | Legal move indicators shown on piece selection | When a piece is selected (clicked/tapped), legal destination squares are highlighted with green dots or circles | P0 |
| UIX-005 | UI/UX | Board renders correctly on mobile (375×667) | Board is full-width, pieces are visible and tappable (no overlap, no cut-off). Notation panel is collapsed or below the board | P0 |
| UIX-006 | UI/UX | Board renders correctly on tablet (768×1024) | Board is ~600×600px, notation panel beside or below. All controls accessible | P0 |
| UIX-007 | UI/UX | Board renders correctly on desktop (1440×900) | Board is ~800×800px, notation panel on the right side | P1 |
| UIX-008 | UI/UX | Board auto-flips when player is Black | If player chooses Black, board renders with Black pieces on bottom | P1 |
| UIX-009 | UI/UX | Move animation plays when pieces move | Pieces animate smoothly from source to destination square (not teleporting) — applies to both player and engine moves | P1 |
| UIX-010 | UI/UX | Captured piece animation/removal | Captured piece is removed from the board with visual feedback (fade or capture animation) | P2 |
| UIX-011 | UI/UX | Last move highlighted on board | The most recent move's source and destination squares are highlighted (yellow/blue tint) | P1 |
| UIX-012 | UI/UX | Character selection screen is visually appealing and kid-friendly | Characters are colorful, illustrated (not stock photos), with clear difficulty progression visual (stars, badges, or size) | P1 |
| UIX-013 | UI/UX | Game controls (Undo, Hint, Resign) are clearly visible and accessible | Buttons are prominently placed, labeled with both icon and text, not hidden behind menus on mobile | P0 |
| UIX-014 | UI/UX | Post-game result screen displays correctly | Shows: Win/Loss/Draw, character played, XP earned, rating change (if applicable), Rematch and New Game buttons | P0 |
| UIX-015 | UI/UX | Rematch button starts new game with same opponent | After game ends, clicking Rematch starts a fresh game against the same character | P1 |
| UIX-016 | UI/UX | New Game button returns to character selection | After game ends, clicking New Game navigates back to character selection screen | P1 |
| UIX-017 | UI/UX | "Engine thinking" indicator shown during opponent's turn | A visual indicator (spinner, pulsing avatar, "Thinking..." text) shows while Stockfish calculates | P0 |
| UIX-018 | UI/UX | Board is not interactive during engine's turn | Player cannot move pieces or click squares while engine is calculating — prevents race conditions | P0 |
| UIX-019 | UI/UX | Navigation: Back button returns to practice hub | "← Back" link navigates to `/dashboard/practice` (Phase 1 practice hub) without losing state elsewhere | P1 |
| UIX-020 | UI/UX | No layout shift during engine loading | Board and controls render with correct dimensions before Stockfish WASM finishes loading — no CLS | P1 |
| UIX-021 | UI/UX | Touch targets meet minimum 44×44px | All tappable elements (pieces, buttons, squares) are at least 44×44px on mobile per WCAG 2.5.5 | P1 |
| UIX-022 | UI/UX | Notation panel scrolls on long games | After 20+ moves, notation panel scrolls and auto-scrolls to the latest move | P2 |
| UIX-023 | UI/UX | Encouragement messages for young learners (Learn tier, 5–8) | Younger students see "Great job! 🎉", "Keep it up! 💪" — never "You lost" or negative language | P1 |

---

## 5. Rating — Elo Calculation & Integrity

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| RAT-001 | Rating | Rating calculation happens server-side only | Inspect Network tab: rating change is returned from a Supabase server action or API route — never calculated in client JS | P0 |
| RAT-002 | Rating | Win against engine increases game rating | Player wins → `rating_change` is positive. Amount matches expected Glicko-2/Elo calculation for the opponent Elo | P0 |
| RAT-003 | Rating | Loss against engine decreases game rating | Player loses → `rating_change` is negative | P0 |
| RAT-004 | Rating | Draw results in small rating change | Draw → rating change is near zero (slightly positive if opponent Elo is higher, slightly negative if lower) | P1 |
| RAT-005 | Rating | Rating change reflects opponent strength | Beating a harder opponent (higher Elo) awards more rating than beating an easier opponent | P1 |
| RAT-006 | Rating | New player starts at default rating (1200) | A student playing their first game has `starting_rating = 1200` (default per spec) | P0 |
| RAT-007 | Rating | Rating is persisted to `ratings` table in Supabase | After game ends, query `ratings` table — `rating`, `rating_deviation`, `last_updated` are all updated | P0 |
| RAT-008 | Rating | Rating history entry created | After game ends, a new row exists in `rating_history` with correct `rating_change`, `event_type`, and `event_id` | P1 |
| RAT-009 | Rating | Games with undo used do NOT change rating | If `undo_count > 0`, game is marked "casual" — `rating_change = 0`, no row in `rating_history` | P1 |
| RAT-010 | Rating | Rating displayed on post-game screen | Result screen shows: old rating → new rating (with +/- change highlighted green/red) | P1 |
| RAT-011 | Rating | Rating displayed on character selection screen | Player's current game rating shown before starting a game — helps them choose appropriate opponent | P2 |
| RAT-012 | Rating | Client cannot send a fabricated rating change | Attempt to intercept the API call and send a modified `rating_change` value — server should ignore client-provided rating values and calculate its own | P0 |

---

## 6. XP — Rewards & Persistence

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| XPR-001 | XP | Win awards 25 XP | Player wins a game → `xp_earned = 25` shown on result screen and persisted to Supabase | P0 |
| XPR-002 | XP | Draw awards 15 XP | Player draws → `xp_earned = 15` | P0 |
| XPR-003 | XP | Loss awards 10 XP (participation) | Player loses → `xp_earned = 10` (no zero XP for losing — participation is rewarded) | P0 |
| XPR-004 | XP | Giant-killer bonus: 40 XP for beating opponent 200+ Elo higher | Player (rated 1200) beats character with Elo 1400+ → `xp_earned = 40` instead of 25 | P1 |
| XPR-005 | XP | XP is persisted to student's profile in Supabase | After game ends, student's total XP in `profiles` table increases by the correct amount | P0 |
| XPR-006 | XP | XP is reflected in the student dashboard | Navigate to student dashboard after a game — total XP and XP bar reflect the newly earned XP | P1 |
| XPR-007 | XP | Resignation awards 0 XP | Player resigns → `xp_earned = 0`, no XP added to profile | P1 |
| XPR-008 | XP | XP cannot be manipulated client-side | Inspect the API request — XP is calculated server-side based on game result, not sent from the client | P0 |
| XPR-009 | XP | Weekly bonus: 50 XP for 5 games in a week | Play 5 games within a calendar week → 50 bonus XP is awarded (verify in Supabase) | P2 |
| XPR-010 | XP | First game badge ("First Move") awarded | Complete the very first chess game → "First Move" badge (♟️) is earned and visible in profile | P2 |

---

## 7. Game History & Data Persistence

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| DAT-001 | Data | Game is saved to `games` (or `chess_games`) table after completion | After game ends, a new row exists with: `game_id`, `student_id`, `mode='vs_engine'`, `engine_skill_level`, `result`, `pgn`, `xp_earned`, `created_at` | P0 |
| DAT-002 | Data | PGN is correctly formatted and complete | Stored PGN contains headers (Event, Date, White, Black, Result) and all moves in standard algebraic notation — can be imported into any chess app | P0 |
| DAT-003 | Data | Character choice is stored in game record | Game record includes which character was played against (character ID or name) | P1 |
| DAT-004 | Data | Game duration is recorded | `duration_seconds` accurately reflects the elapsed time from first move to game end | P2 |
| DAT-005 | Data | Undo count is recorded | `undo_count` matches the number of times undo was used during the game | P1 |
| DAT-006 | Data | Game record includes student's color | `student_color` is correctly set to 'white' or 'black' | P1 |
| DAT-007 | Data | Resigned game is recorded correctly | `result = 'loss'` and game is saved with however many moves were played | P1 |
| DAT-008 | Data | Game history is queryable | Student can view their past games (future feature wire-up) — data is structured correctly for querying by date, opponent, result | P2 |
| DAT-009 | Data | No game data saved if user abandons before first move | If user enters game screen then navigates away without making a move, no row is inserted into the games table | P1 |

---

## 8. Edge Cases — Error Handling & Recovery

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| EDG-001 | Edge Case | Browser does not support WASM | Show clear error message: "Your browser doesn't support this feature. Please update to a newer version of Chrome, Firefox, or Safari." — no crash, no blank screen | P0 |
| EDG-002 | Edge Case | Browser does not support Web Workers | Show clear error message, fallback to "feature unavailable" state — not a crash | P1 |
| EDG-003 | Edge Case | Stockfish WASM fails to load (network error) | Show retry button: "Chess engine failed to load. [Try Again]" — log error for monitoring | P0 |
| EDG-004 | Edge Case | Stockfish crashes mid-game | Detect Worker termination → show recovery dialog: "Something went wrong. [Resume Game] [New Game]". If game state is in chess.js, offer to restart engine and continue | P0 |
| EDG-005 | Edge Case | Network loss during game | Game continues (Stockfish runs locally) — but warn user that game won't be saved until connection returns. On reconnect, persist the result | P1 |
| EDG-006 | Edge Case | Network loss on game completion (can't save result) | Queue the game result locally → retry save on reconnect. Show "Game saved" only when confirmed by server. Show "Game will be saved when you're back online" if offline | P0 |
| EDG-007 | Edge Case | Rapid resign → new game → resign cycle | Rapidly resign and start 10 games in <30 seconds — no crashes, no duplicate game records, no orphaned Workers | P1 |
| EDG-008 | Edge Case | Browser tab backgrounded for 5+ minutes during game | Return to tab → game state intact, engine still responsive. If Worker was killed by OS (mobile), re-initialize and restore game state from chess.js | P1 |
| EDG-009 | Edge Case | User navigates away mid-game (no resign) | Show confirmation dialog: "You have a game in progress. Leave and lose?" — prevents accidental abandonment | P1 |
| EDG-010 | Edge Case | Double-click on a piece or square | No duplicate moves, no state corruption. Rapid clicks are debounced | P1 |
| EDG-011 | Edge Case | User opens multiple game tabs simultaneously | Second tab should either: (a) detect existing game and redirect, or (b) run independently. No shared state corruption | P2 |
| EDG-012 | Edge Case | Stockfish WASM file is > 1.2MB — slow 3G load | Loading indicator with progress (if possible) or "Loading chess engine..." text. Timeout at 60s with retry option. Tested on Chrome DevTools 3G throttle | P1 |
| EDG-013 | Edge Case | User is unauthenticated | Redirect to login. No game played without authentication — server actions should reject unauthenticated requests | P0 |

---

## 9. Accessibility — Keyboard, Screen Reader, Contrast

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| A11-001 | Accessibility | Board is keyboard-navigable | User can tab to the board, use arrow keys to navigate squares, Enter to select/move a piece. Focus indicator is visible on the active square | P1 |
| A11-002 | Accessibility | Screen reader announces piece positions | Each square is announced as "[Piece] on [Square]" (e.g., "White Knight on g1"). Empty squares are announced as "Empty [Square]" | P1 |
| A11-003 | Accessibility | Screen reader announces moves | When a move is made (player or engine), screen reader announces "[Piece] moves from [source] to [destination]" or the SAN notation | P1 |
| A11-004 | Accessibility | Screen reader announces check and checkmate | "Check" and "Checkmate" are announced via ARIA live region when they occur | P1 |
| A11-005 | Accessibility | Game controls have accessible labels | Undo, Hint, Resign buttons have `aria-label` or visible text labels. Icon-only buttons have `aria-label` | P1 |
| A11-006 | Accessibility | Color contrast meets WCAG AA (4.5:1 for text) | All text (move notation, labels, buttons, messages) meets 4.5:1 contrast ratio. Board squares need not meet this (visual convention), but piece colors must be distinguishable | P1 |
| A11-007 | Accessibility | Focus is not trapped | User can tab through all interactive elements (board, controls, navigation) and eventually tab out of the component. No focus traps | P1 |
| A11-008 | Accessibility | Character selection is keyboard-accessible | Characters can be selected using Tab + Enter/Space. Selected character has visible focus ring | P1 |
| A11-009 | Accessibility | Animations respect `prefers-reduced-motion` | If user has reduced-motion OS setting, piece animations are instant (no sliding), confetti/celebrations are suppressed | P2 |
| A11-010 | Accessibility | Touch targets are 44×44px minimum on mobile | All tappable elements (board squares at mobile viewport, buttons) meet WCAG 2.5.5 Target Size | P1 |
| A11-011 | Accessibility | No information conveyed by color alone | Check indicators, legal move dots, last-move highlights use shape/icon in addition to color (for color-blind users) | P2 |

---

## 10. Performance — UI Responsiveness & Memory

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| PRF-001 | Performance | Page load time < 3s on broadband | `/dashboard/practice/play-computer` reaches interactive state within 3s on broadband (Lighthouse or WebPageTest) | P1 |
| PRF-002 | Performance | Page load time < 8s on 3G throttle | With Chrome DevTools 3G throttle, page is usable within 8s (board renders, character selection works). WASM may still be loading | P1 |
| PRF-003 | Performance | Chess components are code-split (lazy loaded) | Verify in Network tab: chess board, react-chessboard, and Stockfish WASM are loaded via dynamic import, not in the main bundle. Route-level code splitting via `next/dynamic` with `ssr: false` | P1 |
| PRF-004 | Performance | No memory leak after 10 consecutive games | Play 10 games (mix of wins, losses, resigns) in one session. Check DevTools > Memory: heap size should not grow by more than 20% from game 1 to game 10 | P1 |
| PRF-005 | Performance | Engine "thinking" does not cause frame drops | During Stockfish search, main thread FPS stays above 30fps (check DevTools > Performance tab). No janky scrolling or unresponsive UI | P0 |
| PRF-006 | Performance | WASM binary is cached after first load | Second visit to the page loads WASM from browser cache (check Network tab: 304 or disk cache). Proper `Cache-Control` headers on `.wasm` file | P2 |
| PRF-007 | Performance | Low-end device (2GB RAM) doesn't crash | On a budget Android phone (or Chrome DevTools with 2GB memory simulation), complete a full game without OOM crash or tab reload | P1 |
| PRF-008 | Performance | No Cumulative Layout Shift (CLS) | Board, controls, and character selection render without layout shifts. Lighthouse CLS score < 0.1 | P2 |

---

## 11. Security — CSP, WASM, Anti-Cheat

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| SEC-001 | Security | CSP allows WASM execution | `Content-Security-Policy` header includes `wasm-unsafe-eval` (or equivalent) in `script-src`. Verify in browser console: no CSP violations when loading Stockfish WASM | P0 |
| SEC-002 | Security | CSP does not over-permit | CSP is scoped to allow WASM only — no unnecessary `unsafe-eval` for non-WASM scripts. Review the CSP header: `'wasm-unsafe-eval'` is preferred over broad `'unsafe-eval'` if browser support allows | P1 |
| SEC-003 | Security | Rating cannot be manipulated via API tampering | Use browser DevTools to intercept the game-end API call and modify `rating_change` or `result` — server should reject or ignore client-provided values and compute its own from the PGN/game state | P0 |
| SEC-004 | Security | XP cannot be manipulated via API tampering | Same as SEC-003 but for `xp_earned` — server calculates XP from game result, not client input | P0 |
| SEC-005 | Security | Game result is validated server-side | Server re-validates the game result (win/loss/draw) from the PGN — a client claiming "win" with a PGN showing checkmate against them should be rejected or corrected | P1 |
| SEC-006 | Security | Authentication required for all game API endpoints | All server actions/API routes that save games, update ratings, or award XP require a valid Supabase session token. Unauthenticated requests return 401 | P0 |
| SEC-007 | Security | Student can only save games to their own profile | Attempt to save a game with a different `student_id` — server should reject or override with the authenticated user's ID (RLS policy) | P1 |
| SEC-008 | Security | PGN input is sanitized | If PGN is sent from client, server validates it's well-formed PGN — no SQL injection via PGN text field | P1 |
| SEC-009 | Security | No sensitive data exposed in client bundle | Stockfish settings, rating algorithm constants, and server API keys are not visible in the client-side JS bundle | P1 |
| SEC-010 | Security | CSP update does not regress existing security | After adding `wasm-unsafe-eval`, verify all existing CSP protections still work: `frame-ancestors 'none'`, XSS protection, no inline script execution beyond what's already permitted | P0 |

---

## Quality Gate Compliance (per 2025-04-quality-gates.md)

These items verify the feature meets the team's quality gates established after the dashboard audit.

| ID | Category | Test Case | Expected Result | Priority |
|----|----------|-----------|-----------------|----------|
| QGT-001 | Quality Gate | No mock data imports in game components | Search all files under `/dashboard/practice/play-computer` for `mock*` imports — none found | P0 |
| QGT-002 | Quality Gate | No setTimeout faking save operations | No `setTimeout` used near `toast.success` or state setters to simulate saves. All persistence hits real Supabase | P0 |
| QGT-003 | Quality Gate | All buttons have functional handlers | Every `<Button>` and `<button>` in the feature has an `onClick` or form action that performs real work | P0 |
| QGT-004 | Quality Gate | No links to marketing pages from dashboard | No `<Link href="/contact">` or similar marketing-page links in the game feature | P0 |
| QGT-005 | Quality Gate | Empty state handled for new players | A student with 0 games sees a welcoming onboarding state ("Choose your first opponent!") — not mock data or a blank screen | P0 |
| QGT-006 | Quality Gate | Error states handled | If Supabase save fails, user sees an error toast — never a phantom success toast | P0 |
| QGT-007 | Quality Gate | User identity from auth session | Player name, rating, XP all come from the authenticated Supabase session — no hardcoded values | P0 |

---

## Test Execution Notes

### Total Test Cases: 130

| Category | Count | P0 | P1 | P2 |
|----------|-------|----|----|-----|
| Engine | 13 | 6 | 6 | 1 |
| Gameplay | 36 | 14 | 16 | 6 |
| Opponent AI | 12 | 4 | 8 | 0 |
| UI/UX | 23 | 8 | 12 | 3 |
| Rating | 12 | 5 | 5 | 2 |
| XP | 10 | 4 | 3 | 3 |
| Data | 9 | 2 | 5 | 2 |
| Edge Cases | 13 | 4 | 7 | 2 |
| Accessibility | 11 | 0 | 9 | 2 |
| Performance | 8 | 1 | 5 | 2 |
| Security | 10 | 5 | 4 | 1 |
| Quality Gate | 7 | 7 | 0 | 0 |
| **TOTAL** | **164** | **60** | **80** | **24** |

### Blocking Assessment

- **60 P0 tests** must pass before staging deploy
- **80 P1 tests** must pass before any real student plays
- **24 P2 tests** should pass before public launch, can be tracked as issues

### CSP Gap — Immediate Action Required

The current `next.config.ts` CSP has `'unsafe-eval'` in `script-src` but does **not** include `'wasm-unsafe-eval'`. Stockfish WASM requires either:
1. `'wasm-unsafe-eval'` (preferred — scoped to WASM only, supported in Chrome 97+, Firefox 102+, Safari 16+)
2. `'unsafe-eval'` (already present — works but over-permits)

**Current state:** `'unsafe-eval'` is present, so WASM *will* load — but this is broader than necessary. Recommend Rusty scopes it to `'wasm-unsafe-eval'` and tests on the browser matrix above.

### Test Environment Requirements

1. **Supabase project** with `games` (or `chess_games`), `ratings`, `rating_history` tables provisioned
2. **Test student accounts** at each tier (Learn, Play, Compete, Excel) with known starting ratings
3. **Device lab or BrowserStack** for mobile testing (Tecno Spark, Infinix Hot, Samsung Galaxy A-series)
4. **3G network throttle** for performance tests (Chrome DevTools or network conditioner)

### How to Mark Results

Test each case. Mark **Pass (✅)**, **Fail (❌)**, or **Blocked (🚫)** in a Status column. Add notes for any failures. Every P0 failure is a deploy blocker.

---

*If it ships broken, someone wasn't paying attention. That someone is never me.* — Frank
