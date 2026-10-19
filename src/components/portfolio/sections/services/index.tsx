import type { ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { EMAIL, LINKEDIN } from "../../profile";
import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { TALKS } from "../notes/data";
import { WORK, workDates, workOrgs } from "../work/data";
import { ArrowUp } from "./arrow-up";
import { CaseSwitcher } from "./case-switcher";
import { NPM_WINDOW, SERVICES, type Receipt, type ServiceItem } from "./data";

import styles from "./services.module.css";

const startsTags = {
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
  linkedin: (chunks: ReactNode) => (
    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
};

/**
 * "Which one sounds like your team?": the four offers told from the buyer's
 * side. Pick a problem, see what you get, the receipts from jobs and open
 * source that prove it, and a first email already drafted.
 */
export const ServicesSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations("services");
  const tWork = await getTranslations("work");
  const tNotes = await getTranslations("notes");
  const format = new Intl.NumberFormat(locale);

  const source = ({ source: s }: Receipt) => {
    if ("work" in s) {
      const job = WORK.find((item) => item.id === s.work);
      if (!job) throw new Error(`Unknown work row: ${s.work}`);
      const [org] = workOrgs(job, tWork("independent"));
      return {
        href: `#work-${job.id}`,
        label: `${org} ${workDates(job, tWork("present"))}`,
      };
    }
    if ("history" in s) {
      const first = WORK.at(-1)?.start;
      return { href: "#work", label: `${t("sources.history")} ${first}` };
    }
    if ("talk" in s) {
      const talk = TALKS.find((item) => item.id === s.talk);
      return {
        href: "#notes-talks",
        label: `${t("sources.talk")} ${tNotes(`talks.items.${s.talk}.venue`)}, ${talk?.date}`,
      };
    }
    return {
      href: s.repo,
      external: true,
      label: t("sources.npm", { name: s.npm, ...NPM_WINDOW }),
    };
  };

  const mailto = (service: ServiceItem) => {
    const subject = t(`items.${service.id}.title`);
    const body = ["app", "team", "timeline"]
      .map((field) => `${t(`mail.${field}`)}: `)
      .join("\n\n");
    return `${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${body}\n`)}`;
  };

  const panel = (service: ServiceItem) => (
    <>
      <h3 className={cn("t-h1", styles.offer)}>
        {t(`items.${service.id}.title`)}
      </h3>
      <p className={cn("t-lede", styles.get)}>
        {t(`items.${service.id}.body`)}
      </p>
      <p className={cn("t-meta", styles.receiptsLabel)}>{t("receiptsLabel")}</p>
      <ul className={styles.receipts}>
        {service.receipts.map((receipt, index) => {
          const src = source(receipt);
          const figure =
            typeof receipt.figure === "number"
              ? format.format(receipt.figure)
              : receipt.figure;
          return (
            <li key={receipt.id} className={styles.receipt}>
              {figure ? (
                <span className={cn("num", styles.figure)}>
                  {/* The one pen moment: the section's strongest number. */}
                  {service.id === "audit" && index === 0 ? (
                    <PenUnderline delay={400}>{figure}</PenUnderline>
                  ) : (
                    figure
                  )}
                </span>
              ) : null}
              <span className={cn("t-body", styles.what)}>
                {t(`items.${service.id}.receipts.${receipt.id}`)}
              </span>
              <a
                className={cn("t-meta num", styles.cite)}
                href={src.href}
                {...(src.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {src.external ? <ArrowUpRight /> : <ArrowUp />}
                {src.label}
              </a>
            </li>
          );
        })}
      </ul>
      <a className={cn("btn btn-small", styles.start)} href={mailto(service)}>
        {t("cta")}
      </a>
    </>
  );

  const cases = SERVICES.map((service) => ({
    id: service.id,
    problem: t(`items.${service.id}.problem`),
    panel: panel(service),
  }));

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
      <div {...reveal(1)}>
        <CaseSwitcher copy={{ label: t("tabsLabel"), cases }} />
      </div>
      <p className={cn("t-body", styles.starts)} {...reveal(2)}>
        {t.rich("starts", startsTags)}
      </p>
    </section>
  );
};
