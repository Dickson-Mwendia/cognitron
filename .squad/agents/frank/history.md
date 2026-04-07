# Frank — History

> Session log for Frank (QA Engineer)

## Sessions

### 2026-04-04: Dashboard Test Plan — 97 Cases
- Created comprehensive test plan for the student learning dashboard with Supabase auth.
- **97 test cases** across 12 sections: Auth (14), Authorization/RLS (21), Dashboard functional (14), Responsive (10), Accessibility/WCAG 2.1 AA (10), Performance (6), Edge cases (9), Nairobi-specific (8), Security (5).
- Device/browser matrix: iPad, Galaxy Tab A, iPhone, MacBook, Chromebook.
- RLS verification: student can't see other students, parent only sees linked children, coach sees all.
- Performance targets: <500KB initial load, Core Web Vitals, 3G Nairobi simulation.
- Nairobi-specific: offline behavior, data-saving mode, WhatsApp deep links, M-Pesa flows.
- Recommended stack: Playwright + Vitest + axe-core + Lighthouse CI.
- Deliverable: `.squad/decisions/inbox/frank-dashboard-test-plan.md`

### 2026-04-04: Ready for Testing — "View as Student" Routes
- **Rusty completed** 4 new routes + 3 shared components for "View as Student" and Progress Report features.
- New routes: `/admin/students/[id]`, `/admin/students/[id]/report`, `/coach/students/[id]`, `/coach/students/[id]/report`
- New components: `StudentDashboardView`, `ViewingAsBanner`, `ProgressReportEditor`
- Existing UI wired: "View Full Dashboard" button in StudentDetailDrawer, student name links in CoachStudentRosterClient
- Build passes clean. Ready for test coverage per existing dashboard test plan.

### 2026-04-04: Staging QA Checklist + Chess Phase 1 Test Plan — 125 Cases
- Created two comprehensive test plans for first staging deployment and chess Phase 1 (puzzles only).
- **Part 1 — Staging QA: 69 test cases** across 14 sections: Homepage (10), Academy (6), Pricing (4), Contact/About (5), Auth/Signup (14), Student Dashboard (7), Parent Dashboard (5), Coach/Admin Dashboard (9), Auth & Authorization (6), Responsive (6), Accessibility (8), Performance (5), SEO/Meta (7), Security Headers (7).
- **Part 2 — Chess Phase 1: 56 test cases** across 8 sections: Puzzle Core (10), Hint/Solution/Skip (7), Adaptive Rating (7), Theme/Difficulty (6), XP Integration (7), UI/UX (10), Edge Cases (7), Security (8).
- **56 P0 tests** (ship-blocking), 55 P1, 14 P2.
- Flagged 5 BLOCKER tests from Rusty's chess review: server-side rating, RLS `profiles(id)` pattern on `puzzle_attempts` and `ratings`, no direct student rating UPDATE, coach queries use `coach_assignments` not `student_coaches`.
- Key Nairobi-specific concerns: mobile-first at 375px, KES-first pricing, 3G performance simulation, touch interaction for chess moves.
- Verified age gate implementation (DEC-019) against signup form code — client-side only with known bypass risk noted.
- Confirmed security headers in `next.config.ts` match DEC-020 requirements (7 headers configured).
- Deliverable: `.squad/decisions/inbox/frank-staging-qa.md`

## Learnings

- The signup age gate (DEC-019) is client-side only — `calculateAge()` in `signup-form.tsx` can be bypassed via direct API call. This is a known trade-off documented in DEC-019, but it means the admin approval gate (DEC-021) is the real safety net. Must verify both work together.
- Chess Phase 1 has zero implementation yet — `/dashboard/practice` is just a "Coming Soon" placeholder. Test plan is ready but execution depends on Rusty's implementation.
- The `student_coaches` table referenced in Livingston's spec doesn't exist — must use `coach_assignments`. This is a blocker that affects both coach dashboard tests and chess visibility tests.
- RLS pattern matters: `auth.uid()` gives the Supabase auth user ID, but our `profiles.id` is a separate column with `user_id` referencing auth. Every RLS policy must do the subquery. This is the #1 security test for chess.
- Security headers are configured in `next.config.ts` but CSP includes `unsafe-inline` and `unsafe-eval` — acceptable for now (Next.js dev requirement) but should be tightened with nonce-based CSP before production.
- Test data setup is the prerequisite for all dashboard testing — need seeded accounts for each role. Without this, 40+ tests are blocked.

### 2026-04-07: PR Review Checklist — Post-Audit Quality Gate
- Created `.squad/checklists/pr-review-checklist.md` — comprehensive checklist derived from the founder's usability audit that found 23/25+ dashboard pages with hardcoded mock data, 16 dead buttons, 4 fake backend operations, and broken sign-out.
- **Quick Scan section** with 12 automated grep commands (5 Critical, 4 High, 4 Medium) that can be run against changed files to catch the most common issues instantly.
- **Manual Review section** with 31 yes/no checks across 6 categories: Data Integration (6), Interactive Elements (6), User Identity (6), Backend Operations (7), Auth & Navigation (6), Cross-Cutting (6).
- **Severity system:** Critical (blocks merge, zero exceptions), High (should fix, waivable by QA lead), Medium (can ship with tracked issue).
- **PR Summary Template** for consistent review comments.
- Banned patterns include: `mock*` imports, `setTimeout` in handlers, `action="/login"` for sign-out, hardcoded names ("Amara Kamau", "David Mutua"), dashboard links to `/contact`, magic numbers like `max={6000}`, stale 2025 date strings.
- Deliverable: `.squad/checklists/pr-review-checklist.md`
