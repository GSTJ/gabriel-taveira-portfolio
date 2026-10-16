import { getLocale, getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { NOW } from "./data";
import { currentMonthLabel } from "./lifeline";
import { richTags } from "./shared";

export const NowPlaying = async () => {
  const t = await getTranslations("now");
  const tItems = await getTranslations("now.items");
  const locale = await getLocale();

  return (
    <section className="gt-section gt-section-tight" id="about">
      <header className="gt-section-head">
        <h2 className="gt-section-title gt-section-title-sm">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="gt-section-sub">
          {t("updated", { date: currentMonthLabel(locale) })}
        </p>
      </header>
      <ul className="gt-table">
        {NOW.map((id) => (
          <li key={id} className="gt-table-row gt-now">
            <span className="gt-now-label">{tItems(`${id}.chip`)}</span>
            <div>
              <h3 className="gt-now-title">{tItems(`${id}.title`)}</h3>
              <p className="gt-now-body">{tItems(`${id}.body`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
