import type { Metadata } from "next";

import { SecurityPortfolio } from "@/components/portfolio/security-page";
import { routing } from "@/utils/routing";
import { SITE_URL } from "@/utils/site";

const COPY = {
  "en-US": {
    title: "Gabriel Taveira · Application Security",
    description:
      "Defensive application security work across identity, authorization, untrusted uploads, and cloud boundaries.",
  },
  "pt-BR": {
    title: "Gabriel Taveira · Application Security",
    description:
      "Trabalho defensivo em segurança de aplicações, cobrindo identidade, autorização, uploads não confiáveis e fronteiras de cloud.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const selected = locale === "pt-BR" ? COPY["pt-BR"] : COPY["en-US"];
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, `${SITE_URL}/${item}/security`]),
  );

  return {
    ...selected,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/security`,
      languages: {
        ...languages,
        "x-default": `${SITE_URL}/${routing.defaultLocale}/security`,
      },
    },
    openGraph: {
      type: "profile",
      url: `${SITE_URL}/${locale}/security`,
      siteName: "Gabriel Taveira",
      ...selected,
    },
    twitter: {
      card: "summary_large_image",
      ...selected,
      creator: "@gabrieltaveira",
    },
  };
}

const SecurityPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  return <SecurityPortfolio locale={locale} />;
};

export default SecurityPage;
