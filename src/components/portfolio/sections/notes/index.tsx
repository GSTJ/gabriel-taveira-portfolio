import { getLocale, getTranslations } from "next-intl/server";

import { currentMonthLabel } from "../../lifeline";
import { ArrowUpRight } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import { reveal } from "../../ui/motion";
import { AWARDS, NOW, PUBLICATIONS, TALKS, WRITING_TOPICS } from "./data";

import styles from "./notes.module.css";

/** Placeholder: Now, Space Cast and media, talks, awards and writing, plainly. */
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

      <div className={styles.grid}>
        <section
          className={styles.block}
          aria-labelledby="notes-now"
          {...reveal()}
        >
          <h3 id="notes-now" className="t-title">
            {t("now.title")}
          </h3>
          <p className="t-meta">
            {t("now.updated", { date: currentMonthLabel(locale) })}
          </p>
          <dl className={styles.rows}>
            {NOW.map((item) => (
              <div key={item.id}>
                <dt className="t-meta">{t(`now.items.${item.id}.chip`)}</dt>
                <dd>
                  {item.href ? (
                    <a href={item.href}>{t(`now.items.${item.id}.title`)}</a>
                  ) : (
                    t(`now.items.${item.id}.title`)
                  )}
                  <span className="t-small">
                    {" "}
                    {t(`now.items.${item.id}.body`)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className={styles.block}
          aria-labelledby="notes-media"
          {...reveal()}
        >
          <h3 id="notes-media" className="t-title">
            {t("publications.title")}
          </h3>
          <p className="t-body">
            <Marginalia placement="inline" note={t("publications.season")}>
              {t("publications.featureTitle")}
            </Marginalia>
          </p>
          <p className="t-small">{t("publications.featureSub")}</p>
          <p className={styles.links}>
            <a className="link-arrow t-small" href={PUBLICATIONS.spaceCast}>
              {t("publications.watchShow")}
              <ArrowUpRight />
            </a>
            <a className="link-arrow t-small" href={PUBLICATIONS.playlist}>
              {t("publications.playlist")}
              <ArrowUpRight />
            </a>
          </p>
          <p className="t-small">
            <a href={PUBLICATIONS.medium}>{t("publications.mediumHandle")}</a>.{" "}
            {t("publications.mediumBody")}
          </p>
          <p className="t-small">
            <a href={PUBLICATIONS.spaceSquad}>
              {t("publications.ambassadorTitle")}
            </a>
            . {t("publications.ambassadorBody")}
          </p>
        </section>

        <section
          className={styles.block}
          aria-labelledby="notes-talks"
          {...reveal()}
        >
          <h3 id="notes-talks" className="t-title">
            {t("talks.title")}
          </h3>
          <p className="t-small">{t("talks.sub")}</p>
          <ul className={styles.rows}>
            {TALKS.map((talk) => (
              <li key={talk.id}>
                <span className="t-meta num">{talk.date}</span>{" "}
                <a href={talk.href}>{t(`talks.items.${talk.id}.title`)}</a>
                <span className="t-small">
                  {" "}
                  {t(`talks.items.${talk.id}.venue`)} ·{" "}
                  {t(`talks.items.${talk.id}.city`)} · {talk.lang}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={styles.block}
          aria-labelledby="notes-awards"
          {...reveal()}
        >
          <h3 id="notes-awards" className="t-title">
            {t("awards.title")}
          </h3>
          <p className="t-small">{t("awards.sub")}</p>
          <ul className={styles.rows}>
            {AWARDS.map((award) => (
              <li key={award.id}>
                <span className="t-meta num">{award.year}</span>{" "}
                {t(`awards.items.${award.id}`)}
                <span className="t-small">
                  , {t(`awards.positions.${award.position}`)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={styles.block}
          aria-labelledby="notes-writing"
          {...reveal()}
        >
          <h3 id="notes-writing" className="t-title">
            {t("writing.title")}
          </h3>
          <p className="t-small">{t("writing.sub")}</p>
          <p className="t-small">
            {WRITING_TOPICS.map((topic) => t(`writing.topics.${topic}`)).join(
              " · ",
            )}
          </p>
          <a className="link-arrow t-small" href={PUBLICATIONS.medium}>
            {t("writing.readOnMedium")}
            <ArrowUpRight />
          </a>
        </section>
      </div>
    </section>
  );
};
