import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { cn } from "@/utils/cn";

import { AWARDS } from "./data";
import { richTags } from "./shared";

export const Awards = async () => {
  const t = await getTranslations("awards");

  return (
    <section className="gt-section gt-section-tight" id="awards">
      <header className="gt-section-head">
        <h2 className="gt-section-title gt-section-title-sm">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="gt-section-sub">{t("sub")}</p>
      </header>
      <ul className="gt-table">
        {AWARDS.map((a) => (
          <li key={a.id} className="gt-table-row gt-award">
            <span className="gt-table-year">{a.year}</span>
            <span className="gt-award-title">{t(`items.${a.id}`)}</span>
            <span
              className={cn(
                "gt-award-place",
                a.position === "first" && "gt-award-first",
              )}
            >
              {t(`positions.${a.position}`)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
