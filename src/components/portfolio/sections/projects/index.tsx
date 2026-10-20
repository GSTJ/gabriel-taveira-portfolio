import type { CSSProperties, ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { reveal } from "../../ui/motion";
import { CurvinhaCard } from "./curvinha-card";
import {
  CURVINHA_STACK,
  CURVINHA_STEPS,
  PEGADA_FACTS,
  PEGADA_SHIPPED,
  PEGADA_STEPS,
  PEGADA_STORES,
  PEGAVA_HREF,
  PROJECTS,
  STARS,
  STARS_READ_ON,
} from "./data";
import { ModalDemo } from "./modal-demo";
import { getNpmLedger } from "./npm";
import { PegadaCard } from "./pegada-card";
import { SafeJsxDemo } from "./safe-jsx-demo";
import { Star } from "./star";

import styles from "./projects.module.css";

const href = (id: (typeof PROJECTS)[number]["id"]) =>
  PROJECTS.find((p) => p.id === id)?.href ?? "";

/** A `t.rich` tag that renders its chunk as a link. */
const linkTo = (url: string) => (chunks: ReactNode) => (
  <a href={url}>{chunks}</a>
);

/** A `t.rich` tag for a fact's lead words. */
const bold = (chunks: ReactNode) => <strong>{chunks}</strong>;

/** A `t.rich` tag for the npm card's big number. */
const big = (chunks: ReactNode) => (
  <span className={styles.npmBig}>{chunks}</span>
);

/** A `t.rich` tag for a name that must not break at its hyphen. */
const nowrap = (chunks: ReactNode) => (
  <span className={styles.nowrap}>{chunks}</span>
);

/**
 * Things he made, as a bento where each card proves its claim its own way:
 * Curvinha's whole screens, magic-modal running for real in a sandbox,
 * safe-jsx's stray 0, Pegada with Lua and its real deck, and npm numbers
 * with their date and source. The security fixes live on /security.
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
  const month = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`));
  const stars = (count: number) => t("stars", { count: fmt.format(count) });

  const maxDownloads = Math.max(...npm.rows.map((r) => r.total));

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
              stackLabel: t("items.curvinha.stackLabel"),
              stack: Object.fromEntries(
                CURVINHA_STACK.map((item) => [
                  item.id,
                  t(`items.curvinha.stack.${item.id}`),
                ]),
              ) as Parameters<typeof CurvinhaCard>[0]["copy"]["stack"],
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
              pieceAlt: t("items.curvinha.pieceAlt"),
              fitAlt: t("items.curvinha.fitAlt"),
              fitNote: t("items.curvinha.fitNote"),
            }}
          />
        </div>

        <div className={styles.areaPg} {...reveal(1)}>
          <PegadaCard
            copy={{
              title: t("items.pegada.title"),
              role: t("items.pegada.role"),
              body: t("items.pegada.body"),
              stepsLabel: t("items.pegada.stepsLabel"),
              hint: t("items.pegada.hint"),
              steps: Object.fromEntries(
                PEGADA_STEPS.map((step) => [
                  step,
                  {
                    title: t(`items.pegada.steps.${step}.title`),
                    body: t(`items.pegada.steps.${step}.body`),
                    alt: t(`items.pegada.steps.${step}.alt`),
                  },
                ]),
              ) as Parameters<typeof PegadaCard>[0]["copy"]["steps"],
              luaAlt: t("items.pegada.luaAlt"),
              caption: t("items.pegada.caption"),
              shipped: {
                title: t("items.pegada.shipped.title"),
                items: Object.fromEntries(
                  PEGADA_SHIPPED.map((pr) => [
                    pr.id,
                    {
                      title: t(`items.pegada.shipped.items.${pr.id}.title`),
                      detail: t(`items.pegada.shipped.items.${pr.id}.detail`),
                      date: month(pr.date),
                    },
                  ]),
                ) as Parameters<
                  typeof PegadaCard
                >[0]["copy"]["shipped"]["items"],
              },
              readOn: t("items.pegada.readOn", { date: day(STARS_READ_ON) }),
            }}
            links={{
              appStore: PEGADA_STORES.appStore,
              googlePlay: PEGADA_STORES.googlePlay,
              github: href("pegada"),
            }}
            facts={{
              commits: t.rich("items.pegada.facts.commits", {
                // Floored to the hundred, so "1,500+" stays true.
                count: fmt.format(
                  Math.floor(
                    (PEGADA_FACTS.commits.public +
                      PEGADA_FACTS.commits.before) /
                      100,
                  ) * 100,
                ),
                public: fmt.format(PEGADA_FACTS.commits.public),
                before: fmt.format(PEGADA_FACTS.commits.before),
                b: bold,
                oss: linkTo(PEGADA_FACTS.openSourceHref),
                post: linkTo(PEGADA_FACTS.openSourcePostHref),
              }),
              productHunt: t.rich("items.pegada.facts.productHunt", {
                rank: PEGADA_FACTS.productHunt.rank,
                date: day(PEGADA_FACTS.productHunt.date),
                b: bold,
                ph: linkTo(PEGADA_FACTS.productHunt.href),
              }),
              github: t.rich("items.pegada.facts.github", {
                stars: fmt.format(STARS.pegada + STARS.pegava),
                forks: fmt.format(
                  PEGADA_FACTS.forks.pegada + PEGADA_FACTS.forks.pegava,
                ),
                b: bold,
                pegava: linkTo(PEGAVA_HREF),
              }),
            }}
          />
        </div>

        <article
          className={cn(styles.card, styles.areaNpm)}
          aria-labelledby="npm-title"
          {...reveal(2)}
        >
          <div className={styles.npmHead}>
            <h3 id="npm-title" className={cn("t-title", styles.npmTitle)}>
              {t.rich("npm.title", {
                count: fmt.format(Math.floor(npm.total / 1000)),
                big,
              })}
            </h3>
            <p className="t-small">
              {t("npm.stars", { count: fmt.format(npm.stars) })}
            </p>
          </div>
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
                  {row.stars > 0 ? (
                    <span
                      className={cn("t-meta", styles.dlStars)}
                      aria-label={stars(row.stars)}
                    >
                      <Star />
                      <span className="num">{fmt.format(row.stars)}</span>
                    </span>
                  ) : null}
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
          <p className={cn("t-meta", styles.end)}>
            {t.rich("npm.source", {
              total: fmt.format(npm.total),
              start: day(npm.since),
              end: day(npm.end),
              npm: linkTo(
                `https://npm-stat.com/charts.html?package=${npm.rows
                  .flatMap((r) => r.names)
                  .join("&package=")}&from=${npm.since}&until=${npm.end}`,
              ),
            })}{" "}
            {t("starsSource", { date: day(STARS_READ_ON) })}
          </p>
        </article>

        <article
          className={cn(styles.card, styles.areaMm)}
          aria-labelledby="mm-title"
          {...reveal(2)}
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
          <ModalDemo
            file="example.tsx"
            copy={{
              label: t("items.magicModal.label"),
              run: t("items.magicModal.run"),
              idle: t("items.magicModal.idle"),
              loading: t("items.magicModal.loading"),
              pending: t("items.magicModal.pending"),
              resolved: t("items.magicModal.resolved"),
              failed: t("items.magicModal.failed"),
              hint: t("items.magicModal.hint"),
              console: t("items.magicModal.console"),
              modal: {
                label: t("items.magicModal.modal.label"),
                title: t.rich("items.magicModal.modal.title", { name: nowrap }),
                body: t("items.magicModal.modal.body"),
                yes: t("items.magicModal.modal.yes"),
                no: t("items.magicModal.modal.no"),
                close: t("items.magicModal.modal.close"),
                returns: t("items.magicModal.modal.returns"),
                dismiss: t("items.magicModal.modal.dismiss"),
              },
            }}
          >
            <pre className={styles.sbCode} aria-label={t("codeLabel")}>
              <code>
                <span className={styles.k}>const</span>
                {" answer = "}
                <span className={styles.k}>await</span>
                {" magicModal.show(\n  HelloModal,\n);\n"}
                <span className={styles.c}>
                  {t("items.magicModal.comment")}
                </span>
                {"\nconsole.log(answer);"}
              </code>
            </pre>
          </ModalDemo>
        </article>

        <article
          className={cn(styles.card, styles.areaSj)}
          aria-labelledby="sj-title"
          {...reveal(1)}
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
              explain: t("items.safeJsx.explain"),
              resolved: t("items.safeJsx.resolved"),
              problems: t("items.safeJsx.problems"),
              problemsOne: t("items.safeJsx.problemsOne"),
              problemsNone: t("items.safeJsx.problemsNone"),
            }}
          />
        </article>
      </div>
    </section>
  );
};
