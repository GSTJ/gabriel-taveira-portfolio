/**
 * Builds schema.org JSON-LD blobs for the portfolio so ATS, AI parsers,
 * Google Jobs, LinkedIn, Indeed and friends can ingest the page reliably.
 *
 * Pure functions, no React. Consumed by the locale layout and rendered
 * into the initial HTML via a `<script type="application/ld+json">` tag.
 */

import { SITE_URL } from "@/utils/site";

import { CHANNELS, EMAIL_ADDR, GITHUB, LINKEDIN, MEDIUM, WORK } from "./data";
import { yearsInIndustry } from "./lifeline";

const KNOWS_ABOUT_CAP = 15;

/**
 * Extracts the primary company name from an eyebrow string like
 * "COINBASE · G2I · 2024 → 25" — first dot-separated token, normalised.
 */
const companyNameFromEyebrow = (eyebrow: string): string => {
  const first = eyebrow.split("·")[0]?.trim() ?? "";
  if (!first) return "";
  // Title-case the all-caps eyebrow (preserves accents like É via locale-lower).
  return first
    .toLocaleLowerCase("en-US")
    .replaceAll(/\b\p{L}/gu, (c) => c.toLocaleUpperCase("en-US"));
};

/**
 * Aggregates unique tag tokens across all work items, capped to keep the
 * structured payload lean for crawlers. A Set preserves insertion order, so
 * this is the same first-seen-wins ordering the nested loop produced.
 */
const knowsAboutFromWork = (): string[] =>
  [...new Set(WORK.flatMap((item) => item.tags))].slice(0, KNOWS_ABOUT_CAP);

type WorksForEntry = {
  "@type": "Organization";
  name: string;
  url: string;
};

/**
 * Each work item becomes an Organization. We dedupe by name + url so that
 * multiple stints at the same company (or via the same agency) don't repeat.
 */
const worksForFromWork = (): WorksForEntry[] => {
  const seen = new Set<string>();

  return WORK.flatMap((item): WorksForEntry[] => {
    const name = companyNameFromEyebrow(item.eyebrow);
    if (!name) return [];

    const key = `${name}|${item.href}`;
    if (seen.has(key)) return [];

    seen.add(key);
    return [{ "@type": "Organization", name, url: item.href }];
  });
};

const emailFromChannels = (): string | undefined =>
  CHANNELS.some((c) => c.id === "email") ? EMAIL_ADDR : undefined;

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

/**
 * `JSON.stringify` escapes quotes and backslashes but leaves `<` alone, so a
 * value containing a closing script tag ends the tag it is sitting inside and
 * everything after it gets parsed as HTML.
 *
 * Nothing hostile can reach that today: every input is a module constant, and
 * `locale` is checked against `routing.locales` in `[locale]/layout.tsx`
 * before this runs. That guard lives in another file though, and nothing
 * enforces the ordering. The escape is valid JSON and parses straight back to
 * `<`, so it costs nothing and stops the sink depending on a check it cannot
 * see.
 */
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replaceAll("<", String.raw`\u003c`);
}
