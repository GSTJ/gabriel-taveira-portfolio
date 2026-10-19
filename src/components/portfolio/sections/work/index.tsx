import type { CSSProperties, ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { LINKEDIN } from "../../profile";
import { ArrowUpRight } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import { reveal } from "../../ui/motion";
import { WORK, type WorkItem, workDates, workOrgs } from "./data";

import styles from "./work.module.css";

/** Blurbs mark their one hard number with `<mark>`. */
const blurbTags = {
  mark: (chunks: ReactNode) => (
    <strong className={cn("num", styles.figure)}>{chunks}</strong>
  ),
};

/** "D-ID" stays on one line: a title never breaks at a name's hyphen. */
const keepHyphens = (text: string) =>
  text.replaceAll(/(\w)-(\w)/g, "$1\u2011$2");

const host = (href: string) => new URL(href).hostname.replace(/^www\./, "");

/** The career axis: the first job's year to the end of this year. */
const AXIS_START = Math.min(...WORK.map((item) => item.start));
const AXIS_END = new Date().getFullYear() + 1;
const AXIS_YEARS = AXIS_END - AXIS_START;
const YEARS = Array.from({ length: AXIS_YEARS }, (_, i) => AXIS_START + i);
const YEARS_STYLE = { "--years": AXIS_YEARS } as CSSProperties;

/**
 * Where a job sits on the chart, in whole years (2024 → 2025 is two), and
 * when it draws: oldest first, so the bars climb in the order they happened.
 */
const laneStyle = (item: WorkItem, index: number) => {
  const end = item.end === "now" ? AXIS_END : item.end + 1;
  const from = (item.start - AXIS_START) / AXIS_YEARS;
  return {
    "--from": `${from * 100}%`,
    "--span": `${((end - item.start) / AXIS_YEARS) * 100}%`,
    "--order": WORK.length - 1 - index,
  } as CSSProperties;
};

/** A label hangs off whichever end of its bar has room. */
const side = (item: WorkItem) =>
  (item.start - AXIS_START) / AXIS_YEARS > 0.5 ? "end" : "start";

/** Newest first: the chart of who each job reached, then one row per job. */
export const WorkSection = async () => {
  const t = await getTranslations("work");
  const present = t("present");
  const orgs = (item: WorkItem) => workOrgs(item, t("independent")).join(" · ");
  const rows = WORK.filter((item) => item.billing !== "agate");
  const earlier = WORK.filter((item) => item.billing === "agate");

  return (
    <section id="work" className="section wrap" aria-labelledby="work-title">
      <div className="section-head" {...reveal()}>
        <h2 id="work-title" className="t-h2">
          {t("title")}
        </h2>
        <p>{t("sub")}</p>
      </div>

      <figure className={styles.chart} {...reveal()}>
        <ol
          className={styles.lanes}
          style={YEARS_STYLE}
          aria-label={t("chart.label")}
        >
          {WORK.map((item, index) => (
            <li
              key={item.id}
              className={styles.lane}
              data-side={side(item)}
              data-open={item.end === "now" ? "" : undefined}
              style={laneStyle(item, index)}
            >
              <a className={styles.laneLink} href={`#work-${item.id}`}>
                <span className={styles.label}>
                  <span className={styles.scope}>
                    {t(`items.${item.id}.scope`)}
                  </span>{" "}
                  <span className={styles.who}>
                    {item.id === "consulting"
                      ? t(`items.${item.id}.title`)
                      : keepHyphens(item.orgs[0] ?? "")}
                    <span className="visually-hidden">
                      , {workDates(item, present)}
                    </span>
                  </span>
                </span>
                <span className={styles.bar} aria-hidden>
                  <span className={styles.fill} />
                </span>
              </a>
              {item.end === "now" ? (
                <span className={styles.note}>
                  <Marginalia placement="inline" note={t("chart.note")} />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
        <p
          className={cn("t-meta num", styles.years)}
          style={YEARS_STYLE}
          aria-hidden
        >
          {YEARS.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </p>
        <figcaption className={cn("t-meta", styles.caption)}>
          {t("chart.caption")}
        </figcaption>
      </figure>

      <ol className={styles.ledger}>
        {rows.map((item) => (
          <li
            key={item.id}
            id={`work-${item.id}`}
            className={styles.row}
            data-billing={item.billing}
            {...reveal()}
          >
            <p className={cn("t-small num", styles.when)}>
              {workDates(item, present)}
            </p>
            <div className={styles.head}>
              <h3 className={styles.title}>
                {keepHyphens(t(`items.${item.id}.title`))}
              </h3>
              {item.id === "consulting" ? null : (
                <p className="t-meta">{keepHyphens(orgs(item))}</p>
              )}
            </div>
            <p className={cn("t-body", styles.blurb)}>
              {t.rich(`items.${item.id}.blurb`, blurbTags)}
            </p>
            <p className={cn("t-small", styles.go)}>
              {item.href === LINKEDIN ? (
                <a className="link-arrow" href="#services">
                  {t("servicesLink")}
                </a>
              ) : (
                <a className="link-arrow" href={item.href}>
                  {host(item.href)}
                  <ArrowUpRight />
                </a>
              )}
              {item.artifact ? (
                <a className="link-arrow" href={item.artifact.href}>
                  {t(item.artifact.label)}
                  <ArrowUpRight />
                </a>
              ) : null}
            </p>
          </li>
        ))}
      </ol>

      <div className={styles.earlier} {...reveal()}>
        <h3 className="t-meta">{t("earlier")}</h3>
        <ul>
          {earlier.map((item) => (
            <li key={item.id} id={`work-${item.id}`} className={styles.small}>
              <p className={cn("t-small num", styles.when)}>
                {workDates(item, present)}
              </p>
              <div className={styles.head}>
                <h4 className={cn("t-small", styles.org)}>{orgs(item)}</h4>
                <p className="t-meta">{t(`items.${item.id}.title`)}</p>
              </div>
              <p className="t-small">
                {t.rich(`items.${item.id}.blurb`, blurbTags)}
              </p>
            </li>
          ))}
        </ul>
        <p className="t-small">
          <a className="link-arrow" href={LINKEDIN}>
            {t("linkedinFull")}
            <ArrowUpRight />
          </a>
        </p>
      </div>
    </section>
  );
};
