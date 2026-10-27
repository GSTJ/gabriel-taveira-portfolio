import type { Metadata, Viewport } from "next";

import { notFound } from "next/navigation";

import { Analytics } from "@vercel/analytics/react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ObservabilityProviders } from "@/components/observability/providers";
import { yearsInIndustry } from "@/components/portfolio/lifeline";
import { BODY_SCRIPT, HEAD_SCRIPT } from "@/components/portfolio/ui/boot";
import { THEME_COLORS } from "@/components/portfolio/ui/theme";
import { pageMetadata } from "@/utils/metadata";
import { routing } from "@/utils/routing";
import { SITE_URL } from "@/utils/site";

/**
 * Every page re-renders at least daily, so the footer's year and anything
 * counted from today (years in the industry, the work axis) roll over on
 * their own.
 */
export const revalidate = 86400;

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

  const home = await pageMetadata({ locale, title, description });

  /** The home page's set. Every child page builds its own with pageMetadata. */
  return {
    ...home,
    authors: [{ name: "Gabriel Taveira", url: SITE_URL }],
    creator: "Gabriel Taveira",
    publisher: "Gabriel Taveira",
    alternates: {
      ...home.alternates,
      types: {
        "application/pdf": [{ url: "/curriculum.pdf", title: "Resume PDF" }],
      },
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

  /*
   * `suppressHydrationWarning` covers only <html>: the head script adds `js`
   * and `data-theme` to it before React hydrates.
   */
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          // eslint-disable-next-line react/no-danger -- must run before first paint, so it cannot wait for a bundle. A static string from boot.ts, no input.
          dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }}
        />
        {/* Ahrefs Web Analytics: cookieless, the data-key is public. */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="gT3X5WYXoMBK9s8qwl+74Q"
          async
        />
      </head>
      <body>
        <ObservabilityProviders>{children}</ObservabilityProviders>
        <script
          // eslint-disable-next-line react/no-danger -- the reveal observer runs as soon as the HTML is parsed, not after hydration. A static string from boot.ts, no input.
          dangerouslySetInnerHTML={{ __html: BODY_SCRIPT }}
        />
        <Analytics />
      </body>
    </html>
  );
};

export default LocaleLayout;
