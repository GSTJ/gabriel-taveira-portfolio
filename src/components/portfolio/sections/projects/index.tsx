import type { CSSProperties, ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { CurvinhaCard } from "./curvinha-card";
import {
  CURVINHA_STEPS,
  PEGADA_LAUNCH_HREF,
  PEGAVA_HREF,
  PROJECTS,
  SECURITY_PRS,
  STARS,
  STARS_READ_ON,
} from "./data";
import { ModalDemo } from "./modal-demo";
import { getNpmLedger } from "./npm";
import { SafeJsxDemo } from "./safe-jsx-demo";

import styles from "./projects.module.css";

const href = (id: (typeof PROJECTS)[number]["id"]) =>
  PROJECTS.find((p) => p.id === id)?.href ?? "";

/** A `t.rich` tag that renders its chunk as a link. */
const linkTo = (url: string) => (chunks: ReactNode) => (
  <a href={url}>{chunks}</a>
);

const Star = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7z" />
  </svg>
);

/**
 * Things he made, as a bento where each card proves its claim its own way:
 * Curvinha's real screens, magic-modal running for real, safe-jsx's stray 0,
 * npm numbers with their date and source, and the merged security fixes by
 * diff size.
 */
export const ProjectsSection = async () => {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const npm = await getNpmLedger();

  const fmt = new Intl.NumberFormat(locale);
  const day = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`));
  const stars = (count: number) => t("stars", { count: fmt.format(count) });

  const maxDownloads = Math.max(...npm.rows.map((r) => r.total));
  const maxDiff = Math.max(
    ...SECURITY_PRS.map((pr) => pr.additions + pr.deletions),
  );

  return (
    <section
      id="projects"
      className="section wrap"
      aria-labelledby="projects-title"
    >
      <div className="section-head" {...reveal()}>
        <h2 id="projects-title" className="t-h2">
          {t("title")}
        </h2>
        <p>{t("sub")}</p>
      </div>

      <div className={styles.bento}>
        <div className={styles.areaCv} {...reveal()}>
          <CurvinhaCard
            href={href("curvinha")}
            lang={locale.startsWith("pt") ? "pt" : "en"}
            copy={{
              title: t("items.curvinha.title"),
              role: t("items.curvinha.role"),
              body: t("items.curvinha.body"),
              cta: t("items.curvinha.cta"),
              caption: t("items.curvinha.caption"),
              stepsLabel: t("items.curvinha.stepsLabel"),
              steps: Object.fromEntries(
                CURVINHA_STEPS.map((step) => [
                  step,
                  {
                    title: t(`items.curvinha.steps.${step}.title`),
                    body: t(`items.curvinha.steps.${step}.body`),
                    alt: t(`items.curvinha.steps.${step}.alt`),
                  },
                ]),
              ) as Parameters<typeof CurvinhaCard>[0]["copy"]["steps"],
            }}
          />
        </div>

        <article
          className={cn(styles.card, styles.lib, styles.areaMm)}
          aria-labelledby="mm-title"
          {...reveal(1)}
        >
          <div className={styles.cardTop}>
            <h3 id="mm-title" className="t-title">
              {t("items.magicModal.title")}
            </h3>
            <a
              className={styles.stars}
              href={href("magicModal")}
              aria-label={`${t("items.magicModal.title")}, ${stars(STARS.magicModal)}`}
            >
              <Star />
              <span className="num">{fmt.format(STARS.magicModal)}</span>
            </a>
          </div>
          <p className="t-small">{t("items.magicModal.body")}</p>
          <pre className={styles.code} aria-label={t("codeLabel")}>
            <code>
              <span className={styles.k}>const</span>
              {" result = "}
              <span className={styles.k}>await</span>
              {" magicModal.show(\n  Confirm,\n);\n"}
              <span className={styles.c}>{t("items.magicModal.comment")}</span>
            </code>
          </pre>
          <ModalDemo
            copy={{
              run: t("items.magicModal.run"),
              idle: t("items.magicModal.idle"),
              loading: t("items.magicModal.loading"),
              pending: t("items.magicModal.pending"),
              resolved: t("items.magicModal.resolved"),
              failed: t("items.magicModal.failed"),
              hint: t("items.magicModal.hint"),
              modal: {
                label: t("items.magicModal.modal.label"),
                title: t("items.magicModal.modal.title"),
                body: t("items.magicModal.modal.body"),
                yes: t("items.magicModal.modal.yes"),
                no: t("items.magicModal.modal.no"),
              },
            }}
          />
        </article>

        <article
          className={cn(styles.card, styles.lib, styles.areaSj)}
          aria-labelledby="sj-title"
          {...reveal(2)}
        >
          <div className={styles.cardTop}>
            <h3 id="sj-title" className="t-title">
              {t("items.safeJsx.title")}
            </h3>
            <a
              className={styles.stars}
              href={href("safeJsx")}
              aria-label={`${t("items.safeJsx.title")}, ${stars(STARS.safeJsx)}`}
            >
              <Star />
              <span className="num">{fmt.format(STARS.safeJsx)}</span>
            </a>
          </div>
          <p className="t-small">{t("items.safeJsx.short")}</p>
          <SafeJsxDemo
            copy={{
              codeLabel: t("codeLabel"),
              countLabel: t("items.safeJsx.countLabel"),
              fix: t("items.safeJsx.fix"),
              inbox: t("items.safeJsx.inbox"),
              stray: t("items.safeJsx.stray"),
              strayLabel: t("items.safeJsx.strayLabel"),
              badgeLabel: t("items.safeJsx.badgeLabel"),
              nothing: t("items.safeJsx.nothing"),
            }}
          />
        </article>

        <article
          className={cn(styles.card, styles.ledger, styles.areaNpm)}
          aria-labelledby="npm-title"
          {...reveal()}
        >
          <h3 id="npm-title" className="t-title">
            {t("npm.title")}
          </h3>
          <ol className={styles.dl}>
            {npm.rows.map((row, i) => (
              <li
                key={row.id}
                className={styles.dlRow}
                style={{ "--i": i } as CSSProperties}
              >
                <span className={styles.dlName}>
                  <a
                    className="t-mono"
                    href={`https://www.npmjs.com/package/${row.names[0]}`}
                  >
                    {row.names[0]}
                  </a>
                  <span className="t-meta">{t(`npm.rows.${row.id}`)}</span>
                </span>
                <span className={cn("num", styles.dlValue)}>
                  {fmt.format(row.total)}
                </span>
                <span className={styles.bar} aria-hidden="true">
                  <i
                    style={
                      {
                        "--w": row.total / maxDownloads,
                      } as CSSProperties
                    }
                  />
                </span>
              </li>
            ))}
          </ol>
          <p className="t-meta">
            {t.rich("npm.source", {
              start: day(npm.start),
              end: day(npm.end),
              npm: linkTo(
                `https://npm-stat.com/charts.html?package=${npm.rows
                  .flatMap((r) => r.names)
                  .join("&package=")}&from=${npm.start}&until=${npm.end}`,
              ),
            })}{" "}
            {t("starsSource", { date: day(STARS_READ_ON) })}
          </p>
        </article>

        <article
          className={cn(styles.card, styles.security, styles.areaSec)}
          aria-labelledby="sec-title"
          {...reveal(1)}
        >
          <div className={styles.cardTop}>
            <h3 id="sec-title" className="t-title">
              {t("security.title")}
            </h3>
          </div>
          <p className="t-small">{t("security.body")}</p>
          <ol className={styles.prs}>
            {SECURITY_PRS.map((pr, i) => (
              <li
                key={pr.id}
                className={styles.pr}
                style={{ "--i": i } as CSSProperties}
              >
                <a className={styles.prLink} href={pr.href}>
                  <span className="t-mono">
                    {pr.repo} #{pr.number}
                  </span>
                  <span className={styles.prTitle}>
                    {t(`security.items.${pr.id}`)}
                  </span>
                  <ArrowUpRight />
                </a>
                <span className="visually-hidden">
                  {t("security.diffLabel", {
                    added: fmt.format(pr.additions),
                    removed: fmt.format(pr.deletions),
                  })}
                </span>
                <span
                  className={styles.diff}
                  aria-hidden="true"
                  style={
                    {
                      "--add": pr.additions / maxDiff,
                      "--del": pr.deletions / maxDiff,
                    } as CSSProperties
                  }
                >
                  <i className={styles.add} />
                  <i className={styles.del} />
                </span>
                <span
                  className={cn("num t-mono", styles.diffNums)}
                  aria-hidden="true"
                >
                  <span>+{fmt.format(pr.additions)}</span>{" "}
                  <span>&minus;{fmt.format(pr.deletions)}</span>
                </span>
              </li>
            ))}
          </ol>
        </article>

        <article
          className={cn(styles.card, styles.pegada, styles.areaPg)}
          aria-labelledby="pg-title"
          {...reveal(2)}
        >
          <h3 id="pg-title" className="t-title">
            {t("items.pegada.title")}
          </h3>
          <p className="t-small">{t("items.pegada.body")}</p>
          <ol className={styles.lineage}>
            <li>
              <a href={PEGAVA_HREF}>
                <span className={styles.lineageName}>Pegava</span>
                <span className="t-meta">{t("items.pegada.pegava")}</span>
              </a>
              <span
                className={cn("num", styles.stars)}
                aria-label={stars(STARS.pegava)}
              >
                <Star />
                {fmt.format(STARS.pegava)}
              </span>
            </li>
            <li>
              <a href={href("pegada")}>
                <span className={styles.lineageName}>Pegada</span>
                <span className="t-meta">{t("items.pegada.now")}</span>
              </a>
              <span
                className={cn("num", styles.stars)}
                aria-label={stars(STARS.pegada)}
              >
                <Star />
                {fmt.format(STARS.pegada)}
              </span>
            </li>
          </ol>
          <a
            className={cn("link-arrow t-small", styles.end)}
            href={PEGADA_LAUNCH_HREF}
          >
            {t("items.pegada.launch")}
            <ArrowUpRight />
          </a>
        </article>
      </div>
    </section>
  );
};
