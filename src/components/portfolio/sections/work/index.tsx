import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { WORK, workDates } from "./data";

import styles from "./work.module.css";

/** Blurbs mark their one hard number with `<mark>`. */
const blurbTags = { mark: (chunks: ReactNode) => <strong>{chunks}</strong> };

/** Placeholder: the ledger in plain form, newest first, early jobs as small print. */
export const WorkSection = async () => {
  const t = await getTranslations("work");
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
      <ol className={styles.ledger}>
        {rows.map((item) => (
          <li key={item.id} className={styles.row} {...reveal()}>
            <p className="t-small num">
              {workDates(item, t("present"))}
              <br />
              <span className="t-meta">{item.orgs.join(" · ")}</span>
            </p>
            <h3 className="t-title">{t(`items.${item.id}.title`)}</h3>
            <p className="t-body">
              {t.rich(`items.${item.id}.blurb`, blurbTags)}
            </p>
            <a className="link-arrow t-small" href={item.href}>
              {t(`items.${item.id}.cta`)}
              <ArrowUpRight />
            </a>
          </li>
        ))}
      </ol>
      <div className={styles.earlier} {...reveal()}>
        <h3 className="t-meta">{t("earlier")}</h3>
        <ul>
          {earlier.map((item) => (
            <li key={item.id} className="t-small">
              <span className="num">{workDates(item, t("present"))}</span>{" "}
              <strong>{item.orgs.join(" · ")}</strong>.{" "}
              {t.rich(`items.${item.id}.blurb`, blurbTags)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
