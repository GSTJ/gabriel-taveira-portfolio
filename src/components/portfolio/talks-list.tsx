import { cva } from "class-variance-authority";
import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { TALKS } from "./data";
import { ArrowUpRight, Eyebrow, richTags } from "./shared";

// A talk's topic tints both the row and the chip that names it.
const talksRow = cva("ws-talks-row", {
  variants: {
    topic: {
      leadership: "ws-talks-topic-leadership",
      tech: "ws-talks-topic-tech",
    },
  },
});

const talksTopicChip = cva("ws-talks-topic-chip", {
  variants: {
    topic: {
      leadership: "ws-talks-topic-chip-leadership",
      tech: "ws-talks-topic-chip-tech",
    },
  },
});

export const TalksList = async () => {
  const t = await getTranslations("talks");
  const tItems = await getTranslations("talks.items");
  return (
    <section className="ws-section" id="talks">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="ws-section-sub">{t("sub")}</p>
      </div>
      <ul className="ws-talks">
        {TALKS.map((talk) => (
          <li key={talk.id} className={talksRow({ topic: talk.topic })}>
            <span className="ws-talks-date">{talk.date}</span>
            <div className="ws-talks-main">
              <div className="ws-talks-title">{tItems(`${talk.id}.title`)}</div>
              <div className="ws-talks-desc">
                {tItems(`${talk.id}.description`)}
              </div>
              <div className="ws-talks-venue">
                <span className={talksTopicChip({ topic: talk.topic })}>
                  {talk.topic === "leadership"
                    ? t("topicLeadership")
                    : t("topicTech")}
                </span>
                <span>
                  {tItems(`${talk.id}.venue`)} · {tItems(`${talk.id}.city`)} ·{" "}
                  {talk.lang}
                </span>
              </div>
            </div>
            <a
              className="ws-talks-link"
              href={talk.href}
              target="_blank"
              rel="noreferrer"
            >
              {tItems(`${talk.id}.hrefLabel`)}
              <span className="ws-talks-link-arrow">
                <ArrowUpRight size={14} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
