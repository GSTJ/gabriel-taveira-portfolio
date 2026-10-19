import type { ReactNode } from "react";

import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../../lifeline";
import { MEDIUM } from "../../profile";
import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import {
  ARTICLES,
  AWARDS,
  EPISODES,
  MAGIC_MODAL,
  NOW,
  NOW_UPDATED,
  SHIPPED,
  SHIPPED_READ,
  SPACE_CAST_LINKS,
  SPACE_CAST_READ,
  TALKS,
} from "./data";
import { EpisodeStrip } from "./episode-strip";

import styles from "./notes.module.css";

type T = Awaited<ReturnType<typeof getTranslations<"notes">>>;
type Props = { t: T; locale: string };

const date = (iso: string, locale: string, year = true) =>
  new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    ...(year ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });

/** Portuguese titles stay in Portuguese; say so, so a screen reader reads them right. */
const LANG_TAG = { PT: "pt-BR", EN: "en" } as const;
const langOf = (lang: "PT" | "EN", locale: string) =>
  locale.startsWith(LANG_TAG[lang].slice(0, 2)) ? undefined : LANG_TAG[lang];

const richTags = {
  code: (chunks: ReactNode) => (
    <code className={cn("t-mono", styles.pkg)}>{chunks}</code>
  ),
};

const Now = ({ t, locale }: Props) => (
  <section className={styles.now} aria-labelledby="notes-now">
    <div className={styles.nowHead} {...reveal()}>
      <h3 id="notes-now" className="t-title">
        {t("now.title")}
      </h3>
      <p className="t-meta">
        {t("now.updated", { date: currentMonthLabel(locale, NOW_UPDATED) })}
      </p>
    </div>
    <dl className={styles.nowRows}>
      {NOW.map((item, i) => (
        <div key={item.id} className={styles.nowItem} {...reveal(i)}>
          <dt className="t-meta">{t(`now.items.${item.id}.chip`)}</dt>
          <dd className={styles.nowTitle}>
            {item.href ? (
              <a className="link-arrow" href={item.href}>
                {t(`now.items.${item.id}.title`)}
                <ArrowUpRight />
              </a>
            ) : (
              t(`now.items.${item.id}.title`)
            )}
          </dd>
          <dd className="t-small">{t(`now.items.${item.id}.body`)}</dd>
        </div>
      ))}
    </dl>
  </section>
);

const SpaceCast = ({ t, locale }: Props) => (
  <section
    className={cn(styles.card, styles.cast)}
    aria-labelledby="notes-cast"
    {...reveal()}
  >
    <div className={styles.castHead}>
      <div>
        <h3 id="notes-cast" className="t-title">
          {t("spaceCast.title")}
        </h3>
        <p className={styles.castLead}>{t("spaceCast.lead")}</p>
      </div>
      <div>
        <p className="t-small">{t("spaceCast.fact")}</p>
        <p className={styles.links}>
          <a className="link-arrow t-small" href={SPACE_CAST_LINKS.playlist}>
            {t("spaceCast.playlist")}
            <ArrowUpRight />
          </a>
          <a className="link-arrow t-small" href={SPACE_CAST_LINKS.spotify}>
            {t("spaceCast.spotify")}
            <ArrowUpRight />
          </a>
        </p>
      </div>
    </div>
    <EpisodeStrip
      copy={{
        list: t("spaceCast.list"),
        prev: t("spaceCast.prev"),
        next: t("spaceCast.next"),
        source: t("spaceCast.source", { date: date(SPACE_CAST_READ, locale) }),
      }}
    >
      {EPISODES.map((ep) => (
        <li key={ep.id} className={styles.ep}>
          <a href={`https://www.youtube.com/watch?v=${ep.id}`}>
            <span className={styles.thumb}>
              <Image
                src={`/notes/space-cast/${ep.id}.webp`}
                alt=""
                width={320}
                height={180}
                sizes="(width < 1000px) 70vw, 240px"
              />
            </span>
            <span className="t-meta num">
              #{String(ep.n).padStart(2, "0")} · {date(ep.date, locale, false)}
            </span>
            <span className={styles.epTitle} lang={langOf("PT", locale)}>
              {ep.title}
            </span>
            {ep.host === false ? (
              <span className={cn("t-meta", styles.satOut)}>
                {t("spaceCast.satOut")}
              </span>
            ) : null}
          </a>
        </li>
      ))}
    </EpisodeStrip>
  </section>
);

const Writing = ({ t, locale }: Props) => (
  <section
    className={cn(styles.card, styles.writing)}
    aria-labelledby="notes-writing"
    {...reveal()}
  >
    <h3 id="notes-writing" className="t-title">
      {t("writing.title")}
    </h3>
    <p className="t-small">{t("writing.lead")}</p>
    <ol className={styles.articles}>
      {ARTICLES.map((a) => (
        <li key={a.id}>
          <a className={styles.article} href={a.href}>
            <span className={styles.articleTitle} lang={langOf(a.lang, locale)}>
              {a.title}
            </span>
            <span className="t-meta">
              <time className="num" dateTime={a.date}>
                {date(a.date, locale)}
              </time>{" "}
              · {a.outlet} · <abbr title={t(`lang.${a.lang}`)}>{a.lang}</abbr>
            </span>
          </a>
        </li>
      ))}
    </ol>
    <div className={styles.chain} data-draw="" suppressHydrationWarning>
      <svg
        className={styles.chainArrow}
        viewBox="0 0 36 64"
        aria-hidden="true"
        focusable="false"
      >
        <path pathLength={1} d="M14 3c-8 14 10 22 5 36-2 6-4 10-5 18" />
        <path pathLength={1} d="M7 50l7 8 7-8" />
      </svg>
      <span className={styles.chainNote}>{t("writing.note")}</span>
    </div>
    <a className={styles.outcome} href={MAGIC_MODAL.href}>
      <span className={styles.renamed}>
        {t.rich("writing.renamed", richTags)}
      </span>
      <span className="t-small">
        {t("writing.outcome", {
          stars: MAGIC_MODAL.stars.toLocaleString(locale),
          date: date(MAGIC_MODAL.read, locale),
        })}
      </span>
    </a>
    <a className="link-arrow t-small" href={MEDIUM}>
      {t("writing.more")}
      <ArrowUpRight />
    </a>
  </section>
);

const Talks = ({ t, locale }: Props) => (
  <section className={styles.talks} aria-labelledby="notes-talks" {...reveal()}>
    <div className={styles.head}>
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
            <p className={styles.rowTitle} lang={langOf(talk.lang, locale)}>
              {t(`talks.items.${talk.id}.title`)}
            </p>
            <p className="t-meta">
              {t(`talks.items.${talk.id}.venue`)} ·{" "}
              {t(`talks.items.${talk.id}.city`)} ·{" "}
              <abbr title={t(`lang.${talk.lang}`)}>{talk.lang}</abbr>
            </p>
            <p className="t-small">{t(`talks.items.${talk.id}.description`)}</p>
            {talk.href &&
            (talk.id === "brooklyn" || talk.id === "spaceSquad") ? (
              <a className="link-arrow t-small" href={talk.href}>
                {t(`talks.links.${talk.id}`)}
                <ArrowUpRight />
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  </section>
);

const Shipped = ({ t, locale }: Props) => (
  <section
    className={styles.shipped}
    aria-labelledby="notes-shipped"
    {...reveal()}
  >
    <div className={styles.head}>
      <h3 id="notes-shipped" className="t-title">
        {t("shipped.title")}
      </h3>
      <p className="t-meta">
        {t("shipped.source", { date: date(SHIPPED_READ, locale) })}
      </p>
    </div>
    <ol className={styles.ships}>
      {SHIPPED.map((item, i) => (
        <li key={item.id} {...reveal(i)}>
          <a className={styles.ship} href={item.href}>
            <time className="t-meta num" dateTime={item.date}>
              {date(item.date, locale)}
            </time>
            <span className={cn("t-mono", styles.pkg)}>
              {item.name}
              <span className={styles.version}>@{item.version}</span>
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

/** Now, then a shelf of public work where each piece of proof gets its own shape. */
export const NotesSection = async () => {
  const t = await getTranslations("notes");
  const locale = await getLocale();

  return (
    <section id="notes" className="section wrap" aria-labelledby="notes-title">
      <div className="section-head" {...reveal()}>
        <h2 id="notes-title" className="t-h2">
          {t("title")}
        </h2>
        <p>{t("lede")}</p>
      </div>

      <div className={styles.shelf}>
        <Now t={t} locale={locale} />
        <SpaceCast t={t} locale={locale} />
        <Writing t={t} locale={locale} />
        <Talks t={t} locale={locale} />
        <Shipped t={t} locale={locale} />
        <Awards t={t} />
      </div>
    </section>
  );
};
