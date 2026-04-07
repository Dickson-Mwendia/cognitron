# Chess Phase 2: Kid Experience Requirements — Play vs Computer

**Author:** Tess (Parent & Student Advocate)
**Date:** 2025-07-27
**Status:** 📋 Proposed
**Context:** Chess Phase 2 introduces "Play vs Computer" with character-based AI opponents (Luna the Chess Fairy, Boris the Bear, etc.) at `/dashboard/practice/play-computer`. This document defines the kid-facing experience requirements from a parent and student advocate perspective.
**References:** DEC-012 (Chess Curriculum), Livingston's Chess Playground spec, Scribe's Phase 2 sprint notes

---

## 1. Language & Messaging

### Guiding Principle

Every word a child reads during a chess game either builds them up or chips away at their confidence. Nairobi parents are paying premium rates for a programme that makes their child *want* to learn. The messaging must feel like a supportive coach sitting beside the child — not a screen barking instructions.

### Tone by Age Group

| Age Group | Tone | Reading Level | Message Length | Examples |
|-----------|------|---------------|----------------|----------|
| **5–7 (Learn tier)** | Warm, playful, celebratory. Short sentences. Emoji-heavy. Exclamation marks are fine. Think: a friendly older sibling. | Simple words only. No chess jargon beyond "piece," "move," "check," "checkmate." | Max 8 words per message. | "You did it! 🎉", "Great move! ⭐" |
| **8–12 (Play tier)** | Encouraging but not babyish. Can name tactics ("Nice fork!"). Light humour. Think: a cool coach who notices your effort. | Can introduce chess terms with context. "That fork won you a piece!" | Max 15 words. | "Smart thinking — that pin was textbook!", "Tough loss, but you lasted 10 moves longer than last time." |
| **13–17 (Compete/Excel)** | Respectful, understated. No exclamation marks overload. Acknowledge skill, not just effort. Think: a peer who takes chess seriously. | Full chess vocabulary. Can reference openings, positional concepts. | Max 20 words. | "Solid endgame technique.", "That Sicilian got complicated — worth reviewing.", "Close game. Your middlegame was stronger than last week." |

### Win Messages (by age group)

**5–7 year olds:**
- "You won! 🏆 You're getting so good!"
- "Checkmate! Peanut is so impressed! 🐣"
- "Amazing! You beat [character name]! ⭐"
- "You're a chess star! 🌟"

**8–12 year olds:**
- "Great game! You spotted that tactic perfectly."
- "Win! Your opening was really solid this time."
- "That's [X] wins this week — you're on a roll!"
- "[Character name] didn't see that coming. Well played."

**13–17 year olds:**
- "Clean win. Your knight endgame was precise."
- "That's a new high — [X] wins against [character name]."
- "Good conversion from a better middlegame position."
- "Convincing. Ready for a tougher opponent?"

### Loss Messages (CRITICAL — avoid frustration)

**Design rule: Never blame the child. Always point forward. Losses are where kids quit apps — this is the retention moment.**

**5–7 year olds:**
- "Good try! Every game makes you stronger! 💪"
- "[Character name] got lucky this time! Want to play again? 🎮"
- "You made some really good moves! Let's try again!"
- "That was a tricky game! You're learning so fast! 🌟"

*Never say: "You lost," "Game over," "Better luck next time" (too passive), or anything that positions the child as having failed.*

**8–12 year olds:**
- "Tough game! You were winning until move [X] — want to see what happened?"
- "[Character name] had to work hard for that one. Rematch?"
- "You played [X] great moves. Let's figure out where it turned."
- "Close! Your opening was strong — the endgame is where we'll improve."

*Always anchor to something specific the child did well. The "review" prompt converts a loss into a learning moment.*

**13–17 year olds:**
- "Not your game. Your [opening/middlegame/endgame] was sound — the [other phase] needs work."
- "Worth reviewing from move [X]. The position was equal until there."
- "Tight game. [Character name] is rated [X] — getting close to beating them consistently."
- "[Character name] won, but your accuracy was [X]% — higher than last time."

*Teens need data, not cheerleading. Frame losses as information, not failure.*

### Voice: "You" vs Character Voice

**Recommendation: Use character voice for the youngest, blend for tweens, neutral for teens.**

| Age Group | Voice Style | Example |
|-----------|-------------|---------|
| **5–7** | Character speaks in first person. The opponent is a "friend" not a "computer." | *Peanut says:* "You almost got me! That was so fun! 🐣" |
| **8–12** | Mix of narrator and character. The character has personality but the system also gives tactical feedback. | *Boris says:* "Good game, human." *System:* "You played 12 accurate moves — nice!" |
| **13–17** | Neutral system voice. Character name appears but doesn't "speak." Teens will cringe at talking robots. | "Game complete. Nexus difficulty: 1800. Your accuracy: 74%." |

**Implementation note:** Each character should have 3–5 personality phrases per scenario (win, loss, draw, opening, endgame) loaded from a content file — not hardcoded. This makes it easy to add Sheng phrases or seasonal messages later without a code deploy.

---

## 2. Nairobi Parent Expectations

### What Nairobi Parents Want from Chess

Based on our parent personas (DEC-009, Founding Families kit) and the competitive landscape (Livingston's assessment):

1. **Critical thinking & academic transfer.** "Will chess help with school?" — parents equate chess with maths and concentration. Every parent-facing message about chess should connect to cognitive skills, not just the game itself. Nairobi parents don't pay KES 8,500/session for fun — they pay for development.

2. **Visible progression.** "Is my child actually improving?" — they want numbers: rating changes, games won, puzzles solved, accuracy trends. The current parent dashboard shows XP and streaks; chess needs to surface *chess-specific* metrics.

3. **Competition readiness.** "Can my child compete?" — KCF (Kenya Chess Federation) tournaments are a concrete milestone parents understand. Even for young children, parents want to know the path from "learning the pieces" to "competing at nationals."

4. **Screen time that's defensible.** "Chess is not YouTube." Parents need to be able to justify this to grandparents, spouses, and school friends. The parent dashboard should explicitly frame chess time as "strategic thinking practice" — give parents the language to defend it.

### Screen Time Concern

**Yes, parents will worry — but chess is their easiest defence.** Chess has centuries of cultural credibility. The risk is less about the chess itself and more about:
- Unlimited play sessions (kid is "on the iPad for 2 hours playing chess" — parent still feels guilty)
- Proximity to other screen activities (kid finishes chess, opens YouTube — parent blames the platform)

**Recommendation:** Own the screen time conversation proactively:

1. **Play-time reminders (required):**
   - After 25 minutes of continuous play: Soft reminder — "You've been playing for 25 minutes! Take a stretch break? 🧘" (dismissable)
   - After 45 minutes: Stronger nudge — "Great session! Your brain works best with breaks. Come back in 15 minutes?" (game finishes, no new game for 10 minutes — can still do puzzles or review)
   - After 60 minutes: Session cap — "Champion effort today! [X] games played. Time for a break." (locked out of Play vs Computer for 30 minutes; puzzles still available as they're shorter)
   - **Why these thresholds:** 25 min aligns with typical focus blocks for 8–12s. 45 min is a generous session. 60 min is the hard limit that makes Cognitron defensible at a dinner party. "The app actually told him to stop playing."

2. **Parent override:** Parents can adjust these timers (shorter, not longer) from their dashboard. Default is on.

3. **Session summary notification:** When a child finishes a play session, the parent gets a WhatsApp-formatted summary they can view on the parent dashboard (not an actual WhatsApp message — that's intrusive). Example:
   > **Jayden's Chess Session — Tuesday 4:15 PM**
   > 🎮 3 games played (25 min)
   > ✅ Won 2, Lost 1
   > 📈 Rating: 820 → 835 (+15)
   > 🧩 Attempted 2 puzzles after games
   > 💡 Improvement area: Endgame technique

### Parent Dashboard Hook — What Parents Should See

**New "Chess Activity" card on parent dashboard:**

| Metric | Why Parents Care |
|--------|-----------------|
| **Games played this week** (vs last week) | Engagement trend — is my child using it? |
| **Win rate** (rolling 10 games) | "Is my child improving?" — the #1 question |
| **Current rating** + trend arrow | Tangible number parents can track month-over-month |
| **Favourite opponent character** | Conversation starter: "I see you've been playing against Bolt!" |
| **Time spent** (total this week) | Screen time accountability — parents need this |
| **Strongest tactic** (from game analysis) | "Your child is good at forks" — specific, impressive at dinner parties |
| **Suggested next step** | "Jayden is ready for the next difficulty level" — drives upgrade conversations |

**Monthly chess progress email (piggybacking on existing progress reports — when built):**
- Rating graph (visual, shareable)
- Games played / win rate / favourite tactics
- Comparison to tier average ("Jayden is in the top 30% of Play-tier students")
- Coach recommendation (if assigned)
- Link to view game replays

---

## 3. Age-Appropriate Features

### 5–7 Year Olds (Learn Tier)

These kids are pre-readers or early readers. Many are on a parent's iPad. They might not know all the piece names yet.

| Requirement | Detail | Rationale |
|-------------|--------|-----------|
| **Hide the rating** | No ELO number shown. Replace with stars or a visual level (🌟🌟🌟). Rating is tracked internally for matchmaking but invisible to the child. | Numbers are meaningless to a 6-year-old and stressful for parents who compare. |
| **Simplified character select** | Show 2 characters max (the easiest ones — Peanut the Chick and one other). Large, colourful cards with the character's face. No stats, no ELO numbers, no "difficulty" labels. | Choice overload kills engagement for this age. Two is enough. |
| **Piece movement hints** | Legal moves highlighted when a piece is tapped. Always on, not toggleable. Green dots on valid squares. | Kids this age are still learning how pieces move. Removing hints = instant frustration. |
| **Big pieces, big squares** | Board squares minimum 48px on mobile. Pieces should be clear and distinct — no abstract designs. Consider using Merida or similar kid-friendly piece sets. | Small fingers + developing motor skills. Touch accuracy is low. |
| **No clock** | No timer of any kind. Unlimited think time. | Time pressure is developmentally inappropriate for under-8s and will cause tears. |
| **Undo button** (unlimited for this tier) | Let them undo as many moves as they want. No penalty. | This age group learns by trial and error. Punishing mistakes with "no undo" teaches them to stop trying. |
| **Celebration animations** | Confetti/stars on checkmate. Piece capture gets a small sparkle. Character does a happy animation on win. | Dopamine reinforcement for correct play. This is what makes them come back. |
| **Audio cues** | Friendly sound effects for moves, captures, check, checkmate. Muted by default (parent's meeting). Easy toggle. | Multi-sensory engagement for pre-readers. |
| **Parent co-play indicator** | Small icon showing "Playing with a grown-up?" — links to tips for parents playing alongside. | Many 5–7s will play with a parent present. Support this use case. |

### 8–12 Year Olds (Play Tier)

The core engagement group. Old enough to understand competition, young enough to need structure.

| Requirement | Detail | Rationale |
|-------------|--------|-----------|
| **Show rating as a number** | Display ELO but with a friendly label: "Your Chess Power: 1,050 ⚡". Show trend (↑↓→). | Tweens respond to quantified progress. The label makes it approachable. |
| **All 6 characters available** | Full character roster with personality descriptions. Each shows a difficulty label ("Beginner," "Tricky," "Tough") — not ELO numbers. | Tweens want to "unlock" harder opponents. The character progression IS the engagement loop. |
| **Daily challenge** | "Beat [character] today and earn 2x XP!" — one specific character + time control combo per day. | Daily hooks drive retention. This is the single most important engagement mechanic for this age. |
| **Streak tracker** | "🔥 5-day streak! Play today to keep it going." Visible on the play page and dashboard. | Streaks are proven retention drivers. Break-reminder-safe: streak counts days with at least 1 game, not continuous hours. |
| **Post-game review prompt** | After every loss (and optionally after wins): "Want to see where the game turned?" → Simple analysis showing the critical moment. | Turns losses into learning. This is what makes Cognitron chess *educational*, not just a game. |
| **Hint system** (3 per game) | "Need a hint? [Character name] might not like this, but..." → highlights the best square. | Prevents rage-quitting. 3 is enough to get unstuck without trivialising the game. |
| **Undo** (2 per game) | "Oops! Take that back?" — 2 undos per game. | Enough safety net to prevent frustration, limited enough to matter. |
| **Move notation** (optional toggle) | Show algebraic notation in a side panel. Off by default, togglable. | For kids who are serious about chess — builds literacy for tournament play. |
| **Achievement badges** | Tie into existing badge system: "Fork Master," "10-Game Streak," "Beat Boris," "100 Games Played." | Collectible progression. Maps to Livingston's 16 chess badges. |

### 13–17 Year Olds (Compete/Excel Tier)

Teens will abandon anything that feels childish. The UI must respect their intelligence.

| Requirement | Detail | Rationale |
|-------------|--------|-----------|
| **Full ELO display** | Raw rating number. No emoji, no "Chess Power." Show rating graph over time. | Teens want real metrics. Anything else is patronising. |
| **Character names become difficulty labels** | Characters still exist but are secondary. Primary selection is by ELO range: "Easy (800–1000)," "Medium (1200–1500)," "Hard (1800–2000)." Character appears as an avatar, not a mascot. | Teens care about the challenge level, not the character's personality. The character is flavour, not the feature. |
| **Time controls** | Offer Rapid (15+10), Blitz (5+3), and Classical (30+0). Default to Rapid. | Tournament preparation. Teens preparing for KCF events need to practice under time pressure. |
| **Post-game analysis** (detailed) | Engine evaluation bar, best-move comparison, accuracy percentage, critical moments breakdown, opening name identification. | This is what Chess.com offers. If our analysis is worse, teens will leave for Chess.com. It needs to be at least comparable for the basics. |
| **Opening book** | Show the opening name being played ("Italian Game," "Sicilian Defence: Najdorf Variation"). | Educational and cool. Teens love knowing the name of what they just played. |
| **No undo** | Undo button not available at this tier. | Teens playing with undo aren't preparing for real competition. Respecting their level means treating it seriously. |
| **Hint system** (1 per game, optional) | Single hint available. Framed as "Engine suggestion" not "Need help?" | Preserves dignity. One hint is a learning tool, not a crutch. |
| **Dark mode** | Dark board theme option. | Teens play at night. Dark mode is expected, not a luxury. The current students (Wanjiku persona, 15) would absolutely want this. |
| **Keyboard shortcuts** | Arrow keys for move navigation in review. Hotkeys for resign, offer draw, flip board. | Power-user features that signal "this is a real chess app." |
| **Export PGN** | Download game as PGN file for external analysis (Lichess, Chess.com import). | Serious players want to own their game data. Also useful for coaches reviewing games offline. |

---

## 4. Safety & Well-being

### Game Limits

**Recommendation: Soft limits, not hard blocks.** Nairobi parents are paying for this platform — hard-locking their child out of a feature they paid for will generate complaints. But unlimited play enables addictive patterns. Balance:

| Age Group | Soft Reminder | Session Cap | Daily Cap | Rationale |
|-----------|---------------|-------------|-----------|-----------|
| **5–7** | After 15 min | After 30 min (lock for 20 min) | 5 games/day | Young children shouldn't self-regulate screen time. The platform must do it. |
| **8–12** | After 25 min | After 45 min (lock for 15 min) | 10 games/day | Enough for a good session, not enough to replace outdoor play. |
| **13–17** | After 45 min | After 90 min (lock for 15 min) | 20 games/day | Teens preparing for tournaments need longer sessions, but 90 min is more than enough practice. |

**Parent override:** Parents can set stricter limits (fewer games, shorter sessions) but NOT override upward. The platform's defaults are the maximum. This is a trust feature: "Cognitron won't let your child play chess for 4 hours straight, even if they want to."

### Break Reminders Between Games

After every game (regardless of age):
- **Win:** "Nice win! Ready for another, or take a quick break?" (Two buttons: "Play Again" and "Take a Break")
- **Loss:** "Good effort! Want to review that game, play again, or take a break?" (Three buttons: "Review," "Play Again," "Take a Break")
- After 3 consecutive games: "You've played 3 games in a row! Stretch your legs for a minute 🚶" (10-second countdown before "Play Again" button activates — not a hard block, just a speed bump)

**Why between-game prompts matter:** The addictive pattern in chess apps is the "one more game" loop after a loss. The child is frustrated and wants redemption. Inserting a pause point disrupts this cycle without being punitive.

### AI-Generated Message Content Concerns

**All messages must be pre-written and curated. No AI-generated text shown to children.**

Rationale:
- **Kenya Data Protection Act 2019 §33** requires heightened protections for children's data processing. AI-generated content introduces unpredictability.
- **Content control:** We cannot guarantee an LLM won't produce discouraging, confusing, or inappropriate text. Even with guardrails, one bad message ("You played terribly!") would be a trust catastrophe.
- **Parental trust:** "Our messages are hand-written by our education team" is a trust signal. "Our AI generates encouraging messages" is a concern.

**Implementation:** Maintain a curated message bank (JSON/YAML content file) with 15–20 messages per scenario (win/loss/draw × age group × character). Rotate randomly. Review quarterly. Flag to Tess for approval before any additions.

**Exception:** Post-game analysis text (move quality descriptions like "This move lost a pawn") can be engine-generated as it's factual, not emotional.

---

## 5. Accessibility

### Colour Contrast

| Element | Requirement | Rationale |
|---------|-------------|-----------|
| **Board squares** | Light squares: minimum 4.5:1 contrast ratio against background. Dark squares: distinct from light by at least 3:1 ratio. | WCAG AA compliance. Also: some Nairobi schools have kids with undiagnosed colour vision deficiency (8% of boys). |
| **Piece colours** | White and black pieces must be distinguishable by shape alone, not just colour. Outlines on all pieces. | Colour-blind accessibility. Pieces should be identifiable even in greyscale. |
| **Selected square highlight** | Don't rely solely on colour (e.g., green highlight). Add a border, glow, or pattern change. | Colour-only indicators fail for colour-blind users. |
| **Board theme options** | Offer at least: Classic (brown/cream), Blue (navy/light blue), High Contrast (black/white with grid lines). | Choice accommodates different visual needs and preferences. The high-contrast option is the accessibility fallback. |
| **Character selection cards** | Text on cards must meet WCAG AA (4.5:1 for normal text, 3:1 for large text). Avoid text on busy background images. | Character cards with low-contrast text over illustrations are a common accessibility failure. |

### Font Sizing

| Age Group | Minimum Font Size | Line Height | Font Weight |
|-----------|-------------------|-------------|-------------|
| **5–7** | 18px (body), 24px (headings), 20px (game messages) | 1.6 | Medium (500) for body, Bold (700) for messages |
| **8–12** | 16px (body), 20px (headings), 16px (game messages) | 1.5 | Regular (400) body, Semi-bold (600) messages |
| **13–17** | 14px (body), 18px (headings), 14px (game messages) | 1.4 | Regular (400) |

**Additional text requirements:**
- All chess messages must be in a sans-serif font (system font stack is fine — no decorative fonts for game text)
- Move notation should be monospaced for alignment
- No ALL CAPS messages for any age group (hard to read, feels like shouting)
- Kiswahili/Sheng phrases (if used) should be in the same font weight as English — no italicisation that others cultural language

### Touch Target Sizes

| Element | Minimum Size | Spacing | Rationale |
|---------|-------------|---------|-----------|
| **Chess squares** (5–7) | 48×48px | 0px (grid) | Apple HIG minimum is 44px. 48px gives margin for small fingers. |
| **Chess squares** (8–12) | 44×44px | 0px (grid) | Standard touch target. |
| **Chess squares** (13–17) | 40×40px | 0px (grid) | Teens have better motor control. Can go slightly smaller. |
| **Buttons** (Play Again, Undo, Hint) | 48×48px minimum, ideally 56px height | 12px between buttons | No tiny icon-only buttons. All buttons need visible labels or tooltips. |
| **Character selection cards** | Minimum 120×160px | 16px gap | Large enough to see character art clearly and tap without mis-selection. |
| **Captured pieces display** | 24×24px minimum per piece icon | 4px gap | Small is fine here — these are informational, not interactive. |

**Mobile-specific requirements:**
- Board must be full-width on mobile (no side panels stealing space on phones — move list goes below the board)
- Piece drag should have a "lift" animation (piece appears above finger so user can see where they're placing it)
- Accidental piece drops: if a piece is dragged and released outside the board, return it to original square (don't count as a move)
- Landscape mode support for tablets (common use case: iPad on a table in a Nairobi living room)

---

## 6. Summary of Non-Negotiables

These are the requirements that should block launch if not met:

1. **No punishing language** in any loss message, for any age group
2. **Play-time reminders** active by default with age-appropriate thresholds
3. **All child-facing messages are pre-written and curated** — no LLM-generated text
4. **Legal move hints always on for 5–7 year olds** — no toggle to disable
5. **Rating hidden for 5–7 year olds** — visual stars/levels only
6. **Parent dashboard surfaces chess activity** — games played, time spent, rating trend
7. **WCAG AA colour contrast** on board and all interactive elements
8. **48px minimum touch targets for youngest users** on mobile
9. **Between-game break prompts** after every game
10. **Daily game cap** with parent-configurable (downward only) limits

---

## For Linus

The UX/UI implications here are significant. Key handoffs:
- Character card designs for 3 age tiers (playful → clean → minimal)
- Board theme variants including high-contrast accessibility option
- Break reminder modal designs that are friendly, not annoying
- Age-adaptive message display (large + colourful for young kids, compact for teens)
- Parent dashboard chess activity card layout

## For Livingston

Curriculum alignment questions:
- Do the character difficulty mappings align with your tier ELO ranges?
- Should post-game review for 8–12s link to specific curriculum lessons? ("You lost to a fork — try Lesson 2.3: Tactical Forks")
- Daily challenge: should this pull from the puzzle database or be a specific "beat this character" challenge?

## For Frank

QA considerations:
- Test all message variants across age groups (no empty states, no undefined characters)
- Test play-time limits at boundaries (what happens at exactly 45 min mid-game?)
- Test rating display/hide across tier boundaries (what if a 7-year-old is in the 8–12 ELO range?)
- Touch target testing on actual devices (iPhone SE is the smallest common Nairobi phone)

---

*A child who loses a chess game and gets told "Good try! Want to see what happened?" comes back tomorrow. A child who loses and sees "Game Over. You Lost." closes the app and doesn't come back. We're building for the first child.*

— Tess
