import type { Article } from "./data";

import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../../lifeline";
import { ArrowUpRight } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import { reveal } from "../../ui/motion";
import {
  ALSO,
  AWARDS,
  EPISODES,
  GUIDE,
  MAGIC_MODAL,
  NOW,
  SITE_UPDATED,
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

/** A number in the library receipt, set larger than its label. */
const figure = (chunks: ReactNode) => (
  <span className={cn("num", styles.figure)}>{chunks}</span>
);

/** A word that must not break at its hyphen, like X-Team. */
const keepTogether = (chunks: ReactNode) => (
  <span className={styles.nowrap}>{chunks}</span>
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
        {t("now.updated", { date: currentMonthLabel(locale, SITE_UPDATED) })}
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
 * is in view. Pointing at one names it.
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
            <a className={styles.tile} href={episodeUrl(ep.id)}>
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

const LANG_NAME = { EN: "English", PT: "Português" } as const;

/** One post: its language chip, the title as a link, then date, outlet and read time. */
const Post = ({
  article,
  t,
  locale,
}: {
  article: Article;
  t: T;
  locale: string;
}) => (
  <li className={styles.post}>
    <abbr className={cn("t-meta", styles.lang)} title={LANG_NAME[article.lang]}>
      {article.lang}
    </abbr>
    <div className={styles.postMain}>
      <Out href={article.href} className={styles.postTitle}>
        <span lang={article.lang === "PT" ? "pt-BR" : "en"}>
          {t.rich(`writing.items.${article.id}`, { nb: keepTogether })}
        </span>
      </Out>
      <p className="t-meta">
        <time className="num" dateTime={article.date}>
          {shortDate(article.date, locale)}
        </time>{" "}
        · {article.outlet} ·{" "}
        <span className="num">
          {t("writing.minutes", { n: article.minutes })}
        </span>
        {article.claps ? (
          <>
            {" "}
            ·{" "}
            <span className="num">
              {t("writing.claps", {
                n: article.claps.toLocaleString(locale),
              })}
            </span>
          </>
        ) : null}
      </p>
    </div>
  </li>
);

/**
 * The guide in his own words, its two editions, then his pen drawing the line
 * from the guide down to the library it became. Other posts trail after.
 */
const Writing = ({ t, locale }: { t: T; locale: string }) => (
  <section className={styles.block} aria-labelledby="notes-writing">
    <div className={styles.head} {...reveal()}>
      <h3 id="notes-writing" className="t-title">
        {t("writing.title")}
      </h3>
      <p className="t-small">{t("writing.sub")}</p>
    </div>
    <figure className={styles.quote} {...reveal(1)}>
      <blockquote>
        <p>{t("writing.quote")}</p>
      </blockquote>
      <figcaption className="t-meta">{t("writing.quoteCite")}</figcaption>
    </figure>
    <div className={styles.lineage}>
      <ol className={styles.posts} {...reveal(2)}>
        {GUIDE.map((article) => (
          <Post key={article.id} article={article} t={t} locale={locale} />
        ))}
      </ol>
      <div
        className={styles.became}
        data-draw=""
        suppressHydrationWarning
        aria-hidden="true"
      >
        <svg viewBox="0 0 40 72" focusable="false">
          <path pathLength={1} d="M14 3C6 20 7 40 18 56c2 3 4 6 6 9" />
          <path pathLength={1} d="M15 62l9 3 1-10" />
        </svg>
        <span className="t-hand">{t("writing.became")}</span>
      </div>
      <div className={styles.lib} {...reveal(3)}>
        <a className={cn("t-mono", styles.libName)} href={MAGIC_MODAL.href}>
          magic-modal
          <ArrowUpRight />
        </a>
        <p className={styles.figures}>
          <span>
            {t.rich("writing.stars", {
              n: MAGIC_MODAL.stars.toLocaleString(locale),
              num: figure,
            })}
          </span>
          <span>
            {t.rich("writing.downloads", {
              n: MAGIC_MODAL.downloads.toLocaleString(locale),
              num: figure,
            })}
          </span>
        </p>
        <p className="t-small">{t.rich("writing.library", { old: oldName })}</p>
        <p className="t-meta">
          {t("writing.source", { date: shortDate(MAGIC_MODAL.read, locale) })}
        </p>
      </div>
    </div>
    <div className={styles.stack} {...reveal(4)}>
      <p className="t-meta">{t("writing.also")}</p>
      <ol className={styles.posts}>
        {ALSO.map((article) => (
          <Post key={article.id} article={article} t={t} locale={locale} />
        ))}
      </ol>
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

/** Pinned on the hovered result; its metal comes from `data-position`. */
const Medal = () => (
  <svg
    className={styles.medal}
    viewBox="0 0 24 32"
    aria-hidden="true"
    focusable="false"
  >
    <path className={styles.ribbon} d="M6 0h5l3 11h-5zM13 0h5l-3 11h-5z" />
    <circle className={styles.disc} cx="12" cy="20" r="9" />
    <circle className={styles.ring} cx="12" cy="20" r="6.2" />
  </svg>
);

/**
 * The five placements as a results board: the place set large, wins in full
 * ink, then fading by result, so it reads honestly at a glance.
 */
const Awards = ({ t }: { t: T }) => (
  <section className={styles.awards} aria-labelledby="notes-awards">
    <div className={styles.head} {...reveal()}>
      <h3 id="notes-awards" className="t-title">
        {t("awards.title")}
      </h3>
      <p className="t-small">{t("awards.sub")}</p>
    </div>
    <ol className={styles.board}>
      {AWARDS.map((award, i) => (
        <li
          key={award.id}
          className={styles.result}
          data-position={award.position}
          {...reveal(i)}
        >
          <p className={styles.place}>
            <span aria-hidden="true">
              {t(`awards.ordinals.${award.position}`)}
            </span>
            <Medal />
            <span className="visually-hidden">
              {t(`awards.positions.${award.position}`)}
            </span>
          </p>
          <p className={styles.event}>{t(`awards.items.${award.id}`)}</p>
          <p className="t-meta num">{award.year}</p>
        </li>
      ))}
    </ol>
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
