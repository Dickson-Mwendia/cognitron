# Decision: P0 Security Headers + Env Validation

**Author:** Rusty  
**Date:** 2026-04-04  
**Status:** Implemented

## Context

The security audit identified missing CSP headers and no env validation as P0 gaps. Without security headers, the app is vulnerable to clickjacking, MIME sniffing, and content injection. Without env validation, production deploys could silently run with missing Supabase credentials.

## Decision

### Security Headers (next.config.ts)
Added 7 headers applied to all routes:
- **HSTS** — enforces HTTPS for 1 year, includes subdomains
- **X-Frame-Options: DENY** — prevents clickjacking
- **X-Content-Type-Options: nosniff** — blocks MIME sniffing
- **CSP** — restrictive policy allowing only self + Supabase endpoints + Google Fonts
- **Referrer-Policy** — strict-origin-when-cross-origin
- **Permissions-Policy** — disables camera, microphone, geolocation
- **X-DNS-Prefetch-Control** — enables DNS prefetch for performance

### Env Validation (src/lib/env.ts)
Using `@t3-oss/env-nextjs` + `zod`:
- Supabase URL and anon key are **required in production**, optional in dev
- Service role key is server-only, always optional
- Validation is **skipped entirely in dev** (`skipValidation: !isProduction`) to support mock data flow
- `.env.example` documents all variables

## Trade-offs
- CSP includes `unsafe-inline` and `unsafe-eval` for script-src (Next.js needs these in dev, can be tightened with nonce-based CSP later)
- `skipValidation` in dev means truly broken env configs won't be caught until production — acceptable since mock data is the default dev flow

## Team Impact
- **Frank (QA):** Can verify headers with browser DevTools → Network tab → Response Headers
- **All:** Copy `.env.example` → `.env.local` when setting up Supabase locally
- **Ops:** Production deploy will fail fast if Supabase vars are missing — that's intentional
