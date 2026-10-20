import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { CHANNELS } from "@/components/portfolio/sections/contact/data";
import { JsonLd } from "@/components/portfolio/structured-data";
import { ArrowUpRight, CHANNEL_ICONS } from "@/components/portfolio/ui/icons";
import { enter } from "@/components/portfolio/ui/motion";
import { cn } from "@/utils/cn";
import { pageMetadata } from "@/utils/metadata";

import { BrandFonts } from "../../brand-fonts";

import styles from "./links.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "links" });
  return pageMetadata({
    locale,
    path: "/links",
    title: "Gabriel Taveira · Links",
    description: t("sub"),
  });
}

const LinksPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("links");
  const tChannels = await getTranslations("contact.channels");

  return (
    <main id="main" className={cn("wrap", styles.page)}>
      <BrandFonts />
      <JsonLd
        locale={locale}
        path="/links"
        type="WebPage"
        name="Gabriel Taveira · Links"
      />
      <header className={styles.head}>
        <a className={styles.hand} href={`/${locale}`}>
          <span aria-hidden="true">gt</span>
          <span className="visually-hidden">Gabriel Taveira</span>
        </a>
        <h1 className="t-h2">{t("title")}</h1>
        <p className="t-lede" {...enter()}>
          {t("sub")}
        </p>
      </header>
      <nav aria-label="Links">
        <ul className={styles.list}>
          {CHANNELS.map((channel, index) => (
            <li key={channel.id} {...enter(80 + index * 60)}>
              <a href={channel.url}>
                <span className={styles.icon}>{CHANNEL_ICONS[channel.id]}</span>
                <span className={styles.label}>{tChannels(channel.id)}</span>
                <span className="t-meta">{channel.handle}</span>
                <ArrowUpRight />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
};

export default LinksPage;
