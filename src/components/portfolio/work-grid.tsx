import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { WORK } from "./data";
import { ArrowUpRight, richTags } from "./shared";

const blurbTags = { mark: (chunks: ReactNode) => <strong>{chunks}</strong> };

export const WorkGrid = async () => {
  const t = await getTranslations("work");
  return (
    <section className="ws-section folio-work" id="work">
      <div className="ws-section-head">
        <h2 className="ws-section-title">{t.rich("title", richTags)}</h2>
        <p className="ws-section-sub">{t("sub")}</p>
      </div>
      <div className="folio-work-list">
        {WORK.map((item) => (
          <a
            className="folio-work-row"
            id={`work-${item.id}`}
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer"
          >
            <div className="folio-work-company">
              <span>{item.eyebrow.split(" · ")[0]}</span>
              <span>{item.eyebrow.split(" · ").slice(1).join(" / ")}</span>
            </div>
            <div className="folio-work-main">
              <h3>{t(`items.${item.id}.title`)}</h3>
              <p>{t.rich(`items.${item.id}.blurb`, blurbTags)}</p>
              <div className="folio-work-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <span className="folio-work-arrow" aria-hidden="true">
              <ArrowUpRight size={24} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};
