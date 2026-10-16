import type { Metadata } from "next";

import { Archivo, Caveat } from "next/font/google";
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
import { cn } from "@/utils/cn";
import { routing } from "@/utils/routing";
import { SITE_URL } from "@/utils/site";

const GTM_ID = "G-1S8PR4TDYM";

/**
 * Self-hosted at build time. Archivo is a grotesque in the Akzidenz line the
 * Braun manuals were set in; it carries every word on the page. Caveat is only
 * for the handwritten margin notes.
 */
// eslint-disable-next-line new-cap -- next/font loaders are plain functions named after the font, not constructors.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
// eslint-disable-next-line new-cap -- same as above.
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-hand",
  display: "swap",
});

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
    <html lang={locale} className={cn(archivo.variable, caveat.variable)}>
      <head>
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
