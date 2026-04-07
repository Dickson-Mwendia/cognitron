# Quality Gates — Definition of Done & Banned Patterns

**Date:** 2026-04-07
**Triggered by:** Founder usability audit (23/25+ dashboard pages using hardcoded mock data, 16 dead buttons, 4 fake operations, broken sign-out, misdirected links)
**Status:** ACTIVE — Effective immediately
**Enforced by:** Frank (QA Engineer) on every PR

---

## Context

A full usability audit of the Cognitron dashboard revealed that the vast majority of shipped pages were non-functional facades. New users saw another student's fake data (Amara Kamau, 5390 XP, Level 11). Buttons did nothing. "Save" and "Send" operations used `setTimeout` to simulate delays and showed success toasts with no backend write. Sign-out didn't clear the session. In-app actions linked to the marketing `/contact` page.

The founder has already remediated most issues. This document exists to ensure this never happens again.

---

## 1. Definition of Done

Every page, feature, or component must satisfy **all** of the following before it can be considered complete and merged to main. No exceptions. No "we'll wire it up later."

### 1.1 Data Integration
- [ ] Page fetches real data from Supabase (or the appropriate backend source)
- [ ] No `mock*` imports remain in the page or its direct component tree
- [ ] New users with zero data see a proper empty state (not another user's data)
- [ ] User-specific values (name, XP, dates, stats) come from the authenticated user's profile/session
- [ ] Computed values (XP caps, track counts, member-since dates) are derived from real data, not hardcoded literals

### 1.2 Functional Interactions
- [ ] Every visible button has a working `onClick` (or equivalent) handler
- [ ] Every form submission writes to the database via a server action or API route
- [ ] Every link navigates to a real, existing in-app route (not a placeholder, not the marketing site)
- [ ] Links that reference a specific entity (child, student, session) pass the correct ID parameter
- [ ] Disabled/coming-soon features are either hidden entirely or clearly marked with a non-interactive visual treatment — no clickable buttons that do nothing

### 1.3 Save, Send, and Mutation Operations
- [ ] Every "Save" operation persists data to the database and confirms success from the server response
- [ ] Every "Send" operation (messages, reports, notifications) delivers the payload to its destination
- [ ] Success toasts only appear after a confirmed server-side success, never after a `setTimeout`
- [ ] Error states are handled — if the operation fails, the user sees an error message, not a phantom success

### 1.4 Authentication & Session
- [ ] Sign-out calls `supabase.auth.signOut()` (via `/api/auth/signout` or equivalent) — never a plain `<a href="/login">` or `<form action="/login">`
- [ ] Session is fully cleared on sign-out (cookies, local state, Supabase session)
- [ ] Role-specific UI is gated to the correct role (students don't see "Parent Dashboard" links unless they have a linked parent)

### 1.5 Navigation & Routing
- [ ] All internal links use Next.js `<Link>` or `router.push` to in-app routes
- [ ] No link points to `/contact`, `/about`, or any marketing page from within the dashboard
- [ ] Child/student/entity detail links include the entity ID in the route
- [ ] "Back" navigation returns to the correct parent page

### 1.6 Error & Empty States
- [ ] Loading state shown while data fetches
- [ ] Empty state shown when the query returns zero results (not a blank page, not mock data)
- [ ] Error boundary or error message shown when a fetch/mutation fails
- [ ] No stale hardcoded dates (e.g., `2025-07-*` sessions appearing in the past)

---

## 2. Banned Patterns

The following patterns are explicitly banned from production code on `main`. PRs containing any of these will be rejected.

### 2.1 Mock Data in Pages
```
❌ BANNED
import { mockStudentDashboard, mockTracks } from '@/lib/mock-data'
import { mockChildren, mockUpcomingSessions } from '@/lib/mock/parent'
const data = mockAnything
```
**Rule:** No `mock*` imports in any file under `src/app/`. Mock data files may exist for tests or Storybook, but must never be imported by page or layout components.

### 2.2 Fake Backend Calls
```
❌ BANNED
setTimeout(() => {
  setIsSaving(false)
  toast.success("Saved successfully!")
}, 800)
```
**Rule:** No `setTimeout` used to simulate async operations. Every mutation must hit a real server action or API endpoint. Success feedback must come from the server response.

### 2.3 Dead Buttons
```
❌ BANNED
<Button>Send Notification</Button>           // no onClick
<button className="btn">Add Item</button>    // no handler
```
**Rule:** Every rendered button must have a functional handler. If the feature isn't built yet, the button must not exist in the UI. Hiding is better than lying.

### 2.4 Placeholder Links to Marketing Pages
```
❌ BANNED
<Link href="/contact">Book Extra Session</Link>    // marketing page, not in-app
<Link href="/contact">Message Coach</Link>          // should be /parent/messages
<a href="/contact">Ask Coach</a>                    // should be in-app messaging
```
**Rule:** Dashboard links must never point to marketing pages (`/contact`, `/about`, `/pricing`). If the destination page doesn't exist yet, either build it, show a "coming soon" inline indicator (non-clickable), or don't render the link.

### 2.5 Hardcoded User Identity
```
❌ BANNED
const coachName = 'David Mutua'
<p>Member since March 2025</p>
.filter((s) => ['Amara', 'Jabari'].includes(s.childName))
```
**Rule:** User names, dates, relationships, and any identity-specific values must come from the authenticated session or database query. No hardcoded names, no hardcoded date strings, no hardcoded entity lists.

### 2.6 Hardcoded Numeric Limits
```
❌ BANNED
<XPBar max={6000} />
<StatsCard value="3" label="Tracks" />
```
**Rule:** Caps, counts, and thresholds must be computed from data or configuration — not magic numbers in JSX.

### 2.7 Fake Sign-Out
```
❌ BANNED
<form action="/login" method="get">
  <button type="submit">Sign Out</button>
</form>
```
**Rule:** Sign-out must clear the server-side session. Navigation to `/login` without calling `supabase.auth.signOut()` is not sign-out — it's a redirect that leaves the session active.

---

## 3. Review Gate

**Frank (QA Engineer) is the mandatory reviewer on every PR that touches dashboard pages or components.**

### Frank's Review Checklist
Before approving any PR, Frank must verify:

1. **No mock imports** — Search the diff for `mock` imports in page files. Any found → reject.
2. **No setTimeout faking** — Search for `setTimeout` near `toast.success` or state setters simulating saves. Any found → reject.
3. **All buttons functional** — Every `<Button>` and `<button>` in the diff has an `onClick` or form action that does real work. Dead buttons → reject.
4. **All links valid** — Every `<Link>` and `<a>` points to a real in-app route. Links to `/contact` from dashboard → reject.
5. **No hardcoded identity** — No literal user names, dates, or entity lists in page logic. Found → reject.
6. **Empty states handled** — New user with zero data must see something meaningful, not mock data or a blank page.
7. **Sign-out correct** — If the PR touches auth/profile, verify sign-out calls the server-side signout route.
8. **Mutations hit the server** — Every save/send/create/delete operation has a corresponding server action or API call with error handling.

### Rejection Protocol
- Frank rejects with specific line references and the violated rule number from this document.
- The original author may NOT self-revise on rejected items (standard lockout applies).
- A different team member picks up the fix.

---

## 4. Remediation Tracking

### Audit Scope
The founder's audit covered all 4 dashboard roles (student, parent, coach, admin) across 25+ pages. Key findings:

| Category | Count | Details |
|----------|-------|---------|
| Pages with mock data | 23 | Only `/admin/approvals` and `/parent/add-child` had real Supabase integration |
| Dead buttons | 16 | Mostly in admin (curriculum, sessions, settings) and parent reports |
| Fake save/send operations | 4 | Coach notes, progress reports (save & send), parent messages |
| Misdirected links | 7+ | `/contact` used as placeholder across student and parent dashboards |
| Broken sign-out | 1 | Student profile page — navigated without clearing session |
| Hardcoded identity values | 7+ | Names, dates, counts, filters hardcoded across roles |

### Remediation Status
**The founder has already fixed the majority of these issues.** This is acknowledged and appreciated — the team should have caught these before they shipped.

### Remaining Items
Any issues from the audit that have not yet been resolved should be tracked as GitHub issues with the `squad` label and triaged by Danny. Each issue should reference this document and the specific audit finding.

### Going Forward
- **No new page ships without passing the Definition of Done checklist (Section 1).**
- **Frank gates every dashboard PR (Section 3).**
- **Banned patterns (Section 2) are grounds for immediate PR rejection.**
- **This is not optional.** The team burned trust by shipping 23 pages of fake data. These gates stay until the habit is corrected.

---

*Decision recorded by Squad (Coordinator) on behalf of the team. Triggered by founder usability audit dated 2026-04-07.*
