# Chess Phase 2 — Play vs Computer: Difficulty Mapping & Opponent Personas

**Author:** Livingston (Chess Academy Lead)
**Date:** 2025-07-18
**Status:** 📋 Proposed
**Depends on:** DEC-012 (Chess Curriculum), DEC-024 (Chess Playground Spec), Rusty's tech review

---

## 1. Stockfish Skill Level Validation & Adjustments

### The problem with the proposed mapping

The original 6-opponent proposal uses a linear skill-level spread (0, 3, 6, 10, 14, 18). After reviewing Stockfish v18 behaviour and real-world testing data from the chess programming community, I'm making three adjustments:

| Issue | Detail | Fix |
|-------|--------|-----|
| **Skill 0 is too weak for anyone** | Stockfish Skill 0 plays random-looking moves. Even a 5-year-old who knows the rules will beat it within 2 games. There's no learning — just chaos. | Set Peanut to **Skill 1** with `UCI_Elo 400`. Still very beatable, but plays *recognisable* chess. |
| **Gap between Skill 6 and Skill 10 is too large** | Skill 6 (~900 Elo) to Skill 10 (~1200 Elo) is a 300-point jump. This is the critical "intermediate plateau" where kids get stuck and quit. | Tighten: Sly → **Skill 7** (~1000 Elo), Captain Castle → **Skill 10** (~1200 Elo). Closes the gap to 200. |
| **Skill 18 (~1800 Elo) is fine for "advanced"** | Some kids in Nairobi tournament circuits play at 1400–1600. Skill 18 gives them room to grow without hitting a wall where the engine plays perfectly. | Keep as proposed. Skill 20 (~2000+ Elo) is reserved for a future "hidden boss" unlockable. |

### Final Difficulty Map

| # | Opponent | Stockfish Skill | UCI_Elo | Approx. Playing Strength | Target Tier | Depth Limit |
|---|----------|----------------|---------|--------------------------|-------------|-------------|
| 1 | 🐣 Peanut | 1 | 400 | Complete beginner — hangs pieces, misses mates | **Learn** (5–8) | 5 |
| 2 | 🤖 Bolt | 3 | 650 | Knows basic captures, still blunders often | **Learn/Play** (7–9) | 8 |
| 3 | 🦊 Sly | 7 | 1000 | Sees simple tactics, occasionally sets traps | **Play** (9–12) | 10 |
| 4 | 🏰 Captain Castle | 10 | 1200 | Solid fundamentals, punishes hanging pieces | **Play/Compete** (11–13) | 12 |
| 5 | ⚔️ Knight Rider | 14 | 1500 | Strong tactical vision, knows basic openings | **Compete** (13–15) | 14 |
| 6 | 👑 The Grandmaster | 18 | 1800 | Deep calculation, positional understanding | **Excel** (15–17) | 16 |

**Implementation note for Rusty:**
```typescript
const OPPONENTS = [
  { id: 'peanut',         skill: 1,  elo: 400,  depth: 5  },
  { id: 'bolt',           skill: 3,  elo: 650,  depth: 8  },
  { id: 'sly',            skill: 7,  elo: 1000, depth: 10 },
  { id: 'captain-castle', skill: 10, elo: 1200, depth: 12 },
  { id: 'knight-rider',   skill: 14, elo: 1500, depth: 14 },
  { id: 'grandmaster',    skill: 18, elo: 1800, depth: 16 },
] as const;

// UCI commands per opponent:
// setoption name Skill Level value {skill}
// setoption name UCI_LimitStrength value true
// setoption name UCI_Elo value {elo}
// go depth {depth}
```

**Why depth limits matter:** Without depth limits, Stockfish at low skill levels will still think for a long time and occasionally find strong moves through sheer calculation. Capping depth ensures the engine responds quickly (< 2 seconds on any device) and plays at the intended strength. This is especially important for younger kids — they shouldn't wait 10 seconds for Peanut to make a move.

---

## 2. Character Profiles

### 🐣 Peanut — "The Friendly Beginner"

**Title:** Chess Chick
**Description:** Peanut just hatched and is learning the rules! This fluffy little chick sometimes forgets how the knight moves — but always tries its best.
**Personality:** Enthusiastic, clumsy, endlessly encouraging. Talks in short excited sentences. Uses lots of exclamation marks. Gets excited about everything.
**Voice style:** "Ooh!" "Wow, you moved your knight!" "I forgot the bishop goes diagonal again!"

| Outcome | Message |
|---------|---------|
| **Kid wins** | "Yaaay! You beat me! 🎉 That was AMAZING! I'm learning so much playing with you!" |
| **Kid loses** | "Oh wow, I won? I didn't even know I could do that! You were SO close — play me again?" |
| **Draw** | "We tied?! That means we're BOTH winners! 🐣✨" |

**Visual direction for Linus:** Round, fluffy baby chick with oversized eyes. Wears a tiny chess piece hat (pawn). Warm yellow/orange palette. Bouncy idle animation.

---

### 🤖 Bolt — "The Robot Rookie"

**Title:** Circuit Board Cadet
**Description:** Bolt is a robot who just got its chess programme installed. It knows the basics but still short-circuits on tricky positions. Beep boop!
**Personality:** Logical but naive. Speaks in a mix of robot-speak and kid-friendly language. Calculates out loud. Sometimes "glitches" for comedic effect.
**Voice style:** "PROCESSING... your move was... IMPRESSIVE." "Error 404: Defence not found!"

| Outcome | Message |
|---------|---------|
| **Kid wins** | "SYSTEM ALERT: You outsmarted my circuits! 🤖💥 Updating chess database... you're getting REALLY good!" |
| **Kid loses** | "Beep boop... I got lucky there! My sensors say you almost had me. Try a different opening next time?" |
| **Draw** | "DOES NOT COMPUTE! A draw?! My circuits are sparking! That was a perfectly balanced game! ⚡" |

**Visual direction for Linus:** Cute, boxy robot with antenna and blinking LED eyes. Silver/blue palette. Sparks or gear animations. Friendly (Wall-E vibe, not Terminator).

---

### 🦊 Sly — "The Cunning Trickster"

**Title:** The Fox Tactician
**Description:** Sly is a clever fox who loves setting traps. Watch out for sneaky forks and surprise pins — but if you stay alert, you can outfox the fox!
**Personality:** Playful and mischievous but good-natured. Loves wordplay. Compliments the kid when they spot a trap. Acts surprised when outsmarted.
**Voice style:** "Heh heh, didn't see THAT coming, did you?" "Clever, clever... you're learning my tricks!"

| Outcome | Message |
|---------|---------|
| **Kid wins** | "Well well well... you outfoxed the fox! 🦊 I tip my tail to you — that was brilliant strategy!" |
| **Kid loses** | "One of my little tricks got you this time! But you spotted two of my traps — next game you'll catch them all!" |
| **Draw** | "A draw! You're as tricky as I am now! 🦊 I need to learn some NEW tricks!" |

**Visual direction for Linus:** Stylised fox with a knowing smirk. Wears a detective's magnifying glass or deerstalker cap. Orange/red palette. Sneaky slide-in animations.

---

### 🏰 Captain Castle — "The Fortress Builder"

**Title:** Guardian of the Castle
**Description:** Captain Castle is a noble knight who believes in strong defence and solid positions. Break through their walls if you can — but it won't be easy!
**Personality:** Honourable, strategic, speaks like a friendly medieval character. Praises good defensive play. Offers genuine positional advice.
**Voice style:** "A fine defence, young strategist!" "My castle walls are strong — but your tactics are stronger!"

| Outcome | Message |
|---------|---------|
| **Kid wins** | "You breached the castle walls! 🏰⚔️ A worthy victory — your strategy was sound and your tactics were sharp!" |
| **Kid loses** | "My defences held this time, brave challenger! But you tested me well. Study your endgames — you're almost through!" |
| **Draw** | "A noble stalemate! 🏰 Two equal strategists locked in battle. This is what real chess looks like!" |

**Visual direction for Linus:** Armoured chess rook character with a friendly face and a small shield. Stone grey/royal blue palette. Solid, grounded animations.

---

### ⚔️ Knight Rider — "The Tournament Warrior"

**Title:** The Competitive Knight
**Description:** Knight Rider has competed in tournaments across the board and knows every opening. Fast, tactical, and always ready for a fight. Bring your A-game.
**Personality:** Competitive but respectful. Speaks like a coach giving post-game feedback. Uses chess terminology naturally. Pushes the kid to think deeper.
**Voice style:** "Nice Sicilian Defence! Let's see how you handle the middle game." "That knight sacrifice was bold — I respect the calculation."

| Outcome | Message |
|---------|---------|
| **Kid wins** | "Outstanding game! ⚔️🔥 That level of play would hold up in a real tournament. I'm genuinely impressed!" |
| **Kid loses** | "Tough loss, but I see real growth in your play. Your opening was solid — let's work on that endgame technique!" |
| **Draw** | "A hard-fought draw against me? ⚔️ That's tournament-level resilience. You should be proud of that!" |

**Visual direction for Linus:** Stylised chess knight piece with a visor helmet and competition medal. Dark purple/gold palette. Dynamic, action-ready animations.

---

### 👑 The Grandmaster — "The Final Challenge"

**Title:** Supreme Strategist
**Description:** The Grandmaster is the ultimate challenge. Deep calculation, perfect patience, and decades of wisdom. Only the strongest young minds can stand against them.
**Personality:** Wise, calm, deeply respectful. Speaks with gravitas but never condescension. Treats the kid as a peer. Every word carries weight. References real chess history.
**Voice style:** "Ah, the King's Indian Defence... Kasparov would approve." "Your calculation is deep — I must be careful here."

| Outcome | Message |
|---------|---------|
| **Kid wins** | "You have defeated The Grandmaster. 👑 I don't say this lightly — you play with the mind of a champion. The board belongs to you." |
| **Kid loses** | "A game worthy of study. Your 23rd move showed real vision — the position was closer than you think. Analyse this game. Learn from it. Come back stronger." |
| **Draw** | "A draw against The Grandmaster... 👑 In tournament chess, this is a badge of honour. You held your ground with dignity." |

**Visual direction for Linus:** Regal crown atop a shadowed figure. Gold/black palette. Subtle, dignified animations. Appears with a chessboard-patterned cape.

---

## 3. Progression System

### Unlock Mechanic: "Beat to Unlock"

**Rule:** Beat the current opponent **2 out of 3 games** to unlock the next one.

| Design choice | Rationale |
|---------------|-----------|
| **2/3, not 3/3** | Requiring a perfect streak punishes kids who are clearly ready but lost one game to a blunder. 2/3 proves consistent ability. |
| **Not just 1 win** | A single lucky win doesn't prove readiness. The engine at Skill 1 might blunder into a loss against anyone. 2/3 filters flukes. |
| **No time pressure** | The 3 games don't need to be consecutive. A kid can play Peanut on Monday, lose, win Tuesday, win Wednesday → unlocked. |
| **Peanut is always unlocked** | Every student starts with Peanut available. No gatekeeping the first opponent. |

### Visual Progression Path

```
🐣 Peanut  →  🤖 Bolt  →  🦊 Sly  →  🏰 Captain Castle  →  ⚔️ Knight Rider  →  👑 The Grandmaster
  [open]       [🔒]       [🔒]          [🔒]                  [🔒]                 [🔒]
```

Locked opponents appear greyed out with a lock icon and a tooltip: "Beat [previous opponent] 2 times to unlock!"

### Replay & Free Play

- **Already-unlocked opponents remain playable.** A kid who unlocked Sly can still play Peanut for fun or confidence.
- **Win counter is visible:** "Peanut: 5 wins, 1 loss, 0 draws" — builds a sense of mastery.
- **No "deranking":** Once unlocked, an opponent stays unlocked forever. Losing to a lower opponent doesn't re-lock the next one.

### Integration with XP System (per DEC-024)

| Action | XP Reward |
|--------|-----------|
| Win vs Peanut | +5 XP |
| Win vs Bolt | +10 XP |
| Win vs Sly | +15 XP |
| Win vs Captain Castle | +25 XP |
| Win vs Knight Rider | +40 XP |
| Win vs The Grandmaster | +60 XP |
| **First-time unlock** of any opponent | +50 XP bonus |
| Draw (any opponent) | Half the win XP for that opponent |
| Loss | +2 XP (participation — never zero, never punishing) |

### Data Model Addition (for Rusty)

```sql
-- Extends the existing chess_games or game_history table
-- Track opponent unlock status per student

CREATE TABLE student_opponents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  opponent_id TEXT NOT NULL, -- 'peanut', 'bolt', 'sly', etc.
  unlocked BOOLEAN DEFAULT FALSE,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  draws INTEGER DEFAULT 0,
  unlocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, opponent_id)
);

-- RLS: students see their own rows, coaches see their assigned students
-- Use the pattern from Rusty's review: student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())

-- Seed initial state on student creation: peanut unlocked, rest locked
INSERT INTO student_opponents (student_id, opponent_id, unlocked)
VALUES
  ($1, 'peanut', true),
  ($1, 'bolt', false),
  ($1, 'sly', false),
  ($1, 'captain-castle', false),
  ($1, 'knight-rider', false),
  ($1, 'grandmaster', false);
```

---

## 4. Nairobi Context & Local Chess Culture

### Kenya Chess Federation (KCF) Integration Points

Kenya has a growing competitive chess scene. Cognitron should position the opponent system as a stepping stone to real tournaments:

| KCF Element | How We Reference It |
|-------------|-------------------|
| **KCF Junior Championships** | Captain Castle's profile mentions: "Beat me, and you're ready for the KCF Junior Championship!" |
| **Kenya National Chess Championship** | Knight Rider references: "Players at my level compete at nationals." |
| **FIDE ratings** | The Grandmaster mentions: "You're playing at a level that earns a FIDE rating." |
| **School chess leagues** | Bolt mentions: "Beat me and you'll be the best player in your school chess club!" |

### Nairobi-Specific Touches

- **Language:** Opponents can use occasional Swahili expressions for warmth:
  - Peanut: "Hongera! (Congratulations!)" on kid wins
  - Captain Castle: "Umethubutu! (You dared!)" on being challenged
  - The Grandmaster: "Mchezaji hodari (Skilled player)" on draws
- **Tournament pipeline messaging:** After unlocking Captain Castle, show a prompt: "You're playing at tournament level! Ask your coach about the next KCF Junior event in Nairobi."
- **Cultural framing:** Chess in Kenya is growing fast — Cognitron should frame these opponents as training partners on the road to representing Kenya. Not "just a game" — a skill pathway.

### Local Elo Benchmarks (for parent communication)

| Cognitron Opponent | Approx. Real-World Equivalent |
|--------------------|-------------------------------|
| Peanut (400) | Just learned the rules |
| Bolt (650) | Active school chess club member |
| Sly (1000) | Competitive school chess club player |
| Captain Castle (1200) | KCF Junior qualifier level |
| Knight Rider (1500) | KCF Junior Championship competitive |
| The Grandmaster (1800) | Top Kenya junior / FIDE-rated |

---

## 5. Pedagogical Notes

### What Each Difficulty Level Reinforces

| Opponent | Chess Concepts Reinforced | What the Kid Should Be Practising |
|----------|--------------------------|-----------------------------------|
| **🐣 Peanut** | Piece movement, captures, check vs checkmate, king safety | Moving pieces legally, recognising check, delivering checkmate with queen + rook. Not hanging pieces on open squares. |
| **🤖 Bolt** | Piece values, simple captures, basic checkmate patterns | Trading pieces favourably (don't trade your queen for a pawn!). Back-rank mate, scholar's mate defence, developing pieces off the first rank. |
| **🦊 Sly** | Forks, pins, basic tactics, opening principles | Controlling the centre, developing knights before bishops, not moving the same piece twice in the opening, recognising fork opportunities. |
| **🏰 Captain Castle** | Positional play, castling, pawn structure, endgame basics | Castling early, building pawn chains, rook activity in endgames, king + pawn endings, understanding when to trade pieces. |
| **⚔️ Knight Rider** | Opening theory, tactical combinations, tournament time management | Playing established openings (Sicilian, Queen's Gambit, Italian), multi-move tactical sequences, clock management (if timed games are enabled), developing a personal opening repertoire. |
| **👑 The Grandmaster** | Deep calculation, positional sacrifice, prophylaxis, endgame technique | Calculating 4–5 moves ahead, understanding positional sacrifices, prophylactic thinking (what does my opponent want to do?), complex endgames (rook + pawn, bishop vs knight). |

### Curriculum Tier Alignment

| Cognitron Tier | Target Opponents | Curriculum Integration |
|----------------|-----------------|----------------------|
| **Learn (5–8)** | Peanut, Bolt | Puzzles focus on mate-in-1, basic captures. Engine play = reinforcement of piece movement. |
| **Play (9–12)** | Bolt, Sly, Captain Castle | Puzzles escalate to forks/pins/skewers. Engine play = apply tactical patterns from puzzles in full games. |
| **Compete (12–15)** | Captain Castle, Knight Rider | Puzzles include sacrifices, deflection, intermediate moves. Engine play = opening preparation, tournament simulation. |
| **Excel (15–17)** | Knight Rider, The Grandmaster | Puzzles are 1900+ rated. Engine play = deep preparation, analysing own games for positional errors. |

### Post-Game Learning Prompts

After every game (win, loss, or draw), show **one** contextual learning prompt based on the opponent:

- **After Peanut game:** "Did you know? The queen is the most powerful piece — she can move in any direction!"
- **After Bolt game:** "Chess tip: Try to control the centre of the board with your pawns early in the game."
- **After Sly game:** "Look for forks! A fork is when one piece attacks two enemy pieces at once."
- **After Captain Castle game:** "Always castle your king to safety before launching an attack!"
- **After Knight Rider game:** "Strong players develop ALL their pieces before attacking. Count — are any pieces still on their starting squares?"
- **After The Grandmaster game:** "Grandmasters spend more time thinking about their opponent's plans than their own. What was your opponent trying to do?"

**Implementation for Rusty:** Store 10–15 tips per opponent and rotate randomly. Never show the same tip twice in a row. Tips should be dismissable but persistent in a "Chess Tips" section of the student profile.

---

## 6. UI/UX Recommendations (for Linus)

### Opponent Selection Screen

- **Grid layout:** 2×3 grid of opponent cards on desktop, vertical scroll on mobile
- **Each card shows:** Emoji, name, title, win/loss record, lock status
- **Locked cards:** Greyed out, slight blur, lock icon, "Beat [X] to unlock" text
- **Unlocked cards:** Full colour, hover animation, click to start game
- **Selected state:** Card expands to show full description + personality quote + difficulty badge

### Difficulty Badges (visual indicators for parents)

| Badge | Label | Colour |
|-------|-------|--------|
| ⭐ | Beginner | Green |
| ⭐⭐ | Elementary | Blue |
| ⭐⭐⭐ | Intermediate | Orange |
| ⭐⭐⭐⭐ | Advanced | Purple |
| ⭐⭐⭐⭐⭐ | Expert | Red |
| 👑 | Master | Gold |

### Game Screen Additions

- **Opponent avatar** displayed top-left of the board (where the opponent's name/rating would normally go)
- **Opponent "thinking" animation** while Stockfish calculates (Peanut pecks at the board, Bolt's gears spin, etc.)
- **Post-game modal:** Shows opponent message (win/loss/draw), XP earned, unlock progress bar, and "Play Again" / "Choose Opponent" buttons

---

## 7. Future Considerations

### Hidden 7th Opponent (Phase 3)

- **🌟 The Phoenix (Skill 20, ~2000+ Elo):** Unlocked by beating The Grandmaster 3 times. No messaging — plays in silence. For kids who are truly competitive. A prestige challenge.

### Adaptive Difficulty Within Opponents (Phase 3)

- If a kid beats Sly 10 times in a row, Sly's internal skill level could bump from 7 to 8 temporarily. The kid sees: "Sly learned a new trick!" This keeps opponents challenging without requiring the kid to move to the next tier.

### Coach Override

- Coaches should be able to unlock any opponent for a specific student. Some kids are advanced but the unlock system hasn't caught up. A simple toggle in the coach dashboard: "Unlock [opponent] for [student]."

---

## Decision Summary

| Item | Recommendation |
|------|---------------|
| Opponent count | **6 confirmed** (7th hidden as Phase 3 stretch goal) |
| Skill level adjustments | Peanut: 0→1, Sly: 6→7 (see §1 for rationale) |
| Unlock mechanic | Beat previous opponent **2/3 games** |
| XP integration | Scales with difficulty, never zero for losses |
| Nairobi context | Swahili phrases, KCF tournament references, local Elo benchmarks |
| Data model | New `student_opponents` table with RLS |
| Estimated effort | 2–3 sessions for Rusty (builds on existing Stockfish integration from DEC-024) |

**Ready for implementation.** Rusty can take the opponent config, data model, and messaging directly into code. Linus owns the visual character design and UI layout.

♟️ — Livingston
