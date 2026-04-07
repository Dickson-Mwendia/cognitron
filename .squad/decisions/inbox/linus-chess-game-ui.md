# Chess Phase 2 — Play vs Computer: UI Design Spec

**Author:** Linus (Product Designer)
**Date:** 2025-07-18
**Status:** 📋 Proposed
**Route:** `/dashboard/practice/play-computer`

---

## Design Principles

1. **Kid-first** — Large touch targets, playful character art, zero punishing language
2. **Mobile-first** — Nairobi parents browse on phones; board must be full-width on mobile
3. **Consistent with Phase 1** — Same color palette, card styling, font stack as PuzzleGame
4. **Encouraging always** — Wins celebrate big, losses encourage gently, draws praise effort

### Color Palette (inherited)

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0c1b33` | Text, dark squares, primary bg |
| Gold | `#d4a843` | Accents, XP, highlights |
| Teal | `#2a9d8f` | Success, encouragement, hints |
| Coral | `#e8614d` | Check indicator only — **never** used for loss/negative messaging |
| Cream | `#e8dcc8` | Light squares, warm backgrounds |

---

## 1. Opponent Selection Screen

**Route:** `/dashboard/practice/play-computer` (initial view before game starts)

### Layout: Responsive Grid

```
Mobile (< 768px):          Desktop (≥ 1024px):
┌──────────────────┐       ┌──────────────────────────────────────┐
│ ← Practice Arena │       │ ← Practice Arena                     │
│                  │       │                                      │
│ Choose Your      │       │ Choose Your Opponent                 │
│ Opponent         │       │ Pick a challenger that matches your  │
│                  │       │ skill level                          │
│ ┌──────────────┐ │       │                                      │
│ │  🐣 Peanut   │ │       │ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│ │  ★☆☆☆☆      │ │       │ │🐣Peanut │ │🤖 Bolt  │ │🦊 Sly   ││
│ │  Challenge → │ │       │ │ ★☆☆☆☆  │ │ ★★☆☆☆  │ │ ★★★☆☆  ││
│ └──────────────┘ │       │ └─────────┘ └─────────┘ └─────────┘│
│ ┌──────────────┐ │       │ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│ │  🤖 Bolt     │ │       │ │🏰Captain│ │⚔️Knight │ │👑Grand- ││
│ │  ★★☆☆☆      │ │       │ │ Castle  │ │ Rider   │ │ master  ││
│ └──────────────┘ │       │ │ ★★★★☆  │ │ ★★★★★  │ │ 🔒      ││
│      ...         │       │ └─────────┘ └─────────┘ └─────────┘│
└──────────────────┘       └──────────────────────────────────────┘
```

### Container

```tsx
{/* Page wrapper — matches practice/page.tsx pattern */}
<div className="space-y-6 md:space-y-8">
  {/* Breadcrumb */}
  <section>
    <div className="flex items-center gap-2 mb-1">
      <Link
        href="/dashboard/practice"
        className="text-sm text-[#0c1b33]/50 hover:text-[#0c1b33]/80 transition-colors"
      >
        ← Practice Arena
      </Link>
    </div>
    <h1 className="font-heading text-[28px] leading-tight font-bold text-[#0c1b33]">
      Choose Your Opponent
    </h1>
    <p className="text-sm text-[#0c1b33]/60 mt-1">
      Pick a challenger that matches your skill level
    </p>
  </section>

  {/* Opponent Grid */}
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {opponents.map((opponent) => (
      <OpponentCard key={opponent.id} opponent={opponent} />
    ))}
  </section>
</div>
```

### Opponent Data Model

```tsx
interface Opponent {
  id: string
  emoji: string
  name: string
  title: string           // e.g. "The Friendly Beginner"
  description: string     // 1-line flavor text
  difficulty: 1 | 2 | 3 | 4 | 5
  stockfishDepth: number  // maps to Stockfish search depth
  stockfishSkill: number  // maps to Stockfish Skill Level (0-20)
  eloRange: string        // e.g. "400–800"
  unlocked: boolean
  unlockCondition?: string // e.g. "Beat Sly to unlock"
  tauntMessages: {
    greeting: string      // shown when card is selected
    thinking: string      // shown while engine calculates
    playerGoodMove: string
    playerBlunder: string
    winning: string       // opponent is winning
    losing: string        // opponent is losing
  }
}
```

### The Six Opponents

| # | Emoji | Name | Title | Difficulty | Stockfish Skill | Depth | ELO Range | Description |
|---|-------|------|-------|------------|-----------------|-------|-----------|-------------|
| 1 | 🐣 | Peanut | The Friendly Beginner | ★☆☆☆☆ | 0 | 1 | 400–800 | "I'm still learning too! Let's have fun." |
| 2 | 🤖 | Bolt | The Quick Thinker | ★★☆☆☆ | 3 | 3 | 800–1200 | "Beep boop! I calculate fast but make silly mistakes." |
| 3 | 🦊 | Sly | The Tricky Tactician | ★★★☆☆ | 6 | 5 | 1200–1500 | "Watch out for my sneaky tricks!" |
| 4 | 🏰 | Captain Castle | The Steady Strategist | ★★★★☆ | 10 | 8 | 1500–1800 | "I build strong positions. Can you break through?" |
| 5 | ⚔️ | Knight Rider | The Fierce Fighter | ★★★★★ | 14 | 12 | 1800–2200 | "I rarely make mistakes. Bring your best game." |
| 6 | 👑 | The Grandmaster | Supreme Champion | ★★★★★+ | 20 | 18 | 2200+ | "Only the worthy may challenge me." |

### Opponent Card Component: `OpponentCard`

```tsx
{/* UNLOCKED state */}
<button
  onClick={() => selectOpponent(opponent)}
  className="group relative rounded-2xl border border-[#d4a843]/20 bg-white p-6
             transition-all duration-200 hover:shadow-lg hover:border-[#d4a843]
             hover:-translate-y-1 text-left w-full"
>
  {/* Emoji — large, animated on hover */}
  <span className="text-5xl block group-hover:scale-110 transition-transform origin-left">
    {opponent.emoji}
  </span>

  {/* Name + Title */}
  <h2 className="mt-3 font-heading text-lg font-bold text-[#0c1b33]
                 group-hover:text-[#d4a843] transition-colors">
    {opponent.name}
  </h2>
  <p className="text-xs font-medium text-[#0c1b33]/40 uppercase tracking-wider">
    {opponent.title}
  </p>

  {/* Difficulty Stars */}
  <div className="mt-2 flex gap-0.5" aria-label={`Difficulty: ${opponent.difficulty} out of 5`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`text-sm ${
          star <= opponent.difficulty ? 'text-[#d4a843]' : 'text-[#0c1b33]/15'
        }`}
      >
        ★
      </span>
    ))}
  </div>

  {/* Description */}
  <p className="mt-2 text-sm text-[#0c1b33]/60 leading-relaxed">
    {opponent.description}
  </p>

  {/* ELO range tag */}
  <span className="mt-3 inline-block rounded-full bg-[#0c1b33]/5 px-3 py-1
                   text-xs font-medium text-[#0c1b33]/50">
    {opponent.eloRange} ELO
  </span>

  {/* Challenge button — appears on hover/always visible on mobile */}
  <div className="mt-4">
    <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#d4a843] px-5 py-2.5
                     text-sm font-semibold text-[#0c1b33] group-hover:bg-[#d4a843]/90
                     transition-colors">
      ⚔️ Challenge
    </span>
  </div>
</button>
```

```tsx
{/* LOCKED state */}
<div
  className="relative rounded-2xl border border-gray-200 bg-white p-6
             opacity-50 cursor-default select-none"
>
  {/* Lock overlay badge */}
  <div className="absolute top-4 right-4 rounded-full bg-[#0c1b33]/10 p-2">
    <span className="text-lg">🔒</span>
  </div>

  {/* Same layout as unlocked but muted */}
  <span className="text-5xl block grayscale">{opponent.emoji}</span>
  <h2 className="mt-3 font-heading text-lg font-bold text-[#0c1b33]/40">
    {opponent.name}
  </h2>
  <p className="text-xs font-medium text-[#0c1b33]/20 uppercase tracking-wider">
    {opponent.title}
  </p>

  {/* Difficulty stars — muted */}
  <div className="mt-2 flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className="text-sm text-[#0c1b33]/15">★</span>
    ))}
  </div>

  {/* Unlock condition */}
  <p className="mt-3 text-sm font-medium text-[#0c1b33]/40 italic">
    {opponent.unlockCondition}
  </p>
</div>
```

### Unlock Progression

- **Peanut** — Always unlocked
- **Bolt** — Always unlocked
- **Sly** — Unlocked after 1 win against Bolt (or puzzle rating ≥ 900)
- **Captain Castle** — Unlocked after 1 win against Sly (or puzzle rating ≥ 1300)
- **Knight Rider** — Unlocked after 1 win against Captain Castle (or puzzle rating ≥ 1600)
- **The Grandmaster** — Unlocked after 1 win against Knight Rider (or puzzle rating ≥ 2000)

---

## 2. Pre-Game Setup (Inline below selected card)

When a player taps "Challenge," show an **inline expansion** below the card (no modal, no page change). This keeps context visible and feels fast.

```tsx
{/* Pre-game options — slides down below the selected card */}
<div className="rounded-2xl border border-[#d4a843]/30 bg-[#d4a843]/5 p-5 mt-2
                animate-in slide-in-from-top-2 duration-200">
  {/* Opponent greeting */}
  <div className="flex items-center gap-3 mb-4">
    <span className="text-4xl">{opponent.emoji}</span>
    <div>
      <p className="font-heading font-bold text-[#0c1b33]">{opponent.name}</p>
      <p className="text-sm text-[#0c1b33]/60 italic">
        "{opponent.tauntMessages.greeting}"
      </p>
    </div>
  </div>

  {/* Color selection */}
  <div className="mb-4">
    <p className="text-sm font-semibold text-[#0c1b33] mb-2">Play as</p>
    <div className="flex gap-2">
      <button className="flex items-center gap-2 rounded-xl border-2 border-[#d4a843]
                         bg-white px-4 py-2.5 text-sm font-semibold text-[#0c1b33]">
        ⬜ White
      </button>
      <button className="flex items-center gap-2 rounded-xl border border-[#0c1b33]/10
                         bg-white px-4 py-2.5 text-sm font-semibold text-[#0c1b33]/60
                         hover:border-[#0c1b33]/30 transition-colors">
        ⬛ Black
      </button>
      <button className="flex items-center gap-2 rounded-xl border border-[#0c1b33]/10
                         bg-white px-4 py-2.5 text-sm font-semibold text-[#0c1b33]/60
                         hover:border-[#0c1b33]/30 transition-colors">
        🎲 Random
      </button>
    </div>
  </div>

  {/* Start Game button */}
  <button className="w-full rounded-xl bg-[#0c1b33] px-4 py-3.5 text-sm font-semibold
                     text-white transition-colors hover:bg-[#0c1b33]/90">
    Start Game vs {opponent.name} {opponent.emoji}
  </button>
</div>
```

---

## 3. Game Screen Layout

### Component: `ChessGame`

Top-level layout mirrors `PuzzleGame` — `flex-col lg:flex-row gap-6 lg:gap-8`.

```
Mobile (< 768px):                Desktop (≥ 1024px):
┌────────────────────────┐      ┌─────────────────┬──────────────────┐
│ ← Back   vs 🦊 Sly    │      │ ← Back          │                  │
│                        │      │                 │ ┌──────────────┐ │
│ ┌────────────────────┐ │      │                 │ │ 🦊 Sly       │ │
│ │   Opponent bar     │ │      │                 │ │ "Hehe, my    │ │
│ │ 🦊 Sly  ⏱ 14:32   │ │      │                 │ │  turn..."    │ │
│ │ captured: ♟♟♞      │ │      │                 │ │ captured:♟♟♞ │ │
│ └────────────────────┘ │      │    CHESS BOARD  │ │ ⏱ 14:32      │ │
│ ┌────────────────────┐ │      │    (max 560px)  │ └──────────────┘ │
│ │                    │ │      │                 │                  │
│ │    CHESS BOARD     │ │      │                 │ ┌──────────────┐ │
│ │   (full width)     │ │      │                 │ │ Game Status  │ │
│ │                    │ │      │                 │ │ Move 12      │ │
│ └────────────────────┘ │      │                 │ │ Your turn    │ │
│ ┌────────────────────┐ │      │                 │ └──────────────┘ │
│ │   Player bar       │ │      │                 │                  │
│ │ You  ⏱ 12:08      │ │      │                 │ ┌──────────────┐ │
│ │ captured: ♙♙       │ │      │                 │ │  Controls    │ │
│ └────────────────────┘ │      │                 │ │ Undo Hint    │ │
│                        │      │                 │ │ New  Resign  │ │
│ ┌────────────────────┐ │      │                 │ └──────────────┘ │
│ │ [Undo][Hint]       │ │      │                 │                  │
│ │ [New Game][Resign] │ │      │                 │ ┌──────────────┐ │
│ └────────────────────┘ │      │                 │ │ Move History │ │
└────────────────────────┘      │                 │ │ (scrollable) │ │
                                │                 │ └──────────────┘ │
                                └─────────────────┴──────────────────┘
```

### Top-Level Component Structure

```tsx
<div className="space-y-6 md:space-y-8">
  {/* Header with back link */}
  <section>
    <div className="flex items-center gap-2 mb-1">
      <Link
        href="/dashboard/practice/play-computer"
        className="text-sm text-[#0c1b33]/50 hover:text-[#0c1b33]/80 transition-colors"
      >
        ← Choose Opponent
      </Link>
    </div>
  </section>

  {/* Game area */}
  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
    {/* Board column */}
    <div className="flex-1 min-w-0">
      {/* Opponent info bar (mobile: above board) */}
      <PlayerBar player="opponent" className="mb-3 lg:hidden" />

      {/* Chess board */}
      <GameBoard />

      {/* Player info bar (mobile: below board) */}
      <PlayerBar player="self" className="mt-3 lg:hidden" />

      {/* Controls (mobile: below player bar) */}
      <div className="mt-4 lg:hidden">
        <GameControls />
      </div>
    </div>

    {/* Sidebar (desktop only) */}
    <div className="hidden lg:block w-80 shrink-0 space-y-4">
      <OpponentSidebarCard />
      <GameStatusCard />
      <GameControls />
      <MoveHistory />
    </div>
  </div>
</div>
```

### Board Component: `GameBoard`

Reuses `react-chessboard` with the same styling as `PuzzleBoard`:

```tsx
<div className="w-full max-w-[560px] mx-auto lg:mx-0">
  <Chessboard
    options={{
      id: 'game-board',
      position: game.fen(),
      onPieceDrop: handleDrop,
      boardOrientation: playerColor,
      boardStyle: {
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(12, 27, 51, 0.15)',
      },
      darkSquareStyle: { backgroundColor: '#0c1b33' },
      lightSquareStyle: { backgroundColor: '#e8dcc8' },
      squareStyles: customSquareStyles,
      animationDurationInMs: 200,
      allowDragging: isPlayerTurn && !gameOver,
    }}
  />
</div>
```

**Board sizing:**
- Mobile: `w-full` (fills container, max ~100vw minus padding)
- Desktop: `max-w-[560px]` (same as PuzzleBoard)

### Player Bar Component: `PlayerBar`

Shown above/below the board. Compact, horizontal layout.

```tsx
{/* Opponent bar (above board) or Player bar (below board) */}
<div className="flex items-center justify-between rounded-xl bg-[#0c1b33]/5 px-4 py-2.5">
  <div className="flex items-center gap-2.5">
    {/* Avatar / emoji for opponent, user initial for player */}
    <span className="text-2xl">{isOpponent ? opponent.emoji : '🧑‍🎓'}</span>
    <div>
      <p className="text-sm font-semibold text-[#0c1b33]">
        {isOpponent ? opponent.name : 'You'}
      </p>
      {/* Captured pieces row */}
      <div className="flex gap-0.5 text-xs text-[#0c1b33]/50 min-h-[16px]">
        {capturedPieces.map((piece, i) => (
          <span key={i}>{piece}</span>
        ))}
        {/* Material advantage indicator */}
        {materialDiff > 0 && (
          <span className="text-[#2a9d8f] font-semibold ml-1">+{materialDiff}</span>
        )}
      </div>
    </div>
  </div>

  {/* Timer (if timed game) — otherwise move count */}
  <div className="text-right">
    <p className="font-heading text-lg font-bold text-[#0c1b33] tabular-nums">
      {formattedTime}
    </p>
  </div>
</div>
```

### Opponent Sidebar Card (Desktop)

Shown in the sidebar on desktop — includes character personality.

```tsx
<div className="rounded-2xl border border-[#d4a843]/20 bg-white p-5">
  <div className="flex items-center gap-3">
    <span className="text-4xl">{opponent.emoji}</span>
    <div>
      <h3 className="font-heading text-lg font-bold text-[#0c1b33]">
        {opponent.name}
      </h3>
      <p className="text-xs text-[#0c1b33]/40 uppercase tracking-wider">
        {opponent.title}
      </p>
    </div>
  </div>

  {/* Dynamic taunt message — changes based on game state */}
  <div className="mt-3 rounded-xl bg-[#0c1b33]/5 p-3">
    <p className="text-sm text-[#0c1b33]/70 italic leading-relaxed">
      "{currentTauntMessage}"
    </p>
  </div>

  {/* Captured pieces */}
  <div className="mt-3">
    <p className="text-xs text-[#0c1b33]/40 mb-1">Captured</p>
    <div className="flex gap-0.5 text-lg min-h-[24px]">
      {opponentCapturedPieces.map((p, i) => <span key={i}>{p}</span>)}
    </div>
  </div>
</div>
```

### Game Status Card

```tsx
<div className={`rounded-2xl p-4 text-center font-heading font-bold text-lg transition-colors ${
  isPlayerTurn
    ? 'bg-[#2a9d8f]/10 text-[#2a9d8f]'      // Your turn — teal
    : 'bg-[#d4a843]/10 text-[#d4a843]'        // Opponent thinking — gold
}`}>
  {isPlayerTurn ? (
    <div>
      <p>Your turn</p>
      <p className="text-sm font-normal text-[#0c1b33]/50 mt-1">
        Move {moveNumber} · {playerColor === 'white' ? 'White' : 'Black'}
      </p>
    </div>
  ) : (
    <div>
      <p>{opponent.name} is thinking...</p>
      <p className="text-sm font-normal text-[#d4a843]/70 mt-1">
        {opponent.tauntMessages.thinking}
      </p>
    </div>
  )}

  {/* Check warning */}
  {inCheck && (
    <p className="text-sm font-semibold text-[#e8614d] mt-2">
      ⚠️ Check!
    </p>
  )}
</div>
```

### "Thinking..." Animation

When the engine is computing, show a pulsing animation in the status card:

```tsx
{/* Thinking indicator — 3 bouncing dots */}
<div className="flex items-center justify-center gap-1 mt-2">
  <span className="inline-block h-2 w-2 rounded-full bg-[#d4a843] animate-bounce [animation-delay:0ms]" />
  <span className="inline-block h-2 w-2 rounded-full bg-[#d4a843] animate-bounce [animation-delay:150ms]" />
  <span className="inline-block h-2 w-2 rounded-full bg-[#d4a843] animate-bounce [animation-delay:300ms]" />
</div>
```

Additionally, apply a subtle pulse to the opponent's emoji in the player bar:

```tsx
{/* Opponent emoji pulses while thinking */}
<span className={`text-2xl transition-transform ${
  isEngineThinking ? 'animate-pulse' : ''
}`}>
  {opponent.emoji}
</span>
```

### Move History (Desktop Sidebar)

```tsx
<div className="rounded-2xl border border-gray-200 bg-white p-4 max-h-48 overflow-y-auto">
  <p className="text-xs font-semibold text-[#0c1b33]/40 uppercase tracking-wider mb-2">
    Moves
  </p>
  <div className="space-y-1">
    {movePairs.map((pair, i) => (
      <div key={i} className="flex text-sm tabular-nums">
        <span className="w-8 text-[#0c1b33]/30 shrink-0">{i + 1}.</span>
        <span className="w-20 font-medium text-[#0c1b33]">{pair.white}</span>
        <span className="w-20 font-medium text-[#0c1b33]/70">{pair.black ?? ''}</span>
      </div>
    ))}
  </div>
</div>
```

---

## 4. Game Controls

### Design Philosophy

- **Large touch targets** — minimum 44×44px tap area (WCAG 2.5.5), we go 48px
- **Icons + text labels** — younger kids (5–8) rely on icons, older kids read labels
- **2×2 grid on mobile** — easy thumb reach in portrait mode
- **Horizontal row on desktop sidebar**

### Controls Component: `GameControls`

```tsx
{/* Mobile: 2x2 grid */}
<div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
  {/* Undo button */}
  <button
    onClick={handleUndo}
    disabled={!canUndo || undosRemaining <= 0}
    className="flex flex-col items-center justify-center gap-1.5 rounded-2xl
               border border-[#0c1b33]/10 bg-white px-4 py-4
               text-[#0c1b33]/70 transition-all
               hover:bg-[#0c1b33]/5 hover:border-[#0c1b33]/20
               disabled:opacity-30 disabled:cursor-default
               active:scale-95"
  >
    <span className="text-xl">↩️</span>
    <span className="text-xs font-semibold">Undo</span>
    {/* Remaining indicator */}
    <span className="text-[10px] text-[#0c1b33]/40">
      {undosRemaining}/2 left
    </span>
  </button>

  {/* Hint button */}
  <button
    onClick={handleHint}
    disabled={!isPlayerTurn || hintsRemaining <= 0}
    className="flex flex-col items-center justify-center gap-1.5 rounded-2xl
               border border-[#d4a843]/20 bg-white px-4 py-4
               text-[#d4a843] transition-all
               hover:bg-[#d4a843]/5 hover:border-[#d4a843]/40
               disabled:opacity-30 disabled:cursor-default
               active:scale-95"
  >
    <span className="text-xl">💡</span>
    <span className="text-xs font-semibold">Hint</span>
    <span className="text-[10px] text-[#d4a843]/60">
      {hintsRemaining}/3 left
    </span>
  </button>

  {/* New Game button */}
  <button
    onClick={handleNewGame}
    className="flex flex-col items-center justify-center gap-1.5 rounded-2xl
               border border-[#2a9d8f]/20 bg-white px-4 py-4
               text-[#2a9d8f] transition-all
               hover:bg-[#2a9d8f]/5 hover:border-[#2a9d8f]/40
               active:scale-95"
  >
    <span className="text-xl">🔄</span>
    <span className="text-xs font-semibold">New Game</span>
  </button>

  {/* Resign button */}
  <button
    onClick={() => setShowResignConfirm(true)}
    className="flex flex-col items-center justify-center gap-1.5 rounded-2xl
               border border-[#0c1b33]/10 bg-white px-4 py-4
               text-[#0c1b33]/50 transition-all
               hover:bg-[#0c1b33]/5 hover:border-[#0c1b33]/20
               active:scale-95"
  >
    <span className="text-xl">🏳️</span>
    <span className="text-xs font-semibold">Resign</span>
  </button>
</div>
```

### Resign Confirmation — Inline (not modal)

Modals are jarring for kids. Use an **inline confirmation** that replaces the resign button:

```tsx
{showResignConfirm ? (
  <div className="col-span-2 lg:col-span-4 rounded-2xl border border-[#d4a843]/30
                  bg-[#d4a843]/5 p-4 text-center animate-in fade-in duration-200">
    <p className="text-sm font-semibold text-[#0c1b33]">
      Are you sure you want to resign?
    </p>
    <p className="text-xs text-[#0c1b33]/50 mt-1">
      {opponent.name} says: "Don't give up yet!"
    </p>
    <div className="flex gap-3 mt-3 justify-center">
      <button
        onClick={handleResign}
        className="rounded-xl bg-[#0c1b33]/10 px-5 py-2.5 text-sm font-semibold
                   text-[#0c1b33]/60 hover:bg-[#0c1b33]/15 transition-colors"
      >
        Yes, resign
      </button>
      <button
        onClick={() => setShowResignConfirm(false)}
        className="rounded-xl bg-[#2a9d8f] px-5 py-2.5 text-sm font-semibold
                   text-white hover:bg-[#2a9d8f]/90 transition-colors"
      >
        Keep playing! 💪
      </button>
    </div>
  </div>
) : null}
```

**Why inline, not modal:** Modals break flow for young children. The inline pattern keeps the board visible (important for spatial reasoning), uses encouraging language from the character, and makes "Keep playing!" the visually dominant (teal/bold) action.

---

## 5. Result Screen

When the game ends, the result screen **overlays the board** with a semi-transparent backdrop, keeping the final position visible underneath.

### Component: `GameResult`

```tsx
{/* Result overlay — covers the board area */}
<div className="absolute inset-0 z-10 flex items-center justify-center
                bg-white/80 backdrop-blur-sm rounded-lg
                animate-in fade-in zoom-in-95 duration-300">
  <div className="w-full max-w-sm mx-auto p-6 text-center">
    {/* Result content changes based on outcome */}
    {result === 'win' && <WinResult />}
    {result === 'loss' && <LossResult />}
    {result === 'draw' && <DrawResult />}

    {/* Action buttons */}
    <div className="flex flex-col gap-3 mt-6">
      <button className="w-full rounded-xl bg-[#0c1b33] px-4 py-3.5 text-sm
                         font-semibold text-white hover:bg-[#0c1b33]/90 transition-colors">
        Play Again vs {opponent.name} {opponent.emoji}
      </button>
      <Link
        href="/dashboard/practice/play-computer"
        className="w-full rounded-xl border border-[#0c1b33]/10 bg-white px-4 py-3
                   text-sm font-semibold text-[#0c1b33]/60 hover:bg-[#0c1b33]/5
                   transition-colors text-center"
      >
        Change Opponent
      </Link>
    </div>
  </div>
</div>
```

### Win Celebration: `WinResult`

```tsx
<div>
  {/* Confetti burst — CSS keyframe animation */}
  <div className="relative">
    {/* Star burst ring */}
    <div className="mx-auto w-24 h-24 rounded-full bg-[#d4a843]/10
                    flex items-center justify-center
                    animate-[celebrate_0.6s_ease-out]">
      <span className="text-5xl animate-[bounce_0.5s_ease-in-out_0.3s]">🏆</span>
    </div>

    {/* Floating confetti particles (6 pieces) */}
    {[...Array(6)].map((_, i) => (
      <span
        key={i}
        className="absolute text-lg animate-[confetti_1.5s_ease-out_forwards]"
        style={{
          left: '50%',
          top: '50%',
          animationDelay: `${i * 0.1}s`,
          // Each piece gets a unique CSS custom property for direction
          '--confetti-x': `${(i % 2 === 0 ? -1 : 1) * (30 + i * 15)}px`,
          '--confetti-y': `${-(40 + i * 10)}px`,
          '--confetti-rotate': `${i * 60}deg`,
        } as React.CSSProperties}
      >
        {['⭐', '🎉', '✨', '🌟', '💫', '🎊'][i]}
      </span>
    ))}
  </div>

  <h2 className="mt-4 font-heading text-2xl font-bold text-[#0c1b33]">
    You won! 🎉
  </h2>
  <p className="mt-1 text-sm text-[#0c1b33]/60">
    Amazing game! You defeated {opponent.name}.
  </p>

  {/* Rating change — gold pill */}
  {ratingChange != null && (
    <div className="mt-4 inline-flex items-center gap-2 rounded-full
                    bg-[#2a9d8f]/10 px-4 py-2">
      <span className="text-sm font-semibold text-[#2a9d8f]">
        Rating: {newRating} (+{ratingChange})
      </span>
    </div>
  )}

  {/* XP earned — animated counter */}
  <div className="mt-3">
    <p className="font-heading text-3xl font-bold text-[#d4a843]
                  animate-[countUp_0.8s_ease-out]">
      +{xpEarned} XP
    </p>
    <p className="text-xs text-[#0c1b33]/40">Experience earned</p>
  </div>
</div>
```

### CSS Keyframes (add to `globals.css` or Tailwind config)

```css
@keyframes celebrate {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes confetti {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--confetti-x), var(--confetti-y)) rotate(var(--confetti-rotate)) scale(0);
    opacity: 0;
  }
}

@keyframes countUp {
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes gentlePulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
}
```

### Loss Encouragement: `LossResult`

**Critical UX rule:** No red. No "You lost." No negative framing. Use warm teal and gold.

```tsx
<div>
  {/* Warm, encouraging icon */}
  <div className="mx-auto w-24 h-24 rounded-full bg-[#2a9d8f]/10
                  flex items-center justify-center
                  animate-[gentlePulse_2s_ease-in-out_infinite]">
    <span className="text-5xl">💪</span>
  </div>

  <h2 className="mt-4 font-heading text-2xl font-bold text-[#0c1b33]">
    Good effort!
  </h2>
  <p className="mt-1 text-sm text-[#0c1b33]/60">
    {opponent.name} won this time, but you're getting stronger!
  </p>

  {/* Encouraging stat — find something positive */}
  <div className="mt-3 rounded-xl bg-[#2a9d8f]/5 border border-[#2a9d8f]/20 px-4 py-3">
    <p className="text-sm text-[#2a9d8f]">
      {encouragementMessage}
      {/* Examples:
          "You lasted 32 moves — that's 8 more than last time!"
          "You captured 5 pieces — great tactical play!"
          "You found 3 checks — keep up the pressure!"
      */}
    </p>
  </div>

  {/* Rating — show in muted style, no red */}
  {ratingChange != null && (
    <div className="mt-3 inline-flex items-center gap-2 rounded-full
                    bg-[#0c1b33]/5 px-4 py-2">
      <span className="text-sm font-medium text-[#0c1b33]/50">
        Rating: {newRating} ({ratingChange})
      </span>
    </div>
  )}

  {/* XP — still earned for playing! */}
  <div className="mt-3">
    <p className="font-heading text-2xl font-bold text-[#d4a843]">
      +{xpEarned} XP
    </p>
    <p className="text-xs text-[#0c1b33]/40">
      You always earn XP for playing!
    </p>
  </div>
</div>
```

### Draw Celebration: `DrawResult`

```tsx
<div>
  <div className="mx-auto w-24 h-24 rounded-full bg-[#d4a843]/10
                  flex items-center justify-center
                  animate-[celebrate_0.6s_ease-out]">
    <span className="text-5xl">🤝</span>
  </div>

  <h2 className="mt-4 font-heading text-2xl font-bold text-[#0c1b33]">
    It's a draw!
  </h2>
  <p className="mt-1 text-sm text-[#0c1b33]/60">
    Evenly matched! Great defensive play against {opponent.name}.
  </p>

  {ratingChange != null && (
    <div className="mt-4 inline-flex items-center gap-2 rounded-full
                    bg-[#d4a843]/10 px-4 py-2">
      <span className="text-sm font-semibold text-[#d4a843]">
        Rating: {newRating} ({ratingChange >= 0 ? '+' : ''}{ratingChange})
      </span>
    </div>
  )}

  <div className="mt-3">
    <p className="font-heading text-2xl font-bold text-[#d4a843]">
      +{xpEarned} XP
    </p>
    <p className="text-xs text-[#0c1b33]/40">Experience earned</p>
  </div>
</div>
```

### XP Animation Detail

The XP number should count up from 0 to the final value over ~800ms using a CSS counter or a JS animation:

```tsx
// Simple approach: scale-in with countUp keyframe (defined above)
<p className="font-heading text-3xl font-bold text-[#d4a843]
              animate-[countUp_0.8s_ease-out]">
  +{xpEarned} XP
</p>

// Enhanced approach: numeric counter (JS)
// Use a useEffect with requestAnimationFrame to count from 0 to xpEarned
// Duration: 800ms, easing: ease-out
```

---

## 6. Mobile Considerations

### Board Sizing

```tsx
{/* Board container */}
<div className="w-full max-w-[560px] mx-auto lg:mx-0">
  {/* react-chessboard with responsive wrapper */}
</div>
```

- **Mobile (< 640px):** Board fills `100vw - 2rem` (1rem padding each side)
- **Tablet (640–1024px):** Board maxes at `560px`, centered
- **Desktop (≥ 1024px):** Board at `560px`, left-aligned in flex layout

### Controls Below Board (Mobile)

On mobile, the sidebar content stacks vertically below the board:

```tsx
<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
  {/* Board column */}
  <div className="flex-1 min-w-0">
    <PlayerBar player="opponent" className="mb-3 lg:hidden" />
    <GameBoard />
    <PlayerBar player="self" className="mt-3 lg:hidden" />
    <div className="mt-4 lg:hidden">
      <GameControls />
    </div>
  </div>

  {/* Desktop sidebar */}
  <div className="hidden lg:flex lg:flex-col lg:w-80 shrink-0 gap-4">
    <OpponentSidebarCard />
    <GameStatusCard />
    <GameControls />
    <MoveHistory />
  </div>
</div>
```

### Move History on Mobile

Move history is **hidden by default** on mobile. Accessible via a collapsible accordion:

```tsx
{/* Mobile-only collapsible move history */}
<details className="mt-4 lg:hidden">
  <summary className="flex items-center justify-between rounded-xl bg-[#0c1b33]/5
                       px-4 py-3 text-sm font-semibold text-[#0c1b33]/60 cursor-pointer
                       [&[open]>svg]:rotate-180">
    Move History ({totalMoves} moves)
    <svg className="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24"
         stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div className="mt-2 rounded-xl border border-gray-200 bg-white p-4 max-h-48 overflow-y-auto">
    {/* Same move list as desktop */}
  </div>
</details>
```

### Touch Target Sizes

All interactive elements follow these minimums:
- **Buttons:** `min-h-[48px]` (controls grid buttons are ~64px due to icon + text + count)
- **Board squares:** react-chessboard handles touch; drag threshold is appropriate
- **Links/taps:** `py-2.5 px-4` minimum padding

### Safe Area (Notch/Home Indicator)

```tsx
{/* Root layout already handles this, but for the game screen: */}
<div className="pb-safe">
  {/* Game content */}
</div>
```

---

## 7. Component File Structure

```
src/components/chess/
├── PuzzleBoard.tsx          (existing)
├── PuzzleControls.tsx       (existing)
├── PuzzleStats.tsx          (existing)
├── PuzzleGame.tsx           (existing)
├── GameBoard.tsx            (new — reuses react-chessboard with game config)
├── GameControls.tsx         (new — Undo, Hint, New Game, Resign)
├── GameResult.tsx           (new — Win/Loss/Draw overlay)
├── GameStatusCard.tsx       (new — turn indicator + thinking animation)
├── MoveHistory.tsx          (new — scrollable move list)
├── OpponentCard.tsx         (new — selection screen card)
├── OpponentSidebarCard.tsx  (new — desktop sidebar character card)
├── PlayerBar.tsx            (new — compact bar above/below board)
└── ChessGame.tsx            (new — top-level game orchestrator)

src/app/(dashboard)/dashboard/practice/play-computer/
├── page.tsx                 (opponent selection + game state management)
└── actions.ts               (server actions: submitGame, fetchOpponents)
```

---

## 8. Taunt Messages per Opponent

These give each character personality and make the game feel alive.

### 🐣 Peanut
| Event | Message |
|-------|---------|
| Greeting | "Hi friend! Let's play!" |
| Thinking | "Hmm, let me think..." |
| Player good move | "Wow, nice move!" |
| Player blunder | "Oops! I see something..." |
| Winning | "I'm doing well today!" |
| Losing | "Oh no, you're really good!" |

### 🤖 Bolt
| Event | Message |
|-------|---------|
| Greeting | "BEEP BOOP! Ready to compute!" |
| Thinking | "Processing... 01101..." |
| Player good move | "DOES NOT COMPUTE! Great move!" |
| Player blunder | "Error detected in your position!" |
| Winning | "My circuits are warming up!" |
| Losing | "System overload! You're too good!" |

### 🦊 Sly
| Event | Message |
|-------|---------|
| Greeting | "Think you can outsmart a fox?" |
| Thinking | "Hehe, planning something sneaky..." |
| Player good move | "Hmm, you saw through my trick!" |
| Player blunder | "Fell right into my trap!" |
| Winning | "The fox always finds a way..." |
| Losing | "Wait, that wasn't supposed to happen!" |

### 🏰 Captain Castle
| Event | Message |
|-------|---------|
| Greeting | "Defend your kingdom well, challenger." |
| Thinking | "Fortifying my position..." |
| Player good move | "A strong move, worthy opponent." |
| Player blunder | "Your defenses have a gap..." |
| Winning | "My walls hold strong." |
| Losing | "Your attack is... impressive." |

### ⚔️ Knight Rider
| Event | Message |
|-------|---------|
| Greeting | "En garde! Prepare yourself." |
| Thinking | "Calculating the sharpest line..." |
| Player good move | "Excellent! You fight well!" |
| Player blunder | "An opening! I strike!" |
| Winning | "The battle turns in my favor." |
| Losing | "A worthy opponent indeed..." |

### 👑 The Grandmaster
| Event | Message |
|-------|---------|
| Greeting | "Few dare to challenge me. Let us begin." |
| Thinking | "I see 20 moves ahead..." |
| Player good move | "Hmm. Interesting choice." |
| Player blunder | "As expected." |
| Winning | "The outcome was never in doubt." |
| Losing | "...Remarkable. You have earned my respect." |

---

## 9. Accessibility Notes

- All interactive elements have `aria-label` or visible text labels
- Difficulty stars use `aria-label="Difficulty: N out of 5"`
- Board squares announce piece and position via react-chessboard's built-in ARIA
- Status changes announced via `aria-live="polite"` region
- Color is never the sole indicator — always paired with text or icon
- Focus rings: `focus-visible:ring-2 focus-visible:ring-[#d4a843] focus-visible:ring-offset-2`
- Resign confirmation "Keep playing!" button auto-focuses for keyboard users

---

## 10. Engine Loading State

Stockfish WASM (~1.2MB) takes 1–3 seconds on 3G. Show a branded loading state:

```tsx
{/* Engine loading — shown while Stockfish initializes */}
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="relative">
    <span className="text-6xl animate-pulse">{opponent.emoji}</span>
    {/* Spinning ring around emoji */}
    <div className="absolute inset-0 -m-2 rounded-full border-2 border-[#d4a843]/20
                    border-t-[#d4a843] animate-spin" />
  </div>
  <p className="mt-4 font-heading text-lg font-bold text-[#0c1b33]">
    {opponent.name} is warming up...
  </p>
  <p className="mt-1 text-sm text-[#0c1b33]/50">
    Loading chess engine
  </p>
</div>
```

---

**Summary for Rusty:** This spec provides pixel-level Tailwind classes, component structure, and responsive breakpoints. Every component follows the established Phase 1 patterns (rounded-2xl cards, gold/teal/navy palette, font-heading, flex-col lg:flex-row layout). Character personality is baked into the UI through dynamic taunt messages. Mobile layout prioritizes board visibility with controls stacked below. Result screen uses warm, encouraging tones for all outcomes.

♟️ — Linus
