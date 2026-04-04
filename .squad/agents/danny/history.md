# Danny — History

## Core Context

- **Project:** Premium tech education platform (coding, AI, chess) for kids and teens targeting affluent families in Nairobi, Kenya
- **Role:** Lead Strategist
- **Joined:** 2026-04-04T11:17:24.275Z

## Learnings

<!-- Append learnings below -->

### 2026-04-04: Monorepo vs multi-repo decision
- Reviewed full codebase: Next.js 16 + Supabase, route groups for separation, 13 tables with full RLS
- **Decision:** Keep monorepo. Splitting adds overhead with no benefit at current stage.
- Security posture is solid (RLS, middleware auth, role guards). Identified gaps: rate limiting, CSP headers, audit logging, input sanitization with zod.
- Filed decision to `.squad/decisions/inbox/danny-repo-strategy.md`
- Revisit trigger: Series A, >15 engineers, or >1,000 MAU

### 2026-04-04: Role-based middleware hardening + DELETE RLS policies
- Enhanced edge middleware (`src/lib/supabase/middleware.ts`) with role-based access control via `ROLE_GATES` map: `/coach` → coach-only, `/parent` → parent-only. Students cannot navigate to coach or parent routes, and vice versa. Unauthorized users redirected to `/dashboard`.
- Role check queries `profiles.role` by indexed `user_id` — only fires on gated paths, not every request. Lightweight, ~2-5ms.
- Created migration `20250402000000_delete_rls_policies.sql` with explicit DELETE policies for all 13 tables. Default: DENY. Granted DELETE only where user-facing need exists (student_progress, student_achievements, parent_student_links, coach_assignments, sessions_schedule, session_students).
- Curriculum tables, profiles, xp_events all deny deletes via API — admin uses service_role which bypasses RLS.
- `contact_submissions` table doesn't exist yet — noted in migration for future coverage.
- Filed decision to `.squad/decisions/inbox/danny-rls-policies.md`

### 2026-04-04: Architecture & performance review
- **CRITICAL BUG FOUND:** `src/proxy.ts` exports `proxy` instead of `middleware`, and file isn't named `middleware.ts`. Next.js middleware is silently not running — auth route protection, role gates, and session refresh are all inactive.
- Font loading: 10 weights across 2 families (Playfair 5 + DM Sans 5). Only ~5 are used. Trim to save ~100-200KB on first paint.
- `WhatsAppButton.tsx` has unnecessary `"use client"` — no hooks, no state, pure server component.
- Double `requireAuth()` calls: dashboard layout AND each child page both call it, causing redundant Supabase round-trips.
- Marketing pages (homepage, about, pricing, academy) have no `dynamic = 'force-static'` — should be build-time rendered.
- In-memory rate limiter (`rate-limit.ts`) won't survive serverless cold starts — need Upstash Redis before launch.
- Middleware role check queries DB on every gated request — role should be encoded in JWT to eliminate edge→DB latency.
- No `generateStaticParams` on `[track]` page despite only 3 slugs (coding, ai, chess).
- Navbar is 222 lines of client JS — could split into server shell + client interactive parts.
- mock-data.ts is 31KB, imported by 13 files including auth.ts — clean up before production.
- CSP allows `unsafe-eval` — should be removed for production.
- **Overall assessment:** Architecture is sound for current stage. No rewrite needed — targeted fixes only.

### 2026-04-04: Admin Dashboard Spec
- Designed comprehensive admin dashboard ("founder's cockpit") for platform-wide visibility.
- **60+ KPIs** across 6 domains: Revenue, Students, Engagement, Coaches, Growth/Retention, Operations. Each with calculation formula and update frequency.
- **7 admin pages:** Overview cockpit, Students, Coaches, Revenue, Curriculum, Sessions, Settings.
- **Churn risk scoring model:** Composite of 6 signals (lesson gaps, streak breaks, payment delays, etc.) with 18 alert types.
- **Permissions model:** Admin role can do everything other roles can't — create coaches, view financials, manage curriculum, export data.
- **7 standard reports:** Weekly Pulse, Monthly Review, Term Report, etc. with automated delivery schedules.
- **12 new tables** for admin features (audit_log, invoices, payments, alerts, churn_scores, referrals, etc.).
- **5-phase build plan:** MVP → Financial Intelligence → Churn Analytics → Curriculum CMS → Advanced Operations.
- Deliverable: `.squad/decisions/inbox/danny-admin-dashboard-spec.md`
