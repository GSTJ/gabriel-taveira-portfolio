/**
 * Builds schema.org JSON-LD blobs for the portfolio so ATS, AI parsers,
 * Google Jobs, LinkedIn, Indeed and friends can ingest the page reliably.
 *
 * Pure functions, no React. Consumed by the locale layout and rendered
 * into the initial HTML via a `<script type="application/ld+json">` tag.
 */

import {
  CHANNELS,
  EMAIL_ADDR,
  GITHUB,
  LINKEDIN,
  MEDIUM,
  WORK,
} from "./data";
import { yearsInIndustry } from "./lifeline";

const SITE_URL = "https://gabrieltaveira.dev";
const KNOWS_ABOUT_CAP = 15;

/**
 * Extracts the primary company name from an eyebrow string like
 * "COINBASE · G2I · 2024 → 25" — first dot-separated token, normalised.
 */
function companyNameFromEyebrow(eyebrow: string): string {
  const first = eyebrow.split("·")[0]?.trim() ?? "";
  if (!first) return "";
  // Title-case the all-caps eyebrow (preserves accents like É via locale-lower).
  return first
    .toLocaleLowerCase("en-US")
    .replace(/\b\p{L}/gu, (c) => c.toLocaleUpperCase("en-US"));
}

/**
 * Aggregates unique tag tokens across all work items, capped to keep the
 * structured payload lean for crawlers.
 */
function knowsAboutFromWork(): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const item of WORK) {
    for (const tag of item.tags) {
      if (seen.has(tag)) continue;
      seen.add(tag);
      ordered.push(tag);
      if (ordered.length >= KNOWS_ABOUT_CAP) return ordered;
    }
  }
  return ordered;
}

/**
 * Each work item becomes an Organization. We dedupe by name + url so that
 * multiple stints at the same company (or via the same agency) don't repeat.
 */
function worksForFromWork(): Array<{
  "@type": "Organization";
  name: string;
  url: string;
}> {
  const out: Array<{ "@type": "Organization"; name: string; url: string }> = [];
  const seen = new Set<string>();
  for (const item of WORK) {
    const name = companyNameFromEyebrow(item.eyebrow);
    if (!name) continue;
    const key = `${name}|${item.href}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ "@type": "Organization", name, url: item.href });
  }
  return out;
}

function emailFromChannels(): string | undefined {
  const email = CHANNELS.find((c) => c.id === "email");
  if (!email) return undefined;
  return EMAIL_ADDR;
}

export type PortfolioJsonLd = {
  person: Record<string, unknown>;
  profilePage: Record<string, unknown>;
};

export function buildPortfolioJsonLd(locale: string): PortfolioJsonLd {
  const years = yearsInIndustry();
  const localeUrl = `${SITE_URL}/${locale}`;

  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gabriel Taveira",
    givenName: "Gabriel",
    familyName: "Taveira",
    jobTitle: "Engineering Lead",
    description: `Engineering Lead with ${years}+ years building React Native, Expo, and design-system-driven mobile platforms; leads remote teams shipping for Coinbase, Meta/Kustomer, D-ID and AB InBev.`,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    sameAs: [LINKEDIN, GITHUB, MEDIUM],
    worksFor: worksForFromWork(),
    knowsAbout: knowsAboutFromWork(),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ribeirão Preto",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    nationality: "BR",
  };

  const email = emailFromChannels();
  if (email) person.email = `mailto:${email}`;

  const profilePage: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: localeUrl,
    inLanguage: locale,
    name: "Gabriel Taveira · Engineering Lead",
    mainEntity: person,
  };

  return { person, profilePage };
}
