/**
 * schema.org JSON-LD so ATS, AI parsers, Google, LinkedIn and friends can
 * ingest each page reliably. Every page shares one Person, by `@id`, and adds
 * its own page node with its own URL and language. All text comes from the
 * page's locale.
 */

import { getTranslations } from "next-intl/server";

import { ogImageUrl } from "@/utils/metadata";
import { SITE_URL } from "@/utils/site";

import { yearsInIndustry } from "./lifeline";
import { EMAIL_ADDR, GITHUB, LINKEDIN, MEDIUM, SKILLS } from "./profile";
import { AWARDS } from "./sections/notes/data";
import { SERVICES } from "./sections/services/data";
import { WORK } from "./sections/work/data";

const PERSON_ID = `${SITE_URL}/#person`;

type PageType = "ProfilePage" | "WebPage";

export async function buildJsonLd({
  locale,
  path = "",
  type,
  name,
}: {
  locale: string;
  path?: string;
  /** `ProfilePage` for pages about Gabriel himself, `WebPage` otherwise. */
  type: PageType;
  name: string;
}) {
  const t = await getTranslations({ locale });
  const url = `${SITE_URL}/${locale}${path}`;

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Gabriel Taveira",
    givenName: "Gabriel",
    familyName: "Taveira",
    jobTitle: t("meta.jobTitle"),
    description: t("resume.summary", { years: yearsInIndustry() }),
    url: SITE_URL,
    image: ogImageUrl(locale),
    email: `mailto:${EMAIL_ADDR}`,
    sameAs: [LINKEDIN, GITHUB, MEDIUM],
    /**
     * `worksFor` means a current employer, and the only current item is
     * independent consulting, so past jobs go under `alumniOf`, which
     * schema.org allows for any Organization.
     */
    worksFor: {
      "@type": "Organization",
      name: t("meta.worksFor"),
      url: SITE_URL,
    },
    alumniOf: WORK.filter((item) => item.id !== "consulting").map((item) => ({
      "@type": "Organization",
      name: item.orgs[0],
      url: item.href,
    })),
    knowsAbout: SKILLS,
    knowsLanguage: ["en", "pt-BR"],
    award: AWARDS.map((a) => `${t(`notes.awards.items.${a.id}`)} (${a.year})`),
    /** The consulting offers, so a parser can answer "what can I hire him for". */
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: t(`services.items.${s.id}.title`),
        description: t(`services.items.${s.id}.body`),
        provider: { "@id": PERSON_ID },
        areaServed: "Worldwide",
      },
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ribeirão Preto",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    nationality: "BR",
  };

  const page = {
    "@type": type,
    "@id": `${url}#page`,
    url,
    inLanguage: locale,
    name,
    [type === "ProfilePage" ? "mainEntity" : "about"]: { "@id": PERSON_ID },
  };

  return { "@context": "https://schema.org", "@graph": [person, page] };
}

/**
 * `JSON.stringify` escapes quotes and backslashes but leaves `<` alone, so a
 * value containing a closing script tag ends the tag it is sitting inside and
 * everything after it gets parsed as HTML. Every input is a module constant
 * or a locale string today; the escape is valid JSON and parses straight back
 * to `<`, so it costs nothing and stops the sink depending on that.
 */
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replaceAll("<", String.raw`\u003c`);
}

/** The page's JSON-LD, rendered into the first HTML. */
export const JsonLd = async (props: Parameters<typeof buildJsonLd>[0]) => (
  <script
    type="application/ld+json"
    // eslint-disable-next-line react/no-danger -- JSON-LD has no React representation, so a raw script body is the only way to emit it. serializeJsonLd escapes `<` so the payload cannot close this tag.
    dangerouslySetInnerHTML={{
      __html: serializeJsonLd(await buildJsonLd(props)),
    }}
  />
);
