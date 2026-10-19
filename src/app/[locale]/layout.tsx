import type { Metadata, Viewport } from "next";

import { notFound } from "next/navigation";

import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ObservabilityProviders } from "@/components/observability/providers";
import { yearsInIndustry } from "@/components/portfolio/lifeline";
import {
  buildPortfolioJsonLd,
  serializeJsonLd,
} from "@/components/portfolio/structured-data";
import { BODY_SCRIPT, HEAD_SCRIPT } from "@/components/portfolio/ui/boot";
import { THEME_COLORS } from "@/components/portfolio/ui/theme";
import { cn } from "@/utils/cn";
import { routing } from "@/utils/routing";
import { SITE_URL } from "@/utils/site";

import { bricolage, caveat } from "../fonts";

const GTM_ID = "G-1S8PR4TDYM";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Per-scheme browser chrome. An explicit theme repoints both in boot.ts. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  /** Per locale, and kept under 160 characters for SERP truncation. */
  const title = t("title");
  const description = t("description", { years: yearsInIndustry() });

  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/${routing.defaultLocale}`,
  };
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}/${l}`;
  }

  return {
    title,
    description,
    authors: [{ name: "Gabriel Taveira", url: SITE_URL }],
    creator: "Gabriel Taveira",
    publisher: "Gabriel Taveira",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages,
      types: {
        "application/pdf": [{ url: "/curriculum.pdf", title: "Resume PDF" }],
      },
    },
    openGraph: {
      type: "profile",
      url: `${SITE_URL}/${locale}`,
      siteName: "Gabriel Taveira",
      title,
      description,
      locale: locale.replace("-", "_"),
      images: ["/og-image.png"],
      firstName: "Gabriel",
      lastName: "Taveira",
      username: "gabrieltaveira",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      creator: "@gabrieltaveira",
    },
  };
}

const LocaleLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  // Lets every page under this layout prerender instead of reading headers.
  setRequestLocale(locale);
  const jsonLd = buildPortfolioJsonLd(locale);

  /*
   * `suppressHydrationWarning` covers only <html>: the head script adds `js`
   * and `data-theme` to it before React hydrates.
   */
  return (
    <html
      lang={locale}
      className={cn(bricolage.variable, caveat.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          // eslint-disable-next-line react/no-danger -- must run before first paint, so it cannot wait for a bundle. A static string from boot.ts, no input.
          dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON-LD has no React representation, so a raw script body is the only way to emit it. serializeJsonLd escapes `<` so the payload cannot close this tag.
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <GoogleTagManager gtmId={GTM_ID} />
      <Analytics />
      <body>
        <ObservabilityProviders>{children}</ObservabilityProviders>
        <script
          // eslint-disable-next-line react/no-danger -- the reveal observer runs as soon as the HTML is parsed, not after hydration. A static string from boot.ts, no input.
          dangerouslySetInnerHTML={{ __html: BODY_SCRIPT }}
        />
      </body>
    </html>
  );
};

export default LocaleLayout;
