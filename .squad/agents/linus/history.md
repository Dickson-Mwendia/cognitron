# Linus — History

## Core Context

- **Project:** Premium tech education platform (coding, AI, chess) for kids and teens targeting affluent families in Nairobi, Kenya
- **Role:** Product Designer
- **Joined:** 2026-04-04T11:17:24.280Z

## Learnings

<!-- Append learnings below -->
- Created `/privacy` and `/terms` pages matching the existing design language (navy hero, gold accents, off-white cards, section labels with tracking-widest). Both pages follow the same layout skeleton as About and Pricing: hero → content sections → footer CTA.
- Privacy Policy is structured around Kenya DPA 2019 compliance, with explicit Section 33 callout for children under 16. Terms of Service covers all standard areas with Kenya as governing law.
- Added a "Legal" subsection to the Footer component under the Company column with Privacy Policy and Terms of Service links, using the same link styling (`text-sm text-white/70 hover:text-gold transition-colors`).
- Content sections use gold bullet dots (`w-1.5 h-1.5 rounded-full bg-gold`) and off-white info cards (`bg-off-white rounded-xl p-5 border border-navy/5`) for visual consistency with the rest of the site.

### 2026-04-04: Logo & Brand Identity — "The Cognition Shield"
- Designed 3 logo concepts; recommended **"The Cognition Shield"** — hexagonal crest with code brackets, neural nodes, and chess knight. Mirrors Nairobi private-school heraldry (Brookhouse, ISK).
- Built `src/components/Logo.tsx` as SVG React component with props: `size` (sm/md/lg/xl), `variant` (full/icon-only/wordmark), `on` (dark/light).
- Created `public/favicon.svg` and updated `layout.tsx` metadata.
- Integrated logo into Navbar + Footer, replacing text-only branding.
- Proposed accent colors: Coral (#e8614d) for energy, Teal (#2a9d8f) for tech trust.
- Full brand identity doc: `.squad/decisions/inbox/linus-logo-brand-identity.md`

### 2026-04-04: Dashboard UX Design Spec
- Created comprehensive dashboard design document covering all 4 role views (student, parent, coach, admin).
- Information architecture: `/dashboard/*`, `/parent/*`, `/coach/*` route hierarchy with 5 core user flows.
- 50+ component inventory across 7 categories (nav, progress, gamification, scheduling, communication, parent-specific, shared).
- Age-adaptive rendering strategy: 3 tiers (5–8, 9–12, 13–17) with different UI density and visual language.
- Tablet-first responsive strategy (iPads primary kid device), <500KB initial load target for Nairobi networks.
- Owl mascot concept, celebration sequences (level-up, badge earned, streak milestone).
- Spec: `.squad/decisions/inbox/linus-dashboard-design.md`

### 2026-04-04: Dashboard UX Review — 15 Files Fixed
- Audited all dashboard pages and components built by Rusty against design spec.
- **Layout fix:** Content area now uses `bg-off-white` with `rounded-tl-2xl` (dark chrome + light content = premium pattern).
- **Dashboard overlay:** `fixed inset-0 z-50` prevents double-navigation with root Navbar/Footer.
- **Nav routes:** Fixed parent/coach nav items pointing to wrong routes.
- **Active states:** `usePathname()` drives gold highlights on current page in sidebar + mobile nav.
- **Accessibility:** Added `role="progressbar"` + ARIA attributes on ProgressRing & XPBar, `:focus-visible` global gold outline, `aria-current="page"` on active nav items.
- **Polish:** Dark card wrappers for gamification components, empty states for every section, hover/scale micro-interactions, `active:scale-[0.97]` tactile feedback.
- Full review: `.squad/decisions/inbox/linus-dashboard-ux-review.md`
