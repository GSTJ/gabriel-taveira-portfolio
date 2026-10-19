import { getTranslations } from "next-intl/server";

import { reveal } from "../../ui/motion";
import { ENGAGEMENT_STEPS, SERVICES } from "./data";

import styles from "./services.module.css";

/** Placeholder: the four offers, then how an engagement runs (from #425). */
export const ServicesSection = async () => {
  const t = await getTranslations("services");

  return (
    <section
      id="services"
      className="section wrap"
      aria-labelledby="services-title"
    >
      <div className="section-head" {...reveal()}>
        <h2 id="services-title" className="t-h2">
          {t("title")}
        </h2>
        <p>{t("sub")}</p>
      </div>
      <ul className={styles.grid}>
        {SERVICES.map((service, index) => (
          <li key={service.id} className={styles.item} {...reveal(index)}>
            <h3 className="t-title">{t(`items.${service.id}.title`)}</h3>
            <p className="t-body">{t(`items.${service.id}.body`)}</p>
          </li>
        ))}
      </ul>
      <div className={styles.flow}>
        <h3 className="t-title" {...reveal()}>
          {t("engagement.title")}
        </h3>
        <p className="t-body">{t("engagement.sub")}</p>
        <ol className={styles.steps}>
          {ENGAGEMENT_STEPS.map((step, index) => (
            <li key={step} {...reveal(index)}>
              <strong>{t(`engagement.steps.${step}.title`)}</strong>
              <p className="t-body">{t(`engagement.steps.${step}.body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
