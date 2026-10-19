import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { reveal, timingStyle } from "../../ui/motion";
import { WORK, workDates, workOrgs } from "../work/data";
import { ArrowUp } from "./arrow-up";
import { ENGAGEMENT_STEPS, SERVICES, type ServiceProof } from "./data";

import styles from "./services.module.css";

/** The four offers, each citing the job that proves it, then how an engagement runs. */
export const ServicesSection = async () => {
  const t = await getTranslations("services");
  const tWork = await getTranslations("work");

  const proofLink = (proof: ServiceProof) => {
    if (proof === "work") return { href: "#work", org: t("proofs.work") };
    const job = WORK.find((item) => item.id === proof);
    if (!job) throw new Error(`Unknown work row: ${proof}`);
    return {
      href: `#work-${job.id}`,
      org: workOrgs(job, tWork("independent"))[0],
      dates: workDates(job, tWork("present")),
    };
  };

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
      <ul className={styles.offers}>
        {SERVICES.map((service) => (
          <li key={service.id} className={styles.offer} {...reveal()}>
            <h3 className="t-title">{t(`items.${service.id}.title`)}</h3>
            <p className={cn("t-body", styles.body)}>
              {t(`items.${service.id}.body`)}
            </p>
            <div className={styles.proof}>
              <p className="t-meta">{t("proofs.label")}</p>
              <ul>
                {service.proofs.map(proofLink).map((link) => (
                  <li key={link.href}>
                    <a className={cn("t-small", styles.cite)} href={link.href}>
                      <ArrowUp />
                      <span>
                        {link.org}
                        {link.dates ? (
                          <span className={cn("num", styles.dates)}>
                            {link.dates}
                          </span>
                        ) : null}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.flow}>
        <h3 className={cn("t-title", styles.flowTitle)} {...reveal()}>
          {t("engagement.title")}
        </h3>
        <p className={cn("t-body", styles.flowSub)} {...reveal(1)}>
          {t("engagement.sub")}
        </p>
        <ol className={styles.steps} data-draw="" suppressHydrationWarning>
          {ENGAGEMENT_STEPS.map((step, index) => (
            <li key={step} style={timingStyle({ index })}>
              <strong className="t-title">
                {t(`engagement.steps.${step}.title`)}
              </strong>
              <p className="t-body">{t(`engagement.steps.${step}.body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
