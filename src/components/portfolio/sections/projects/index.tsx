import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import { reveal } from "../../ui/motion";
import {
  CODE_PUSH_RETIRED,
  CURVINHA,
  CURVINHA_OUTPUTS,
  href,
  MAGIC_MODAL,
  PEGADA,
  PEGADA_SCREENS,
  SAFE_JSX_FIRST,
  SECURITY_PRS,
  STARS,
  STARS_READ_ON,
  type ProjectId,
} from "./data";
import { ModalDemo } from "./modal-demo";
import { getInstalls } from "./npm";
import { SafeJsxDemo } from "./safe-jsx-demo";
import { ScanVideo } from "./scan-video";

import styles from "./projects.module.css";

const THEMES = ["light", "dark"] as const;

const Star = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7z" />
  </svg>
);

/** Problem, what he built, where it stands: the spine of each case. */
const Facts = ({
  labels,
  rows,
}: {
  labels: { problem: string; built: string; status: string };
  rows: { problem: ReactNode; built: ReactNode; status: ReactNode };
}) => (
  <dl className={styles.facts}>
    {(["problem", "built", "status"] as const).map((key) => (
      <div key={key}>
        <dt className="t-meta">{labels[key]}</dt>
        <dd>{rows[key]}</dd>
      </div>
    ))}
  </dl>
);

/**
 * The proof section as three case files, read top to bottom: Curvinha (the
 * app he's building, its real scan running in the phone), Pegada (the React
 * Native app on both stores) and the two libraries you can run right here.
 * Everything else he shipped sits in one dated ledger at the end.
 */
export const ProjectsSection = async () => {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const lang = locale.startsWith("pt") ? "pt" : "en";
  const installs = await getInstalls();

  const fmt = new Intl.NumberFormat(locale);
  const day = (iso: string, month: "long" | "short" = "long") =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month,
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`));
  const monthYear = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`));

  const labels = {
    problem: t("labels.problem"),
    built: t("labels.built"),
    status: t("labels.status"),
  };

  /** "221,908 npm installs since February 2022", linked to the same range. */
  const installLine = (id: ProjectId, since: string) => (
    <a className={styles.installs} href={installs.source(id)}>
      {t("installsSince", {
        count: fmt.format(installs.total[id] ?? 0),
        date: monthYear(since),
      })}
    </a>
  );

  const maxBundle = Math.max(...MAGIC_MODAL.bundle.map((b) => b.kb));
  const maxDiff = Math.max(
    ...SECURITY_PRS.map((pr) => pr.additions + pr.deletions),
  );

  const ledger = [
    {
      id: "codePush",
      first: "2023-11-06",
      note: t("items.codePush.note", { date: day(CODE_PUSH_RETIRED) }),
    },
    { id: "magicToast", first: "2022-02-22" },
    { id: "observability", first: "2026-07-28" },
  ] as const;

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

      {/* ── Curvinha ─────────────────────────────────────────────── */}
      <article className={styles.case} aria-labelledby="cv-title">
        <div className={styles.stage} {...reveal()}>
          <figure className={styles.scanFigure}>
            <div className={styles.phone}>
              <ScanVideo
                src="/projects/curvinha/scan-loop.mp4"
                poster="/projects/curvinha/scan-loop-poster.webp"
                copy={{
                  label: t("items.curvinha.video"),
                  play: t("items.curvinha.play"),
                  pause: t("items.curvinha.pause"),
                }}
              />
            </div>
            <figcaption className="t-meta">
              {t("items.curvinha.videoCaption")}
            </figcaption>
          </figure>

          <ol
            className={styles.outputs}
            aria-label={t("items.curvinha.outputsLabel")}
          >
            {CURVINHA_OUTPUTS.filter((o) => o !== "fit").map((name, i) => (
              <li key={name} {...reveal(i + 1, 120)}>
                <figure>
                  <div className={styles.screen}>
                    {THEMES.map((theme) => (
                      <Image
                        key={theme}
                        className={cn(
                          theme === "light" ? "only-light" : "only-dark",
                        )}
                        src={`/projects/curvinha/${name}-${theme}-${lang}.webp`}
                        width={600}
                        height={780}
                        sizes="(width < 760px) 34vw, 200px"
                        alt={t(`items.curvinha.outputs.${name}.alt`)}
                      />
                    ))}
                  </div>
                  <figcaption>
                    <span className={cn("num", styles.step)}>{i + 2}</span>
                    <span>
                      <strong>
                        {t(`items.curvinha.outputs.${name}.title`)}
                      </strong>{" "}
                      <span className={styles.stepBody}>
                        {t(`items.curvinha.outputs.${name}.body`)}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.caseText} {...reveal(1)}>
          <div className={styles.caseTitle}>
            <h3 id="cv-title" className="t-h1">
              {t("items.curvinha.title")}
            </h3>
            <Marginalia
              placement="inline"
              note={t("items.curvinha.note")}
              delay={300}
            />
          </div>
          <p className={styles.role}>{t("items.curvinha.role")}</p>
          <p className={styles.lede}>{t("items.curvinha.body")}</p>
          <Facts
            labels={labels}
            rows={{
              problem: t("items.curvinha.problem"),
              built: (
                <>
                  {t("items.curvinha.built")}
                  <figure className={styles.fit}>
                    {THEMES.map((theme) => (
                      <Image
                        key={theme}
                        className={cn(
                          theme === "light" ? "only-light" : "only-dark",
                        )}
                        src={`/projects/curvinha/fit-${theme}-${lang}.webp`}
                        width={600}
                        height={200}
                        sizes="(width < 760px) 80vw, 360px"
                        alt={t("items.curvinha.outputs.fit.alt")}
                      />
                    ))}
                    <figcaption className="t-meta">
                      {t("items.curvinha.outputs.fit.title")}.{" "}
                      {t("items.curvinha.outputs.fit.body")}
                    </figcaption>
                  </figure>
                </>
              ),
              status: (
                <>
                  {t("items.curvinha.status", {
                    date: day(CURVINHA.liveSince),
                  })}{" "}
                  <a className="link-arrow" href={CURVINHA.appStore}>
                    {t("items.curvinha.appStore")}
                    <ArrowUpRight />
                  </a>
                </>
              ),
            }}
          />
          <a className={cn("btn", styles.cta)} href={href("curvinha")}>
            {t("items.curvinha.cta")}
            <ArrowUpRight />
          </a>
        </div>
      </article>

      {/* ── Pegada ───────────────────────────────────────────────── */}
      <article
        className={cn(styles.case, styles.caseFlip)}
        aria-labelledby="pg-title"
      >
        <div className={cn(styles.stage, styles.fanStage)} {...reveal()}>
          <ul
            className={styles.fan}
            aria-label={t("items.pegada.screensLabel")}
          >
            {PEGADA_SCREENS.map((name, i) => (
              <li
                key={name}
                className={styles.fanPhone}
                style={{ "--i": i } as CSSProperties}
              >
                <Image
                  src={`/projects/pegada/${name}.webp`}
                  width={450}
                  height={980}
                  sizes="(width < 760px) 30vw, 180px"
                  alt={t(`items.pegada.screens.${name}`)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.caseText} {...reveal(1)}>
          <h3 id="pg-title" className="t-h1">
            {t("items.pegada.title")}
          </h3>
          <p className={styles.role}>{t("items.pegada.role")}</p>
          <p className={styles.lede}>{t("items.pegada.body")}</p>
          <Facts
            labels={labels}
            rows={{
              problem: t("items.pegada.problem"),
              built: t("items.pegada.built"),
              status: (
                <>
                  {t("items.pegada.status", {
                    date: monthYear(PEGADA.liveSince),
                    rating: fmt.format(PEGADA.rating),
                    ratings: fmt.format(PEGADA.ratings),
                    stars: fmt.format(PEGADA.pegavaStars),
                    forks: fmt.format(PEGADA.pegavaForks),
                  })}{" "}
                  <span className="t-meta">
                    {t("items.pegada.readOn", { date: day(STARS_READ_ON) })}
                  </span>
                </>
              ),
            }}
          />
          <p className={styles.links}>
            <a className="link-arrow" href={PEGADA.appStore}>
              {t("items.pegada.appStore")}
              <ArrowUpRight />
            </a>
            <a className="link-arrow" href={PEGADA.play}>
              {t("items.pegada.play")}
              <ArrowUpRight />
            </a>
            <a className="link-arrow" href={href("pegada")}>
              {t("items.pegada.code")}
              <ArrowUpRight />
            </a>
          </p>
        </div>
      </article>

      {/* ── Libraries you can run here ───────────────────────────── */}
      <div className={styles.libs}>
        <div className={styles.libsHead} {...reveal()}>
          <h3 className="t-h1">{t("items.libraries.title")}</h3>
          <p className={styles.lede}>{t("items.libraries.body")}</p>
        </div>

        <article
          className={styles.lib}
          aria-labelledby="mm-title"
          {...reveal()}
        >
          <div className={styles.libTop}>
            <h4 id="mm-title" className="t-title">
              <a href={href("magicModal")}>{t("items.magicModal.title")}</a>
            </h4>
            <span
              className={cn("num", styles.stars)}
              aria-label={t("stars", { count: fmt.format(STARS.magicModal) })}
            >
              <Star />
              {fmt.format(STARS.magicModal)}
            </span>
          </div>
          {installLine("magicModal", MAGIC_MODAL.first)}
          <p className={styles.libBody}>{t("items.magicModal.body")}</p>
          <p className={styles.why}>{t("items.magicModal.why")}</p>

          <div className={styles.demo}>
            <pre className={styles.code} aria-label={t("codeLabel")}>
              <code>
                <span className={styles.k}>const</span>
                {" result =\n  "}
                <span className={styles.k}>await</span>
                {" magicModal.show(Confirm);\n"}
                <span className={styles.c}>
                  {t("items.magicModal.comment")}
                </span>
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
          </div>

          <figure className={styles.bundle}>
            <figcaption className={styles.bundleHead}>
              <span className="t-small">
                {t("items.magicModal.bundleTitle")}
              </span>
              <a className="t-meta" href={MAGIC_MODAL.changelog}>
                {t("items.magicModal.bundleSource")}
              </a>
            </figcaption>
            <ol>
              {MAGIC_MODAL.bundle.map((b, i) => (
                <li
                  key={b.version}
                  style={{ "--w": b.kb / maxBundle, "--i": i } as CSSProperties}
                  aria-label={t("items.magicModal.bundleLabel", {
                    version: b.version,
                    kb: fmt.format(b.kb),
                  })}
                >
                  <span className="t-mono" aria-hidden="true">
                    {b.version}
                  </span>
                  <span className={styles.bar} aria-hidden="true">
                    <i />
                  </span>
                  <span className="num" aria-hidden="true">
                    {fmt.format(b.kb)} KB
                  </span>
                </li>
              ))}
            </ol>
          </figure>
          <p className="t-meta">
            {t("items.magicModal.facts", {
              releases: MAGIC_MODAL.releases,
              date: monthYear(MAGIC_MODAL.first),
            })}
          </p>
        </article>

        <article
          className={styles.lib}
          aria-labelledby="sj-title"
          {...reveal(1)}
        >
          <div className={styles.libTop}>
            <h4 id="sj-title" className="t-title">
              <a href={href("safeJsx")}>{t("items.safeJsx.title")}</a>
            </h4>
            <span
              className={cn("num", styles.stars)}
              aria-label={t("stars", { count: fmt.format(STARS.safeJsx) })}
            >
              <Star />
              {fmt.format(STARS.safeJsx)}
            </span>
          </div>
          {installLine("safeJsx", SAFE_JSX_FIRST)}
          <p className={styles.libBody}>{t("items.safeJsx.body")}</p>
          <p className={styles.why}>{t("items.safeJsx.why")}</p>
          <div className={styles.demo}>
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
          </div>
        </article>
      </div>

      {/* ── Also shipped ─────────────────────────────────────────── */}
      <div className={styles.also} {...reveal()}>
        <h3 className="t-title">{t("also.title")}</h3>
        <ul className={styles.ledger}>
          {ledger.map((row) => (
            <li key={row.id}>
              <a
                className={cn("t-mono", styles.ledgerName)}
                href={href(row.id)}
              >
                {t(`items.${row.id}.title`)}
              </a>
              <p className={styles.ledgerBody}>
                {t(`items.${row.id}.body`)}
                {"note" in row ? <> {row.note}</> : null}
              </p>
              <a
                className={cn("num", styles.ledgerNum)}
                href={installs.source(row.id)}
              >
                {t("also.installs", {
                  count: fmt.format(installs.total[row.id] ?? 0),
                })}
              </a>
            </li>
          ))}
          <li className={styles.securityRow}>
            <span className={styles.ledgerName}>
              {t("also.security.title")}
            </span>
            <p className={styles.ledgerBody}>{t("also.security.body")}</p>
            <ol className={styles.prs}>
              {SECURITY_PRS.map((pr) => (
                <li
                  key={pr.id}
                  style={
                    {
                      "--add": pr.additions / maxDiff,
                      "--del": pr.deletions / maxDiff,
                    } as CSSProperties
                  }
                >
                  <a href={pr.href}>
                    <span className="t-mono">
                      {pr.repo} #{pr.number}
                    </span>{" "}
                    {t(`also.security.items.${pr.id}`)}
                  </a>
                  <span className="visually-hidden">
                    {t("also.security.diffLabel", {
                      added: fmt.format(pr.additions),
                      removed: fmt.format(pr.deletions),
                    })}
                  </span>
                  <span className={styles.diff} aria-hidden="true">
                    <i className={styles.add} />
                    <i className={styles.del} />
                  </span>
                  <span className="num t-mono" aria-hidden="true">
                    +{fmt.format(pr.additions)} &minus;
                    {fmt.format(pr.deletions)}
                  </span>
                </li>
              ))}
            </ol>
          </li>
        </ul>
        <p className="t-meta">
          {t("installsSource", { date: day(installs.end) })}.{" "}
          {t("starsRead", { date: day(STARS_READ_ON) })}
        </p>
      </div>
    </section>
  );
};
