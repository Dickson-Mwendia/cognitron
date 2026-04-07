# PR Review Checklist — Cognitron Dashboard

> **Owner:** Frank (QA Engineer)  
> **Created:** 2026-04-07  
> **Purpose:** Catch every category of issue from the founder's usability audit. Run this on EVERY PR touching dashboard code.  
> **Target time:** ~2 minutes per PR (quick scan is automated; manual review on top)

---

## ⚡ Quick Scan — Automated Grep Checks

Run these against the changed files in the PR. Any hit is a flag that needs justification or a fix.

### How to run

```bash
# Set FILES to the list of changed files in the PR
FILES=$(git diff --name-only origin/main...HEAD -- 'src/')

# Or for a specific set of files:
# FILES="src/app/(dashboard)/dashboard/page.tsx src/components/SomeComponent.tsx"
```

### 🔴 Critical — Blocks Merge

```bash
# C1: Mock data imports (any mock* import is banned in production pages)
grep -rn "import.*mock\|from.*mock\|require.*mock" $FILES

# C2: setTimeout used to fake backend operations
grep -rn "setTimeout" $FILES

# C3: Sign-out via form action to /login (broken auth)
grep -rn 'action="/login"\|action=.*/login' $FILES

# C4: Hardcoded user names from mock data
grep -rn "Amara Kamau\|David Mutua\|Jabari" $FILES

# C5: Dashboard links pointing to marketing /contact page
grep -rn 'href="/contact"\|href=.*/contact' $FILES
```

### 🟠 High — Should Fix Before Merge

```bash
# H1: Hardcoded XP cap or magic numbers in progress bars
grep -rn 'max={6000}\|/ 6000\|max={[0-9]\{3,\}}' $FILES

# H2: Hardcoded date strings (stale dates)
grep -rn "2025-\|2026-0[1-3]\|March 2025\|July 2025\|Member since" $FILES

# H3: Hardcoded counts that should be computed
grep -rn "'3'\|\"3\"\|{3}" $FILES | grep -i "track\|count\|total\|stat"

# H4: Links to /dashboard without child ID (parent context)
grep -rn 'href="/dashboard"' $FILES

# H5: Hardcoded filter arrays (names used as data filters)
grep -rn "\.filter.*includes\|\.filter.*===.*'" $FILES

# H6: Hardcoded business/payment numbers
grep -rn "247247\|paybill\|KES [0-9]" $FILES

# H7: Buttons/elements with no onClick or action
grep -rn '<button\|<Button' $FILES | grep -v "onClick\|type=\"submit\"\|disabled"

# H8: Hardcoded coach/user names in code logic
grep -rn "includes('Kamau')\|includes('Amara')" $FILES
```

### 🟡 Medium — Track as Follow-up

```bash
# M1: console.log left in production code
grep -rn "console\.log\|console\.warn\|console\.error" $FILES

# M2: TODO/FIXME/HACK comments (should be tracked as issues)
grep -rn "TODO\|FIXME\|HACK\|XXX" $FILES

# M3: "Coming soon" or placeholder text
grep -rn "coming soon\|Coming Soon\|ComingSoon\|placeholder\|lorem" $FILES

# M4: Disabled buttons/links that block user flows
grep -rn "cursor-default opacity\|disabled.*Coming\|title=\"Coming soon\"" $FILES
```

---

## 🔍 Manual Review — Code Reading Required

### Section 1: Data Integration

| # | Check | Severity | Pass? |
|---|-------|----------|-------|
| D1 | Does the page fetch real data from Supabase (via server actions, `createClient()`, or API routes)? No mock imports. | 🔴 Critical | ☐ |
| D2 | Are there empty state handlers for new users with no data? (e.g., 0 XP, no tracks, no sessions) | 🔴 Critical | ☐ |
| D3 | Is data fetched server-side where possible (RSC) to avoid client-side loading waterfalls? | 🟡 Medium | ☐ |
| D4 | Are Supabase queries properly typed and do they handle `.error` responses? | 🟠 High | ☐ |
| D5 | Does the page avoid importing from any `mock*.ts` / `mock*.tsx` / `*mock*` file? | 🔴 Critical | ☐ |
| D6 | If showing user-specific data (XP, streaks, achievements), does it query by the authenticated user's ID? | 🔴 Critical | ☐ |

### Section 2: Interactive Elements

| # | Check | Severity | Pass? |
|---|-------|----------|-------|
| I1 | Does every `<button>` / `<Button>` have a working `onClick` handler or is `type="submit"` inside a real form? | 🔴 Critical | ☐ |
| I2 | Does every `<a>` / `<Link>` point to a real, implemented route (not `/contact` from dashboard, not a dead end)? | 🟠 High | ☐ |
| I3 | Do forms have a real `action` (server action) or `onSubmit` handler that writes to the database? | 🔴 Critical | ☐ |
| I4 | Are CTAs (Call to Action) connected to real functionality, not just navigation to placeholder pages? | 🟠 High | ☐ |
| I5 | If a button is intentionally disabled, does it have a clear reason visible to the user (tooltip, text)? | 🟡 Medium | ☐ |
| I6 | Do modals/drawers that contain forms actually submit data and close on success? | 🔴 Critical | ☐ |

### Section 3: User Identity

| # | Check | Severity | Pass? |
|---|-------|----------|-------|
| U1 | Does the page display the logged-in user's name, not a hardcoded name? | 🔴 Critical | ☐ |
| U2 | Are dynamic values (XP, level, streak, dates) derived from the user's real data? | 🔴 Critical | ☐ |
| U3 | Is `"Member since"` or any date-based text derived from `profiles.created_at` or equivalent? | 🟠 High | ☐ |
| U4 | For coach pages: does it use the logged-in coach's name/ID, not a hardcoded `coachName`? | 🔴 Critical | ☐ |
| U5 | For parent pages: does it filter children by the authenticated parent's ID? | 🔴 Critical | ☐ |
| U6 | Are role-specific UI elements (e.g., "Parent Dashboard" link) conditionally shown based on actual user relationships? | 🟠 High | ☐ |

### Section 4: Backend Operations

| # | Check | Severity | Pass? |
|---|-------|----------|-------|
| B1 | Do save/update/delete operations call a server action or API route that writes to Supabase? | 🔴 Critical | ☐ |
| B2 | Is there NO `setTimeout` used to simulate backend latency? (Any `setTimeout` in a submit/save handler is a red flag) | 🔴 Critical | ☐ |
| B3 | Does the operation show a loading state while in progress (spinner, disabled button, etc.)? | 🟠 High | ☐ |
| B4 | Does the operation show an error state if it fails (toast, inline error, etc.)? | 🟠 High | ☐ |
| B5 | After a successful write, is the UI updated (revalidate, optimistic update, or refetch)? | 🟠 High | ☐ |
| B6 | For "send" operations (send to parent, send notification): does it actually deliver (email, in-app notification, etc.)? | 🔴 Critical | ☐ |
| B7 | Do toast/success messages only appear AFTER the operation actually succeeds, not before? | 🟠 High | ☐ |

### Section 5: Auth & Navigation

| # | Check | Severity | Pass? |
|---|-------|----------|-------|
| A1 | Does any sign-out button call `supabase.auth.signOut()` (directly or via `/api/auth/signout`)? | 🔴 Critical | ☐ |
| A2 | Is sign-out NOT implemented as `<form action="/login">` or a simple redirect? | 🔴 Critical | ☐ |
| A3 | Do navigation links within the dashboard stay within the dashboard (no leaking to marketing pages)? | 🟠 High | ☐ |
| A4 | Do "View Details" / "View Dashboard" links for child entities include the entity ID in the URL? | 🟠 High | ☐ |
| A5 | Are role-specific routes protected (student can't access `/admin/*`, etc.)? | 🔴 Critical | ☐ |
| A6 | After sign-out, is the user redirected to login and unable to access dashboard pages via back button? | 🟠 High | ☐ |

### Section 6: Cross-Cutting Concerns

| # | Check | Severity | Pass? |
|---|-------|----------|-------|
| X1 | Are there no hardcoded numeric caps that should be dynamic (XP caps, level thresholds)? | 🟠 High | ☐ |
| X2 | Are there no hardcoded date strings that will go stale (months, years, specific dates)? | 🟠 High | ☐ |
| X3 | Are there no hardcoded business values (paybill numbers, pricing) that should come from config/env? | 🟠 High | ☐ |
| X4 | Does curriculum/content display use the correct data for the specific track (not defaulting to coding curriculum for all)? | 🔴 Critical | ☐ |
| X5 | Are filter/sort operations based on real data relationships (not hardcoded name arrays)? | 🟠 High | ☐ |
| X6 | If the page shows statistics or counts, are they computed from real data (not hardcoded numbers)? | 🟠 High | ☐ |

---

## 📋 PR Review Summary Template

Copy this into the PR review comment:

```markdown
## QA Review

**Reviewer:** [name]  
**Date:** [date]  
**Files reviewed:** [count]

### Quick Scan Results
- [ ] All grep checks passed (no flags)
- [ ] Flags found and addressed: [list]

### Manual Review
- [ ] Data Integration: PASS / FAIL — [notes]
- [ ] Interactive Elements: PASS / FAIL — [notes]
- [ ] User Identity: PASS / FAIL — [notes]
- [ ] Backend Operations: PASS / FAIL — [notes]
- [ ] Auth & Navigation: PASS / FAIL — [notes]
- [ ] Cross-Cutting: PASS / FAIL — [notes]

### Verdict
- [ ] ✅ APPROVED — Ship it
- [ ] ⚠️ APPROVED WITH NOTES — Ship, but track follow-ups
- [ ] 🚫 CHANGES REQUESTED — Must fix before merge

### Follow-ups (if any)
- [ ] [issue description] — [severity]
```

---

## 🚦 Merge Rules

| Severity | Rule |
|----------|------|
| 🔴 Critical | **Blocks merge.** Must be fixed. Zero exceptions. |
| 🟠 High | **Should be fixed before merge.** Can be waived by QA lead with documented justification. |
| 🟡 Medium | **Can ship, must track.** Create an issue before merging. |

---

## 📝 When to Apply This Checklist

- **Always:** Any PR touching files under `src/app/(dashboard)/`, `src/components/admin/`, `src/components/coach/`, `src/components/parent/`, or `src/components/dashboard/`
- **Quick scan only:** PRs touching only styling (CSS/Tailwind), documentation, or config files
- **Skip:** PRs to marketing pages (`src/app/(marketing)/`), CI/CD config, or `.squad/` files

---

## 🔄 Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-07 | Initial version — created from founder's usability audit of 25+ dashboard pages | Frank |
