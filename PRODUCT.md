# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: founders, CTOs and engineering managers at US product companies with a React Native or Expo app, deciding whether to hire Gabriel for a consulting engagement or as a fractional mobile lead. They arrive from LinkedIn, a referral, or an LLM answer, and give the page under a minute.

Secondary: recruiters and hiring managers scanning career history and keywords, mostly through the resume page and PDF.

## Product Purpose

Gabriel Taveira's personal site. It sells consulting (React Native / Expo architecture reviews, migrations, fractional leadership, design systems) and works as a public CV. Success is a qualified inbound message: someone with a real mobile problem emails or messages him on LinkedIn.

## Positioning

A hands-on mobile engineering lead who has done the hard migrations on a famous app (Coinbase Consumer App Infra: React Compiler, Expo Prebuild, new architecture) and has also managed up to 56 direct reports. Few consultants credibly hold both the architecture and the people side.

## Operating Context

Bilingual (en-US default, pt-BR). Visitors are usually on desktop during work hours, often on a phone when following a LinkedIn link. Brazil-based, remote with US teams.

## Capabilities and Constraints

- Next.js App Router on Vercel, next-intl, Tailwind v4 plus a hand-written CSS design layer.
- Copy lives in `src/i18n/locales/*.json`, locale-neutral data in `src/components/portfolio/data.ts`. All copy must stay server-rendered for SEO.
- `/[locale]/resume` and `/curriculum.pdf` are the ATS-facing resume and must stay light, single-column, system-font.
- `/llms.txt` and JSON-LD are generated from the same copy and data.
- Contact form hands off to the visitor's mail client (no backend).

## Brand Commitments

- Name: Gabriel Taveira. Voice: direct, warm, a little playful, first person.
- The handwritten marginalia notes ("yes, really", "season 3") are the one personality device Gabriel explicitly kept. Easter eggs, the live clock, and the decorative work-card flourishes were explicitly dropped.

## Evidence on Hand

- Real outcomes in copy: Coinbase coverage 25% → 45%, Groundswell 30% → 80%+, 16k lines of tests removed, 4 to 56 direct reports, D-ID app built from zero, Mozeic design system, Ionic → React Native migration for 90+ franchises.
- Talks (Brooklyn Brothers, TDC, Rocketseat), Space Cast podcast host, five hackathon placements 2019–2020.
- No headshot, client logos, testimonials, or pricing exist in the repo. Do not fabricate any of them.

## Product Principles

1. Lead with the problem he solves, then the proof. Name, then pitch, then evidence.
2. Every claim points at a real outcome or a public link.
3. Scannable in under a minute for a busy engineering leader.
4. Personality in the writing and the handwritten notes, not in decoration.
