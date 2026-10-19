import type { CSSProperties } from "react";

import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { CurvinhaCard } from "./curvinha-card";
import {
  CODE_PUSH_YEARS,
  CURVINHA,
  CURVINHA_STEPS,
  INSTALLS,
  MODAL_BUNDLE,
  MODAL_CHANGELOG,
  NPM_SINCE_END,
  PEGADA,
  PEGADA_SCREENS,
  PROJECTS,
  READ_ON,
  SECURITY_PRS,
  STARS,
  TOOLS,
  npmStat,
} from "./data";
import { LoopVideo } from "./loop-video";
import { ModalDemo } from "./modal-demo";
import { Near } from "./near";
import { SafeJsxDemo } from "./safe-jsx-demo";

import styles from "./projects.module.css";

const project = (id: (typeof PROJECTS)[number]["id"]) =>
  PROJECTS.find((p) => p.id === id);
const at = (iso: string) => new Date(`${iso}T00:00:00Z`);
const href = (id: (typeof PROJECTS)[number]["id"]) => project(id)?.href ?? "";

const Star = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7z" />
  </svg>
);

/**
 * Things he made, as a bento sized by weight: Curvinha's scan and what it
 * turns into, Pegada's store screens (the Expo app), magic-modal and safe-jsx
 * running for real, the smaller tools each with their own proof, and the
 * merged security fixes by diff size. Every number carries its source.
 */
export const ProjectsSection = async () => {
  const t = await getTranslations("projects");
  const locale = await getLocale();

  const fmt = new Intl.NumberFormat(locale);
  const day = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(at(iso));
  const month = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(at(iso));
  const stars = (count: number) => t("stars", { count: fmt.format(count) });

  /** "221,908 installs since February 2022", linked to the same range on npm-stat. */
  const installs = (id: keyof typeof INSTALLS, names: readonly string[]) => (
    <a
      className={cn("t-meta", styles.installs)}
      href={npmStat(names, INSTALLS[id].since)}
    >
      {t("installs", {
        count: fmt.format(INSTALLS[id].total),
        since: month(INSTALLS[id].since),
      })}
    </a>
  );

  const maxBundle = Math.max(...MODAL_BUNDLE.map((b) => b.kb));
  const maxYear = Math.max(...CODE_PUSH_YEARS.map((y) => y.installs));
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
            appStore={CURVINHA.appStore}
            lang={locale.startsWith("pt") ? "pt" : "en"}
            copy={{
              title: t("items.curvinha.title"),
              role: t("items.curvinha.role"),
              problem: t("items.curvinha.problem"),
              stack: t("items.curvinha.stack"),
              live: t("items.curvinha.live", {
                date: day(CURVINHA.liveSince),
              }),
              devices: t("items.curvinha.devices"),
              languages: t("items.curvinha.languages"),
              cta: t("items.curvinha.cta"),
              video: {
                label: t("items.curvinha.video.label"),
                play: t("items.curvinha.video.play"),
                pause: t("items.curvinha.video.pause"),
              },
              scanCaption: t("items.curvinha.scanCaption"),
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
          className={cn(styles.card, styles.pegada, styles.areaPg)}
          aria-labelledby="pg-title"
          {...reveal()}
        >
          <div className={styles.pgCopy}>
            <h3 id="pg-title" className={cn("t-h1", styles.cvTitle)}>
              {t("items.pegada.title")}
            </h3>
            <p className={cn("t-small", styles.role)}>
              {t("items.pegada.role")}
            </p>
            <p className="t-small">{t("items.pegada.problem")}</p>
            <ul className={cn("t-meta", styles.facts, styles.factsCol)}>
              <li>
                <a href={PEGADA.appStore}>
                  {t("items.pegada.live", { date: month(PEGADA.liveSince) })}
                </a>
              </li>
              <li>
                {t("items.pegada.rating", {
                  rating: fmt.format(PEGADA.rating),
                  count: fmt.format(PEGADA.ratings),
                })}
              </li>
              <li>
                <a href={PEGADA.play}>
                  {t("items.pegada.play", { count: PEGADA.playDownloads })}
                </a>
              </li>
            </ul>
            <p className={cn("t-meta", styles.stack)}>
              {t("items.pegada.stack")}{" "}
              <a href={PEGADA.pegava}>
                {t("items.pegada.pegava", {
                  stars: fmt.format(PEGADA.pegavaStars),
                  forks: fmt.format(PEGADA.pegavaForks),
                })}
              </a>
            </p>
            <a
              className={cn("link-arrow t-small", styles.end)}
              href={href("pegada")}
              aria-label={`${t("items.pegada.code")}: GSTJ/pegada, ${stars(PEGADA.stars)}`}
            >
              {t("items.pegada.code")}
              <ArrowUpRight />
            </a>
          </div>
          <ul
            className={styles.fan}
            aria-label={t("items.pegada.screensLabel")}
          >
            {PEGADA_SCREENS.map((screen, i) => (
              <li
                key={screen}
                className={styles.fanPhone}
                style={{ "--i": i } as CSSProperties}
              >
                <Near className={styles.fanScreen}>
                  <Image
                    src={`/projects/pegada/${screen}.webp`}
                    width={450}
                    height={980}
                    sizes="(width < 760px) 34vw, 160px"
                    alt={t(`items.pegada.screens.${screen}`)}
                  />
                </Near>
              </li>
            ))}
          </ul>
        </article>

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
          <p className={styles.metaRow}>
            {installs("magicModal", project("magicModal")?.npm ?? [])}
            <span className="t-meta">{t("items.magicModal.bothNames")}</span>
          </p>
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
          <figure className={styles.bundle}>
            <figcaption className={styles.metaRow}>
              <span className={cn("t-meta", styles.ink)}>
                {t("items.magicModal.bundle")}
              </span>
              <a className="t-meta" href={MODAL_CHANGELOG}>
                {t("items.magicModal.bundleSource")}
              </a>
            </figcaption>
            <ol className={styles.hbars}>
              {MODAL_BUNDLE.map((b, i) => (
                <li
                  key={b.version}
                  style={{ "--w": b.kb / maxBundle, "--i": i } as CSSProperties}
                >
                  <span className="visually-hidden">
                    {t("items.magicModal.bundleRow", {
                      version: b.version,
                      kb: fmt.format(b.kb),
                    })}
                  </span>
                  <span className="t-mono" aria-hidden="true">
                    {b.version}
                  </span>
                  <span className={styles.hbar} aria-hidden="true">
                    <i />
                  </span>
                  <span className="num t-meta" aria-hidden="true">
                    {fmt.format(b.kb)} KB
                  </span>
                </li>
              ))}
            </ol>
          </figure>
        </article>

        <article
          className={cn(styles.card, styles.lib, styles.areaSj)}
          aria-labelledby="sj-title"
          {...reveal()}
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
          {installs("safeJsx", project("safeJsx")?.npm ?? [])}
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
              explain: t("items.safeJsx.explain"),
              resolved: t("items.safeJsx.resolved"),
            }}
          />
        </article>

        <article
          className={cn(styles.card, styles.tools, styles.areaTb)}
          aria-labelledby="tb-title"
          {...reveal(1)}
        >
          <h3 id="tb-title" className="t-title">
            {t("tools.title")}
          </h3>
          <div className={styles.toolGrid}>
            <section className={styles.toast} aria-labelledby="mt-title">
              <div className={styles.toastClip}>
                <LoopVideo
                  src="/projects/oss/magic-toast-demo.mp4"
                  poster="/projects/oss/magic-toast-demo-poster.webp"
                  width={400}
                  height={598}
                  copy={{
                    label: t("items.magicToast.video.label"),
                    play: t("items.magicToast.video.play"),
                    pause: t("items.magicToast.video.pause"),
                  }}
                />
              </div>
              <div className={styles.toolText}>
                <h4 id="mt-title" className={styles.toolName}>
                  <a className="t-mono" href={href("magicToast")}>
                    {t("items.magicToast.title")}
                  </a>
                </h4>
                <p className="t-small">{t("items.magicToast.body")}</p>
                {installs("magicToast", TOOLS.magicToast.npm)}
              </div>
            </section>

            <section className={styles.tool} aria-labelledby="cp-title">
              <h4 id="cp-title" className={styles.toolName}>
                <a className="t-mono" href={TOOLS.codePush.href}>
                  {t("tools.codePush.title")}
                </a>
              </h4>
              <p className="t-small">{t("tools.codePush.body")}</p>
              {installs("codePush", TOOLS.codePush.npm)}
              <figure className={styles.years}>
                <figcaption className="visually-hidden">
                  {t("tools.codePush.chart")}
                </figcaption>
                <ol>
                  {CODE_PUSH_YEARS.map((y, i) => (
                    <li
                      key={y.year}
                      style={
                        {
                          "--h": y.installs / maxYear,
                          "--i": i,
                        } as CSSProperties
                      }
                    >
                      <span className="visually-hidden">
                        {t("tools.codePush.year", {
                          year: y.year,
                          count: fmt.format(y.installs),
                        })}
                      </span>
                      <span className={styles.vbar} aria-hidden="true">
                        <i />
                      </span>
                      <span className="num t-meta" aria-hidden="true">
                        {y.year}
                      </span>
                    </li>
                  ))}
                </ol>
              </figure>
              <p className="t-meta">{t("tools.codePush.note")}</p>
            </section>

            <section className={styles.tool} aria-labelledby="ob-title">
              <h4 id="ob-title" className={styles.toolName}>
                <a className="t-mono" href={TOOLS.observability.href}>
                  {t("tools.observability.title")}
                </a>
              </h4>
              <p className="t-small">{t("tools.observability.body")}</p>
              {installs("observability", TOOLS.observability.npm)}
            </section>
          </div>
        </article>

        <article
          className={cn(styles.card, styles.security, styles.areaSec)}
          aria-labelledby="sec-title"
          {...reveal()}
        >
          <div className={styles.secHead}>
            <h3 id="sec-title" className="t-title">
              {t("security.title")}
            </h3>
            <p className="t-small">{t("security.body")}</p>
          </div>
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
      </div>

      <p className={cn("t-meta", styles.source)}>
        {t("source", { end: day(NPM_SINCE_END), read: day(READ_ON) })}
      </p>
    </section>
  );
};
