import type { CSSProperties, ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { LINKEDIN } from "../../profile";
import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { WORK, type WorkItem, workDates, workOrgs } from "./data";

import styles from "./work.module.css";

/** Blurbs mark their one hard number with `<mark>`. */
const blurbTags = {
  mark: (chunks: ReactNode) => (
    <strong className={cn("num", styles.figure)}>{chunks}</strong>
  ),
};

/** "coinbase.com" for a company site, the locale's "LinkedIn" otherwise. */
const linkLabel = (href: string, linkedin: string) => {
  const host = new URL(href).hostname.replace(/^www\./, "");
  return host === "linkedin.com" || host.endsWith(".linkedin.com")
    ? linkedin
    : host;
};

/** "D-ID" stays on one line: a title never breaks at a name's hyphen. */
const keepHyphens = (text: string) =>
  text.replaceAll(/(\w)-(\w)/g, "$1\u2011$2");

/** The career axis: the first job's year to the end of this year. */
const AXIS_START = Math.min(...WORK.map((item) => item.start));
const AXIS_END = new Date().getFullYear() + 1;
const AXIS_YEARS = AXIS_END - AXIS_START;

/** Where a job sits on the axis, in years counted whole (2024 → 2025 is two). */
const spanStyle = (item: WorkItem) => {
  const end = item.end === "now" ? AXIS_END : item.end + 1;
  return {
    "--from": `${((item.start - AXIS_START) / AXIS_YEARS) * 100}%`,
    "--span": `${((end - item.start) / AXIS_YEARS) * 100}%`,
  } as CSSProperties;
};

/** The arrow rides on the last word, so it never wraps onto a line alone. */
const Arrowed = ({ text }: { text: string }) => {
  const at = text.lastIndexOf(" ") + 1;
  return (
    <>
      {text.slice(0, at)}
      <span className={styles.glue}>
        {text.slice(at)}
        <ArrowUpRight />
      </span>
    </>
  );
};

type Translate = Awaited<ReturnType<typeof getTranslations<"work">>>;

/** A job's public artifacts, each with its number or date, then the company site. */
const Proof = ({ item, t }: { item: WorkItem; t: Translate }) => (
  <ul className={styles.proof}>
    {item.proof?.map((proof) => {
      const key = `items.${item.id}.proof.${proof.id}`;
      return (
        <li key={proof.id}>
          <a className={styles.link} href={proof.href}>
            <Arrowed text={keepHyphens(t(`${key}.label`))} />
          </a>
          <p className="t-meta num">{t(`${key}.meta`)}</p>
        </li>
      );
    })}
    <li>
      <a className={styles.link} href={item.href}>
        <Arrowed text={linkLabel(item.href, t("linkedin"))} />
      </a>
    </li>
  </ul>
);

const Track = ({ item }: { item: WorkItem }) => (
  <span
    className={styles.track}
    data-open={item.end === "now" ? "" : undefined}
    style={spanStyle(item)}
    aria-hidden
  >
    <span className={styles.fill} />
  </span>
);

/** Newest first, one ruled row per job, the two earliest as small print. */
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

      <p className={cn("t-meta num", styles.axis)} aria-hidden {...reveal()}>
        <span>{AXIS_START}</span>
        <span>{present}</span>
      </p>

      <ol className={styles.ledger}>
        {rows.map((item) => (
          <li
            key={item.id}
            id={`work-${item.id}`}
            className={styles.row}
            {...reveal()}
          >
            <p className={styles.when}>
              <span className="t-small num">{workDates(item, present)}</span>
              <Track item={item} />
            </p>
            <div className={styles.head}>
              <h3 className={styles.title}>
                {keepHyphens(t(`items.${item.id}.title`))}
              </h3>
              <p className="t-meta">{keepHyphens(orgs(item))}</p>
            </div>
            <p className={cn("t-body", styles.blurb)}>
              {t.rich(`items.${item.id}.blurb`, blurbTags)}
            </p>
            <Proof item={item} t={t} />
          </li>
        ))}
      </ol>

      <div className={styles.earlier} {...reveal()}>
        <h3 className="t-meta">{t("earlier")}</h3>
        <ul>
          {earlier.map((item) => (
            <li key={item.id} id={`work-${item.id}`} className={styles.small}>
              <p className={styles.when}>
                <span className="t-small num">{workDates(item, present)}</span>
                <Track item={item} />
              </p>
              <div className={styles.head}>
                <h4 className={cn("t-small", styles.org)}>{orgs(item)}</h4>
                <p className="t-meta">{t(`items.${item.id}.title`)}</p>
              </div>
              <p className="t-small">
                {t.rich(`items.${item.id}.blurb`, blurbTags)}
              </p>
              {item.href === LINKEDIN ? null : <Proof item={item} t={t} />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
