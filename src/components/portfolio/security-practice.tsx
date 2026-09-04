import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import { SECURITY_CASES, SECURITY_TOPICS } from "./data";
import { ArrowUpRight, Eyebrow, richTags, Tag } from "./shared";

export const SecurityPractice = () => {
  const t = useTranslations("security");

  return (
    <section className="ws-section" id="security">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="ws-section-sub">{t("sub")}</p>
      </div>

      <div className="ws-security-topics" aria-label={t("topicsLabel")}>
        {SECURITY_TOPICS.map((topic) => (
          <Tag key={topic}>{topic}</Tag>
        ))}
      </div>

      <div className="ws-security-grid">
        {SECURITY_CASES.map((item) => (
          <article className="ws-security-card" key={item.id}>
            <div className="ws-security-card-head">
              <span className="ws-eyebrow">{item.eyebrow}</span>
              <div className="ws-security-metric">
                <strong>{item.metric}</strong>
                <span>{t(`items.${item.id}.metric`)}</span>
              </div>
            </div>
            <h3 className="ws-security-title">
              <Balancer>{t(`items.${item.id}.title`)}</Balancer>
            </h3>
            <p className="ws-security-body">{t(`items.${item.id}.body`)}</p>
            <div className="ws-security-foot">
              <div className="ws-security-tags">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <a href={item.href} target="_blank" rel="noreferrer">
                {t("readProof")} <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
