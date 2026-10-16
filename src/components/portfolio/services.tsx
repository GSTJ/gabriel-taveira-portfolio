import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { ENGAGEMENT_STEPS, SERVICES } from "./data";
import { Callout, Led, richTags } from "./shared";

/**
 * The offers as a manual's control diagram: a panel of numbered keys and the
 * legend that explains them. Pointing at a legend entry presses its key and
 * lights its LED, done in CSS with `:has()`, so it needs no client JS.
 */
export const Services = async () => {
  const t = await getTranslations("services");
  const tItems = await getTranslations("services.items");

  return (
    <section className="gt-section" id="services">
      <header className="gt-section-head">
        <h2 className="gt-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="gt-section-sub">{t("sub")}</p>
      </header>

      <div className="gt-functions">
        <div className="gt-panel" aria-hidden>
          <div className="gt-panel-keys">
            {SERVICES.map((id, i) => (
              <div key={id} className="gt-panel-key" data-fn={i + 1}>
                <Led />
                <span className="gt-panel-cap">{i + 1}</span>
                <span className="gt-panel-label">{tItems(`${id}.chip`)}</span>
              </div>
            ))}
          </div>
          <div className="gt-grille gt-grille-strip" />
        </div>

        <ol className="gt-legend">
          {SERVICES.map((id, i) => (
            <li key={id} className="gt-legend-item" data-fn={i + 1}>
              <Callout n={i + 1} />
              <div>
                <h3 className="gt-legend-title">{tItems(`${id}.title`)}</h3>
                <p className="gt-legend-body">{tItems(`${id}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/** The operating sequence. Numbered because the order is the information. */
export const Engagement = async () => {
  const t = await getTranslations("engagement");

  return (
    <section className="gt-section gt-section-tight" id="engagement">
      <header className="gt-section-head">
        <h2 className="gt-section-title gt-section-title-sm">
          <Balancer>{t("title")}</Balancer>
        </h2>
        <p className="gt-section-sub">{t("sub")}</p>
      </header>
      <ol className="gt-steps">
        {ENGAGEMENT_STEPS.map((id, i) => (
          <li key={id} className="gt-step">
            <Callout n={i + 1} />
            <h3 className="gt-step-title">{t(`steps.${id}.title`)}</h3>
            <p className="gt-step-body">{t(`steps.${id}.body`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};
