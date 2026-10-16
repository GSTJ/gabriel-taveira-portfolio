import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { MEDIUM, WRITING_TOPICS } from "./data";
import { ArrowUpRight, richTags, Tag } from "./shared";

export const WritingList = async () => {
  const t = await getTranslations("writing");

  return (
    <section className="gt-section gt-section-tight" id="writing">
      <header className="gt-section-head">
        <h2 className="gt-section-title gt-section-title-sm">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="gt-section-sub">{t("sub")}</p>
      </header>
      <div className="gt-writing">
        <div className="gt-tags">
          {WRITING_TOPICS.map((id) => (
            <Tag key={id}>{t(`topics.${id}`)}</Tag>
          ))}
        </div>
        <a className="gt-key" href={MEDIUM} target="_blank" rel="noreferrer">
          {t("readOnMedium")}
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
};
