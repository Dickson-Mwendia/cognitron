# Session Log — 2026-04-04 — Security Kickoff

**Participants:** Danny (Lead Strategist), Rusty (Full-stack Developer), Scribe (Session Logger)

## Summary

The team assessed whether to split the Cognitron codebase into separate repos (marketing site vs. platform) or keep the existing monorepo. Both Danny and Rusty independently evaluated the architecture and converged on the same recommendation: **keep the monorepo**. Next.js route groups already provide clean logical separation, the shared Supabase backend makes splitting painful, and the pre-revenue stage demands shipping speed over infrastructure ceremony.

With the monorepo decision settled, focus shifted to security. Rusty conducted a detailed audit of the existing security posture and identified gaps across 8 areas: authentication/authorization, route protection, environment variable management, child safety (COPPA/Kenya DPA), API security, build/deploy isolation, Supabase RLS, and content security policy.

Danny provided a higher-level security controls overview covering what exists (RLS, middleware, server-side auth, client role guards) and what must be added (rate limiting, CSP headers, CSRF, input sanitization, audit logging, env variable discipline).

## Decisions Made

- **DEC-002:** Keep monorepo architecture. Do not split. Credited to Danny and Rusty (both concurred independently).
- Security controls prioritized into P0 (before launch), P1 (sprint 2), P2 (sprint 3), P3 (later).
- P0 items: email verification enforcement, security headers, parental consent gate for under-16, privacy policy, env validation.
- Child safety flagged as critical — Kenya Data Protection Act 2019 §33 requires parental consent for minors under 16.

## Artifacts

- Danny's monorepo strategy + security overview → merged into DEC-002
- Rusty's detailed security controls plan (8 audit areas, priority table) → merged into DEC-002
- Both files merged and deduplicated in `.squad/decisions.md`

## Next Steps

- Implement P0 security controls before launch
- Rusty to begin with email verification enforcement (Supabase config change) and security headers (next.config.ts)
- Team to draft privacy policy content
- Parental consent gate design needed (signup flow change for under-16 students)
