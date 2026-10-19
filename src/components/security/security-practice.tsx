import { getTranslations } from "next-intl/server";

import { ArrowUpRight } from "../portfolio/ui/icons";
import { reveal } from "../portfolio/ui/motion";
import { SECURITY_CASES } from "./data";

import styles from "./security.module.css";

const CASE_STUDY = ["cause", "fix", "validation", "limits"] as const;

export const SecurityPractice = async () => {
  const t = await getTranslations("security");

  return (
    <section
      id="security"
      className="section wrap"
      aria-labelledby="security-cases"
    >
      <div className="section-head" {...reveal()}>
        <h2 id="security-cases" className="t-h2">
          {t("title")}
        </h2>
        <p>{t("sub")}</p>
      </div>
      <div className={styles.cases}>
        {SECURITY_CASES.map((item, index) => (
          <article key={item.id} className={styles.case} {...reveal(index)}>
            <p className="t-meta">{item.eyebrow}</p>
            <p>
              <strong className={styles.metric}>{item.metric}</strong>{" "}
              <span className="t-meta">{t(`items.${item.id}.metric`)}</span>
            </p>
            <h3 className="t-title">{t(`items.${item.id}.title`)}</h3>
            <p className="t-body">{t(`items.${item.id}.body`)}</p>
            {item.id === "assetBoundary" ? (
              <details className={styles.details}>
                <summary>{t("items.assetBoundary.caseStudy.label")}</summary>
                {CASE_STUDY.map((part) => (
                  <div key={part}>
                    <h4>{t(`items.assetBoundary.caseStudy.${part}Title`)}</h4>
                    <p className="t-small">
                      {t(`items.assetBoundary.caseStudy.${part}`)}
                    </p>
                  </div>
                ))}
              </details>
            ) : null}
            <p className="t-meta">{t(`items.${item.id}.tags`)}</p>
            <a className="link-arrow t-small" href={item.href}>
              {t("readProof")}
              <ArrowUpRight />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};
