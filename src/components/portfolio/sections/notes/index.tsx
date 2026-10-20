import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../../lifeline";
import { ArrowUpRight } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import { reveal } from "../../ui/motion";
import {
  ARTICLES,
  AWARDS,
  EPISODES,
  MAGIC_MODAL,
  NOW,
  NOW_UPDATED,
  PUBLICATIONS,
  SHIPPED,
  SHIPPED_READ,
  SPACE_CAST_READ,
  SPACE_CAST_TOTALS,
  TALKS,
  episodeUrl,
} from "./data";

import styles from "./notes.module.css";

type T = Awaited<ReturnType<typeof getTranslations<"notes">>>;

const shortDate = (iso: string, locale: string) =>
  new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

/** A link whose arrow stays glued to the last word when the text wraps. */
const Out = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) => (
  <a className={cn("link-arrow", styles.out, className)} href={href}>
    {children}
    <ArrowUpRight />
  </a>
);

/** The `t.rich` tag for the library name in the writing note. */
const magicModalLink = (chunks: ReactNode) => (
  <a className={cn("t-mono", styles.pkgLink)} href={MAGIC_MODAL.href}>
    {chunks}
  </a>
);

/** The library's first name, kept on one line. */
const oldName = (chunks: ReactNode) => (
  <span className={cn("t-mono", styles.nowrap)}>{chunks}</span>
);

const Now = ({ t, locale }: { t: T; locale: string }) => (
  <section className={styles.now} aria-labelledby="notes-now">
    <div className={styles.head} {...reveal()}>
      <h3 id="notes-now" className="t-title">
        {t("now.title")}
      </h3>
      <p className="t-meta">
        {t("now.updated", { date: currentMonthLabel(locale, NOW_UPDATED) })}
      </p>
    </div>
    <dl className={styles.nowRows}>
      {NOW.map((item, i) => (
        <div key={item.id} className={styles.nowRow} {...reveal(i)}>
          <dt className="t-meta">{t(`now.items.${item.id}.chip`)}</dt>
          <dd className={styles.nowMain}>
            {item.href ? (
              <Out href={item.href} className={styles.nowTitle}>
                {t(`now.items.${item.id}.title`)}
              </Out>
            ) : (
              <span className={styles.nowTitle}>
                {t(`now.items.${item.id}.title`)}
              </span>
            )}
            {item.store ? (
              <Out
                href={item.store.href}
                className={cn("t-meta", styles.store)}
              >
                {t("now.live", { date: shortDate(item.store.since, locale) })}
              </Out>
            ) : null}
          </dd>
          <dd className="t-small">{t(`now.items.${item.id}.body`)}</dd>
        </div>
      ))}
    </dl>
  </section>
);

const Talks = ({ t }: { t: T }) => (
  <section className={styles.block} aria-labelledby="notes-talks">
    <div className={styles.head} {...reveal()}>
      <h3 id="notes-talks" className="t-title">
        {t("talks.title")}
      </h3>
      <p className="t-small">{t("talks.sub")}</p>
    </div>
    <ol className={styles.rows}>
      {TALKS.map((talk, i) => (
        <li key={talk.id} className={styles.talk} {...reveal(i)}>
          <span className="t-meta num">{talk.date}</span>
          <div>
            <p className={styles.rowTitle}>
              {t(`talks.items.${talk.id}.title`)}
            </p>
            <p className="t-meta">
              {t(`talks.items.${talk.id}.venue`)} ·{" "}
              {t(`talks.items.${talk.id}.city`)} ·{" "}
              <abbr title={talk.lang === "PT" ? "Português" : "English"}>
                {talk.lang}
              </abbr>
            </p>
            <p className="t-small">{t(`talks.items.${talk.id}.description`)}</p>
            {talk.href ? (
              <a className={styles.slide} href={talk.href}>
                {talk.image ? (
                  <Image
                    src={talk.image}
                    width={640}
                    height={360}
                    sizes="(width < 1000px) 80vw, 300px"
                    alt=""
                    unoptimized
                  />
                ) : null}
                <span className={cn("link-arrow t-small", styles.out)}>
                  {t("talks.slides", { count: talk.slides ?? 0 })}
                  <ArrowUpRight />
                </span>
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  </section>
);

/**
 * All forty episodes as a contact sheet, in airing order, grayscale so the pen
 * stays the only color. They land one week at a time the first time the sheet
 * is in view; the three he isn't on stay faded. Pointing at one names it.
 */
const Podcast = ({ t, locale }: { t: T; locale: string }) => (
  <section className={styles.block} aria-labelledby="notes-media">
    <h3 id="notes-media" className="t-title" {...reveal()}>
      {t("publications.title")}
    </h3>
    <div className={styles.stack} {...reveal(1)}>
      <p className={styles.feature}>
        <Marginalia placement="inline" note={t("publications.ended")}>
          {t("publications.featureTitle")}
        </Marginalia>
      </p>
      <p className="t-small">{t("publications.featureSub")}</p>
    </div>
    <div className={styles.sheet} data-draw="" suppressHydrationWarning>
      <ol className={styles.tiles} aria-label={t("publications.sheetLabel")}>
        {EPISODES.map((ep, i) => (
          <li key={ep.id} style={{ "--n": i } as CSSProperties}>
            <a
              className={styles.tile}
              href={episodeUrl(ep.id)}
              data-host={ep.host === false ? "no" : undefined}
            >
              <Image
                src={`/notes/space-cast/${ep.id}.webp`}
                width={320}
                height={180}
                sizes="(width < 1000px) 20vw, 72px"
                alt=""
                unoptimized
              />
              <span className={cn("t-meta", styles.cap)}>
                <span className={styles.capTitle} lang="pt-BR">
                  {ep.title}
                </span>{" "}
                <span className="num">
                  {t("publications.episode", {
                    n: ep.n,
                    date: shortDate(ep.date, locale),
                  })}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
      <p className={cn("t-meta", styles.capDefault)}>
        {t("publications.sheetCaption")}
      </p>
    </div>
    <div className={styles.stack} {...reveal(2)}>
      <p className="t-small">
        {t("publications.stats", {
          hours: SPACE_CAST_TOTALS.hours,
          views: SPACE_CAST_TOTALS.views.toLocaleString(locale),
        })}{" "}
        <span className="t-meta">
          {t("publications.source", {
            date: shortDate(SPACE_CAST_READ, locale),
          })}
        </span>
      </p>
      <p className={styles.links}>
        <Out href={PUBLICATIONS.playlist} className="t-small">
          {t("publications.playlist")}
        </Out>
        <Out href={PUBLICATIONS.spotify} className="t-small">
          {t("publications.spotify")}
        </Out>
      </p>
    </div>
  </section>
);

const Writing = ({ t, locale }: { t: T; locale: string }) => (
  <section className={styles.block} aria-labelledby="notes-writing">
    <div className={styles.head} {...reveal()}>
      <h3 id="notes-writing" className="t-title">
        {t("writing.title")}
      </h3>
      <p className="t-small">{t("writing.sub")}</p>
    </div>
    <ol className={styles.rows} {...reveal(1)}>
      {ARTICLES.map((article) => (
        <li key={article.id} className={styles.article}>
          <Out href={article.href} className={styles.articleTitle}>
            <span lang={article.lang === "PT" ? "pt-BR" : "en"}>
              {t(`writing.items.${article.id}`)}
            </span>
          </Out>
          <p className="t-meta">
            <time className="num" dateTime={article.date}>
              {shortDate(article.date, locale)}
            </time>{" "}
            · {article.outlet} ·{" "}
            <abbr title={article.lang === "PT" ? "Português" : "English"}>
              {article.lang}
            </abbr>
          </p>
        </li>
      ))}
    </ol>
    <div className={styles.stack} {...reveal(2)}>
      <p className="t-small">
        {t.rich("writing.became", {
          stars: MAGIC_MODAL.stars.toLocaleString(locale),
          downloads: MAGIC_MODAL.downloads.toLocaleString(locale),
          link: magicModalLink,
          old: oldName,
        })}
      </p>
      <p className="t-meta">
        {t("writing.source", { date: shortDate(MAGIC_MODAL.read, locale) })}
      </p>
      <Out href={PUBLICATIONS.medium} className="t-small">
        {t("writing.more")}
      </Out>
    </div>
  </section>
);

const Shipped = ({ t, locale }: { t: T; locale: string }) => (
  <section className={styles.block} aria-labelledby="notes-shipped">
    <div className={styles.head} {...reveal()}>
      <h3 id="notes-shipped" className="t-title">
        {t("shipped.title")}
      </h3>
      <p className="t-meta">
        {t("shipped.source", { date: shortDate(SHIPPED_READ, locale) })}
      </p>
    </div>
    <ol className={styles.rows}>
      {SHIPPED.map((item, i) => (
        <li key={item.id} {...reveal(i)}>
          <a className={styles.ship} href={item.href}>
            <time className="t-meta num" dateTime={item.date}>
              {shortDate(item.date, locale)}
            </time>
            <span className={cn("t-mono", styles.pkg)}>
              <span className={styles.pkgName}>{item.name}</span>
              <span className={styles.version}>@{item.version}</span>
              <ArrowUpRight />
            </span>
            <span className="t-small">{t(`shipped.items.${item.id}`)}</span>
          </a>
        </li>
      ))}
    </ol>
  </section>
);

const Awards = ({ t }: { t: T }) => (
  <section
    className={styles.awards}
    aria-labelledby="notes-awards"
    {...reveal()}
  >
    <h3 id="notes-awards" className="t-small">
      {t("awards.title")}
    </h3>
    <p className="t-meta">{t("awards.sub")}</p>
    <ul className={styles.awardList}>
      {AWARDS.map((award) => (
        <li key={award.id} className="t-meta">
          <span className="num">{award.year}</span>{" "}
          {t(`awards.items.${award.id}`)},{" "}
          {t(`awards.positions.${award.position}`)}
        </li>
      ))}
    </ul>
  </section>
);

/** Now, talks, Space Cast, recent releases and writing, hackathons last. */
export const NotesSection = async () => {
  const t = await getTranslations("notes");
  const locale = await getLocale();

  return (
    <section id="notes" className="section wrap" aria-labelledby="notes-title">
      <div className="section-head" {...reveal()}>
        <h2 id="notes-title" className="t-h2">
          {t("title")}
        </h2>
      </div>

      <div className={styles.layout}>
        <Now t={t} locale={locale} />
        <div className={styles.trio}>
          <Talks t={t} />
          <Podcast t={t} locale={locale} />
          <div className={styles.col}>
            <Shipped t={t} locale={locale} />
            <Writing t={t} locale={locale} />
          </div>
        </div>
        <Awards t={t} />
      </div>
    </section>
  );
};
