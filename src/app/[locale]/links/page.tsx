import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { CHANNELS } from "@/components/portfolio/sections/contact/data";
import { ArrowUpRight, CHANNEL_ICONS } from "@/components/portfolio/ui/icons";
import { enter } from "@/components/portfolio/ui/motion";
import { cn } from "@/utils/cn";
import { routing } from "@/utils/routing";
import { SITE_URL } from "@/utils/site";

import styles from "./links.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "links" });
  const url = `${SITE_URL}/${locale}/links`;
  return {
    title: "Gabriel Taveira · Links",
    description: t("sub"),
    /** Without its own canonical it inherits the home page's from the layout. */
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/links`]),
      ),
    },
    openGraph: { url },
  };
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
      <header className={styles.head} {...enter()}>
        <a className={styles.hand} href={`/${locale}`}>
          <span aria-hidden="true">gt</span>
          <span className="visually-hidden">Gabriel Taveira</span>
        </a>
        <h1 className="t-h2">{t("title")}</h1>
        <p className="t-lede">{t("sub")}</p>
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
