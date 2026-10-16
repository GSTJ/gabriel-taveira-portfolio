import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { SERVICES } from "./data";
import { chip, Eyebrow, richTags } from "./shared";

/** Same row layout as the "Now" list, so it needs no CSS of its own. */
export const Services = async () => {
  const t = await getTranslations("services");
  const tItems = await getTranslations("services.items");

  return (
    <section className="ws-section ws-now-section" id="services">
      <div className="ws-section-head">
        <Eyebrow accent>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="ws-section-sub">{t("sub")}</p>
      </div>
      <ul className="ws-now-list">
        {SERVICES.map((s) => (
          <li key={s.id} className="ws-now-row">
            <span className={chip({ tone: s.tone })}>
              <span className="ws-chip-dot" />
              {tItems(`${s.id}.chip`)}
            </span>
            <div className="ws-now-row-main">
              <h3 className="ws-now-row-title">{tItems(`${s.id}.title`)}</h3>
              <p className="ws-now-row-body">{tItems(`${s.id}.body`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
