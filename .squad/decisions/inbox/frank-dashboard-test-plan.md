# Cognitron — Student Learning Dashboard: Test Plan

**Author:** Frank (QA Engineer)
**Date:** July 2025
**Status:** Proposal — Ready for review
**Refs:** `linus-dashboard-design.md` · `tess-dashboard-user-needs.md` · `curriculum-dashboard-structures.md`

---

## 0. Overview

This test plan covers the Cognitron student learning dashboard from authentication through role-based views, responsive layout, accessibility, performance, and Nairobi-specific constraints. Every test case follows the format:

> **ID** · Description · Preconditions · Steps · Expected Result · Priority

**Architecture under test:**

| Layer | Technology |
|-------|-----------|
| Auth | Supabase (email / password) |
| Roles | `student`, `parent`, `coach` — enforced by Supabase RLS |
| Tracks | Coding, AI, Chess |
| Pages | `/login`, `/signup`, `/dashboard`, `/dashboard/track/[coding|ai|chess]`, `/dashboard/achievements`, `/dashboard/practice`, `/dashboard/profile`, `/dashboard/schedule`, `/parent`, `/parent/child/[id]`, `/parent/schedule`, `/parent/messages`, `/parent/billing`, `/parent/reports`, `/coach` |
| Breakpoints | Mobile (< 640 px), Tablet (640–1024 px), Desktop (> 1024 px) |
| Target load | < 500 KB initial · < 150 KB JS gzipped · Dashboard shell < 2 s on 3G |

---

## 1. Authentication Tests

### 1.1 Signup

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| AUTH-S01 | Successful student signup with valid email | No existing account for `test-student@example.com` | 1. Navigate to `/signup` 2. Enter name, email, password (≥8 chars, upper + lower + digit) 3. Select role = Student 4. Submit | Account created; verification email sent; user sees "Check your email" confirmation page | P0 |
| AUTH-S02 | Successful parent signup | No existing account | 1. Navigate to `/signup` 2. Enter name, email, password 3. Select role = Parent 4. Submit | Account created; redirected to parent onboarding flow; verification email sent | P0 |
| AUTH-S03 | Signup with duplicate email | Account already exists for `existing@example.com` | 1. Navigate to `/signup` 2. Enter the existing email 3. Submit | Error message: "An account with this email already exists" — no account overwrite | P0 |
| AUTH-S04 | Signup with weak password | None | 1. Navigate to `/signup` 2. Enter password `123` 3. Submit | Inline validation error before submit; form does not post; message indicates password requirements | P0 |
| AUTH-S05 | Signup with invalid email format | None | 1. Navigate to `/signup` 2. Enter `notanemail` in email field 3. Submit | Inline validation: "Please enter a valid email address" | P1 |
| AUTH-S06 | Signup form is keyboard-navigable | None | 1. Navigate to `/signup` 2. Tab through all fields and buttons | Focus ring visible on every interactive element; form submittable via Enter key | P1 |
| AUTH-S07 | Signup password visibility toggle | None | 1. Navigate to `/signup` 2. Type password 3. Click "show password" icon | Password toggles between masked (`•••`) and plain text; icon updates accordingly | P2 |

### 1.2 Login

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| AUTH-L01 | Student login → redirect to `/dashboard` | Verified student account exists | 1. Navigate to `/login` 2. Enter valid credentials 3. Submit | Successful login; redirect to `/dashboard`; greeting shows student name | P0 |
| AUTH-L02 | Parent login → redirect to `/parent` | Verified parent account exists | 1. Navigate to `/login` 2. Enter valid credentials 3. Submit | Successful login; redirect to `/parent`; shows multi-child overview | P0 |
| AUTH-L03 | Coach login → redirect to `/coach` | Verified coach account exists | 1. Navigate to `/login` 2. Enter valid credentials 3. Submit | Successful login; redirect to `/coach`; shows schedule with student details | P0 |
| AUTH-L04 | Login with incorrect password | Valid account exists | 1. Navigate to `/login` 2. Enter valid email + wrong password 3. Submit | Error: "Invalid login credentials"; no account lockout on first attempt | P0 |
| AUTH-L05 | Login with non-existent email | No account for `ghost@example.com` | 1. Navigate to `/login` 2. Enter `ghost@example.com` + any password 3. Submit | Generic error: "Invalid login credentials" (does not reveal whether email exists) | P0 |
| AUTH-L06 | Login with unverified email | Account exists but email not confirmed | 1. Navigate to `/login` 2. Enter valid credentials 3. Submit | Error: "Please verify your email before logging in" with "Resend verification" link | P1 |
| AUTH-L07 | "Forgot password" flow | Valid account exists | 1. Click "Forgot password?" on `/login` 2. Enter email 3. Submit | Confirmation: "If an account exists, a reset link has been sent" (non-revealing); email contains valid reset link | P1 |
| AUTH-L08 | Rate limiting on login attempts | None | 1. Navigate to `/login` 2. Submit incorrect credentials 10× rapidly | After threshold, user sees: "Too many login attempts. Try again in X minutes." Requests return 429 | P1 |

### 1.3 Logout

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| AUTH-O01 | Logout clears session and redirects | Logged-in student session | 1. Click user avatar → "Sign out" 2. Confirm | Session cookie cleared; Supabase session invalidated; redirect to `/login` | P0 |
| AUTH-O02 | After logout, back-button does not restore session | Just logged out | 1. Press browser back button after logout | User sees `/login`, NOT the dashboard; no cached authenticated page rendered | P0 |
| AUTH-O03 | Logout on one tab reflects on other tabs | Logged in on two browser tabs | 1. Log out on Tab A 2. Interact on Tab B | Tab B detects session invalidation and redirects to `/login` (or shows "Session expired" prompt) | P1 |

### 1.4 Session Persistence

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| AUTH-P01 | Session persists across page refresh | Logged-in student | 1. Refresh the `/dashboard` page | User remains logged in; dashboard loads with correct data; no re-login required | P0 |
| AUTH-P02 | Session persists across browser restart | Logged-in student, "Remember me" checked | 1. Close browser 2. Reopen and navigate to `/dashboard` | User remains logged in; Supabase refresh token renews the session automatically | P0 |
| AUTH-P03 | Expired session shows graceful message | Session token expired (mock TTL to 0) | 1. Wait for token expiry 2. Navigate to any protected page | Redirect to `/login` with message: "Your session has expired. Please log in again." | P0 |
| AUTH-P04 | Supabase refresh token renewal | Session access token expires but refresh token is valid | 1. Wait for access token to expire 2. Make authenticated request | Supabase client auto-refreshes the token; request succeeds; user is not interrupted | P1 |

---

## 2. Authorization Tests (RLS Policy Verification)

These tests verify Supabase Row-Level Security policies at the **database query level** and at the **UI level**.

### 2.1 Unauthenticated Access

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| AUTHZ-U01 | Unauthenticated user → `/dashboard` | Not logged in | 1. Navigate directly to `/dashboard` | Redirect to `/login`; no dashboard content rendered; no data fetched | P0 |
| AUTHZ-U02 | Unauthenticated user → `/parent` | Not logged in | 1. Navigate directly to `/parent` | Redirect to `/login` | P0 |
| AUTHZ-U03 | Unauthenticated user → `/coach` | Not logged in | 1. Navigate directly to `/coach` | Redirect to `/login` | P0 |
| AUTHZ-U04 | Unauthenticated user → `/dashboard/track/coding` | Not logged in | 1. Navigate directly to `/dashboard/track/coding` | Redirect to `/login` | P0 |
| AUTHZ-U05 | Unauthenticated API call to Supabase | No auth header | 1. Call `supabase.from('student_progress').select('*')` without session | Returns empty data or 401; no student data leaked | P0 |
| AUTHZ-U06 | Unauthenticated user → `/signup` and `/login` | Not logged in | 1. Navigate to `/signup` 2. Navigate to `/login` | Both pages render correctly; no redirect loop | P0 |
| AUTHZ-U07 | Authenticated user → `/login` | Already logged in as student | 1. Navigate to `/login` | Redirect to `/dashboard` (student) or `/parent` (parent) or `/coach` (coach); no double-login | P1 |

### 2.2 Student Role Isolation

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| AUTHZ-S01 | Student can see own progress data | Logged in as Student A with enrolled tracks | 1. Navigate to `/dashboard` | Dashboard shows only Student A's track cards, XP, streak, and achievements | P0 |
| AUTHZ-S02 | Student CANNOT see another student's progress | Logged in as Student A | 1. Call `supabase.from('student_progress').select('*').eq('student_id', STUDENT_B_ID)` | Returns empty result set; RLS blocks cross-student reads | P0 |
| AUTHZ-S03 | Student CANNOT access `/parent` | Logged in as Student | 1. Navigate to `/parent` | Returns 403 or redirect to `/dashboard`; parent dashboard not rendered | P0 |
| AUTHZ-S04 | Student CANNOT access `/coach` | Logged in as Student | 1. Navigate to `/coach` | Returns 403 or redirect to `/dashboard`; coach dashboard not rendered | P0 |
| AUTHZ-S05 | Student CANNOT modify another student's data | Logged in as Student A | 1. Attempt `supabase.from('student_progress').update({xp: 99999}).eq('student_id', STUDENT_B_ID)` | Update returns 0 rows affected; Student B data unchanged | P0 |
| AUTHZ-S06 | Student CANNOT access another student's profile | Logged in as Student A | 1. Navigate to `/dashboard/profile?id=STUDENT_B_ID` (URL manipulation) | Shows Student A's own profile or 403; never Student B's data | P0 |
| AUTHZ-S07 | Student can only see own achievements | Logged in as Student A | 1. Navigate to `/dashboard/achievements` | Shows only badges and XP history belonging to Student A | P0 |
| AUTHZ-S08 | Student cohort leaderboard shows only own cohort | Logged in as Student in Cohort X | 1. View leaderboard widget | Shows max 4 students from same cohort; no students from other cohorts visible | P1 |
| AUTHZ-S09 | Student CANNOT insert or delete records in admin tables | Logged in as Student | 1. Attempt `supabase.from('coaches').insert(...)` or `supabase.from('sessions').delete()...` | Operation fails; RLS blocks writes to unauthorized tables | P0 |

### 2.3 Parent Role Isolation

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| AUTHZ-P01 | Parent sees only linked children | Logged in as Parent A with children [C1, C2] | 1. Navigate to `/parent` | Overview cards show only C1 and C2; no other students visible | P0 |
| AUTHZ-P02 | Parent CANNOT see unlinked student's data | Logged in as Parent A | 1. Call `supabase.from('student_progress').select('*').eq('student_id', UNLINKED_STUDENT_ID)` | Returns empty result; RLS enforces parent-child link | P0 |
| AUTHZ-P03 | Parent CANNOT access `/dashboard` (student view) | Logged in as Parent | 1. Navigate to `/dashboard` | Redirect to `/parent`; student dashboard not rendered | P0 |
| AUTHZ-P04 | Parent CANNOT access `/coach` | Logged in as Parent | 1. Navigate to `/coach` | Redirect to `/parent` or 403 | P0 |
| AUTHZ-P05 | Parent can view linked child's track detail | Logged in as Parent A | 1. Navigate to `/parent/child/C1_ID` | Shows C1's progress across enrolled tracks; data is accurate | P0 |
| AUTHZ-P06 | Parent CANNOT view another parent's child | Logged in as Parent A | 1. Navigate to `/parent/child/UNLINKED_CHILD_ID` (URL manipulation) | 403 or redirect to `/parent`; child data not shown | P0 |
| AUTHZ-P07 | Parent CANNOT modify student progress data | Logged in as Parent | 1. Attempt `supabase.from('student_progress').update({xp: 0}).eq('student_id', LINKED_CHILD_ID)` | Update fails; student progress is read-only for parents | P1 |
| AUTHZ-P08 | Parent with single child sees single-child view | Parent with exactly 1 linked child | 1. Navigate to `/parent` | Shows single child card; no empty "add child" slots cause confusion | P1 |
| AUTHZ-P09 | Parent with 3+ children sees all children | Parent with 3 children linked | 1. Navigate to `/parent` | All 3 child overview cards displayed; scrollable if needed | P1 |

### 2.4 Coach Role — Full Access

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| AUTHZ-C01 | Coach can view any student's progress | Logged in as Coach | 1. Navigate to `/coach` 2. Select any student from the list | Student's full progress, track data, XP, achievements displayed | P0 |
| AUTHZ-C02 | Coach can view all students in their roster | Logged in as Coach | 1. Navigate to `/coach` | All assigned students listed with name, track, level, next session | P0 |
| AUTHZ-C03 | Coach can log session notes | Logged in as Coach | 1. Select student 2. Open session log form 3. Enter notes, topics covered, homework assigned 4. Submit | Notes saved; visible on parent dashboard under "Coach Notes & Feedback"; timestamp recorded | P0 |
| AUTHZ-C04 | Coach CANNOT modify student credentials | Logged in as Coach | 1. Attempt to update `auth.users` table for a student | Operation fails; coach has no auth admin privileges | P0 |
| AUTHZ-C05 | Coach CANNOT access billing data | Logged in as Coach | 1. Attempt `supabase.from('billing').select('*')` | Returns empty or access denied; billing data is parent-only | P1 |
| AUTHZ-C06 | Coach CANNOT access `/parent` view | Logged in as Coach | 1. Navigate to `/parent` | Redirect to `/coach` or 403 | P1 |
| AUTHZ-C07 | Coach can assign practice activities | Logged in as Coach | 1. Select student 2. Assign chess puzzle set 3. Submit | Assignment created; student sees it on their Practice page | P1 |

### 2.5 Cross-Role URL Manipulation

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| AUTHZ-X01 | Student modifying URL to access parent endpoints | Logged in as Student | 1. Manually navigate to `/parent/child/SOME_ID` | 403 or redirect to `/dashboard`; no data leak | P0 |
| AUTHZ-X02 | Parent modifying URL to access coach endpoints | Logged in as Parent | 1. Manually navigate to `/coach` | 403 or redirect to `/parent`; no coach-view data leak | P0 |
| AUTHZ-X03 | Student modifying URL to access other student's track | Logged in as Student A | 1. Navigate to `/dashboard/track/coding?student_id=STUDENT_B_ID` | Shows Student A's coding track; parameter ignored or rejected | P0 |
| AUTHZ-X04 | JWT token tampering | Logged in as Student | 1. Modify the JWT `role` claim from `student` to `coach` via devtools | Supabase rejects the tampered token; session invalidated; redirect to `/login` | P0 |

---

## 3. Dashboard Functional Tests

### 3.1 Student Dashboard — `/dashboard`

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| DASH-S01 | Greeting displays correct name and streak | Logged in as student "Amara" with 5-day streak | 1. Navigate to `/dashboard` | Header shows: "Good morning, Amara! 🔥 5-day streak" (time-of-day aware greeting) | P0 |
| DASH-S02 | "Your Next Move" hero card shows next session | Student has upcoming session tomorrow at 4 PM | 1. Navigate to `/dashboard` | Hero card shows lesson title, coach name, date/time, "Join Lesson →" CTA | P0 |
| DASH-S03 | "Your Next Move" countdown when session < 1 hour away | Session starts in 45 minutes | 1. Navigate to `/dashboard` | Live countdown badge appears: "Starts in 45 min"; "Join Lesson →" button is prominent | P0 |
| DASH-S04 | "Your Next Move" empty state — no upcoming sessions | Student has no scheduled sessions | 1. Navigate to `/dashboard` | Hero card shows empty state: "No lessons this week. How about some practice?" with "Practice Now →" CTA | P0 |
| DASH-S05 | Track cards show only enrolled tracks | Student enrolled in Coding + Chess (not AI) | 1. Navigate to `/dashboard` | Two track cards visible (Coding with teal accent, Chess with gold accent); no AI card | P0 |
| DASH-S06 | Track card progress ring animates on load | Student has 68% progress in Coding | 1. Navigate to `/dashboard` | Coding track card ring animates from 0% to 68% with spring easing; center shows "68%" | P1 |
| DASH-S07 | Track card tap navigates to track detail | Student enrolled in AI track | 1. Tap the AI track card | Navigates to `/dashboard/track/ai`; page transition slides content left | P0 |
| DASH-S08 | Streak calendar shows 7-day row | Student practiced Mon, Tue, Wed, Thu, Fri (5 days) | 1. View streak section | Mon–Fri circles are gold-filled; Sat–Sun show dashed empty circles; "🔥 5 days" text below | P1 |
| DASH-S09 | XP bar shows level progress | Student has 2,340 / 3,000 XP to next level | 1. View XP section | Horizontal bar filled to ~78%; text reads "2,340 / 3,000 XP to Level 12"; shimmer animation visible | P1 |
| DASH-S10 | Daily challenge card is tappable | Daily challenge available | 1. View daily challenge card 2. Tap "Start →" | Navigates to practice page with the daily challenge pre-loaded | P1 |
| DASH-S11 | Recent activity timeline shows last 5 entries | Student completed 7 activities today | 1. View activity section | 5 most recent entries shown with timestamps, icons, descriptions, XP earned; "View all activity →" link at bottom | P1 |
| DASH-S12 | Achievement spotlight badge carousel scrolls | Student has 12 badges (mix of earned and locked) | 1. View badge carousel 2. Swipe/scroll horizontally | Carousel scrolls smoothly; earned badges full-color; locked badges greyscale with "?" overlay | P1 |
| DASH-S13 | Notification bell shows unread count | Student has 3 unread notifications | 1. View top bar | Bell icon has gold dot; tapping shows notification list with 3 items | P1 |
| DASH-S14 | Quick actions are functional | Logged in as student | 1. Tap "🎯 Practice Now" 2. Tap "📅 My Schedule" 3. Tap "💬 Ask Coach" | Each navigates to correct page/panel: `/dashboard/practice`, `/dashboard/schedule`, coach message panel | P1 |

### 3.2 Track Detail View — `/dashboard/track/[track]`

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| DASH-T01 | Track header shows correct track info | Student enrolled in Coding, Creator level, 68% complete | 1. Navigate to `/dashboard/track/coding` | Banner with teal gradient, "Coding & Apps" title, "⚡ Creator — Level 3", "68% complete", "Continue Learning →" CTA | P0 |
| DASH-T02 | Skill tree renders completed, current, and locked nodes | Student has completed 8 lessons, currently on lesson 9, 4 locked ahead | 1. View skill tree | Completed: gold border + checkmark; Current: pulsing glow + "YOU ARE HERE"; Locked: semi-transparent + dashed border | P0 |
| DASH-T03 | Skill tree node tap opens lesson detail | Any visible node | 1. Tap a completed node | Popover/panel slides up (mobile) or in from right (desktop) showing lesson title, description, skills covered, "Review Notes" CTA, XP earned | P0 |
| DASH-T04 | Milestone gates between levels displayed | Student has crossed Explorer → Builder boundary | 1. View skill tree between Level 2 and Level 3 nodes | Decorative gate graphic shown with gold "unlocked" state; level badge emoji visible | P1 |
| DASH-T05 | "Continue Learning →" navigates to current lesson | Student is on Lesson 9 | 1. Tap "Continue Learning →" | Scrolls to or navigates to the current node; lesson detail popover opens | P0 |
| DASH-T06 | Track sidebar shows coach info (desktop) | Desktop viewport; coach assigned | 1. View track detail on desktop | Right sidebar displays coach photo, name, bio, "Message" button, track stats | P1 |

### 3.3 Achievements View — `/dashboard/achievements`

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| DASH-A01 | Profile header displays correct student info | Student "Jabari", Creator Level 11, 4,250 XP, joined March 2025 | 1. Navigate to `/dashboard/achievements` | Large avatar, "Jabari", "⚡ Creator · Level 11 · 4,250 XP", "Joined March 2025" | P0 |
| DASH-A02 | Badge grid shows earned, in-progress, and locked badges | Student has 8 earned, 4 in-progress, 12 locked badges | 1. View badge grid | Earned: full-color + gold border + date; In-progress: partial color + progress bar; Locked: greyscale + "?" | P0 |
| DASH-A03 | Badge tap opens detail modal | Any badge visible | 1. Tap an earned badge | Modal shows badge illustration, name, description, requirements, earned date; "Close" button works | P1 |
| DASH-A04 | Full-month streak calendar renders correctly | Student practiced 15 out of 30 days this month | 1. View streak calendar | 15 gold-filled squares, 15 dashed-border empty squares; today has pulsing outline; future dates greyed out | P1 |
| DASH-A05 | Cohort leaderboard shows only cohort members | Student in cohort of 4 | 1. Toggle "Show my ranking" | Leaderboard shows 4 entries: rank, avatar, name, weekly XP, streak; opt-out members show as "Student A" | P1 |
| DASH-A06 | Leaderboard respects parent opt-out | Parent has disabled leaderboard for their child | 1. Log in as that child 2. View achievements | Leaderboard section not shown or shows "Leaderboard disabled by parent" | P1 |

### 3.4 Parent Dashboard — `/parent`

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| DASH-P01 | Multi-child overview shows all children | Parent with 3 children: Amani, Jabari, Wanjiku | 1. Navigate to `/parent` | Three child overview cards visible, each with avatar, name, enrolled tracks, sparkline chart, key stats, "View Details →" | P0 |
| DASH-P02 | Child card sparkline shows 4-week XP trend | Child has 4 weeks of XP data | 1. View child overview card | Mini line chart (gold on navy) shows XP earned per week for last 4 weeks | P1 |
| DASH-P03 | "View Details" navigates to per-child view | Parent taps "View Details →" on Jabari's card | 1. Tap link | Navigates to `/parent/child/JABARI_ID`; shows Jabari's track progress, coach notes, upcoming sessions | P0 |
| DASH-P04 | Upcoming sessions week-view shows next 7 days | 3 sessions scheduled in next 7 days | 1. View upcoming sessions section | Week-view strip shows 3 session cards with date, time, track, coach, delivery method ("🏠 Home Visit" or "💻 Online") | P0 |
| DASH-P05 | Coach notes feed shows reverse-chronological entries | 5 coach notes exist across 2 children | 1. View coach notes section | 5 entries shown, newest first; each with coach avatar, name, date, rendered Markdown text, "Reply" button | P1 |
| DASH-P06 | Skills radar chart renders for each track | Child has Coding track data | 1. View per-child progress reports | 5-axis radar chart (Logic, Syntax, Debugging, Design, Presentation) renders correctly; data matches child's skill levels | P1 |
| DASH-P07 | "Download Term Report (PDF)" generates correct PDF | Term report data available | 1. Click "Download Term Report (PDF)" | PDF downloads with Cognitron branding, shield watermark, per-track progress, coach commentary, recommendations | P1 |
| DASH-P08 | Reschedule session modal works | Upcoming session visible | 1. Click "Reschedule" on a session card 2. Select new date/time 3. Confirm | Modal opens; new date/time saved; session card updates; confirmation notification appears | P1 |
| DASH-P09 | Cancel session flow | Upcoming session visible | 1. Click "Cancel" on a session card 2. Confirm cancellation | Session removed from schedule; confirmation shown; coach notified | P1 |
| DASH-P10 | Quick action — "Message coach" | Parent has assigned coach | 1. Tap "💬 Message coach" | Opens messaging panel/WhatsApp deep link to the correct coach | P0 |
| DASH-P11 | Billing section shows payment history | Parent has 3 past payments | 1. Navigate to `/parent/billing` | Table with date, amount, description, receipt link; M-Pesa and card payment methods displayed | P1 |

### 3.5 Coach Dashboard — `/coach`

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| DASH-C01 | Coach sees daily/weekly schedule | Coach has 4 sessions today | 1. Navigate to `/coach` | Calendar/list view shows 4 sessions with student name, level, track, location (home/online), session objectives | P0 |
| DASH-C02 | Coach can view individual student profile | Coach clicks on a student | 1. Click student name from schedule | Student profile page shows: progress across tracks, recent activity, goals, parent notes, past session logs | P0 |
| DASH-C03 | Post-session note form submits correctly | Coach completed a session | 1. Open session log form 2. Enter topics, engagement level, homework, concerns 3. Submit | Notes saved in < 3 minutes of form interaction; confirmation toast; visible on parent dashboard immediately | P0 |
| DASH-C04 | Coach can assign practice to student | Content library has chess puzzles | 1. Select student 2. Browse content library 3. Assign "Forks & Pins" puzzle set 4. Submit | Assignment created; student sees new assignment on their Practice page with assignor info | P1 |
| DASH-C05 | Coach session check-in/check-out logs timestamps | Coach starts a home visit | 1. Tap "Check In" at start of session 2. Tap "Check Out" at end | Start and end timestamps recorded; parent receives notification for both events; GPS stamp recorded for home visits | P0 |

### 3.6 Gamification & Celebrations

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| DASH-G01 | XP gain animation on action completion | Student completes a quiz | 1. Complete quiz activity | "+25 XP" text floats upward from action point and fades; XP bar animates to new value with gold shimmer | P1 |
| DASH-G02 | Badge earned celebration sequence | Student unlocks "Bug Squasher" badge | 1. Complete qualifying action | Badge flies from trigger to achievements section; gold starburst; toast: "🏅 New Badge: Bug Squasher! +100 XP bonus"; auto-dismiss after 4s | P1 |
| DASH-G03 | Level-up celebration sequence | Student reaches new level | 1. Earn enough XP to level up | Full sequence: overlay → old badge morphs → confetti burst → "LEVEL UP!" text → new level name → "Continue →" after 2s → dashboard updates | P1 |
| DASH-G04 | Streak milestone celebration | Student hits 7-day streak | 1. Complete daily activity on 7th consecutive day | Streak counter flips (airport-board animation); small confetti; toast: "🔥 7-day streak!" | P2 |
| DASH-G05 | Celebrations do not block navigation | Mid-celebration | 1. During level-up animation, tap "Continue →" or press Escape | Animation terminates cleanly; dashboard renders correctly; no stuck overlays or orphaned animations | P1 |
| DASH-G06 | Celebration animations respect reduced-motion preference | OS prefers-reduced-motion enabled | 1. Trigger a badge earned event | No confetti, no flying animations; badge appears in-place; toast still shows text information | P1 |

---

## 4. Responsive Layout Tests

Tests executed at three breakpoints: **Mobile** (375 px — iPhone SE), **Tablet** (768 px — iPad), **Desktop** (1440 px — laptop).

### 4.1 Navigation

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| RESP-N01 | Mobile: bottom nav with 5 icons | Viewport 375 px, student logged in | 1. View `/dashboard` | Bottom navigation bar visible with Home, My Tracks, Practice, Achievements, Profile icons; all thumb-reachable; no sidebar | P0 |
| RESP-N02 | Tablet: bottom nav with 5 icons | Viewport 768 px, student logged in | 1. View `/dashboard` | Bottom navigation bar visible (same as mobile); no sidebar | P0 |
| RESP-N03 | Desktop: left sidebar navigation | Viewport 1440 px, student logged in | 1. View `/dashboard` | Collapsible left sidebar with labels + icons; no bottom nav | P0 |
| RESP-N04 | Desktop sidebar collapse/expand | Viewport 1440 px | 1. Click sidebar collapse button 2. Click expand button | Sidebar collapses to icon-only rail; expands back with labels; content area adjusts width smoothly | P1 |
| RESP-N05 | Parent mobile: hamburger menu | Viewport 375 px, parent logged in | 1. View `/parent` | Hamburger icon top-left; tapping opens slide-out menu with Overview, Children, Schedule, Messages, Billing, Reports | P0 |
| RESP-N06 | Parent desktop: left sidebar | Viewport 1440 px, parent logged in | 1. View `/parent` | Full sidebar with all parent nav items visible | P0 |

### 4.2 Layout Grid & Cards

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| RESP-L01 | Mobile: track cards in horizontal scroll | Viewport 375 px, student enrolled in 3 tracks | 1. View track cards section | Track cards scroll horizontally; one card visible at a time + peek of next; smooth swipe gesture | P0 |
| RESP-L02 | Tablet: track cards in 2-column grid | Viewport 768 px, student enrolled in 3 tracks | 1. View track cards section | 2-column grid; 2 cards in first row, 1 in second; cards have equal height | P0 |
| RESP-L03 | Desktop: track cards in 3-column grid | Viewport 1440 px, student enrolled in 3 tracks | 1. View track cards section | 3-column grid; all 3 cards in one row; generous padding (24 px) | P0 |
| RESP-L04 | Mobile: badge grid 3 columns | Viewport 375 px | 1. View `/dashboard/achievements` badge grid | Badges in 3-column grid; each badge card appropriately sized with no overflow | P1 |
| RESP-L05 | Tablet: badge grid 4 columns | Viewport 768 px | 1. View badge grid | Badges in 4-column grid | P1 |
| RESP-L06 | Desktop: badge grid 6 columns | Viewport 1440 px | 1. View badge grid | Badges in 6-column grid | P1 |
| RESP-L07 | Mobile: streak strip stacked | Viewport 375 px | 1. View streak section | Streak calendar, XP bar, and daily challenge stack vertically | P1 |
| RESP-L08 | Desktop: streak strip horizontal | Viewport 1440 px | 1. View streak section | Streak calendar, XP bar, and daily challenge display side-by-side horizontally | P1 |
| RESP-L09 | Mobile: parent child cards stacked | Viewport 375 px, parent with 3 children | 1. View `/parent` | Child overview cards stacked vertically; full-width | P0 |
| RESP-L10 | Desktop: parent overview 3-column | Viewport 1440 px, parent with 3 children | 1. View `/parent` | 3-column grid; one card per child in a row | P0 |

### 4.3 Skill Tree Responsiveness

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| RESP-SK01 | Mobile: single-column winding path | Viewport 375 px | 1. View `/dashboard/track/coding` skill tree | Vertical single-column path; nodes are 64 px circles; generous vertical spacing; smooth scroll | P0 |
| RESP-SK02 | Desktop: meandering wide path | Viewport 1440 px | 1. View skill tree | Path meanders left-right across wider viewport; nodes positioned with more horizontal variety | P0 |
| RESP-SK03 | Lesson popover: slide-up on mobile | Viewport 375 px | 1. Tap a skill tree node | Panel slides up from bottom; covers ~70% of screen; close button visible; dismiss via swipe-down or X | P0 |
| RESP-SK04 | Lesson popover: side panel on desktop | Viewport 1440 px | 1. Click a skill tree node | Panel fades in from the right; overlays ~40% of viewport; skill tree still partially visible | P0 |

### 4.4 Orientation

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| RESP-O01 | Portrait to landscape transition | Tablet in portrait | 1. Rotate device to landscape | Layout reflows smoothly; no content clipping; skill tree benefits from wider viewport; bottom nav still accessible | P1 |
| RESP-O02 | Landscape to portrait transition | Tablet in landscape | 1. Rotate device to portrait | Layout reflows back; no horizontal overflow; cards stack properly | P1 |
| RESP-O03 | No forced orientation | Any device | 1. Rotate in any direction on any page | App renders correctly; no orientation locks; no "please rotate your device" messages | P1 |

---

## 5. Accessibility Tests (WCAG 2.1 AA)

### 5.1 Perceivable

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| A11Y-P01 | All images have meaningful alt text | Any page | 1. Inspect all `<img>` and SVG elements | Non-decorative images have descriptive `alt`; decorative images have `alt=""` or `role="presentation"` | P0 |
| A11Y-P02 | Color contrast ratio ≥ 4.5:1 for normal text | Any page | 1. Run axe-core or Lighthouse on all dashboard pages | All text-on-background combinations meet 4.5:1 (normal text) or 3:1 (large text/UI components) | P0 |
| A11Y-P03 | Gold (#d4a843) on navy (#0c1b33) contrast check | Dashboard header, XP bars | 1. Test gold text on navy background | Contrast ratio ≥ 4.5:1 for text; verify gold accent elements against dark and light backgrounds | P0 |
| A11Y-P04 | Information not conveyed by color alone | Track cards, badge states, streak calendar | 1. View page in greyscale mode (simulate) | Completed vs. locked nodes distinguishable by shape/icon (checkmark vs. lock), not just color; streak days use fill patterns | P0 |
| A11Y-P05 | Text resizable to 200% without loss of content | Any page | 1. Browser zoom to 200% | No content clipped; no overlapping text; layout reflows gracefully; horizontal scroll acceptable for complex layouts | P1 |
| A11Y-P06 | Captions/transcripts for audio content | Pages with audio coach feedback | 1. Play audio coach note | Transcript or captions available; audio playback controls visible | P1 |
| A11Y-P07 | Progress ring SVG has accessible label | Track cards with progress rings | 1. Inspect progress ring with screen reader | Screen reader announces: "Coding track: 68% complete" (not just the visual ring) | P0 |

### 5.2 Operable

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| A11Y-O01 | All interactive elements keyboard-accessible | Any page, desktop | 1. Tab through entire page | Every button, link, card, and form control reachable via Tab; activation via Enter or Space | P0 |
| A11Y-O02 | Visible focus indicator on all focusable elements | Any page | 1. Tab through elements | Clear, visible focus ring (gold outline or equivalent) on every focused element; never invisible | P0 |
| A11Y-O03 | Skip-to-content link available | Any page | 1. Tab once from the top of the page | "Skip to main content" link appears; activating it moves focus past navigation to main content area | P1 |
| A11Y-O04 | No keyboard traps | Modal open (badge detail, reschedule) | 1. Tab through modal 2. Press Escape | Focus cycles within modal; Escape closes modal and returns focus to triggering element; no trap | P0 |
| A11Y-O05 | Touch targets ≥ 48 px | Mobile / Tablet | 1. Measure all interactive elements | All buttons, links, nav icons, skill tree nodes meet 48 px minimum (56 px for ages 5–8 UI) | P0 |
| A11Y-O06 | No time-dependent interactions (except countdown) | Any page | 1. Review all interactive flows | No actions require timed response; session countdown is informational only, not action-gated | P1 |
| A11Y-O07 | Celebration animations can be skipped | Level-up celebration active | 1. Press Escape or tap "Skip" button | Animation terminates; dashboard state updates immediately | P1 |
| A11Y-O08 | `prefers-reduced-motion` disables animations | OS reduced motion enabled | 1. Navigate dashboard; trigger celebrations | No parallax, confetti, flying badges, shimmer; progress rings show final state instantly; toasts still appear | P0 |

### 5.3 Understandable

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| A11Y-U01 | Page language declared | Any page | 1. Inspect `<html>` tag | `lang="en"` attribute present | P0 |
| A11Y-U02 | Form labels and error messages are descriptive | Signup/Login forms | 1. Submit empty form | Each field shows a specific, descriptive error; errors are associated with fields via `aria-describedby` | P0 |
| A11Y-U03 | Consistent navigation across pages | Navigate between dashboard pages | 1. Check nav position and order on each page | Navigation position, order, and labels remain consistent; no surprise layout shifts | P1 |
| A11Y-U04 | Error recovery guidance | Form submission fails | 1. Submit login with wrong password | Error message clearly states what went wrong and what to do (retry, reset password); error has `role="alert"` | P0 |

### 5.4 Robust

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| A11Y-R01 | Screen reader announces page content correctly | VoiceOver (macOS/iOS) or NVDA (Windows) | 1. Navigate `/dashboard` with screen reader | Greeting, next session, track cards, streak, and achievements all announced in logical order with correct semantics | P0 |
| A11Y-R02 | ARIA roles used correctly | Any page | 1. Run axe-core audit | No ARIA misuse (e.g., `role="button"` on non-interactive elements); landmarks (`main`, `nav`, `banner`) present | P0 |
| A11Y-R03 | Dynamic content updates announced | XP earned, badge unlocked | 1. Complete action that updates XP or earns badge | Screen reader announces the change via `aria-live="polite"` region: "You earned 25 XP" or "Badge unlocked: Bug Squasher" | P1 |
| A11Y-R04 | SVG skill tree nodes have roles and labels | Skill tree page | 1. Inspect SVG nodes with screen reader | Each node announces: lesson name, status (completed/current/locked), and is navigable as a link | P1 |

---

## 6. Performance Tests

### 6.1 Load Performance

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| PERF-L01 | Initial page weight < 500 KB | Production build; no cache | 1. Load `/dashboard` 2. Measure total transfer size in DevTools Network tab | Total transferred < 500 KB (HTML + JS + CSS + fonts + SVGs) | P0 |
| PERF-L02 | JavaScript bundle < 150 KB gzipped | Production build | 1. Measure JS payload in DevTools | All JS chunks combined < 150 KB gzipped | P0 |
| PERF-L03 | Dashboard shell loads < 2 s on 3G | Chrome DevTools → Network: Slow 3G (400 Kbps down, 400 ms RTT) | 1. Clear cache 2. Load `/dashboard` 3. Measure Time to Interactive | Shell (nav + layout + skeleton) visible in < 2 s; data populates progressively after | P0 |
| PERF-L04 | Font load does not block render | Production build | 1. Load page with fonts cache cleared | `font-display: swap` applied; text renders immediately in fallback font; custom fonts load without FOIT | P1 |
| PERF-L05 | Code-split track views | Navigate to `/dashboard/track/coding` | 1. Check network panel for chunk requests | Track detail JS loads as separate chunk; not included in initial dashboard bundle | P1 |
| PERF-L06 | Lazy-loaded images below fold | Dashboard with 5+ activity entries and badge carousel | 1. Load page 2. Check network panel | Images below viewport load only when scrolled into view (Intersection Observer or native `loading="lazy"`) | P1 |
| PERF-L07 | SVG icons are inlined, not fetched as separate requests | Any page | 1. Check network panel for icon requests | Badge, track, and UI icons are inlined SVG or part of sprite; no individual HTTP requests for icons | P2 |

### 6.2 Nairobi Network Simulation

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| PERF-N01 | Dashboard usable on Safaricom 4G (10 Mbps, 50 ms RTT) | Chrome DevTools custom throttle: 10 Mbps / 50 ms | 1. Load `/dashboard` 2. Navigate to track view 3. Open achievements | All pages load in < 3 s; interactions responsive; no blank screens; skeleton loaders visible during fetch | P0 |
| PERF-N02 | Dashboard usable on 3G (1.6 Mbps, 300 ms RTT) | Chrome DevTools: Regular 3G | 1. Load `/dashboard` | Shell loads in < 2 s; content loads progressively; page functional within 5 s | P0 |
| PERF-N03 | Dashboard survives intermittent connection drop | Simulate offline ↔ online toggle | 1. Load `/dashboard` (online) 2. Go offline 3. Navigate within app 4. Go back online | Offline: cached data shown with "Offline" banner; navigation between cached pages works. Online: data refreshes, banner disappears | P0 |
| PERF-N04 | Large dataset does not cause jank | Student with 144 lessons, 50 badges, 100+ activity entries | 1. Load `/dashboard` and scroll 2. Open achievements 3. Scroll skill tree | No jank (< 16 ms frame budget maintained); smooth scrolling; no visible stutter on badge grid or skill tree | P1 |

### 6.3 Lighthouse & Core Web Vitals

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| PERF-CW01 | Lighthouse Performance score ≥ 90 | Production build, desktop, no throttle | 1. Run Lighthouse on `/dashboard` | Score ≥ 90; FCP < 1.5 s; LCP < 2.5 s; CLS < 0.1; TBT < 200 ms | P0 |
| PERF-CW02 | Lighthouse Performance score ≥ 70 on mobile | Production build, Lighthouse mobile simulation | 1. Run Lighthouse on `/dashboard` | Score ≥ 70; LCP < 4 s; CLS < 0.1 | P1 |
| PERF-CW03 | No layout shift on data load | Dashboard loads with skeleton then real data | 1. Load `/dashboard` 2. Observe CLS | Skeleton dimensions match real content; no visible layout shift when data arrives (CLS < 0.1) | P0 |

---

## 7. Edge Cases

### 7.1 Empty States

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| EDGE-E01 | Student with zero enrolled tracks | New student, no tracks assigned | 1. Log in 2. View `/dashboard` | Friendly illustration: mascot + map; message: "Your adventure starts here!"; CTA: "Explore Tracks →"; no broken card layouts | P0 |
| EDGE-E02 | Student with no upcoming sessions | Student enrolled but no sessions scheduled | 1. View `/dashboard` hero section | Empty state: calendar illustration + gold star; "No lessons this week. How about some practice?"; CTA: "Practice Now →" | P0 |
| EDGE-E03 | Student with no achievements | Brand new student, 0 XP, 0 badges | 1. View `/dashboard/achievements` | Trophy case with dashed outlines: "Your trophy case is waiting! Complete your first lesson to earn your first badge." | P0 |
| EDGE-E04 | Student with no recent activity | Student has not logged activity in 30 days | 1. View activity timeline | Friendly message: "Welcome back! Start a practice session to pick up where you left off." | P1 |
| EDGE-E05 | Parent with no children linked | Parent account with 0 children | 1. Log in as parent 2. View `/parent` | Empty state with instructions: "No children linked yet. Contact support to link your child's account." No broken UI | P0 |
| EDGE-E06 | Coach with no students assigned | New coach account | 1. Log in as coach 2. View `/coach` | Empty state: "No students assigned yet." Clean layout, no errors | P1 |
| EDGE-E07 | Track with 0% progress | Student just enrolled, hasn't started | 1. View track card | Progress ring shows 0% (empty ring); text: "0 / 3,000 XP"; card is still tappable and navigates to track detail | P1 |

### 7.2 Session & Auth Edge Cases

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| EDGE-S01 | Expired session during data save | Student submits practice results; session expired between page load and submit | 1. Complete a quiz while token is expired | Error handled gracefully: "Your session expired. Your progress has been saved locally. Please log in again." — data retried after re-auth | P0 |
| EDGE-S02 | Concurrent sessions on two devices | Student logged in on iPad and phone | 1. Navigate on both devices simultaneously | Both sessions work; data updates sync within seconds; no conflicts; most recent action wins | P1 |
| EDGE-S03 | Account deleted while session active | Admin deletes student account | 1. Student navigates dashboard | Next API call returns auth error; user redirected to `/login` with "Account no longer active. Contact support." | P1 |
| EDGE-S04 | Role changed while session active | Admin changes user role from student to parent | 1. Student navigates dashboard | On next protected page load, middleware detects role change; redirects to correct dashboard | P2 |

### 7.3 Data Edge Cases

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| EDGE-D01 | Student enrolled in all 3 tracks | Student has Coding, AI, and Chess active | 1. View `/dashboard` | All 3 track cards render correctly in grid; correct accent colors (teal, coral, gold); no overflow | P0 |
| EDGE-D02 | Student enrolled in only 1 track | Student has Chess only | 1. View `/dashboard` | Single track card displayed; layout not broken by having only 1 card; card centered or left-aligned | P1 |
| EDGE-D03 | Parent with 5+ children | Parent with 5 children linked | 1. View `/parent` | All 5 children displayed; grid/scroll handles overflow; no performance degradation; all clickable | P1 |
| EDGE-D04 | Student at maximum level (Level 12 Coding) | Student completed all 144 coding sessions | 1. View coding track detail | Skill tree shows all nodes completed; gold "journey complete" celebration state; no "next lesson" CTA; "Review" options available | P1 |
| EDGE-D05 | Very long student name | Student name = "Bartholomew Alexander Wanjiku-Kamau III" | 1. View header greeting, nav, leaderboard | Name truncated with ellipsis where needed; no layout break; full name visible in profile | P2 |
| EDGE-D06 | XP exactly at level boundary | Student has 3,000 / 3,000 XP | 1. View XP bar | Level-up is triggered or bar shows 100%; no off-by-one display (e.g., 100% but not leveled up) | P1 |
| EDGE-D07 | Special characters in student name | Name contains apostrophe: "O'Brien" | 1. View dashboard greeting | Name renders correctly; no XSS; no SQL injection through display name | P0 |

### 7.4 Multiple Children (Parent View)

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| EDGE-M01 | Children in different tracks | Child A: Coding; Child B: Chess; Child C: Coding + AI | 1. View `/parent` | Each child card shows only their enrolled tracks; track icons accurate per child | P0 |
| EDGE-M02 | Children at different levels | Child A: Explorer (Level 1); Child B: Innovator (Level 11) | 1. View `/parent` | Each child card shows their correct level; progress percentages accurate; no cross-contamination of data | P0 |
| EDGE-M03 | Same coach for multiple children | Children A and B both assigned to Coach David | 1. View coach notes for both children | Notes correctly attributed per child; messaging links go to same coach but in per-child context | P1 |
| EDGE-M04 | One child inactive, others active | Child A: no sessions for 60 days; Child B: active | 1. View `/parent` | Child A's card shows last activity date; no error from stale data; "No upcoming sessions" for Child A; Child B shows normally | P1 |

---

## 8. Nairobi-Specific Tests

### 8.1 Offline Behavior

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| NBI-OF01 | Service worker caches dashboard shell | First visit completed while online | 1. Load `/dashboard` (online) 2. Go offline 3. Reload page | Dashboard shell (nav, layout, greeting) loads from SW cache; "Offline — data may not be current" banner shown | P0 |
| NBI-OF02 | Cached student data shown offline | Previous session loaded student data | 1. Go offline 2. Navigate to `/dashboard` | Last-fetched XP, streak, track progress, upcoming sessions shown; stale data badge visible | P0 |
| NBI-OF03 | Chess puzzles work offline | Student previously loaded puzzle library (cached) | 1. Go offline 2. Navigate to `/dashboard/practice` 3. Select chess puzzles | Cached puzzles load and are interactive; solutions evaluated client-side; XP queued for sync | P0 |
| NBI-OF04 | Coding challenges work offline | Student cached coding challenges | 1. Go offline 2. Open coding challenge | Challenge instructions render; code editor functional; submission queued for when connectivity returns | P0 |
| NBI-OF05 | Offline → online sync | Student completed 3 puzzles offline | 1. Complete puzzles offline 2. Reconnect | Queued XP and completions sync to Supabase; progress updates; no duplicate entries; streak maintained | P0 |
| NBI-OF06 | "Download weekly content pack" works | Student on Wi-Fi | 1. Tap "Download for offline" in settings 2. Confirm | Content pack (puzzles, challenges, lesson notes) downloaded; size estimate shown before download; confirmation toast on complete | P1 |
| NBI-OF07 | Offline banner dismissible but persistent | User offline | 1. View offline banner 2. Dismiss it | Banner can be minimized to a small indicator; returns if page reloaded offline; auto-removes when connectivity restored | P1 |

### 8.2 Data-Saving Mode

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| NBI-DS01 | Data-saving mode toggle exists in settings | Logged in | 1. Navigate to profile/settings | "Data Saver" toggle present with description: "Reduce data usage — images load at lower quality, animations disabled" | P0 |
| NBI-DS02 | Data-saving mode reduces image quality | Data saver ON | 1. Navigate to `/dashboard` 2. Check image requests | Images loaded as thumbnails / lower resolution; coach avatars compressed; badge illustrations use simpler SVG variants if available | P0 |
| NBI-DS03 | Data-saving mode disables auto-play animations | Data saver ON | 1. Navigate to `/dashboard` | No shimmer animations on XP bar; no progress ring fill animation; no confetti; content is immediately static | P1 |
| NBI-DS04 | Data-saving mode shows estimated data usage | Data saver ON | 1. View settings or dashboard header | Indicator: "~2.1 MB used this session" (running total) | P2 |
| NBI-DS05 | Data-saving mode respects `Save-Data` HTTP header | Client sends `Save-Data: on` | 1. Enable "Lite mode" in Chrome Android | Server/CDN responds with reduced-size assets; same behavior as manual toggle | P1 |

### 8.3 WhatsApp Deep Links & Integration

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| NBI-WA01 | "Share achievement" generates WhatsApp-friendly image | Student earns a badge | 1. Tap "Share" on achievement 2. Select WhatsApp | WhatsApp share sheet opens with pre-generated image card (achievement name, student name, Cognitron branding) + pre-filled caption text | P0 |
| NBI-WA02 | "Message coach" opens WhatsApp chat | Parent taps "Message coach" | 1. Tap coach WhatsApp link | Opens WhatsApp (or WhatsApp Web) with coach's number pre-filled; opening message template: "Hi Coach David, I'm writing about [child name]..." | P0 |
| NBI-WA03 | "Show Mummy" button (young students) | Student age 5–8, completed a Scratch project | 1. Tap "Show Mummy" button | Generates shareable card image (WhatsApp-optimized: 1080×1080 px, < 200 KB) with project screenshot, student name, Cognitron shield | P0 |
| NBI-WA04 | Share card renders correctly in WhatsApp preview | Image shared to WhatsApp | 1. View shared image in WhatsApp chat | Image is clear, not pixelated; text readable; Cognitron branding visible; correct aspect ratio | P1 |
| NBI-WA05 | "Call us" link opens WhatsApp | Parent taps "📞 Call us" quick action | 1. Tap link | Opens WhatsApp with Cognitron support number; does not open phone dialer (WhatsApp-first per spec) | P1 |
| NBI-WA06 | Weekly digest WhatsApp message received | Parent has WhatsApp integration enabled | 1. Wait for Friday automated digest | Parent receives WhatsApp message with per-child highlights: progress %, achievements, upcoming sessions, and coach summary | P1 |

### 8.4 M-Pesa Integration

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| NBI-MP01 | M-Pesa payment option visible in billing | Parent on `/parent/billing` | 1. View billing page | M-Pesa listed as payment method alongside card; recognizable Safaricom/M-Pesa branding | P1 |
| NBI-MP02 | M-Pesa payment flow initiates correctly | Parent has M-Pesa number linked | 1. Select M-Pesa 2. Confirm payment | STK push sent to parent's phone; "Waiting for M-Pesa confirmation…" spinner shown; timeout after 60 s | P1 |

### 8.5 PWA Behavior

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| NBI-PW01 | "Add to Home Screen" prompt works | First visit on mobile Chrome/Safari | 1. Visit dashboard 2. Accept "Add to Home Screen" prompt | App icon added to home screen; app launches in standalone mode (no browser chrome) | P1 |
| NBI-PW02 | PWA loads from home screen icon | App installed on device | 1. Tap Cognitron icon on home screen | App launches in standalone mode; splash screen shows Cognitron shield; dashboard loads; feels native | P1 |
| NBI-PW03 | PWA receives push notifications | Student opted in to notifications | 1. Coach posts session note | Push notification appears on device: "Coach David left feedback on your Python project" | P2 |

---

## 9. Device & Browser Matrix

All tests in sections 1–8 must pass on the following minimum matrix:

| Device | OS | Browser | Priority | Notes |
|--------|----|---------|----------|-------|
| iPad (9th gen or Air) | iPadOS 17+ | Safari | P0 | Primary student device (Brookhouse, ISK 1:1 programs) |
| Samsung Galaxy Tab A | Android 13+ | Chrome | P0 | Common budget tablet in Kenyan households |
| iPhone 14/15 | iOS 17+ | Safari | P0 | Primary parent device (60% of parent segment) |
| Samsung Galaxy S23/S24 | Android 14+ | Chrome | P0 | Primary parent device (40% of parent segment) |
| MacBook (Chrome) | macOS 14+ | Chrome | P0 | Older students (13–17) for coding work |
| MacBook (Safari) | macOS 14+ | Safari | P1 | Cross-browser validation |
| Chromebook | ChromeOS | Chrome | P1 | Some international schools issue these |
| Windows laptop | Windows 11 | Chrome + Edge | P1 | Coach devices, some parents |

---

## 10. Age-Adaptive UI Tests

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| AGE-01 | Age 5–8 UI — large touch targets, simplified nav | Student DOB indicates age 7 | 1. Log in 2. View dashboard | Body text 18 px; touch targets 56 px; nav shows 3 items (Home, My Lessons, Prizes); mascot visible; big celebrations on every action | P1 |
| AGE-02 | Age 9–12 UI — standard gamified view | Student DOB indicates age 10 | 1. Log in 2. View dashboard | Body text 16 px; touch targets 48 px; full 5-item nav; badges prominent; leaderboard visible; standard celebration intensity | P1 |
| AGE-03 | Age 13–17 UI — professional, minimal | Student DOB indicates age 15 | 1. Log in 2. View dashboard | Body text 14 px; touch targets 44 px; 5-item nav + keyboard shortcuts; portfolio focus; subtle toasts instead of confetti; labels: "Tracks", "Portfolio", "Practice Lab" | P1 |
| AGE-04 | Age group derived from birthdate | Student birthdate = 2010-03-15 (age 15 in 2025) | 1. Check `ageGroup` context value | Returns `'teen'`; UI renders age-13–17 variant throughout all components | P1 |
| AGE-05 | Edge case: student turns 13 mid-term | Student birthday crosses the 12→13 threshold | 1. Log in on birthday or after | UI smoothly transitions to "middle" → "teen" variant; no jarring switch mid-session; change applies on next login | P2 |

---

## 11. Security Tests

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|------------|---------------|-------|-----------------|----------|
| SEC-01 | XSS prevention in user-generated content | Coach note contains `<script>alert('xss')</script>` | 1. Coach submits note with script tag 2. Parent views note | Script tag is escaped/sanitized; rendered as plain text, NOT executed | P0 |
| SEC-02 | SQL injection prevention | Attacker crafts malicious input in search/filter | 1. Enter `'; DROP TABLE students; --` in a search field | Input sanitized; Supabase parameterized queries prevent injection; no data loss | P0 |
| SEC-03 | CSRF protection on state-changing endpoints | Attacker crafts external form targeting Cognitron API | 1. Submit external POST request | Request rejected (missing CSRF token or SameSite cookie); no state change | P0 |
| SEC-04 | Secure session cookies | Inspect cookies in DevTools | 1. Log in 2. Check cookie attributes | Cookies set with `HttpOnly`, `Secure`, `SameSite=Lax` (or `Strict`); not accessible via JS | P0 |
| SEC-05 | HTTPS enforced | Navigate to HTTP URL | 1. Enter `http://cognitron.co.ke/dashboard` | Automatic redirect to HTTPS; no mixed content warnings | P0 |
| SEC-06 | API rate limiting | Authenticated user sends rapid requests | 1. Send 100 API requests in 10 seconds | Rate limiter returns 429 after threshold; no server crash; user sees "Slow down" message | P1 |
| SEC-07 | File upload validation (coach attachments) | Coach uploads a file | 1. Upload `.exe` file as "lesson attachment" | File rejected; only allowed types (PDF, PNG, JPG, MP3, MP4) accepted; max size enforced (10 MB) | P1 |
| SEC-08 | Coach verification badge cannot be self-assigned | Coach modifies own profile | 1. Attempt to set `verified: true` via API | RLS blocks; verification is admin-only field; returns error or no-op | P1 |

---

## 12. Test Execution Strategy

### Environment

| Environment | Purpose | Data |
|-------------|---------|------|
| **Local dev** | Component-level unit tests, integration tests | Mock Supabase (supabase-js mock) |
| **Staging** | Full E2E with real Supabase project | Seed data: 5 students, 3 parents, 2 coaches, all 3 tracks, 50 badges, 100 sessions |
| **Production** | Smoke tests post-deploy | Read-only checks; no write tests |

### Seed Data Requirements

| Entity | Count | Notes |
|--------|-------|-------|
| Students | 5 | Ages 6, 10, 13, 15, 17; mix of single and multi-track enrollment; one at Level 0, one at Level 12 |
| Parents | 3 | One with 1 child, one with 3 children, one with 5 children |
| Coaches | 2 | One assigned to 3 students, one assigned to 2 |
| Sessions | 100 | Mix of completed, upcoming, and cancelled; home visits and online |
| Badges earned | 50 | Distributed across students; include all badge categories |
| Coach notes | 20 | Mix of text-only and with audio attachments |
| Billing records | 10 | Mix of M-Pesa and card payments |

### Automation Framework

| Layer | Tool | Coverage |
|-------|------|----------|
| Unit | Vitest + React Testing Library | Components, hooks, utility functions |
| Integration | Vitest + MSW (Mock Service Worker) | API call / RLS verification |
| E2E | Playwright | Auth flows, role redirects, responsive, cross-browser |
| Accessibility | axe-core (via @axe-core/playwright) + manual VoiceOver/NVDA | WCAG 2.1 AA compliance |
| Performance | Lighthouse CI + WebPageTest | Core Web Vitals, bundle size |
| Visual regression | Playwright screenshots + Percy or Chromatic | Layout integrity across breakpoints |

### Priority Execution Order

1. **P0** — All tests must pass before any deployment to staging or production. These cover auth, RLS, data isolation, core page rendering, and critical Nairobi constraints (offline, < 500 KB load).
2. **P1** — Must pass before production release. Covers gamification, responsive details, accessibility, performance targets, and parent/coach workflows.
3. **P2** — Should pass but will not block release. Covers nice-to-have polish: animation details, PWA push notifications, data usage estimates.

### P0 Test Count Summary

| Section | P0 Count |
|---------|----------|
| Auth (Signup, Login, Logout, Session) | 14 |
| Authorization (RLS) | 21 |
| Dashboard Functional | 14 |
| Responsive Layout | 10 |
| Accessibility | 10 |
| Performance | 6 |
| Edge Cases | 9 |
| Nairobi-Specific | 8 |
| Security | 5 |
| **Total P0** | **97** |

---

*— Frank, QA Engineer · Cognitron Squad*
