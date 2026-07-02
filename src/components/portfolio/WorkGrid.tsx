import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { WORK, type WorkItem } from "./data";
import { Mark } from "./Mark";
import { ArrowUpRight, Eyebrow, richTags } from "./Shared";

/* The eyebrow strings in `data.ts` read "COMPANY · VIA · 2024 → 25" —
   the last token is always the date range, everything before it is the
   employer chain. Split them so the ledger can put dates in their own
   column. */
function splitEyebrow(eyebrow: string) {
  const parts = eyebrow.split(" · ");
  return {
    date: parts[parts.length - 1] ?? "",
    company: parts.slice(0, -1).join(" · "),
  };
}

async function WorkRow({ item, index }: { item: WorkItem; index: number }) {
  const t = await getTranslations(`work.items.${item.id}`);
  const { date, company } = splitEyebrow(item.eyebrow);

  return (
    <li>
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="ws-work-row"
      >
        <span className="ws-work-row-idx" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="ws-work-row-date">{date}</span>
        <div className="ws-work-row-main">
          <span className="ws-work-row-co">{company}</span>
          <h3 className="ws-work-row-title">{t("title")}</h3>
          <p className="ws-work-row-blurb">
            {t.rich("blurb", {
              mark: (chunks: ReactNode) => <Mark>{chunks}</Mark>,
            })}
          </p>
          <p className="ws-work-row-tags">{item.tags.join(" · ")}</p>
        </div>
        <span className="ws-work-row-cta">
          {t("cta")} <ArrowUpRight size={13} />
        </span>
      </a>
    </li>
  );
}

export async function WorkGrid() {
  const t = await getTranslations("work");
  return (
    <section className="ws-section" id="work">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">{t.rich("title", richTags)}</h2>
        <p className="ws-section-sub">{t("sub")}</p>
      </div>
      <ol className="ws-work-list">
        {WORK.map((w, i) => (
          <WorkRow key={w.id} item={w} index={i} />
        ))}
      </ol>
    </section>
  );
}
