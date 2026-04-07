# Squad Decisions

## Active Decisions

### DEC-001: Team restructure — 7 → 11 agents (2026-04-04)

**Context:** Original team had Saul covering coding + AI + chess pedagogy (too broad), Linus overloaded with UX + QA + user advocacy, and no parent/student voice.

**Decision:** Expand to full Ocean's Eleven roster:
- **Split Saul** into 3 domain specialists: Virgil (coding), Turk (AI), Livingston (chess)
- **Add Frank** (QA Engineer) — takes testing/quality from Linus
- **Add Tess** (Parent & Student Advocate) — Nairobi parent POV, end-user persona
- **Refocus Linus** on UX/UI design only

**Status:** ✅ Approved and implemented

---

### DEC-002: Keep monorepo + add security controls (2026-04-04)

**Authors:** Danny (Lead Strategist), Rusty (Full-stack Developer)
**Status:** ✅ Approved

**Context:** Dickson requested an assessment of whether to split the marketing site and platform into separate repos. Both Danny and Rusty independently evaluated the architecture and reached the same conclusion.

**Decision:** Keep the single-repo, single-app Next.js architecture. Do not split.

**Rationale (shared by both):**
- Pre-revenue stage demands speed over ceremony — splitting adds overhead with zero user-facing value
- Next.js route groups (`(dashboard)/`, `(auth)/`, public pages) already provide clean logical separation
- Shared Supabase backend (client config, types, auth helpers, migrations) makes splitting painful
- Single Vercel deploy pipeline, single CI, single set of env vars
- Revisit only if: different framework needed, independent scaling required, team exceeds ~15 engineers, or regulatory isolation mandated

**Security controls — what exists:**
- RLS on all 13 tables; middleware route protection; server-side `requireAuth()`/`requireRole()`; client `RoleGuard`; Supabase cookie-based auth via `@supabase/ssr`

**Security controls — must add (prioritized):**

| Priority | Item | Effort |
|----------|------|--------|
| P0 | Email verification enforcement | Config |
| P0 | Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) | Small |
| P0 | Parental consent gate for under-16 (Kenya Data Protection Act 2019, §33) | Medium |
| P0 | Privacy policy page | Content |
| P0 | Env validation (`@t3-oss/env-nextjs`) | Small |
| P1 | Rate limiting on server actions + auth endpoints | Medium |
| P1 | Zod validation on all server actions | Small |
| P1 | DELETE RLS policies (explicit deny-by-default) | Small |
| P1 | Password strength requirements | Small |
| P2 | Coach MFA (TOTP via Supabase) | Medium |
| P2 | Role-based middleware (reject at edge, not just server-side) | Small |
| P2 | Audit logging (auth events, sensitive operations) | Medium |
| P3 | Coach access scoping (per-student assignment) | Medium |
| P3 | Bundle analysis CI step | Small |

**Child safety (COPPA/Kenya DPA) — critical gaps flagged by Rusty:**
- Students under 16 must be enrolled by a parent account (parental consent gate)
- `date_of_birth` is self-reported — require parent email verification for under-16
- Privacy policy must detail data collected from minors, usage, parent rights to delete
- No direct messaging between students if social features added

**Source files:** `danny-repo-strategy.md`, `rusty-security-controls.md`

---

### DEC-003: Go-to-market strategy — 4-phase plan to 50 families (2025-07-14)

**Author:** Danny (Lead Strategist)
**Status:** 📋 Proposed

**Decision:** Execute a phased GTM plan: Phase 0 (foundation/infrastructure, weeks 1–2) → Phase 1 (soft launch, 10 founding families, weeks 3–6) → Phase 2 (school partnerships + holiday push, 30 families, weeks 7–14) → Phase 3 (scale + brand authority, 50+ families, weeks 15–26).

**Key findings:** The site is a brochure — no working lead capture, no analytics, no payment processing, no CRM. WhatsApp CTA is the only functioning funnel. Brand positioning is strong.

**Critical Phase 0 items:** GA4 + Meta Pixel, fix contact form, finalize KES-first tiered pricing, define founding families program.

**Source file:** `danny-gtm-strategy.md`

---

### DEC-004: Technical & QA audit — 7 critical, 10 important, 8 minor findings (2025-07-15)

**Author:** Frank (QA Engineer)
**Status:** 📋 Proposed

**Decision:** Address critical findings before any real user exposure.

**Critical findings (🔴):**
1. Contact form submits to nowhere — primary conversion mechanism is broken
2. Navbar dropdowns broken on mobile/touch devices
3. No sitemap.xml or robots.txt
4. No 404 page
5. No tests of any kind
6. No security headers in next.config.ts
7. Accessibility gaps (no aria attributes on dropdowns)

**Source file:** `frank-tech-audit.md`

---

### DEC-005: UX/Design audit — 4 critical, 6 important findings (2025-01-20)

**Author:** Linus (Product Designer)
**Status:** 📋 Proposed

**Decision:** Fix critical UX gaps that undermine premium positioning.

**Critical findings:**
1. Contact form has no backend — every lead is lost
2. No real photography or imagery — site feels like a wireframe
3. Navbar dropdowns broken on touch devices
4. Pricing displayed in USD despite targeting Nairobi parents (should lead with KES)

**Source file:** `linus-ux-audit.md`

---

### DEC-006: Marketing readiness audit — overall 3/10 (2025-07-17)

**Author:** Basher (Growth Marketer)
**Status:** 📋 Proposed

**Decision:** Messaging is strong but marketing infrastructure is almost entirely missing. Site is invisible to Google, has zero analytics, no working lead capture, and no social-sharing infrastructure.

**Priority actions:** Install GA4/Meta Pixel, add sitemap/robots.txt, add Open Graph + JSON-LD structured data, create Google Business Profile, fix contact form backend, add conversion tracking.

**Source file:** `basher-marketing-audit.md`

---

### DEC-007: 4-week content calendar — Instagram + WhatsApp launch plan (2025-07-17)

**Author:** Basher (Growth Marketer)
**Status:** 📋 Proposed

**Decision:** Launch with 4-week content calendar across Instagram (3–4 posts/week) and WhatsApp Broadcast (2x/week). Four content pillars: Outcomes, Trust, Education, Community. Weeks: 1) "Meet Cognitron" 2) "Why Coding+AI+Chess" 3) "Meet the Coach" 4) "Student Outcomes / Parent Voice."

**Source file:** `basher-content-calendar.md`

---

### DEC-008: Photo & video shoot brief (2025-07-17)

**Author:** Basher (Growth Marketer)
**Status:** 📋 Proposed

**Decision:** Execute a professional photo/video shoot targeting 60+ usable images and 3 edited video clips. Covers 5 categories: Kids Coding (7 shots), Chess (6 shots), AI Activities (4 shots), Coach at Home (4 shots), Parent Moments (3 shots), plus brand shots. Warm editorial style, natural lighting, real Nairobi homes.

**Source file:** `basher-shoot-brief.md`

---

### DEC-009: Parent & student site review — parent walkthrough findings (2025-07-14)

**Author:** Tess (Parent & Student Advocate)
**Status:** 📋 Proposed

**Decision:** Site scores 7/10 on first impression but has critical trust gaps. Through the eyes of a Karen mother (composite persona "Grace"):

**Critical blockers:** No photos/video of real sessions, no coach bios/credentials, no safeguarding statement, testimonials feel fabricated, no student work examples, session duration never stated, USD-first pricing feels foreign.

**13 unanswered parent questions** identified — from "how long is a session?" to "do you run holiday programmes?"

**Source file:** `tess-parent-review.md`

---

### DEC-010: Coach profiles & safeguarding policy spec (2025-07-15)

**Author:** Tess (Parent & Student Advocate)
**Status:** 📋 Proposed

**Decision:** Every coach must have a visible website profile (12 required fields including photo, bio, qualifications, background check badge). A public safeguarding statement is non-negotiable for a home-visit service targeting minors. Spec includes full coach profile template, sample profile for Dickson, safeguarding policy content, and DBS/background check requirements.

**Source file:** `tess-coach-safeguarding.md`

---

### DEC-011: Parent interview guide — validate before scaling (2025-07-15)

**Author:** Tess (Parent & Student Advocate)
**Status:** 📋 Proposed

**Decision:** Conduct 5–10 parent interviews before investing in marketing or hiring. Six research questions covering pricing validation, delivery model preference, decision journey, pain point validation, trust signals, and competitor awareness. Includes screening criteria, sample composition, recruitment scripts, and interview protocol.

**Source file:** `tess-interview-guide.md`

---

### DEC-012: Chess curriculum — 4-tier structure aligned to Kenya calendar (2025-07-14)

**Author:** Livingston (Chess Academy Lead)
**Status:** 📋 Proposed

**Decision:** Four-tier chess curriculum: Learn (ages 5–8), Play (ages 9–12), Compete (ages 12–15), Excel (ages 15–17). Aligned to Kenya's 3-term academic calendar + holiday intensives. Includes internal Elo rating system, KCF tournament integration, term-by-term lesson plans, assessment criteria, and progression certificates. Key differentiator: chess as one pillar of integrated cognitive excellence programme alongside coding and AI.

**Source file:** `livingston-chess-curriculum.md`

---

### DEC-013: AI/ML curriculum — 3-tier structure (2025-07-08)

**Author:** Turk (AI Education Expert)
**Status:** 📋 Proposed

**Decision:** Three-tier AI curriculum: AI Explorers (ages 8–11, no coding required), AI Builders (ages 11–14, basic coding needed), AI Innovators (ages 14–17, Python required). Each tier has 4 terms. Core principles: hands-on first, AI safety woven throughout, parent-visible outcomes every term, interest-driven personalization, university-portfolio thinking. Integrates with Virgil's coding curriculum at every tier.

**Source file:** `turk-ai-curriculum.md`

---

### DEC-014: Coding curriculum — 3-tier project-based architecture (2025-07)

**Author:** Virgil (Coding Education Expert)
**Status:** 📋 Proposed

**Decision:** Three-tier coding curriculum: Explorers (ages 5–9, Scratch/ScratchJr), Builders (ages 10–13, Python + web), Innovators (ages 14–17, full-stack + portfolio). Aligned to Kenya school calendar (3 terms + holiday intensives). 12 sessions/term at 90 min each. Non-negotiable: every lesson ends with something the child can show a parent. By Tier 3 students have GitHub profiles, deployed websites, and university-ready portfolios.

**Source file:** `virgil-coding-curriculum.md`

---

### DEC-015: Production domain is cognitron.tech (2026-04-04)

**Author:** Dickson Mwendia (via Copilot)
**Status:** ✅ Implemented

**Decision:** The production domain for Cognitron is `cognitron.tech`. All email addresses use `@cognitron.tech`. All meta/SEO references use `https://cognitron.tech`.

**Source file:** `coordinator-domain.md`

---

### DEC-016: Dashboard UX review — score 5.7→7.6 (2026-04-04)

**Author:** Linus (Product Designer)
**Status:** ✅ Implemented

**Decision:** Comprehensive UX review of all dashboard pages, auth pages, and components. Direct fixes across 14 files addressing layout, contrast, micro-interactions, accessibility, and empty states.

**Key fix:** Added `bg-off-white md:rounded-tl-2xl` to DashboardLayout content area — dark chrome frames light content (industry-standard pattern). Complete DashboardLayout overhaul: active nav states, fixed parent/coach routes, sign-out button, Logo component, a11y attributes.

**Page scores (before→after):** Student Dashboard 5→8, Track Detail 7→8, Achievements 6→7.5, Parent Dashboard 6→7.5, Coach Dashboard 6→7, Login/Signup 6→7.5, DashboardLayout 4→8. Overall 5.7→7.6.

**Source file:** `linus-dashboard-ux-review.md`

---

### DEC-017: Dashboard UX prioritized plan — P0/P1/P2 tiers (2026-04-04)

**Author:** Rusty (Full-stack Developer)
**Status:** ✅ Implemented (P0+P1); P2 deferred

**Decision:** Prioritized implementation plan to close the gap from 7.6 to 8.5+ UX score. 4 P0 items (structural/must-do), 8 P1 items (high-impact engagement), 12 P2 items (post-launch polish).

**P0 delivered:** Route group separation, 12 stub pages, parent empty state, auth gradient.
**P1 delivered:** Confetti animation, badge modal, badge filtering, parent progress chart, coach notes editing, payment badge, remember me, profile page.
**P2 deferred:** Age-tier theming (needs Linus), SVG progress path (needs Linus), Google login (needs Danny), responsive testing (needs Frank), and 8 others.

**Source file:** `rusty-dashboard-ux-plan.md`

---

### DEC-018: Route group separation — (marketing) vs (dashboard) (2026-04-04)

**Author:** Rusty (Full-stack Developer)
**Status:** ✅ Implemented

**Decision:** Split `src/app/` into `(marketing)/` and `(dashboard)/` route groups with independent layouts. Root `layout.tsx` reduced to minimal shell (fonts + metadata only). Eliminates the `fixed inset-0 z-50` hack on DashboardLayout. 12 marketing page directories moved. No URL changes.

**Impact:** Dashboard pages no longer render hidden marketing components. z-index no longer overloaded. All 40 routes intact.

**Source file:** `rusty-route-groups.md`

---

### DEC-019: Parental consent gate for under-16 (2026-04-04)

**Author:** Rusty (Full-stack Developer)
**Status:** ✅ Implemented

**Decision:** Students under 16 blocked from self-registration per Kenya DPA 2019 §33. Must be enrolled by parent account via `/parent/add-child`. Date of birth required for student signups. Client-side age check replaces form with blocked-state UI. Parent enrollment flow creates auth user via Supabase Admin API with rate limiting, Zod validation, and cleanup on partial failure.

**Trade-off:** Client-side only age check — a determined user could bypass via API. Mitigation: parent enrollment is the legitimate path; direct API signups without parent link can be flagged via admin review.

**Source file:** `rusty-parental-consent.md`

---

### DEC-020: Security headers + env validation (2026-04-04)

**Author:** Rusty (Full-stack Developer)
**Status:** ✅ Implemented

**Decision:** Added 7 security headers in `next.config.ts` (HSTS, X-Frame-Options, X-Content-Type-Options, CSP, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control). Env validation via `@t3-oss/env-nextjs` + Zod — Supabase vars required in production, validation skipped in dev.

**Trade-off:** CSP includes `unsafe-inline` and `unsafe-eval` for script-src (Next.js dev requirement). Can be tightened with nonce-based CSP later.

**Source file:** `rusty-security-headers.md`

---

### DEC-021: Admin approval gate for new signups (2026-04-04)

**Author:** Rusty (Full-stack Developer)
**Requested by:** Dickson
**Status:** ✅ Implemented

**Decision:** New signups must be manually approved by an admin before accessing the dashboard. `approved` boolean column on `profiles` (default `false`), existing users backfilled as `true`, admin role auto-approved via Postgres trigger. Middleware consolidated to single query checking `approved` + `role`. Unapproved users redirected to `/pending-approval`. Auth guards (`requireAuth`, `requireRole`) enforce the gate. Admin UI at `/admin/approvals` with search, approve/reject buttons, flash messages. Signup redirect changed from `/dashboard` to `/pending-approval`.

**Trade-offs:** Server action stubs (log-only) — real Supabase calls deferred until admin auth E2E tested. Sign-out on pending page needs API route or client-side logic. Approval check is 1 DB query per protected page load; cache in cookie/session if latency grows.

**Files changed:** 11 files across migration, types, auth lib, middleware, mock data, pending page, admin approvals page + actions, DashboardLayout, signup form.

**Source file:** `rusty-approval-gate.md`

---

### DEC-022: Group conversations/tasks/assignments — future feature (2026-04-04)

**Author:** Dickson (via Copilot)
**Status:** 🗓️ Deferred

**Decision:** At some point, enable group conversations, tasks, and assignments for coaches and students. Not for now — captured for team memory.

**When ready, requires:** group chat model, task/assignment schema, coach-to-group and student-to-group relationships, real-time messaging (likely Supabase Realtime), and coach UI for assigning work to groups.

**Source file:** `copilot-directive-2026-04-04T19-group-features.md`

---

### DEC-023: Launch marketing plan — 7-section campaign + 6-month budget (2025-07-17)

**Author:** Basher (Growth Marketer)  
**Status:** ✅ Delivered

**Decision:** Execute comprehensive marketing launch plan for Phase 1 (founding families, 0 → 10). Plan spans 7 core sections:

1. **Founding Families Campaign** — 10 ready-to-send WhatsApp messages (Day 1 warm intro through Week 4 last call), Instagram post captions, hashtag strategy
2. **Google Business Profile** — Full setup checklist (claim, fill details, Q&A, services, photos, optimization)
3. **Instagram Launch Strategy** — Bio copy options, highlights structure (8 highlight categories), first 10 post concepts, 4-pillar content framework (Outcomes 40%, Trust 30%, Education 20%, Community 10%)
4. **WhatsApp Marketing Infrastructure** — Broadcast list segmentation (prospects/enrolled/partners), message cadence (Tue+Fri for cold, Mon+Thu for warm), templates for inquiry response → follow-up → referral → re-engagement
5. **SEO Quick Wins** — 10 blog post outlines ranked by search potential (coding classes, chess benefits, AI for kids, etc.), Kenya-specific long-tail keywords, on-page SEO checklist for homepage/pricing/about/contact
6. **Referral Program ("Cognitron Founding Circle")** — Tiered rewards (1 free session per referral, 3 referrals = free week, 5 referrals = free month + VIP event), mechanics (unique links + coaching verification), messaging templates, low-tech tracking (Google Sheet Phase 1 → ReferralCandy Phase 3)
7. **Budget & ROI** — 6-month spend plan (KES 150K launch + KES 100K months 2–3 + KES 150K months 4–6 = KES 800K total). Key metrics: CAC goal KES 15K→10K, LTV KES 811K, LTV:CAC ratio 81:1 (excellent), trial→enrollment conversion 60%+, referral rate 40%+

**Key artifacts:** 10 WhatsApp templates, 8 Instagram post captions, 10 SEO blog outlines, 4-pillar content strategy, 6-month execution calendar, referral program structure, metrics dashboard

**Next steps (for Dickson):** Day 1–Google Business Profile (2h), Day 2–3 Instagram account + first 3 posts (3h), Day 3 WhatsApp segments (1h), Day 4 first WhatsApp campaign (2h), Day 5 book photo shoot (2h).

**Source file:** `basher-launch-marketing.md`

---

### DEC-024: Chess playground specification — `/dashboard/practice` (2026-04-04)

**Author:** Livingston (Chess Academy Lead)  
**Status:** 📋 Proposed

**Decision:** Comprehensive 47KB specification for interactive chess practice environment at `/dashboard/practice`. Covers feature overview, engine integration (Stockfish + chess.js), puzzle system with adaptive difficulty, student rating/ELO, game modes (vs. AI, vs. peer, analysis), full platform integration with curriculum tiers, UI/UX specifications, and complete Supabase data model.

**Key deliverables:**
- 4 core game modes (3 MVP + 1 Phase 2): Tactical Puzzles, Practice vs Engine, Game Review, and future Student vs Student
- Curriculum tier mapping: Learn (5–8, puzzle rating 400–800) → Play (9–12, 800–1400) → Compete (12–15, 1400–1900) → Excel (15–17, 1900–2400+)
- Stockfish skill levels 0–20 mapped to student tiers
- 10,000+ puzzle database with difficulty progression
- Coach dashboards with student analytics
- Student portfolio integration (games, achievements, progression)

**Integration:** Ties directly to DEC-012 (Chess Curriculum). Feeds Virgil's coding roadmap, Rusty's API layer, Linus's dashboard UX.

**Source file:** `livingston-chess-playground.md` (47KB)

---

### DEC-025: PR review checklist for dashboard PRs (2026-04-07)

**Author:** Frank (QA Engineer)  
**Status:** ✅ Delivered

**Decision:** Implement mandatory QA gate for all dashboard PRs. Created comprehensive checklist preventing recurrence of founder's usability audit findings.

**Audit findings (prevention target):**
- 23 of 25+ dashboard pages use hardcoded mock data
- 16 dead buttons (disabled with no onClick handlers)
- 4 fake save/send operations (setTimeout with success toasts, no DB writes)
- Broken sign-out (navigates without clearing Supabase session)
- Marketing links embedded in dashboard CTAs

**Checklist structure:**
- **12 Automated Grep Checks** — Catch common issues at PR submission:
  - Mock data imports remaining in page files
  - Disabled buttons without onClick handlers
  - setTimeout patterns used for fake async
  - Stale mock dates (2025-07-*)
  - Broken sign-out form pattern

- **31 Manual Review Items** across 6 categories:
  - Data Integration (real Supabase queries, empty state handling)
  - Interactive Elements (buttons wired, links correct, navigation working)
  - User Identity (auth checks, role guards active, logged-in user shown)
  - Backend Operations (server actions functional, DB writes verified)
  - Auth & Navigation (sign-out works via API, protected routes enforced)
  - Cross-Cutting (no dead buttons, no fake saves, no marketing leaks)

- **Merge Rules:**
  - P0 (critical): Automated checks pass + 5 manual items before merge allowed
  - P1 (high): 15 manual items required, can waive with QA sign-off
  - P2 (medium): 11 items tracked as post-merge issues for backlog

- **PR Summary Template** — Standardized description format for dashboard PRs

**Deliverable:** `.squad/checklists/pr-review-checklist.md`

**Source files:** `usability-audit-results.md` (audit foundation)

---

### DEC-026: Chess Puzzles Phase 1 — Architecture Choices (2026-04-07)

**Author:** Rusty (Full-stack Developer)  
**Status:** ✅ IMPLEMENTED

**Decision:** Delivered production-ready Phase 1 chess puzzle system. ~200 curated puzzles bundled locally (not fetched from API), server-side Elo-only rating calculation, Supabase-optional pattern for persistence, react-chessboard v5 (React 19 compatible).

**Key architecture decisions:**
1. **Bundled Puzzle Data** — 200+ puzzles in `src/lib/chess/puzzles.ts` instead of Lichess API. Reason: zero external dependency, instant loading, works offline in dev. Phase 2 can add API layer.
2. **Server-Side Elo Only** — All rating calc in `submitPuzzleAttempt` server action. Client never computes rating (prevents cheating, follows quality gate §1.3).
3. **Supabase-Optional** — Without Supabase: defaults work (1200 rating, 0 solved), puzzles load. With Supabase: full persistence to `chess_puzzle_attempts` + `xp_events`.
4. **react-chessboard v5** — Uses `options` prop (React 19 compatible), not flat props like v4.
5. **Puzzle Solution Flow** — First move is opponent setup (auto-played), remaining moves alternate player/opponent.

**Files created (8):**
- `src/lib/chess/puzzles.ts` (1477 lines, ~200 puzzles)
- `src/lib/chess/queries.ts`
- `src/components/chess/PuzzleBoard.tsx`
- `src/components/chess/PuzzleControls.tsx`
- `src/components/chess/PuzzleStats.tsx`
- `src/components/chess/PuzzleGame.tsx`
- `src/app/(dashboard)/dashboard/practice/chess-puzzles/page.tsx`
- `src/app/(dashboard)/dashboard/practice/chess-puzzles/actions.ts`

**Files modified (5):**
- `src/app/(dashboard)/dashboard/practice/page.tsx`
- `src/app/(dashboard)/dashboard/[track]/page.tsx`
- `src/types/index.ts`
- `src/types/database.ts`
- `package.json`

**Build result:** ✅ 56/56 pages, 0 errors.

**Phase 2 opportunities:** Lichess API integration, puzzle history, daily puzzle, leaderboard, multiplayer.

**Source file:** `rusty-chess-puzzles-phase1.md`

---

### DEC-027: Technical Review of Chess Playground Specification (2026-04-04)

**Author:** Rusty (Full-stack Developer)  
**Reviewing:** `livingston-chess-playground.md` (Livingston's 47KB spec)  
**Status:** ✅ Approved with 3 critical fixes required

**Summary:** Spec is thorough, library choices are sound, phased approach is correct. Found **3 blockers**, **8 items needing changes**, **14 approved items**. Biggest risks: (1) RLS references non-existent `student_coaches` table, (2) Glicko-2 must be server-side (not client), (3) CSP headers need `wasm-unsafe-eval` for WASM.

**Key findings:**

**✅ Approved (14 items):**
- chess.js v1.4.0 — fully compatible, pure JS
- react-chessboard v5.10.0 — React 19 compatible (spec said v4, v5 is right)
- TypeScript 5 — all libs have TS declarations
- Lazy loading strategy — correct route-based code splitting
- Glicko-2 npm package (v1.2.1) — 5KB, server-side only
- 10K Lichess puzzles (CC0) — feasible with streaming import
- Puzzle categorization (15 themes) — good selection
- XP reward integration — uses existing `xp_events` table
- Achievement badges — uses existing `achievements` table
- UI layout (3 modes) — well-specified wireframes
- Mobile responsive (tap-tap default) — correct approach
- Puzzle deferral to Phase 2 — correct prioritization
- Eval bar + critical moment detection — standard chess UI
- Database naming — no conflicts with existing 23 tables

**🔴 Blockers (3 — must fix before Phase 1 implementation):**
1. **RLS policies reference non-existent `student_coaches` table** — doesn't exist; we use `coach_assignments`. Also wrong column: `student_id = auth.uid()` is incorrect (auth.uid() is auth UUID, not profile UUID). Fix: use `student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())` pattern. Add parent + admin policies too.
2. **Glicko-2 rating on client-side is a security hole** — if client computes rating, students can cheat via DevTools. Fix: Server Actions with `requireRole()` + `glicko2` imported server-side only. Client can never propose rating, only receives result.
3. **CSP headers block WASM execution** — current CSP has `script-src 'self' 'unsafe-inline' 'unsafe-eval'` but not `'wasm-unsafe-eval'`. Stockfish WASM will fail in production. Fix: add `'wasm-unsafe-eval'` to script-src in Phase 2 (when engine is added).

**⚠️ Changes needed (8 items):**
- react-chessboard: use v5.10.0 (not v4.x per spec)
- stockfish version: use v18.0.7 (not v16); use `/public/stockfish/` static approach (not bundler imports) to avoid Turbopack WASM issues
- Age tier mapping: map 4 chess tiers to 3 DB tiers via student rating (Compete/Excel both 13-17)
- PostgreSQL INDEX syntax: use `CREATE INDEX` statements (not inline `INDEX` like MySQL)
- `game_moves` table: defer to Phase 2 (optional for MVP)
- RLS parent/admin policies: add `is_parent_of(student_id)` + `is_admin()` to all policies
- Ratings table write access: INSERT/UPDATE via service role only (`WITH CHECK (false)` on RLS)
- Puzzle import: use streaming CSV parser for 1.5GB Lichess file (not `fs.readFileSync`)

**📋 Bundle size impact (zero concerns):**
- chess.js: ~21KB (bundled with chess page)
- react-chessboard: ~50KB (lazy loaded, ssr:false)
- stockfish.wasm: ~1.2MB (static file, never in bundle)
- stockfish.js: ~150KB (static file)
- glicko2: ~5KB (server-side only, not in client bundle)

**📊 Estimated effort:**
| Phase | Scope | Sessions | Dependencies |
|-------|-------|----------|------------|
| **1** | Puzzles only (MVP) | 3–4 | chess.js, react-chessboard, glicko2 |
| **2** | Engine play | 3–4 | Stockfish WASM (static) |
| **3** | Game review | 2–3 | None |
| **4** | Polish + coach/parent | 2–3 | None |
| **Total** | Full MVP | **10–14** | 3 npm + 1 WASM |

**Recommendation:** ✅ **Approve with changes.** Fix the 3 blockers in spec, update library versions, and Phase 1 is ready to build.

**Source file:** `rusty-chess-review.md`

---

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
