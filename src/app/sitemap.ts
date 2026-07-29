import type { MetadataRoute } from "next";

import { routing } from "@/utils/routing";
import { SITE_URL } from "@/utils/site";

/** The hreflang cluster for one path, every locale pointing at every other. */
const languages = (path: string) =>
  Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  );

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    routes.push(
      {
        url: `${SITE_URL}/${locale}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: locale === routing.defaultLocale ? 1 : 0.8,
        alternates: { languages: languages("") },
      },
      {
        url: `${SITE_URL}/${locale}/links`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: { languages: languages("/links") },
      },
    );
  }

  return routes;
}
