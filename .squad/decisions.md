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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
