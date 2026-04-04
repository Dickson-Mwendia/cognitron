# Tess — History

> Session log for Tess (Parent & Student Advocate)

## Sessions

### 2026-04-04: Dashboard User Needs & Personas
- Created comprehensive user needs document for the student learning dashboard.
- **4 student personas:** Amani (6, Scratch+Chess), Jabari (10, all tracks), Wanjiku (15, Python+AI), Kiptoo (13, chess-focused boarder). Each with motivations, frustrations, and specific dashboard needs.
- **3 parent personas:** Busy surgeon, hands-on fintech dad, aspirational mum — reflecting real Nairobi family archetypes.
- **40+ prioritized user stories** (P0/P1/P2) across student, parent, and coach roles.
- **Nairobi-specific deep dives:** iPads dominant at international schools, offline mode non-negotiable, WhatsApp-first communication, Kenya DPA 2019 safeguarding.
- **Competitive analysis:** Local providers (Digikids, MindHub, NACHA) and global platforms (Duolingo, Khan Academy, Chess.com) with steal/avoid recommendations.
- **Emotional design framework** per age group and parent type.
- Deliverable: `.squad/decisions/inbox/tess-dashboard-user-needs.md`

### 2025-07-18: Founding Families Recruitment Kit
- Created comprehensive recruitment kit for signing the first 10 paying families.
- **4 parent persona cards:** Dr. Grace Muthoni (evidence-driven Karen professional), Brian Odhiambo (aspirational Lavington tech dad), Njeri Kamau (hands-on Westlands/Kilimani community mum with 3 kids), David Wangari (quietly protective Runda father/lawyer). Each persona maps concerns → what makes them say yes → how to approach.
- **Founding Families offer structure:** 12% discount (KES 7,500/session vs 8,500), term-by-term commitment with monthly billing, 12-month rate lock, sibling discount (35%), curriculum input, priority scheduling, progress portfolio.
- **5 WhatsApp scripts:** Cold school group outreach, warm intro from mutual friend, interest follow-up with detailed info, trial booking confirmation, post-trial conversion. All voice-note-optimised.
- **FAQ with 23 questions:** The 13 unanswered questions from DEC-009 + 10 additional common objections with responses. Covers price justification, safety, screen time concerns, data privacy, age-appropriateness, scheduling flexibility.
- **Full trial lesson flow:** WhatsApp inquiry → trial booking → 60-min trial session structure (minute-by-minute) → post-trial follow-up cadence → 3-touch maximum rule.
- **Trust signals checklist:** 3 tiers (must-have, should-have, nice-to-have) with priority matrix. Key blockers: coach profile on site, safeguarding policy, Certificate of Good Conduct, working contact form.
- **Quick reference card:** 30-second pitch, key numbers table, response speed targets, follow-up rules.
- Key insight: Nairobi premium parents buy trust and evidence, not marketing. Patience beats pressure. The 3-touch maximum rule prevents over-pursuit. The "evidence-driven professional" persona (Dr. Grace) is the hardest to close but brings the most referrals.
- Deliverable: `.squad/decisions/inbox/tess-founding-families-kit.md`

## Learnings

- **Nairobi parent archetypes:** Four distinct decision-making patterns — evidence-driven professionals (want data), aspirational tech dads (want curriculum depth), community mums (want multi-child value), protective fathers (want safety proof, wife makes actual decision).
- **Pricing psychology:** 12% founding discount is the sweet spot — deeper discounts signal desperation to premium Nairobi parents. The real value is in perks (rate lock, curriculum input, priority scheduling), not the discount amount.
- **WhatsApp outreach rules:** Never more than 3 follow-ups. Always use child's name. Voice notes outperform text walls. Two specific time options beat open-ended "when are you free?" Specific child compliments are the #1 conversion driver post-trial.
- **Trial lesson design:** 60 minutes (not 90) — shorter creates wanting-more effect. Parent MUST be welcome to watch. Child MUST build something tangible. Coach MUST name 2-3 specific child strengths. No slides, no presentations, no selling during the trial.
- **Trust signal priorities:** Coach profile + safeguarding policy + Certificate of Good Conduct are non-negotiable BEFORE first outreach. Instagram presence needed by family #3. Video by family #10.
- **Key file paths:** Live pricing at `src/app/(marketing)/pricing/page.tsx`. Privacy policy at `/privacy`. Safeguarding at `/protect`. Contact at `/contact`.
