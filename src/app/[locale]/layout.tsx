import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";

import { buildPortfolioJsonLd } from "@/components/portfolio/structured-data";
import { routing } from "@/utils/routing";

const SITE_URL = "https://gabrieltaveira.dev";
const GTM_ID = "G-1S8PR4TDYM";

/**
 * Dense, ATS-friendly description. Packs role, tenure, stack and location into
 * one sentence while staying under 160 characters for SERP truncation.
 */
const DESCRIPTION =
  "Gabriel Taveira · Engineering Lead with 9+ years in React Native, Expo and mobile architecture. Brazil-based (Ribeirão Preto), remote with US teams.";

const TITLE = "Gabriel Taveira · Engineering Lead";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/${routing.defaultLocale}`,
  };
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}/${l}`;
  }

  return {
    title: TITLE,
    description: DESCRIPTION,
    authors: [{ name: "Gabriel Taveira", url: SITE_URL }],
    creator: "Gabriel Taveira",
    publisher: "Gabriel Taveira",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages,
      types: {
        "application/pdf": [
          { url: "/curriculum.pdf", title: "Resume PDF" },
        ],
      },
    },
    openGraph: {
      type: "profile",
      url: `${SITE_URL}/${locale}`,
      siteName: "Gabriel Taveira",
      title: TITLE,
      description: DESCRIPTION,
      locale: locale.replace("-", "_"),
      images: ["/og-image.png"],
      firstName: "Gabriel",
      lastName: "Taveira",
      username: "gabrieltaveira",
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: ["/og-image.png"],
      creator: "@gabrieltaveira",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  const messages = await getMessages();
  const { person, profilePage } = buildPortfolioJsonLd(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Caveat:wght@500;600&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
        />
      </head>
      <GoogleTagManager gtmId={GTM_ID} />
      <Analytics />
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
