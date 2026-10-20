import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../../lifeline";
import { ArrowUpRight } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import { reveal } from "../../ui/motion";
import {
  AWARDS,
  NOW,
  NOW_UPDATED,
  PUBLICATIONS,
  SHIPPED,
  SHIPPED_READ,
  TALKS,
  WRITING_TOPICS,
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
            <a className={styles.rowTitle} href={talk.href}>
              {t(`talks.items.${talk.id}.title`)}
            </a>
            <p className="t-meta">
              {t(`talks.items.${talk.id}.venue`)} ·{" "}
              {t(`talks.items.${talk.id}.city`)} ·{" "}
              <abbr title={talk.lang === "PT" ? "Português" : "English"}>
                {talk.lang}
              </abbr>
            </p>
            <p className="t-small">{t(`talks.items.${talk.id}.description`)}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

const Podcast = ({ t }: { t: T }) => (
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
      <p className={styles.links}>
        <a className="link-arrow t-small" href={PUBLICATIONS.playlist}>
          {t("publications.playlist")}
          <ArrowUpRight />
        </a>
        <a className="link-arrow t-small" href={PUBLICATIONS.spaceCast}>
          {t("publications.channel")}
          <ArrowUpRight />
        </a>
      </p>
    </div>
  </section>
);

const Writing = ({ t }: { t: T }) => (
  <section className={styles.block} aria-labelledby="notes-writing">
    <h3 id="notes-writing" className="t-title" {...reveal()}>
      {t("writing.title")}
    </h3>
    <div className={styles.stack} {...reveal(1)}>
      <p className="t-small">{t("writing.sub")}</p>
      <p className="t-meta">
        {WRITING_TOPICS.map((topic) => t(`writing.topics.${topic}`)).join(
          " · ",
        )}
      </p>
      <a className="link-arrow t-small" href={PUBLICATIONS.medium}>
        {t("writing.readOnMedium")}
        <ArrowUpRight />
      </a>
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

/** Now, Space Cast and writing, talks, recent releases and hackathons. */
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
          <div className={styles.col}>
            <Podcast t={t} />
            <Writing t={t} />
          </div>
          <Shipped t={t} locale={locale} />
        </div>
        <Awards t={t} />
      </div>
    </section>
  );
};
