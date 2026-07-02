import { getTranslations } from "next-intl/server";
import { TALKS } from "./data";
import { ArrowUpRight, Eyebrow, richTags } from "./Shared";

export async function TalksList() {
  const t = await getTranslations("talks");
  const tItems = await getTranslations("talks.items");
  return (
    <section className="ws-section" id="talks">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">{t.rich("title", richTags)}</h2>
        <p className="ws-section-sub">{t("sub")}</p>
      </div>
      <ul className="ws-talks">
        {TALKS.map((talk, i) => (
          <li
            key={talk.id}
            className={"ws-talks-row ws-talks-topic-" + talk.topic}
            style={{ "--step": Math.min(i, 3) } as React.CSSProperties}
          >
            <span className="ws-talks-date">{talk.date}</span>
            <div className="ws-talks-main">
              <div className="ws-talks-title">{tItems(`${talk.id}.title`)}</div>
              <div className="ws-talks-desc">
                {tItems(`${talk.id}.description`)}
              </div>
              <div className="ws-talks-venue">
                <span
                  className={
                    "ws-talks-topic-chip ws-talks-topic-chip-" + talk.topic
                  }
                >
                  {talk.topic === "leadership"
                    ? t("topicLeadership")
                    : t("topicTech")}
                </span>
                <span>
                  {tItems(`${talk.id}.venue`)} ·{" "}
                  {tItems(`${talk.id}.city`)} · {talk.lang}
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
}
