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
