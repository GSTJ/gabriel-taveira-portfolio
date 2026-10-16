/**
 * Builds schema.org JSON-LD blobs for the portfolio so ATS, AI parsers,
 * Google Jobs, LinkedIn, Indeed and friends can ingest the page reliably.
 *
 * Pure functions, no React. Consumed by the locale layout and rendered
 * into the initial HTML via a `<script type="application/ld+json">` tag.
 */

import en from "@/i18n/locales/en-US.json";
import { SITE_URL } from "@/utils/site";

import {
  AWARDS,
  EMAIL_ADDR,
  GITHUB,
  LINKEDIN,
  MEDIUM,
  SERVICES,
  SKILLS,
  WORK,
} from "./data";
import { yearsInIndustry } from "./lifeline";

const PERSON_ID = `${SITE_URL}/#person`;

/**
 * Past employers. `worksFor` means a current employer, and the only current
 * item is independent consulting, so the rest go under `alumniOf`, which
 * schema.org allows for any Organization.
 */
const pastEmployers = () =>
  WORK.filter((item) => item.id !== "consulting").map((item) => ({
    "@type": "Organization",
    name: item.orgs[0],
    url: item.href,
  }));

/** The consulting offers, so a parser can answer "what can I hire him for". */
const offers = () =>
  SERVICES.map((id) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: en.services.items[id].title,
      description: en.services.items[id].body,
      provider: { "@id": PERSON_ID },
      areaServed: "Worldwide",
    },
  }));

/**
 * One `@graph` so the ProfilePage points at the Person by `@id` instead of
 * embedding a second copy of it.
 */
export function buildPortfolioJsonLd(locale: string) {
  const years = yearsInIndustry();

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Gabriel Taveira",
    givenName: "Gabriel",
    familyName: "Taveira",
    jobTitle: "Fractional Mobile Engineering Lead",
    description: `Fractional mobile engineering lead and React Native / Expo consultant with ${years}+ years of experience. Led teams of up to 56 direct reports and shipped for Coinbase, D-ID, Meta/Kustomer and AB InBev. Open to consulting engagements.`,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    email: `mailto:${EMAIL_ADDR}`,
    sameAs: [LINKEDIN, GITHUB, MEDIUM],
    worksFor: {
      "@type": "Organization",
      name: "Independent consulting",
      url: SITE_URL,
    },
    alumniOf: pastEmployers(),
    knowsAbout: SKILLS,
    knowsLanguage: ["en", "pt-BR"],
    award: AWARDS.map((a) => `${en.awards.items[a.id]} (${a.year})`),
    makesOffer: offers(),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ribeirão Preto",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    nationality: "BR",
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/${locale}#profile`,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    name: en.meta.title,
    mainEntity: { "@id": PERSON_ID },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, profilePage],
  };
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
