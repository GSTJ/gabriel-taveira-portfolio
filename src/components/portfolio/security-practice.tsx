import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import { SECURITY_CASES } from "./data";
import { ArrowUpRight, richTags, Tag } from "./shared";

const CASE_STUDY_PARTS = ["cause", "fix", "validation", "limits"] as const;

export const SecurityPractice = () => {
  const t = useTranslations("security");

  return (
    <section className="gt-section" id="security">
      <header className="gt-section-head">
        <h2 className="gt-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="gt-section-sub">{t("sub")}</p>
      </header>

      <ol className="gt-rows">
        {SECURITY_CASES.map((item) => (
          <li className="gt-row gt-row-main" key={item.id}>
            <div className="gt-row-org">
              <p className="gt-row-name">{item.metric}</p>
              <p className="gt-row-meta">
                {t(`items.${item.id}.metric`)} · {item.eyebrow}
              </p>
            </div>
            <div className="gt-row-main">
              <h3 className="gt-row-title">
                <Balancer>{t(`items.${item.id}.title`)}</Balancer>
              </h3>
              <p className="gt-row-blurb">{t(`items.${item.id}.body`)}</p>
              {item.id === "assetBoundary" && (
                <details className="gt-details">
                  <summary>{t("items.assetBoundary.caseStudy.label")}</summary>
                  <dl>
                    {CASE_STUDY_PARTS.map((part) => (
                      <div key={part}>
                        <dt>
                          {t(`items.assetBoundary.caseStudy.${part}Title`)}
                        </dt>
                        <dd>{t(`items.assetBoundary.caseStudy.${part}`)}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              )}
              <div className="gt-row-foot">
                <div className="gt-tags">
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <a
                  className="gt-link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("readProof")}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};
