# Work Routing

How to decide who handles what.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Market research & strategy | Danny | Competitor analysis, pricing models, go-to-market |
| Monetization & business | Danny | Payment tiers, subscription design, revenue projections |
| Next.js & platform dev | Rusty | Pages, API routes, database, auth, payments integration |
| UI/UX design | Linus | Wireframes, design system, component design, layouts |
| Testing & QA | Frank | Test plans, accessibility audits, cross-device testing |
| Coding curriculum | Virgil | Scratch/Python/web dev lesson plans, coding challenges |
| AI curriculum | Turk | AI/ML for kids, prompt engineering, AI safety content |
| Chess curriculum | Livingston | Chess lessons, rating systems, tournament structure |
| Parent/student needs | Tess | User stories, Nairobi parent POV, student experience |
| Social media & growth | Basher | Content calendar, SEO, campaigns, brand voice |
| Code review | Frank | Review PRs, check quality, suggest improvements |
| Scope & priorities | Danny | What to build next, trade-offs, decisions |
| Session logging | Scribe | Automatic — never needs routing |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Lead |
| `squad:{name}` | Pick up issue and complete the work | Named member |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, the **Lead** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Lead review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn the tester to write test cases from requirements simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. The Lead handles all `squad` (base label) triage.

## Work Type → Agent

| Work Type | Primary | Secondary |
|-----------|---------|----------|
| Market research, monetization, go-to-market | Danny | Tess |
| Next.js, payments, platform | Rusty | Frank |
| UX/UI design, design systems | Linus | Tess |
| Testing, QA, accessibility | Frank | Linus |
| Coding education (Scratch, Python, web dev) | Virgil | Rusty |
| AI education (ML, prompt eng, AI safety) | Turk | Virgil |
| Chess education (pedagogy, ratings, tournaments) | Livingston | — |
| Parent/student advocacy, user research | Tess | Linus |
| Social media, content, brand | Basher | Danny |

