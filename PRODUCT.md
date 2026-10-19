# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: founders, CTOs and engineering managers at US product companies with a React Native or Expo app, deciding whether to hire Gabriel for a consulting engagement or as a fractional mobile lead. They arrive from LinkedIn, a referral, or an LLM answer, usually reading between meetings in daylight, and give the page under a minute.

Secondary: recruiters and hiring managers scanning career history and keywords, mostly through `/resume` and the PDF. Tertiary: security hiring managers on the unlisted `/security` page.

## Product Purpose

Gabriel Taveira's personal site. It sells consulting (React Native and Expo architecture reviews, migrations, fractional leadership, design systems) and works as a public CV. Success is a qualified inbound message: someone with a real mobile problem emails him or messages him on LinkedIn.

## Positioning

An independent consultant (since 2025) who has done the hard migrations on a famous app (Coinbase Consumer App Infra: React Compiler, Expo Prebuild, the new architecture), has managed up to 56 direct reports, and builds things people use: Curvinha as founder, and open-source libraries other teams ship with (magic-modal, eslint-plugin-safe-jsx, react-native-magic-toast).

The current role is "independent consultant" / "consultoria independente". G2i and Morgan & Morgan never appear as current employers anywhere (copy, meta, JSON-LD, llms.txt, resume). Past jobs stay exactly as listed.

## Operating Context

Bilingual: en-US default, pt-BR. Desktop during work hours, phone when following a LinkedIn link. Brazil-based (Ribeirão Preto), remote with US teams. Light by default, follows the system, with a toggle.

## Capabilities and Constraints

- Next.js 16 App Router, next-intl, hand-written CSS on tokens (no Tailwind), deployed on Vercel. Pages prerender per locale and revalidate daily.
- Copy lives in `src/i18n/locales/*.json`, one top-level key per page section. Locale-neutral data lives next to the section that owns it (`src/components/portfolio/sections/<id>/data.ts`); cross-cutting facts in `src/components/portfolio/profile.ts`.
- `/[locale]/resume` and `/curriculum.pdf` stay light, single-column and system-font for ATS parsing.
- `/llms.txt` and the JSON-LD are generated from the same copy and data as the page.
- The contact form hands off to the visitor's mail client (no backend).
- Native platform first. A new dependency must own a real capability.

## Brand Commitments

- Name: Gabriel Taveira. Voice: sharp, warm, direct engineer, first person. No em or en dashes, no "not X, it's Y", no hype, no emoji as decoration.
- His handwriting (the margin notes: "yes, really", "season 3", "made with coffee · gt") is the one personality device, and the pen's blue is the only accent. Easter eggs, the live clock, count-ups and decorative card flourishes were removed on purpose.
- Curvinha is "curated with architects from Curva Interiores" / "curadoria com arquitetas da Curva Interiores". Ana does not sign the curation. No Ana or Curva prices anywhere. The project card links `?ct=gabriel-site`, the Now line `?ct=gabrieltaveira-dev`.

## Evidence on Hand

- Outcomes already in copy: Coinbase coverage 25% → 45%, Groundswell 30% → 80%+, 16k lines of brittle tests removed, 4 to 56 direct reports, D-ID app built from zero, Mozeic design system, Ionic → React Native for 90+ franchises.
- Open source (GitHub, read 2026-10-19): magic-modal 650 stars; npm last 30 days to 2026-10-18: eslint-plugin-safe-jsx 7,228, react-native-magic-toast 1,350, magic-observability 1,077, magic-modal 466 plus the old name react-native-magic-modal (about 12.9k combined), react-native-code-push-plugin 378. Numbers drift: show them with a date and a source link.
- Three merged security PRs (`/security`), talks 2023 to 2024, Space Cast host, five hackathon placements 2019 to 2020.
- No headshot, client logos, testimonials or pricing exist. Do not fabricate any of them.

## Product Principles

1. Name, then offer, then proof. In that order, in the first viewport.
2. Every claim sits beside a proof you can touch: a link, a running demo, a dated number.
3. Scannable in under a minute for a busy engineering leader.
4. Personality in the writing and his hand, not in decoration.
