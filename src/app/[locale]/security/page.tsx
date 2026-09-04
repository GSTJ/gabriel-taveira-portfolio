import type { Metadata } from "next";

import { SecurityPortfolio } from "@/components/portfolio/security-page";
import { routing } from "@/utils/routing";
import { SITE_URL } from "@/utils/site";

const COPY = {
  "en-US": {
    title: "Gabriel Taveira · Application Security",
    description:
      "Public application security work across identity, authorization, uploads, cloud boundaries, CI/CD, and software supply chains.",
  },
  "pt-BR": {
    title: "Gabriel Taveira · Application Security",
    description:
      "Trabalho público em segurança de aplicações, cobrindo identidade, autorização, uploads, cloud, CI/CD e supply chain.",
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
