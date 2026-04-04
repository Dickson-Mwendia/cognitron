# Marketing Readiness Re-Audit — Basher (Growth Marketer)

**Date:** 2026-04-05
**Previous audit:** DEC-006 (scored 3/10)
**Reference:** DEC-023 (launch marketing plan), DEC-003 (GTM strategy)

---

## Marketing Readiness Score: 6/10 (up from 3/10)

Significant infrastructure progress. The bones are real now — sitemap, robots.txt, OG meta, blog with actual content, working contact form, analytics scaffolding. But: no analytics IDs are live, no JSON-LD, no OG image file, and the blog only covers 5 of the 10 SEO outlines I delivered. We're not launch-ready, but we're no longer a brochure with a broken form.

---

## Infrastructure Checklist

| Item | Status | Notes |
|------|--------|-------|
| **Sitemap (`sitemap.ts`)** | ✅ Done | Lists 15 routes incl. homepage, academy, pricing, contact, blog, privacy, terms. Correct domain (`cognitron.tech`). Weekly/monthly frequencies. Priorities set. |
| **Robots.txt (`robots.ts`)** | ✅ Done | Allows all crawlers, points to sitemap.xml. Clean and correct. |
| **Meta tags (root `layout.tsx`)** | ✅ Done | `metadataBase` set to `cognitron.tech`. Title template with brand. Description is keyword-rich and Nairobi-specific. 7 keywords. |
| **Open Graph tags** | ✅ Done (partial) | Root layout has OG type, locale (`en_KE`), siteName, title, description, image. Contact page has page-level OG. Blog posts have article OG with `publishedTime`. **BUT: `/public/og-image.jpg` does not exist** — every OG share will show a broken image. |
| **Twitter Card tags** | ✅ Done (partial) | `summary_large_image` card set in root layout. Same broken image issue. |
| **Analytics (GA4)** | ⚠️ Scaffolded, not live | `Analytics.tsx` component exists, loaded in marketing layout. GA4 + Meta Pixel code is complete with page view tracking and event helpers. **But IDs are placeholders** (`G-XXXXXXXXXX`, `XXXXXXXXXX`). The component correctly skips injection when IDs are placeholder. Zero data is being collected. |
| **Conversion tracking** | ⚠️ Scaffolded, not live | `trackEvent()` utility exists for `form_submit`, `whatsapp_click`, `cta_click`. ContactForm calls `trackEvent("form_submit")` on success. WhatsApp button does NOT call `trackEvent("whatsapp_click")` — missed instrumentation. |
| **Contact form backend** | ✅ Done | Server action with Zod validation, XSS stripping, rate limiting (5/min/IP), Supabase persistence to `contact_submissions` table. Falls back to console.log in dev. Returns user-friendly errors. This is a real backend. |
| **Blog — infrastructure** | ✅ Done | MDX-based blog system: `content/blog/*.mdx` → `src/lib/blog.ts` (gray-matter + reading-time) → `/blog` listing page → `/blog/[slug]` detail pages. Static generation. Category colours. CTA at bottom of every post. |
| **Blog — content** | ⚠️ Partial (5/10) | 5 articles published covering: coding for kids, AI literacy, chess & academics, digital safety, screen time. All are substantive (not placeholder). **5 of my 10 SEO outlines remain unwritten** (see below). |
| **JSON-LD structured data** | ❌ Missing | No `application/ld+json` anywhere. No `Organization`, `LocalBusiness`, `EducationalOrganization`, `Course`, or `Article` schema. Google won't show rich results. This is a quick win. |
| **OG image file** | ❌ Missing | `og-image.jpg` referenced in meta but doesn't exist in `/public/`. Every social share (WhatsApp, Instagram, Twitter, LinkedIn) will show no preview image. Critical for virality. |
| **Google Business Profile** | ❌ Not done | No evidence in codebase. This is a Day 1 item from DEC-023. |
| **404 page** | ✅ Done | Clean 404 with back-to-home and contact CTAs. |
| **Privacy policy** | ✅ Done | Page exists with Kenya DPA 2019 reference. |
| **Terms page** | ✅ Done | Page exists. |
| **KES-first pricing** | ✅ Done | Pricing page shows KES. Academy sub-pages show KES. |
| **Security headers** | ✅ Done (DEC-020) | HSTS, CSP, X-Frame-Options, etc. |
| **Page-level metadata** | ✅ Good | Contact, pricing, blog, about, privacy all have unique `<title>` and `<meta description>`. Blog posts generate metadata from frontmatter. |
| **WhatsApp CTA** | ✅ Done | Floating button on all marketing pages. Contact page has prominent WhatsApp card. Pre-filled message. |

---

## Phase 0 GTM Prerequisites (from DEC-003 & DEC-023)

| Prerequisite | Status | Action needed |
|-------------|--------|---------------|
| GA4 installed + tracking | ❌ Placeholder IDs | Create GA4 property → get measurement ID → replace in `analytics-utils.ts` |
| Meta Pixel installed | ❌ Placeholder ID | Create Meta Business Manager → Pixel → replace ID |
| Fix contact form | ✅ Done | Working server action with Supabase backend, validation, rate limiting |
| KES-first tiered pricing | ✅ Done | Pricing page shows KES |
| Sitemap + robots.txt | ✅ Done | Both exist and are correct |
| Open Graph + social sharing | ⚠️ Partial | Meta tags exist but OG image file is missing |
| JSON-LD structured data | ❌ Not done | Need Organization + LocalBusiness + Course schemas |
| Google Business Profile | ❌ Not done | Manual task — Dickson needs to claim on Google |
| Blog with SEO content | ⚠️ Partial | 5 of 10 outlines published |
| Founding Families program defined | ❌ Unknown | Not visible in codebase — may exist offline |
| WhatsApp broadcast segments | ❌ Unknown | Operational task — not in codebase |
| Instagram account + first posts | ❌ Unknown | Operational task — not in codebase |
| Photo/video shoot | ❌ Unknown | No real photography in `/public/` |
| Conversion tracking | ⚠️ Scaffolded | Code exists but analytics IDs not live |

**Phase 0 completion: ~40%** — infrastructure is largely done, but the analytics and content pieces that actually generate leads are not.

---

## SEO Quick Wins — Blog Post Status (from DEC-023)

Of the 10 blog post outlines I delivered:

| # | Topic | Status |
|---|-------|--------|
| 1 | Why Every Kenyan Child Should Learn to Code | ✅ Published |
| 2 | AI Literacy for Kids: What Parents Need to Know | ✅ Published |
| 3 | Chess and Academic Performance: The Research | ✅ Published |
| 4 | Keeping Your Family Safe Online in Nairobi | ✅ Published |
| 5 | Screen Time Reframe: Productive vs Passive | ✅ Published |
| 6 | Best Coding Classes for Kids in Nairobi (comparison) | ❌ Not written |
| 7 | What Age Should My Child Start Coding? | ❌ Not written |
| 8 | How Chess Teaches Problem-Solving | ❌ Not written |
| 9 | Holiday Coding Camps in Nairobi | ❌ Not written |
| 10 | Is AI Safe for Kids? A Parent's Guide | ❌ Not written |

Posts 6 and 7 have the highest search potential — these are the queries Nairobi parents actually Google. Post 9 is time-sensitive (holiday push).

---

## Top 5 Marketing Actions This Week

### 1. 🔴 Create and upload OG image (`/public/og-image.jpg`)
**Why:** Every WhatsApp/Instagram/LinkedIn share currently shows no preview. For a service sold through WhatsApp word-of-mouth, this kills virality.
**Effort:** 1 hour (Canva or Figma — 1200×630px with Cognitron branding, tagline, visual of kid coding/playing chess)

### 2. 🔴 Replace GA4 + Meta Pixel placeholder IDs
**Why:** We have zero data on who visits the site, which pages convert, where traffic comes from. We're flying blind.
**Effort:** 30 minutes (create GA4 property + Meta Pixel → paste IDs into `src/components/analytics-utils.ts`)

### 3. 🔴 Add JSON-LD structured data to root layout
**Why:** Google can't generate rich results (star ratings, course info, local business) without it. Low effort, high SEO impact.
**What:** `Organization` + `LocalBusiness` + `EducationalOrganization` schema on root layout. `Article` schema on blog posts. `Course` schema on academy pages.
**Effort:** 2 hours (Rusty can do this)

### 4. 🟡 Add WhatsApp click tracking to `WhatsAppButton.tsx`
**Why:** WhatsApp is our #1 conversion channel. We can't optimise what we don't measure. The `trackEvent("whatsapp_click")` utility already exists — just needs to be called.
**Effort:** 10 minutes

### 5. 🟡 Write blog posts #6 and #7 (highest search potential)
**Why:** "Best coding classes for kids in Nairobi" and "What age should my child start coding" are the two highest-intent search queries for our target parent. These drive organic trial bookings.
**Effort:** 3–4 hours (I can write these)

---

## Content Gaps — What's Missing That Would Drive Conversions

### Critical (directly blocks lead generation)
- **OG share image** — every word-of-mouth share on WhatsApp looks broken
- **Coach profiles with photos** — parents need to see who's coming to their home (DEC-010 spec exists, not built)
- **Safeguarding statement** — non-negotiable for home-visit service targeting children (DEC-010)
- **Real photography** — no actual session photos in `/public/`. Site feels like a template.
- **Student work showcase** — no portfolio examples, no "look what kids built" section

### Important (accelerates conversions)
- **FAQ page** — Tess identified 13 unanswered parent questions (DEC-009). Each one is a potential bounce.
- **5 remaining blog posts** — especially the comparison post (#6) and age guide (#7)
- **Holiday programme content** — time-sensitive, drives seasonal signups
- **Video testimonials** — parents trust other parents more than copy

### Nice to have (brand authority)
- **Press/media page** — for school partnership outreach
- **Curriculum overview PDFs** — downloadable assets for WhatsApp sharing
- **Coach Dickson's story** — founder story page (currently just a card on /about)

---

## Score Breakdown

| Category | DEC-006 (Before) | Now | Notes |
|----------|------------------|-----|-------|
| SEO fundamentals | 1/10 | 7/10 | Sitemap, robots, meta, keywords, page titles — all done. Missing JSON-LD. |
| Analytics & tracking | 0/10 | 3/10 | Code exists but IDs are placeholder. Zero data collected. |
| Lead capture | 1/10 | 8/10 | Contact form works with real backend, validation, rate limiting. WhatsApp CTA on every page. |
| Social sharing | 0/10 | 4/10 | OG/Twitter meta tags exist but image is missing. No social profiles linked. |
| Content marketing | 2/10 | 6/10 | 5 real blog posts with MDX system. Missing 5 high-value SEO posts. |
| Trust signals | 4/10 | 5/10 | Testimonials exist but no photos, no coach bios, no safeguarding page. |
| Conversion tracking | 0/10 | 2/10 | Event helpers exist but nothing fires (placeholder IDs). |

**Overall: 6/10** — a solid 3-point jump. The engineering foundation is real. What's missing is mostly operational (analytics setup, OG image, content creation) rather than architectural.

---

## Recommendation to Danny

The site is **not launch-ready** but is **2-3 days of focused work from Phase 0 complete**:
1. OG image (1h)
2. GA4 + Pixel IDs (30min)
3. JSON-LD (2h, Rusty)
4. WhatsApp tracking fix (10min)
5. 2 high-priority blog posts (4h, I'll write them)

After that, the real blocker is **operational**: Google Business Profile, Instagram account creation, WhatsApp broadcast setup, photo shoot scheduling. Those are Dickson's tasks from DEC-023.

**The form works. The blog works. The site is indexable. We just need eyes on it.**

— Basher
