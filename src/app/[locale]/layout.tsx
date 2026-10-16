import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { ObservabilityProviders } from "@/components/observability/providers";
import { yearsInIndustry } from "@/components/portfolio/lifeline";
import {
  buildPortfolioJsonLd,
  serializeJsonLd,
} from "@/components/portfolio/structured-data";
import { routing } from "@/utils/routing";
import { SITE_URL } from "@/utils/site";

const GTM_ID = "G-1S8PR4TDYM";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
  const messages = await getMessages();
  const jsonLd = buildPortfolioJsonLd(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line nextjs/no-page-custom-font -- the rule is
            about a font link living in a single Pages Router page; this is the
            App Router root layout for every route under /[locale], so the
            stylesheet is shared exactly as the rule wants it to be. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Caveat:wght@500;600&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap"
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
        <ObservabilityProviders>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ObservabilityProviders>
      </body>
    </html>
  );
};

export default LocaleLayout;
