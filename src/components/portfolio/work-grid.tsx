import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { cn } from "@/utils/cn";

import { WORK, type WorkItem } from "./data";
import { ArrowUpRight, Led, richTags, Tag } from "./shared";

/**
 * The career as ruled spec rows, billed like poster credits: the current
 * engagement, then Coinbase at top billing, then the main roles, then the
 * early jobs in small print at the foot.
 */
export const WorkGrid = async () => {
  const t = await getTranslations("work");
  const tItems = await getTranslations("work.items");

  const years = (w: WorkItem) =>
    `${w.start} → ${w.end === "now" ? t("now") : w.end}`;

  const rows = WORK.filter((w) => w.billing !== "agate");
  const agate = WORK.filter((w) => w.billing === "agate");

  return (
    <section className="gt-section" id="work">
      <header className="gt-section-head">
        <h2 className="gt-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="gt-section-sub">{t("sub")}</p>
      </header>

      <div className="gt-record">
        <ol className="gt-rows">
          {rows.map((w) => (
            <li key={w.id} className={cn("gt-row", `gt-row-${w.billing}`)}>
              <div className="gt-row-org">
                <p className="gt-row-name">
                  {w.billing === "current" && <Led on />}
                  {w.orgs[0]}
                </p>
                <p className="gt-row-meta">
                  {w.orgs.slice(1).map((o) => (
                    <span key={o}>{o} · </span>
                  ))}
                  <span className="gt-row-years">{years(w)}</span>
                </p>
              </div>
              <div className="gt-row-main">
                <h3 className="gt-row-title">{tItems(`${w.id}.title`)}</h3>
                <p className="gt-row-blurb">
                  {tItems.rich(`${w.id}.blurb`, richTags)}
                </p>
                <div className="gt-row-foot">
                  <div className="gt-tags">
                    {w.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <a
                    className="gt-link"
                    href={w.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {tItems(`${w.id}.cta`)}
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="gt-agate">
          <h3 className="gt-agate-title">{t("earlier")}</h3>
          <ul>
            {agate.map((w) => (
              <li key={w.id}>
                <span className="gt-agate-years">{years(w)}</span>
                <span>
                  <strong>{w.orgs[0]}</strong>: {tItems(`${w.id}.title`)}.{" "}
                  {tItems.rich(`${w.id}.blurb`, richTags)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
