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

### 2026-04-04: Parental Consent Gate — Under-16 Age Block
- Implemented Kenya DPA 2019 §33 compliance: students under 16 cannot self-register. Age check runs client-side in the signup form for immediate UX feedback.
- Made `date_of_birth` required for student signups (was optional). Added `max` attribute on the date input to prevent future dates.
- When a student under 16 tries to sign up, the form is replaced with a friendly blocked-state card explaining the requirement, with CTAs to parent signup (`/signup?role=parent`) and login.
- Signup form now reads `?role=parent` query param to preselect the parent role — used by the age-gate CTA link.
- Created `src/app/(dashboard)/parent/add-child/page.tsx` — client component form for parents to enrol children. Matches existing design language (navy/gold, rounded-2xl, lucide icons).
- Created `src/app/(dashboard)/parent/add-child/actions.ts` — server action using Supabase Admin API (service role key) to create child auth user, profile, and `parent_student_links` entry. Includes Zod validation, rate limiting, role verification, and cleanup on failure.
- Updated parent dashboard with an "Add Child" button linking to `/parent/add-child`.
- Supabase typed client `.select()` with `.single()` can produce `never` types when TypeScript narrows role unions — fixed with explicit `as Profile | null` cast after the query.
- Generated passwords use `crypto.randomBytes(24).toString('base64url')` + complexity suffix — children use parent-managed access or password reset flow.

### 2026-04-04: Contact Form → Supabase Persistence
- Created migration `supabase/migrations/20250403000000_contact_submissions.sql`: new `contact_submissions` table with status workflow (`new` → `contacted` → `enrolled` → `closed`), RLS enabled.
- RLS policies: anon/authenticated can INSERT (server action uses anon key), only coaches can SELECT (via `profiles.role = 'coach'` check). No UPDATE/DELETE policies — admin-only via service role.
- Updated `src/app/contact/actions.ts` to insert into `contact_submissions` via Supabase server client after Zod validation passes. Maps camelCase form fields to snake_case DB columns. Empty optional fields stored as NULL.
- Dev-mode fallback preserved: if `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing, submissions log to console as before. No breakage for local dev without Supabase.
- All existing validation (Zod schema with HTML stripping), rate limiting (5/min per IP), and user-facing messages preserved exactly.

### 2026-04-04: Performance Quick Wins — Batch 2
- **Analytics lazy-loading:** Changed `Analytics.tsx` from `strategy="afterInteractive"` to `strategy="lazyOnload"` for both GA4 and Meta Pixel scripts. Analytics scripts no longer block page rendering at all — they load only after the page is fully idle.
- **Placeholder ID guard:** Added `isRealId()` check that skips injecting analytics scripts entirely when IDs contain `XXXXXXXXXX`. No network requests, no DOM pollution in dev. The component returns `null` when both IDs are placeholders.
- **Event tracking gated:** `gtagPageView` and `fbqTrack` calls in the `useEffect` are now conditional on real IDs being present. `analytics-utils.ts` left untouched — those helpers already guard on `window.gtag`/`window.fbq` existence.
- **next/image for avatars:** Converted `<img>` tags in `DashboardLayout.tsx` (32×32 user avatar) and `StudentCard.tsx` (44×44 student avatar) to `next/image` `<Image>` with explicit `width`/`height`. Enables automatic WebP/AVIF conversion, lazy loading, and blur-up.
- **Supabase image domain:** Added `images.remotePatterns` to `next.config.ts` for `*.supabase.co/storage/v1/object/public/**`. Required for `next/image` to optimise Supabase-hosted avatars/uploads.
- **No `<img>` on public pages:** Scanned all `src/` — the homepage and other marketing pages use Lucide icons, emojis, and styled divs exclusively. No raster `<img>` tags found outside of the dashboard avatar components and the Meta Pixel noscript tracking pixel (which must stay as `<img>`).

### 2026-04-04: MDX Blog System
- Built full MDX blog infrastructure: `content/blog/` → `src/lib/blog.ts` → `src/app/blog/page.tsx` + `src/app/blog/[slug]/page.tsx`.
- Dependencies added to `package.json`: `gray-matter` (frontmatter), `next-mdx-remote` (server-side MDX rendering), `reading-time` (read time calc), `@tailwindcss/typography` (devDep for prose classes).
- `src/lib/blog.ts` reads `.mdx` files from `content/blog/` at build time using `fs`/`path`/`process.cwd()`. Exports `getAllPosts()` (sorted newest-first), `getPostBySlug()`, and `PostMeta`/`Post` types.
- Created 5 substantive seed posts (400–600 words each): coding for Kenyan kids, AI literacy, chess & academics, screen time reframe, family online safety. All written from Cognitron's perspective with CTAs.
- Updated blog index to import `getAllPosts()` dynamically instead of hardcoded array. Same JSX/styling, just swapped the data source.
- Created `[slug]/page.tsx`: server component using `MDXRemote` from `next-mdx-remote/rsc` (zero client JS). Custom `mdxComponents` map styles h2/h3/p/ul/ol/blockquote/a/code to match site design (navy headings, gold accents). `generateStaticParams()` + `generateMetadata()` for full static pre-rendering + SEO.
- Design decision: avoided `@next/mdx` in favour of `next-mdx-remote/rsc` — simpler setup, no config changes, works as pure server components with `force-static`.
- All 5 MDX filenames match the slugs already used in the old hardcoded blog index. No broken links.

### 2026-04-04: Student/Parent/Coach Dashboards + Supabase Auth
- **35 files created/modified** across 4 phases.
- **Auth:** Installed `@supabase/supabase-js` + `@supabase/ssr`. Created client/server/middleware helpers in `src/lib/supabase/`. Built `/login` + `/signup` pages with demo mode fallback. Route protection via Next.js 16 proxy.
- **Database:** Migration `20250101000000_initial_schema.sql` — 13 tables, RLS policies for 3 roles (student/parent/coach), helper functions, auto-profile trigger, track seed data.
- **Dashboard pages:** `/dashboard` (student home), `/dashboard/[track]` (track detail), `/dashboard/achievements` (badges/XP/streaks), `/parent` (children overview), `/coach` (student roster).
- **10 reusable components:** ProgressRing, XPBar, StreakCounter, AchievementBadge, SessionCard, TrackCard, LevelMap, StudentCard, DashboardLayout, RoleGuard.
- Coral + teal added to theme. Build passes clean.

### 2026-04-04: Admin Dashboard — 7 Pages + 9 Components
- Built full admin dashboard using Danny's spec.
- **7 pages:** `/admin` (KPI cockpit with sparklines + alerts), `/admin/students` (searchable DataTable + detail drawer + CSV export), `/admin/coaches` (roster + utilization + create coach modal), `/admin/revenue` (MRR/ARR + revenue by track + trends), `/admin/curriculum` (interactive tree browser + CRUD), `/admin/sessions` (session management), `/admin/settings` (pricing, notifications, announcements, config).
- **9 admin components:** KPICard, DataTable, SparklineChart, AlertFeed, MetricTrend, ExportButton, CurriculumTree, CreateCoachModal, StudentDetailDrawer.
- **DB migration:** 10 new tables (audit_log, invoices, payments, alerts, etc.) with full RLS + admin SQL functions.
- Added `admin` role to RoleGuard, DashboardLayout nav, middleware protection, TypeScript types. Build passes clean.

### 2026-04-04: Dashboard UX Plan — Post-Linus Review
- Reviewed Linus's full UX review (14 files changed, score 5.7→7.6). His direct fixes covered layout theme conflicts, nav routes, active states, micro-interactions, a11y, and empty states.
- Audited all 12 missing nav pages: 4 student, 5 parent, 3 coach. None exist yet — every nav click beyond the home page of each role is a dead link.
- Biggest structural debt: root `layout.tsx` renders Navbar/Footer/WhatsApp for ALL routes. Dashboard uses `fixed inset-0 z-50` overlay to hide them. Proper fix is `(marketing)` route group separation — flagged as P0-1.
- Created prioritized plan with 4 P0 items (route groups, stub pages, parent empty state, auth polish), 8 P1 items, 12 P2 items. P0+P1 estimated at 6–8 dev days.
- Age-tier theming (3 tiers: 5–8, 9–12, 13–17) is the largest item (XL) and fully blocked on Linus providing design tokens. Deferred to P2.
- Performance constraint: must stay under 500KB initial load. All new libraries (e.g., canvas-confetti for XP celebrations) must be lazy-loaded.
- Kenya DPA implications noted: profile page must not expose DOB, coach notes are PII needing RLS, social sharing must not include student names without parent consent.
- Plan written to `.squad/decisions/inbox/rusty-dashboard-ux-plan.md`.

### 2026-04-04: Dashboard UX Improvements (P0-3, P0-4, P1-7, P1-8)
- **P0-3 Parent Empty State:** Added empty-state cards for children (warm onboarding with "Add Your First Child" CTA), upcoming sessions (calendar icon + "Book a Session" CTA), and coach notes (informational message). Uses dashed-border pattern with track-colored accents. Existing populated states wrapped in else branches — zero visual change for parents with data.
- **P0-4 Login/Signup Visual Polish:** Replaced flat `bg-navy` on login and signup pages with `bg-gradient-to-br from-navy via-navy-dark to-navy`. Added two decorative glow divs (gold top-right, teal bottom-left) with `blur-3xl` and `pointer-events-none`. Inner content elevated with `relative z-10`.
- **P1-7 Remember Me Checkbox:** Added `rememberMe` state (default `true`) to login form. Checkbox placed between password field and submit button, inline with "Forgot password?" link. UX signal only — Supabase sessions are already persistent.
- **P1-8 Student Profile Page:** Created `src/app/(dashboard)/dashboard/profile/page.tsx` as a server component. Includes: avatar with initials, name/role/age badge header, 4 quick-stat cards (XP, streak, achievements, level), enrolled tracks with progress bars, read-only account settings section, and action buttons (back to dashboard, parent dashboard, sign out). Uses Lucide icons and consistent dashboard design language.
### 2026-04-04: P0-1 Route Group Separation (Fix Double Navigation)
- Created `(marketing)` route group under `src/app/`. Moved all 12 marketing/auth page directories (`about/`, `academy/`, `blog/`, `contact/`, `how-it-works/`, `pricing/`, `privacy/`, `protect/`, `terms/`, `login/`, `signup/`) and `page.tsx` (home) into it.
- Created `src/app/(marketing)/layout.tsx` — renders `<Analytics>`, `<Navbar>`, `<main>`, `<Footer>`, `<WhatsAppButton>`. No `<html>`/`<body>` tags (those stay in root).
- Simplified root `layout.tsx` — removed Navbar, Footer, WhatsAppButton, Analytics imports and JSX. Now only handles fonts, metadata, and the bare `<html>`/`<body>` wrapper.
- Fixed `DashboardLayout.tsx` — changed outer container from `fixed inset-0 z-50` to `flex h-screen`. Dashboard no longer needs to "cover" marketing chrome because it's in a separate route group.
- Deleted empty `(auth)/` route group.
- One import fix required: `ContactForm.tsx` referenced `@/app/contact/actions` — updated to `@/app/(marketing)/contact/actions`. Route groups are filesystem-visible in import paths even though they don't affect URLs.
- Build passes clean. All 40 routes render at their original URL paths — route groups are transparent to users.

### 2026-04-04: P0-2 — 11 "Coming Soon" Stub Pages for Missing Nav Items
- Created shared `ComingSoon` component at `src/components/dashboard/ComingSoon.tsx` — reusable placeholder with icon, title, description, "Coming soon" badge, and back-link button. Uses Lucide icons and matches dashboard design language (navy/gold palette).
- Created 11 stub pages (profile already existed): 3 student (`tracks`, `practice`, `schedule`), 5 parent (`children`, `schedule`, `messages`, `billing`, `reports`), 3 coach (`sessions`, `notes`, `schedule`).
- Each page is an async server component with `metadata` export and proper auth guard: student pages use `requireAuth()`, parent pages use `requireRole(['parent'])`, coach pages use `requireRole(['coach'])`.
- Exported `ComingSoon` from `src/components/dashboard/index.ts` barrel.
- Zero TypeScript errors. Every sidebar nav link in DashboardLayout now resolves to a real page.

### 2026-04-04: P1-4, P1-5, P1-6 — Last P1 Dashboard Features
- **P1-6 Payment Status Indicator:** Added per-child payment status badges on parent dashboard cards. Uses a `paymentStatus` lookup map (child ID → `'paid' | 'due' | 'overdue'`). Rendered as colored pill badges below the stats grid: emerald for paid, amber for due, red for overdue. Each with a contextual icon (✓, 🕐, ⚠).
- **P1-5 Coach Session Notes Inline Editing:** Created `CoachNoteEditor.tsx` client component with full inline edit flow — click Edit → textarea appears → Save/Cancel buttons. Optimistic UI updates with "Saving…" indicator. Added `mockCoachEditableNotes` (4 notes) to mock-data.ts. Component added below Upcoming Sessions on coach dashboard.
- **P1-4 Parent Progress Comparison Chart:** Created `ProgressComparison.tsx` — pure CSS/Tailwind horizontal bar chart. Shows XP (gold), Streak (coral), Level (teal) side-by-side for each child. Proportional widths relative to max value. Only renders when 2+ children exist. Added below children cards on parent dashboard.
- Both new components exported from `src/components/dashboard/index.ts` barrel. No npm packages added. Build passes clean.