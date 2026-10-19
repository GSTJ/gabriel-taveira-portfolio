import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { LINKEDIN } from "../../profile";
import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { WORK, type WorkItem, workDates, workOrgs } from "./data";
import { ProofFigure } from "./proof";

import styles from "./work.module.css";

/** Blurbs mark their one hard number with `<mark>`. */
const blurbTags = {
  mark: (chunks: ReactNode) => (
    <strong className={cn("num", styles.figure)}>{chunks}</strong>
  ),
};

/** "D-ID" stays on one line: a title never breaks at a name's hyphen. */
const keepHyphens = (text: string) => text.replaceAll(/(\w)-(\w)/g, "$1‑$2");

/** A company site's domain, or nothing when the job only links LinkedIn. */
const domain = (href: string) => {
  const host = new URL(href).hostname.replace(/^www\./, "");
  return host === "linkedin.com" || host.endsWith(".linkedin.com")
    ? undefined
    : host;
};

/**
 * Newest first, one node per job on a spine down the left. Each row says who
 * the work reached, then what shipped, then the one proof its facts allow.
 */
export const WorkSection = async () => {
  const t = await getTranslations("work");
  const present = t("present");

  const link = (item: WorkItem) => {
    if (item.id === "consulting")
      return { href: "#contact", label: t("contact"), out: false };
    const host = domain(item.href);
    return host ? { href: item.href, label: host, out: true } : undefined;
  };

  return (
    <section id="work" className="section wrap" aria-labelledby="work-title">
      <div className="section-head" {...reveal()}>
        <h2 id="work-title" className="t-h2">
          {t("title")}
        </h2>
        <p>{t("sub")}</p>
      </div>

      <ol className={styles.spine}>
        {WORK.map((item) => {
          const go = link(item);
          const orgs = workOrgs(item, t("independent")).join(" · ");
          return (
            <li
              key={item.id}
              id={`work-${item.id}`}
              className={styles.row}
              data-billing={item.billing}
              data-open={item.end === "now" ? "" : undefined}
              {...reveal()}
            >
              <p className={cn("t-small num", styles.when)}>
                {workDates(item, present)}
              </p>
              <div className={styles.main}>
                <h3 className={styles.title}>
                  {keepHyphens(t(`items.${item.id}.title`))}
                </h3>
                <p className={styles.scope}>
                  <span className={styles.term}>{t("scope")}</span>{" "}
                  {t(`items.${item.id}.scope`)}
                </p>
                {item.id === "consulting" ? null : (
                  <p className={cn("t-meta", styles.orgs)}>
                    {keepHyphens(orgs)}
                  </p>
                )}
                <p
                  className={cn(
                    item.billing === "agate" ? "t-small" : "t-body",
                    styles.blurb,
                  )}
                >
                  {t.rich(`items.${item.id}.blurb`, blurbTags)}
                </p>
              </div>
              {item.proofs ? (
                <div className={styles.proofs}>
                  {item.proofs.map((proof) => (
                    <ProofFigure key={proof.kind} proof={proof} />
                  ))}
                </div>
              ) : null}
              {go ? (
                <a
                  className={cn("link-arrow t-small", styles.go)}
                  href={go.href}
                >
                  {go.label}
                  {go.out ? <ArrowUpRight /> : null}
                </a>
              ) : null}
            </li>
          );
        })}
      </ol>

      <a
        className={cn("link-arrow t-small", styles.all)}
        href={LINKEDIN}
        {...reveal()}
      >
        {t("allRoles")}
        <ArrowUpRight />
      </a>
    </section>
  );
};
