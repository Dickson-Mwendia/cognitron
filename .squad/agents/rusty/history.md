# Rusty — History

## Core Context

- **Project:** Premium tech education platform (coding, AI, chess) for kids and teens targeting affluent families in Nairobi, Kenya
- **Role:** Full-stack Developer
- **Joined:** 2026-04-04T11:17:24.278Z

## Learnings

<!-- Append learnings below -->

### 2026-04-04: Monorepo + Security Audit
- Reviewed full codebase: single Next.js app with marketing + platform in route groups. Supabase backend with 13 tables, all RLS-enabled.
- Auth stack: Supabase Auth → server-side `getUser()` (correct, not just `getSession()`), edge middleware for route protection, `requireAuth()`/`requireRole()` server-side guards, `RoleGuard` client component.
- RLS is comprehensive: role-based (student/parent/coach), parent-child linking via `is_parent_of()`, curriculum read-only for authenticated users.
- Key gaps found: no CSP headers, no email verification enforcement, no parental consent gate (critical for under-16 per Kenya DPA 2019), no rate limiting on server actions, no DELETE RLS policies, no env validation.
- Decision filed: keep monorepo, add security controls in priority order. See `.squad/decisions/inbox/rusty-security-controls.md`.

### 2026-04-04: P0 Security Controls — Headers + Env Validation
- Added comprehensive security headers in `next.config.ts`: HSTS, X-Frame-Options DENY, CSP (self-only with Supabase connect-src), nosniff, strict referrer, permissions policy. Applied to all routes via `/:path*`.
- CSP allows `unsafe-inline`/`unsafe-eval` for script-src — required by Next.js in dev. Can tighten with nonces in production later.
- Added `@t3-oss/env-nextjs` + `zod` to package.json deps for env validation.
- Created `src/lib/env.ts`: validates Supabase URL/key in production, skips validation in dev (mock data flow). Service role key is optional server-only.
- Created `.env.example` documenting all vars with usage comments.
- Key design choice: `skipValidation: !isProduction` — dev never breaks from missing env vars, production fails fast on missing Supabase config.

### 2026-04-04: Zod Validation + Rate Limiting on Server Actions
- Replaced manual validation in `contact/actions.ts` with a Zod schema. Used `z.string().transform().pipe()` pattern to sanitize (trim + strip HTML) before validating min-length. Keeps the same user-facing error messages.
- Created `lib/rate-limit.ts` — generic in-memory rate limiter using a Map with periodic TTL cleanup. Returns `{ success, remaining, resetAt }`. Configurable window and max requests. Designed for easy swap to Upstash/Redis later.
- Applied rate limiting to the contact form action: 5 requests/min per IP, extracted from `x-forwarded-for` or `x-real-ip` headers. Graceful fallback if headers() fails.
- ZodError uses `.issues` not `.errors` — TypeScript caught it.
