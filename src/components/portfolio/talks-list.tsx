import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { TALKS } from "./data";
import { ArrowUpRight, richTags } from "./shared";

export const TalksList = async () => {
  const t = await getTranslations("talks");
  const tItems = await getTranslations("talks.items");

  return (
    <section className="gt-section" id="talks">
      <header className="gt-section-head">
        <h2 className="gt-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="gt-section-sub">{t("sub")}</p>
      </header>
      <ul className="gt-table">
        {TALKS.map((talk) => (
          <li key={talk.id} className="gt-table-row gt-talk">
            <span className="gt-table-year">{talk.date}</span>
            <div className="gt-talk-main">
              <h3 className="gt-talk-title">{tItems(`${talk.id}.title`)}</h3>
              <p className="gt-talk-desc">{tItems(`${talk.id}.description`)}</p>
              <p className="gt-talk-venue">
                {talk.topic === "leadership"
                  ? t("topicLeadership")
                  : t("topicTech")}{" "}
                · {tItems(`${talk.id}.venue`)} · {tItems(`${talk.id}.city`)} ·{" "}
                {talk.lang}
              </p>
            </div>
            <a
              className="gt-link"
              href={talk.href}
              target="_blank"
              rel="noreferrer"
            >
              {tItems(`${talk.id}.hrefLabel`)}
              <ArrowUpRight size={14} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
