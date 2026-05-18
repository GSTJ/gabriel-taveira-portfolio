import Balancer from "react-wrap-balancer";
import { getTranslations } from "next-intl/server";
import { MEDIUM, WRITING_TOPICS } from "./data";
import { ArrowUpRight, Eyebrow, richTags } from "./Shared";

export async function WritingList() {
  const t = await getTranslations("writing");
  return (
    <section className="ws-section" id="writing">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="ws-section-sub">{t("sub")}</p>
      </div>

      <a
        className="ws-writing-callout"
        href={MEDIUM}
        target="_blank"
        rel="noreferrer"
      >
        <div className="ws-writing-callout-glow" />
        <div className="ws-writing-callout-left">
          <div className="ws-writing-callout-handle">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span>{t("handle")}</span>
          </div>
          <h3 className="ws-writing-callout-title">
            <Balancer>{t.rich("calloutTitle", richTags)}</Balancer>
          </h3>
          <p className="ws-writing-callout-sub">{t("calloutSub")}</p>
          <div className="ws-writing-topics">
            {WRITING_TOPICS.map((topic) => (
              <span
                key={topic.id}
                className={"ws-writing-topic ws-writing-topic-" + topic.tone}
              >
                {t(`topics.${topic.id}`)}
              </span>
            ))}
          </div>
        </div>
        <div className="ws-writing-callout-cta">
          <span className="ws-writing-callout-link">
            {t("readOnMedium")} <ArrowUpRight size={18} />
          </span>
        </div>
      </a>
    </section>
  );
}
