import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { routing } from "./routing";
import { SITE_URL } from "./site";

/** The share card for a locale, rendered by `scripts/get-og.js`. */
export const ogImageUrl = (locale: string) => `${SITE_URL}/og/${locale}.png`;

/**
 * Canonical, hreflang, Open Graph and Twitter for one page. Next replaces a
 * parent's `openGraph` or `twitter` object wholesale when a child sets either,
 * so every page builds the full set here instead of patching one field.
 */
export async function pageMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: string;
  /** After the locale, with a leading slash: "/resume". Empty for home. */
  path?: string;
  title: string;
  description: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const url = `${SITE_URL}/${locale}${path}`;
  const image = {
    url: ogImageUrl(locale),
    width: 1200,
    height: 630,
    alt: `Gabriel Taveira, ${t("jobTitle")}`,
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "x-default": `${SITE_URL}/${routing.defaultLocale}${path}`,
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    },
    openGraph: {
      type: "profile",
      url,
      siteName: "Gabriel Taveira",
      title,
      description,
      locale: locale.replace("-", "_"),
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => l.replace("-", "_")),
      images: [image],
      firstName: "Gabriel",
      lastName: "Taveira",
      username: "gabrieltaveira",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@gabrieltaveira",
    },
  };
}
