import type { ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { EMAIL, EMAIL_ADDR, LINKEDIN } from "../../profile";
import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { NPM_ROWS } from "../projects/data";
import { getNpmLedger } from "../projects/npm";
import { WORK, workDates, workOrgs } from "../work/data";
import { ArrowUp } from "./arrow-up";
import { SERVICES, type Receipt } from "./data";

import styles from "./services.module.css";

const penTag = (chunks: ReactNode) => <PenUnderline>{chunks}</PenUnderline>;

/**
 * Each offer starts from the problem in the buyer's words, says what they
 * get, and lists the receipts: dated outcomes that link to where they
 * happened. Then how an engagement starts, as the email it opens.
 */
export const ServicesSection = async () => {
  const t = await getTranslations("services");
  const tWork = await getTranslations("work");
  const locale = await getLocale();
  const npm = await getNpmLedger();

  const day = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(iso));

  const fields = ["app", "team", "timeline"] as const;
  const draftBody = fields.map((f) => `${t(`start.fields.${f}`)} \n`).join("");
  const mailto = (subject: string) =>
    `${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draftBody)}`;

  /** Where the receipt points, how the citation reads, and the live figure if any. */
  const cite = ({ source }: Receipt) => {
    if ("npm" in source) {
      const row = npm.rows.find((r) => r.id === source.npm);
      const names = NPM_ROWS.find((r) => r.id === source.npm)?.names ?? [];
      return {
        href: `https://www.npmjs.com/package/${names[0]}`,
        label: t("cite.npm", { start: day(npm.start), end: day(npm.end) }),
        external: true,
        figure: new Intl.NumberFormat(locale).format(row?.total ?? 0),
      };
    }
    if ("repo" in source) {
      return { href: source.repo, label: t("cite.github"), external: true };
    }
    if (source.work === "all") {
      return { href: "#work", label: t("cite.all"), external: false };
    }
    const job = WORK.find((item) => item.id === source.work);
    if (!job) throw new Error(`Unknown work row: ${source.work}`);
    return {
      href: `#work-${job.id}`,
      label: workOrgs(job, tWork("independent"))[0],
      dates: workDates(job, tWork("present")),
      external: false,
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

      <div className={cn("t-meta", styles.columns)} aria-hidden="true">
        <span>{t("columns.problem")}</span>
        <span>{t("columns.get")}</span>
        <span>{t("columns.receipts")}</span>
      </div>

      <ol className={styles.ledger}>
        {SERVICES.map((service) => {
          const key = `items.${service.id}` as const;
          return (
            <li key={service.id} className={styles.row} {...reveal()}>
              <div className={styles.problem}>
                <h3 className={cn("t-title", styles.problemTitle)}>
                  {t(`${key}.problem`)}
                </h3>
                <p className={cn("t-small", styles.offer)}>
                  {t(`${key}.title`)}
                </p>
              </div>

              <div className={styles.get}>
                <p className={cn("t-meta", styles.label)}>{t("columns.get")}</p>
                <p className="t-body">{t(`${key}.body`)}</p>
                <a
                  className={cn("t-small", styles.ask)}
                  href={mailto(t(`${key}.title`))}
                >
                  {t("ask")}
                  <ArrowUpRight />
                </a>
              </div>

              <div className={styles.receipts}>
                <p className={cn("t-meta", styles.label)}>
                  {t("columns.receipts")}
                </p>
                <ul>
                  {service.receipts.map((receipt, index) => {
                    const link = cite(receipt);
                    const figure =
                      link.figure ?? t(`${key}.receipts.${receipt.id}.figure`);
                    return (
                      <li
                        key={receipt.id}
                        className={styles.receipt}
                        {...reveal(index + 1)}
                      >
                        {figure ? (
                          <span className={cn("num", styles.figure)}>
                            {figure}
                          </span>
                        ) : null}
                        <p className="t-small">
                          {t(`${key}.receipts.${receipt.id}.text`)}{" "}
                          <a
                            className={styles.cite}
                            href={link.href}
                            {...(link.external
                              ? { target: "_blank", rel: "noreferrer" }
                              : {})}
                          >
                            {link.external ? <ArrowUpRight /> : <ArrowUp />}
                            {link.label}
                            {link.dates ? (
                              <span className={cn("num", styles.dates)}>
                                {link.dates}
                              </span>
                            ) : null}
                          </a>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <div className={styles.start}>
        <div className={styles.startCopy} {...reveal()}>
          <h3 className={cn("t-h1", styles.startTitle)}>{t("start.title")}</h3>
          <p className="t-lede">{t.rich("start.body", { pen: penTag })}</p>
          <div className={styles.actions}>
            <a className="btn" href={mailto(t("start.subject"))}>
              {t("start.open")}
            </a>
            <a
              className="btn btn-ghost"
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              {t("start.linkedin")}
              <ArrowUpRight />
            </a>
          </div>
          <p className={cn("t-small", styles.nda)}>{t("start.nda")}</p>
        </div>

        <figure className={styles.draft} {...reveal(1)}>
          <figcaption className="t-meta">{t("start.draftLabel")}</figcaption>
          <dl className={cn("t-small", styles.headers)}>
            <div>
              <dt>{t("start.to")}</dt>
              <dd>{EMAIL_ADDR}</dd>
            </div>
            <div>
              <dt>{t("start.subjectLabel")}</dt>
              <dd>{t("start.subject")}</dd>
            </div>
          </dl>
          <ul className={cn("t-body", styles.lines)}>
            {fields.map((field) => (
              <li key={field}>{t(`start.fields.${field}`)}</li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
};
