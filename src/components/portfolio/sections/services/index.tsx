import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import { reveal, timingStyle } from "../../ui/motion";
import { WORK, workDates, workOrgs } from "../work/data";
import { ArrowUp } from "./arrow-up";
import {
  ENGAGEMENT_STEPS,
  type ReceiptSource,
  SERVICES,
  type ServiceItem,
} from "./data";

import styles from "./services.module.css";

type Cite = { href: string; label: string; dates?: string; external?: true };

/** The arrow rides on the last word, so it never wraps onto a line alone. */
const citeText = ({ label, dates, external }: Cite) => {
  const arrow = external ? <ArrowUpRight /> : <ArrowUp />;
  const glue = (text: ReactNode) => (
    <span className={styles.glue}>
      {text}
      {arrow}
    </span>
  );
  if (dates) {
    return (
      <>
        {label} {glue(<span className={cn("num", styles.dates)}>{dates}</span>)}
      </>
    );
  }
  const cut = label.lastIndexOf(" ");
  return (
    <>
      {label.slice(0, cut + 1)}
      {glue(label.slice(cut + 1))}
    </>
  );
};

const figure = (chunks: ReactNode) => <strong className="num">{chunks}</strong>;

/** The four offers, each with dated outcomes that link to their source, then how an engagement runs. */
export const ServicesSection = async () => {
  const t = await getTranslations("services");
  const tWork = await getTranslations("work");

  const cite = (source: ReceiptSource): Cite => {
    if ("pr" in source) {
      const { repo, name, number, year } = source.pr;
      return {
        href: `https://github.com/${repo}/pull/${number}`,
        label: t("proofs.pr", { name, number }),
        dates: String(year),
        external: true,
      };
    }
    if (source.work === "all")
      return { href: "#work", label: t("proofs.work") };
    const job = WORK.find((item) => item.id === source.work);
    if (!job) throw new Error(`Unknown work row: ${source.work}`);
    return {
      href: `#work-${job.id}`,
      label: workOrgs(job, tWork("independent"))[0] ?? "",
      dates: workDates(job, tWork("present")),
    };
  };

  const receipts = (service: ServiceItem) => (
    <ul className={styles.receipts}>
      {service.receipts.map((receipt, index) => {
        const source = cite(receipt.source);
        return (
          <li
            key={receipt.id}
            className={styles.receipt}
            {...reveal(index + 1)}
          >
            <p className="t-small">
              {t.rich(`items.${service.id}.receipts.${receipt.id}`, {
                b: figure,
              })}
            </p>
            <a className={cn("t-meta", styles.cite)} href={source.href}>
              {citeText(source)}
            </a>
          </li>
        );
      })}
    </ul>
  );

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
              <p className={cn("t-meta", styles.proofLabel)}>
                {t("proofs.label")}
              </p>
              {receipts(service)}
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.flow}>
        <h3 className={cn("t-title", styles.flowTitle)} {...reveal()}>
          {t("engagement.title")}
        </h3>
        <ol className={styles.steps} data-draw="" suppressHydrationWarning>
          {ENGAGEMENT_STEPS.map((step, index) => (
            <li key={step} style={timingStyle({ index })}>
              <strong className="t-title">
                {t(`engagement.steps.${step}.title`)}
              </strong>
              <p className="t-body">{t(`engagement.steps.${step}.body`)}</p>
              <p className={styles.out}>
                <span className="t-meta">{t("engagement.out")}</span>
                <span className="t-small">
                  {t(`engagement.steps.${step}.out`)}
                </span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
