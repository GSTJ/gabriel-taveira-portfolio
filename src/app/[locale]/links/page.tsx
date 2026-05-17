import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CHANNELS } from "@/components/portfolio/data";
import {
  ArrowUpRight,
  BrandMark,
  Eyebrow,
  richTags,
} from "@/components/portfolio/Shared";
import { SOCIAL_ICONS } from "@/components/portfolio/SocialIcons";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("links");
  return {
    title: "Gabriel Taveira \u00B7 Links",
    description: t("sub"),
  };
}

export default async function LinksPage() {
  const t = await getTranslations("links");
  const tChannels = await getTranslations("contact.channels");

  return (
    <main className="ws-section ws-links">
      <div className="ws-links-inner">
        <header className="ws-links-head">
          <BrandMark size={32} withText={false} />
          <Eyebrow accent>{t("eyebrow")}</Eyebrow>
          <h1 className="ws-hero-title ws-links-title">
            {t.rich("title", richTags)}
          </h1>
          <p className="ws-links-sub">{t("sub")}</p>
        </header>

        <nav className="ws-contact-channels ws-links-list" aria-label="Links">
          {CHANNELS.map((c) => (
            <a
              key={c.id}
              className="ws-channel"
              href={c.url}
              target="_blank"
              rel="noreferrer"
            >
              {SOCIAL_ICONS[c.icon]}
              <span className="ws-channel-label">{tChannels(c.id)}</span>
              <span className="ws-channel-handle">{c.handle}</span>
              <ArrowUpRight size={14} />
            </a>
          ))}
        </nav>
      </div>
    </main>
  );
}
