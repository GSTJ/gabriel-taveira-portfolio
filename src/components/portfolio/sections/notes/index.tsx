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
  MEDIUM_URL,
  NOW,
  NOW_UPDATED,
  SHIPPED,
  SHIPPED_READ,
  SPACE_CAST_LINKS,
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

const year = (iso: string) => Number(iso.slice(0, 4));

/** A `t.rich` tag that renders its chunk as a link. */
const linkTo = (url: string) => (chunks: ReactNode) => (
  <a href={url}>{chunks}</a>
);

const FIRST_EPISODE = EPISODES.at(0)?.date ?? "";
const LAST_EPISODE = EPISODES.at(-1)?.date ?? "";
const CAST_YEAR = year(FIRST_EPISODE);

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

/** One dated line of the record: what it was, then the thing itself. */
const Entry = ({
  meta,
  children,
  wide,
}: {
  meta: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) => (
  <li className={cn(styles.entry, wide && styles.wide)} {...reveal()}>
    <p className="t-meta">{meta}</p>
    {children}
  </li>
);

const Releases = ({ t, locale }: { t: T; locale: string }) => (
  <>
    {SHIPPED.map((item) => (
      <Entry
        key={item.id}
        meta={
          <>
            {t("record.kinds.release")} ·{" "}
            <time className="num" dateTime={item.date}>
              {shortDate(item.date, locale)}
            </time>
          </>
        }
      >
        <a className={styles.ship} href={item.href}>
          <span className={cn("t-mono", styles.pkg)}>
            {item.name}
            <span className={styles.version}>@{item.version}</span>
          </span>
          <span className="t-small">{t(`shipped.items.${item.id}`)}</span>
        </a>
      </Entry>
    ))}
  </>
);

const Talk = ({ t, talk }: { t: T; talk: (typeof TALKS)[number] }) => (
  <Entry
    meta={
      <>
        {t("record.kinds.talk")} · {t(`talks.items.${talk.id}.venue`)} ·{" "}
        {t(`talks.items.${talk.id}.city`)} ·{" "}
        <abbr title={talk.lang === "PT" ? "Português" : "English"}>
          {talk.lang}
        </abbr>
      </>
    }
  >
    <p className={styles.title}>{t(`talks.items.${talk.id}.title`)}</p>
    <p className="t-small">{t(`talks.items.${talk.id}.description`)}</p>
    <a className={cn("link-arrow t-small", styles.out)} href={talk.href}>
      {t(`talks.links.${talk.link}`)}
      <ArrowUpRight />
    </a>
  </Entry>
);

/**
 * All forty episodes as a contact sheet, in airing order. They arrive one
 * week at a time when the sheet comes into view; the three he isn't listed
 * on stay faded. Pointing at one names it in the caption line.
 */
const SpaceCast = ({ t, locale }: { t: T; locale: string }) => (
  <Entry
    wide
    meta={
      <>
        {t("record.kinds.podcast")} ·{" "}
        <span className="num">
          {shortDate(FIRST_EPISODE, locale)} → {shortDate(LAST_EPISODE, locale)}
        </span>
      </>
    }
  >
    <p className={styles.title}>{t("spaceCast.title")}</p>
    <p className={cn("t-small", styles.measure)}>{t("spaceCast.body")}</p>
    <div className={styles.sheet} data-draw="" suppressHydrationWarning>
      <ol className={styles.tiles} aria-label={t("spaceCast.sheetLabel")}>
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
                sizes="(width < 1000px) 20vw, 96px"
                alt=""
                unoptimized
              />
              <span className={cn("t-meta", styles.cap)}>
                <span className={styles.capTitle} lang="pt-BR">
                  #{ep.n} {ep.title}
                </span>
                <span className="num">
                  {t("spaceCast.episode", {
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
        {t("spaceCast.caption")}
      </p>
    </div>
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
  </Entry>
);

const Articles = ({ t, locale }: { t: T; locale: string }) => (
  <>
    {ARTICLES.map((article) => (
      <Entry
        key={article.id}
        meta={
          <>
            {t("record.kinds.article")} ·{" "}
            <time className="num" dateTime={article.date}>
              {shortDate(article.date, locale)}
            </time>{" "}
            · {article.outlet} ·{" "}
            <abbr title={article.lang === "PT" ? "Português" : "English"}>
              {article.lang}
            </abbr>
          </>
        }
      >
        <a
          className={cn("link-arrow", styles.title)}
          href={article.href}
          lang={article.lang === "PT" ? "pt-BR" : "en"}
        >
          {t(`writing.items.${article.id}`)}
          <ArrowUpRight />
        </a>
      </Entry>
    ))}
    <li className={styles.became} {...reveal()}>
      <p className="t-small">
        {t.rich("writing.became", {
          stars: MAGIC_MODAL.stars,
          date: shortDate(MAGIC_MODAL.read, locale),
          link: linkTo(MAGIC_MODAL.href),
        })}{" "}
        <Marginalia placement="inline" note={t("writing.note")} />
      </p>
      <a className="link-arrow t-small" href={MEDIUM_URL}>
        {t("writing.more")}
        <ArrowUpRight />
      </a>
    </li>
  </>
);

const Hackathons = ({ t, at }: { t: T; at: number }) => (
  <>
    {AWARDS.filter((a) => a.year === at).map((award) => (
      <li key={award.id} className={styles.award} {...reveal()}>
        <span className="t-meta">{t("record.kinds.hackathon")}</span>
        <span className="t-small">
          {t(`awards.items.${award.id}`)},{" "}
          {t(`awards.positions.${award.position}`)}
        </span>
      </li>
    ))}
  </>
);

/** Every year that has something public in it, newest first. */
const YEARS = [
  ...new Set([
    ...SHIPPED.map((s) => year(s.date)),
    ...TALKS.map((talk) => Number(talk.date)),
    CAST_YEAR,
    ...ARTICLES.map((a) => year(a.date)),
    ...AWARDS.map((a) => a.year),
  ]),
].sort((a, b) => b - a);

const Year = ({ t, locale, at }: { t: T; locale: string; at: number }) => {
  const releases = SHIPPED.some((s) => year(s.date) === at);
  const articles = ARTICLES.some((a) => year(a.date) === at);

  return (
    <li className={styles.year}>
      <h4 className={cn("num", styles.yearLabel)}>{at}</h4>
      <ol className={styles.entries}>
        {releases ? <Releases t={t} locale={locale} /> : null}
        {CAST_YEAR === at ? <SpaceCast t={t} locale={locale} /> : null}
        {TALKS.filter((talk) => Number(talk.date) === at).map((talk) => (
          <Talk key={talk.id} t={t} talk={talk} />
        ))}
        {articles ? <Articles t={t} locale={locale} /> : null}
        <Hackathons t={t} at={at} />
      </ol>
      {releases ? (
        <p className={cn("t-meta", styles.source)}>
          {t("shipped.source", { date: shortDate(SHIPPED_READ, locale) })}
        </p>
      ) : null}
    </li>
  );
};

/** Now, pinned, beside a dated record of everything public, newest first. */
export const NotesSection = async () => {
  const t = await getTranslations("notes");
  const locale = await getLocale();

  return (
    <section id="notes" className="section wrap" aria-labelledby="notes-title">
      <div className="section-head" {...reveal()}>
        <h2 id="notes-title" className="t-h2">
          {t("title")}
        </h2>
        <p className="t-lede">{t("lede")}</p>
      </div>

      <div className={styles.layout}>
        <Now t={t} locale={locale} />
        <section className={styles.record} aria-labelledby="notes-record">
          <div className={styles.head} {...reveal()}>
            <h3 id="notes-record" className="t-title">
              {t("record.title")}
            </h3>
            <p className="t-small">{t("talks.sub")}</p>
          </div>
          <ol className={styles.years}>
            {YEARS.map((at) => (
              <Year key={at} t={t} locale={locale} at={at} />
            ))}
          </ol>
          <p className={cn("t-meta", styles.source)} {...reveal()}>
            {t("awards.sub")}
          </p>
        </section>
      </div>
    </section>
  );
};
