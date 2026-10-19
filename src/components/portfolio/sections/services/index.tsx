import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { EMAIL, LINKEDIN } from "../../profile";
import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { WORK, workDates, workOrgs } from "../work/data";
import { ArrowUp } from "./arrow-up";
import { READ_ON, SERVICES, type ServiceNote } from "./data";

import styles from "./services.module.css";

const noteId = (n: number) => `services-note-${n}`;
const refId = (n: number) => `services-ref-${n}`;

const startTags = {
  pen: (chunks: ReactNode) => <PenUnderline delay={400}>{chunks}</PenUnderline>,
};

/**
 * The first page of a scope: one paragraph per offer, every claim carrying a
 * numbered note with where it happened, when, and a link to check it.
 */
export const ServicesSection = async () => {
  const t = await getTranslations("services");
  const tWork = await getTranslations("work");

  const sources = (note: ServiceNote) => {
    if ("work" in note) {
      const job = WORK.find((item) => item.id === note.work);
      if (!job) throw new Error(`Unknown work row: ${note.work}`);
      return [
        {
          href: `#work-${job.id}`,
          label: workOrgs(job, tWork("independent"))[0],
          meta: workDates(job, tWork("present")),
          external: false,
        },
      ];
    }
    if ("anchor" in note) {
      return [
        {
          href: `#${note.anchor}`,
          label: t(note.anchor === "work" ? "sources.work" : "sources.talks"),
          meta: undefined,
          external: false,
        },
      ];
    }
    return note.links.map((link) => ({
      href: link.href,
      label: t(`sources.${link.source}`),
      meta: link.source === "npm" ? READ_ON : undefined,
      external: true,
    }));
  };

  // Notes are numbered across the whole letter, in reading order.
  const rows = SERVICES.map((service, index) => ({
    service,
    first:
      1 + SERVICES.slice(0, index).reduce((sum, s) => sum + s.notes.length, 0),
  }));

  const marker = (n: number, k: number) => (chunks: ReactNode) => (
    <>
      <span className={styles.claim}>{chunks}</span>
      <sup className={styles.sup}>
        <a
          id={refId(n)}
          href={`#${noteId(n)}`}
          className={cn("num", styles.ref)}
          data-k={k}
          aria-label={t("noteRef", { n })}
          aria-describedby={`${noteId(n)}-text`}
        >
          {n}
        </a>
      </sup>
    </>
  );

  const draft = `${EMAIL}?subject=${encodeURIComponent(
    t("start.subject"),
  )}&body=${encodeURIComponent(
    [t("start.app"), t("start.team"), t("start.timeline")]
      .map((field) => `${field}: \n`)
      .join(""),
  )}`;

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
      <div className={styles.letter}>
        {rows.map(({ service, first }) => (
          <div key={service.id} className={styles.row} {...reveal()}>
            <div className={styles.text}>
              <h3 className="t-title">{t(`items.${service.id}.title`)}</h3>
              <p className={cn("t-lede", styles.para)}>
                {t.rich(
                  `items.${service.id}.letter`,
                  Object.fromEntries(
                    service.notes.map((_, i) => [
                      `n${i + 1}`,
                      marker(first + i, i + 1),
                    ]),
                  ),
                )}
              </p>
            </div>
            <ol className={styles.notes}>
              {service.notes.map((note, i) => {
                const n = first + i;
                return (
                  <li
                    key={n}
                    id={noteId(n)}
                    value={n}
                    className={styles.note}
                    data-k={i + 1}
                  >
                    <a
                      href={`#${refId(n)}`}
                      className={cn("num", styles.back)}
                      aria-label={t("noteBack", { n })}
                    >
                      {n}
                    </a>
                    <div className={styles.noteBody}>
                      <p id={`${noteId(n)}-text`} className="t-small">
                        {t(`items.${service.id}.notes.n${i + 1}`)}
                      </p>
                      <p className={styles.sources}>
                        {sources(note).map((source) => (
                          <a
                            key={source.href}
                            href={source.href}
                            className={cn("t-meta", styles.source)}
                          >
                            {source.label}
                            {source.meta ? (
                              <span className={cn("num", styles.meta)}>
                                {source.meta}
                              </span>
                            ) : null}
                            {source.external ? <ArrowUpRight /> : <ArrowUp />}
                          </a>
                        ))}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
      <div className={styles.start} {...reveal()}>
        <p className={cn("t-lede", styles.para)}>
          {t.rich("start.body", startTags)}
        </p>
        <div className={styles.actions}>
          <a className="btn" href={draft}>
            {t("start.email")}
          </a>
          <a className="btn btn-ghost link-arrow" href={LINKEDIN}>
            {t("start.linkedin")}
            <ArrowUpRight />
          </a>
        </div>
        <p className={cn("t-meta", styles.nda)}>{t("start.nda")}</p>
      </div>
    </section>
  );
};
