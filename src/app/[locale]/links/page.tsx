import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { CHANNELS } from "@/components/portfolio/data";
import { ArrowUpRight, richTags } from "@/components/portfolio/shared";
import { SOCIAL_ICONS } from "@/components/portfolio/social-icons";
import { routing } from "@/utils/routing";
import { SITE_URL } from "@/utils/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "links" });
  const url = `${SITE_URL}/${locale}/links`;
  return {
    title: "Gabriel Taveira \u00B7 Links",
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

const LinksPage = async () => {
  const t = await getTranslations("links");
  const tChannels = await getTranslations("contact.channels");

  return (
    <main className="gt-face gt-links">
      <header>
        <h1 className="gt-contact-title">{t.rich("title", richTags)}</h1>
        <p className="gt-contact-sub">{t("sub")}</p>
      </header>
      <ul className="gt-channels">
        {CHANNELS.map((c) => (
          <li key={c.id}>
            <a href={c.url} target="_blank" rel="noreferrer">
              {SOCIAL_ICONS[c.icon]}
              <span className="gt-channel-label">{tChannels(c.id)}</span>
              <span className="gt-channel-handle">{c.handle}</span>
              <ArrowUpRight size={14} />
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default LinksPage;
