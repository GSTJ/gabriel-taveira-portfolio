import type { ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { LINKEDIN } from "../../profile";
import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import {
  ARTIFACTS,
  OPEN_BY_DEFAULT,
  WORK,
  type WorkArtifact,
  type WorkItem,
  workDates,
  workOrgs,
} from "./data";
import { OpenOnHash } from "./open-on-hash";

import styles from "./work.module.css";

/** Blurbs mark their one hard number with `<mark>`. */
const blurbTags = {
  mark: (chunks: ReactNode) => (
    <strong className={cn("num", styles.figure)}>{chunks}</strong>
  ),
};

/** The one scope line that carries the pen marks it with `<pen>`. */
const scopeTags = {
  pen: (chunks: ReactNode) => <PenUnderline delay={400}>{chunks}</PenUnderline>,
};

/** "D-ID" stays on one line: a title never breaks at a name's hyphen. */
const keepHyphens = (text: string) =>
  text.replaceAll(/(\w)-(\w)/g, "$1\u2011$2");

const host = (href: string) => new URL(href).hostname.replace(/^www\./, "");

const MergedIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6" cy="5" r="2.25" />
    <circle cx="6" cy="19" r="2.25" />
    <circle cx="18" cy="13" r="2.25" />
    <path d="M6 7.25v9.5M6 7.25c0 4 3.5 5.75 9.75 5.75" />
  </svg>
);

/** The merged PR as GitHub would list it: repo, number, title, date. */
const PullRequest = ({
  pr,
  caption,
  merged,
}: {
  pr: WorkArtifact;
  caption: string;
  merged: string;
}) => (
  <a className={styles.pr} href={pr.href}>
    <span className={cn("t-meta", styles.prRepo)}>
      <MergedIcon />
      {pr.repo} <span className="num">#{pr.number}</span>
    </span>
    <code className={cn("t-mono", styles.prTitle)}>{pr.title}</code>
    <span className={cn("t-meta", styles.prFoot)}>
      <span>{caption}</span>
      <span className="num">{merged}</span>
    </span>
  </a>
);

/**
 * Newest first. Each job is one line of the story (when, who the work
 * reached, where), and opens to what shipped and the links that prove it.
 */
export const WorkSection = async () => {
  const t = await getTranslations("work");
  const locale = await getLocale();
  const present = t("present");
  const date = (iso: string) =>
    new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
      new Date(`${iso}T12:00:00Z`),
    );

  const link = (item: WorkItem) => {
    if (item.id === "consulting") {
      return (
        <a className="link-arrow t-small" href="#contact">
          {t("contact")}
          <ArrowUpRight />
        </a>
      );
    }
    if (item.href === LINKEDIN) return null;
    return (
      <a className="link-arrow t-small" href={item.href}>
        {host(item.href)}
        <ArrowUpRight />
      </a>
    );
  };

  return (
    <section id="work" className="section wrap" aria-labelledby="work-title">
      <div className="section-head" {...reveal()}>
        <h2 id="work-title" className="t-h2">
          {t("title")}
        </h2>
        <p>{t("sub")}</p>
      </div>

      <div className={styles.ledger}>
        {WORK.map((item, index) => {
          const artifact = ARTIFACTS[item.id];
          const go = link(item);
          return (
            <details
              key={item.id}
              id={`work-${item.id}`}
              className={styles.job}
              data-billing={item.billing}
              open={OPEN_BY_DEFAULT.includes(item.id)}
              {...reveal(index)}
            >
              <summary className={styles.line}>
                <span className={cn("t-small num", styles.when)}>
                  {workDates(item, present)}
                </span>
                <span className={styles.scope}>
                  <h3 className={styles.scopeText}>
                    {t.rich(`items.${item.id}.scope`, scopeTags)}
                  </h3>
                  {item.id === "consulting" ? null : (
                    <span className="t-meta">
                      {keepHyphens(workOrgs(item, t("independent")).join(" · "))}
                    </span>
                  )}
                </span>
                {t.has(`items.${item.id}.figure`) ? (
                  <span className={cn("t-small num", styles.stat)}>
                    {t(`items.${item.id}.figure`)}
                  </span>
                ) : null}
                <span className={styles.toggle} aria-hidden>
                  <span />
                  <span />
                </span>
              </summary>

              <div className={styles.body}>
                <p className={cn("t-title", styles.title)}>
                  {keepHyphens(t(`items.${item.id}.title`))}
                </p>
                <p className={cn("t-body", styles.blurb)}>
                  {t.rich(`items.${item.id}.blurb`, blurbTags)}
                </p>
                {artifact ? (
                  <PullRequest
                    pr={artifact}
                    caption={t("pr.caption")}
                    merged={t("pr.merged", { date: date(artifact.merged) })}
                  />
                ) : null}
                {go ? <p className={styles.go}>{go}</p> : null}
              </div>
            </details>
          );
        })}
      </div>

      <p className={styles.history} {...reveal()}>
        <a className="link-arrow t-small" href={LINKEDIN}>
          {t("history")}
          <ArrowUpRight />
        </a>
      </p>

      <OpenOnHash />
    </section>
  );
};
