import type { Proof } from "./data";

import type { CSSProperties } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { reveal } from "../../ui/motion";

import styles from "./work.module.css";

const MergeIcon = () => (
  <svg
    className={styles.mergeIcon}
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="4" cy="3" r="1.6" />
    <circle cx="4" cy="13" r="1.6" />
    <circle cx="12" cy="8" r="1.6" />
    <path d="M4 4.6v6.8M4 5.5c0 2.6 2.4 2.5 6.4 2.5" />
  </svg>
);

/**
 * One fact from the row's copy, drawn in its own form. The text inside each
 * figure carries the fact for screen readers; the bars are decoration on it.
 * Each figure reveals on its own, so a bar fills when it is in view.
 */
export const ProofFigure = async ({ proof }: { proof: Proof }) => {
  const t = await getTranslations("work.proofs");

  if (proof.kind === "coverage") {
    const after = `${proof.after}%${proof.atLeast ? "+" : ""}`;
    const style = {
      "--before": `${proof.before}%`,
      "--after": `${proof.after}%`,
      "--grown": proof.before / proof.after,
    } as CSSProperties;
    return (
      <figure className={styles.meter} {...reveal(0, 120)}>
        <figcaption className="t-meta">{t(proof.label)}</figcaption>
        <div className={styles.track} style={style} aria-hidden>
          <span className={styles.fill} />
          <span className={styles.was} />
        </div>
        <p className={cn("t-small num", styles.value)}>
          <span aria-hidden>
            {proof.before}% → {after}
          </span>
          <span className="visually-hidden">
            {t("fromTo", { before: `${proof.before}%`, after })}
          </span>
        </p>
      </figure>
    );
  }

  if (proof.kind === "deleted") {
    return (
      <figure className={styles.diff} {...reveal(1, 120)}>
        <figcaption className="t-meta">{t("deleted")}</figcaption>
        <p className={styles.diffLine}>
          <span aria-hidden className={styles.diffCount}>
            <span className={cn("t-mono num", styles.diffNum)}>
              -{proof.lines}
            </span>{" "}
            <span className="t-small">{t("lines")}</span>
          </span>
          <span className="visually-hidden">
            {t("linesSr", { count: proof.lines })}
          </span>
          <span className={styles.blocks} aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} style={{ "--b": i } as CSSProperties} />
            ))}
          </span>
        </p>
      </figure>
    );
  }

  if (proof.kind === "pr") {
    const locale = await getLocale();
    const date = new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(new Date(proof.merged));
    return (
      <figure {...reveal(0, 120)}>
        <figcaption className="t-meta">{t("pr")}</figcaption>
        <a className={styles.prCard} href={proof.href}>
          <span className={cn("t-meta", styles.repo)}>
            {proof.repo} <span className="num">#{proof.number}</span>
          </span>
          <span className={cn("t-mono", styles.prTitle)}>{proof.title}</span>
          <span className={cn("t-meta", styles.prMeta)}>
            <MergeIcon />
            {t("merged")} ·{" "}
            <time className="num" dateTime={proof.merged}>
              {date}
            </time>
          </span>
        </a>
      </figure>
    );
  }

  return (
    <figure className={styles.parallel} {...reveal(0, 120)}>
      <figcaption className="t-meta">{t("parallel")}</figcaption>
      <div className={styles.lanes}>
        <span className={cn("t-meta", styles.laneName)}>Ionic 3</span>
        <span className={styles.lane} data-lane="old" aria-hidden>
          <span />
        </span>
        <span className={cn("t-meta", styles.laneName)}>React Native</span>
        <span className={styles.lane} data-lane="new" aria-hidden>
          <span />
        </span>
        <span className={cn("t-meta", styles.overlap)}>{t("overlap")}</span>
      </div>
    </figure>
  );
};
