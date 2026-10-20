import type { Metadata } from "next";

import { setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/portfolio/structured-data";
import { SecurityPortfolio } from "@/components/security/security-page";
import { pageMetadata } from "@/utils/metadata";

import { BrandFonts } from "../../brand-fonts";

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

  return {
    ...(await pageMetadata({ locale, path: "/security", ...selected })),
    robots: {
      index: false,
      follow: false,
    },
  };
}

const SecurityPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const selected = locale === "pt-BR" ? COPY["pt-BR"] : COPY["en-US"];

  return (
    <>
      <BrandFonts />
      <JsonLd
        locale={locale}
        path="/security"
        type="WebPage"
        name={selected.title}
      />
      <SecurityPortfolio locale={locale} />
    </>
  );
};

export default SecurityPage;
