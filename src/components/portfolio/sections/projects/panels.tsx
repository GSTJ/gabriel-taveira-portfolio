import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import {
  CODE_PUSH_RETIRED,
  CODE_PUSH_YEARS,
  CURVINHA,
  MODAL_BUNDLE,
  NPM_READ_TO,
  PEGADA,
  SECURITY_PRS,
  STARS,
} from "./data";
import { formatters, project, since } from "./format";
import { ModalDemo } from "./modal-demo";
import { SafeJsxDemo } from "./safe-jsx-demo";
import { StageVideo } from "./stage-video";

import styles from "./projects.module.css";

/** A `t.rich` tag that renders its chunk as a link. */
const linkTo = (url: string) => (chunks: ReactNode) => (
  <a href={url}>{chunks}</a>
);

const context = async () => {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const lang: "en" | "pt" = locale.startsWith("pt") ? "pt" : "en";
  return { t, lang, ...formatters(locale) };
};

/** Light and dark captures of one Curvinha screen, swapped by theme in CSS. */
const THEME_CLASS = { light: "only-light", dark: "only-dark" } as const;

const Themed = ({
  name,
  lang,
  alt,
  width,
  height,
}: {
  name: string;
  lang: "en" | "pt";
  alt: string;
  width: number;
  height: number;
}) =>
  (["light", "dark"] as const).map((theme) => (
    <Image
      key={theme}
      className={THEME_CLASS[theme]}
      src={`/projects/curvinha/${name}-${theme}-${lang}.webp`}
      width={width}
      height={height}
      sizes="(width < 1000px) 45vw, 220px"
      alt={alt}
    />
  ));

/*
 * One server component per stage panel, each proving its row its own way:
 * Curvinha's scan and screens, Pegada's store screens, the libraries running
 * for real, real install curves, the merged security fixes.
 */

export const CurvinhaPanel = async () => {
  const { t, lang, day } = await context();
  return (
    <div className={styles.cv}>
      <div className={styles.phone}>
        <StageVideo
          src="/projects/curvinha/scan-loop.mp4"
          poster="/projects/curvinha/scan-loop-poster.webp"
          width={480}
          height={980}
          copy={{
            label: t("items.curvinha.video.label"),
            play: t("items.curvinha.video.play"),
            pause: t("items.curvinha.video.pause"),
          }}
        />
      </div>
      <div className={styles.cvText}>
        <dl className={styles.facts}>
          <dt>{t("items.curvinha.problemLabel")}</dt>
          <dd>{t("items.curvinha.problem")}</dd>
          <dt>{t("items.curvinha.builtLabel")}</dt>
          <dd>{t("items.curvinha.built")}</dd>
          <dt>{t("items.curvinha.whereLabel")}</dt>
          <dd>
            {t.rich("items.curvinha.where", {
              date: day(since("curvinha")),
              store: linkTo(CURVINHA.appStore),
            })}
          </dd>
        </dl>
        <div className={styles.cta}>
          <a className="btn" href={project("curvinha")?.href}>
            {t("items.curvinha.cta")}
            <ArrowUpRight />
          </a>
          <Marginalia placement="inline" note={t("items.curvinha.note")} />
        </div>
      </div>
      <ul className={styles.shots}>
        {(
          [
            ["plan", 600, 780],
            ["room", 600, 780],
            ["fit", 600, 200],
          ] as const
        ).map(([name, w, h]) => (
          <li key={name} className={styles.shot} data-shape={name}>
            <span className={styles.shotFrame}>
              <Themed
                name={name}
                lang={lang}
                width={w}
                height={h}
                alt={t(`items.curvinha.shots.${name}.alt`)}
              />
            </span>
            <span className="t-meta">
              {t(`items.curvinha.shots.${name}.caption`)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const PegadaPanel = async () => {
  const { t, fmt, rating, day } = await context();
  return (
    <div className={styles.pg}>
      <p className={styles.lede}>
        {t("items.pegada.lede", {
          date: day(since("pegada")),
        })}
      </p>
      <ul className={styles.pgShots} aria-label={t("items.pegada.shotsLabel")}>
        {(["deck", "match", "chat"] as const).map((name) => (
          <li key={name} className={styles.mini}>
            <Image
              src={`/projects/pegada/${name}.webp`}
              width={450}
              height={980}
              sizes="(width < 1000px) 30vw, 180px"
              alt={t(`items.pegada.shots.${name}`)}
            />
          </li>
        ))}
      </ul>
      <p className={cn("t-small", styles.stack)}>{t("items.pegada.stack")}</p>
      <ul className={styles.links}>
        <li>
          <a className="link-arrow t-small" href={PEGADA.appStore}>
            {t("items.pegada.appStore", {
              rating: rating.format(PEGADA.rating),
              count: PEGADA.ratings,
            })}
            <ArrowUpRight />
          </a>
        </li>
        <li>
          <a className="link-arrow t-small" href={PEGADA.play}>
            {t("items.pegada.play")}
            <ArrowUpRight />
          </a>
        </li>
        <li>
          <a className="link-arrow t-small" href={project("pegada")?.href}>
            {t("items.pegada.repo", { date: day(PEGADA.openSince) })}
            <ArrowUpRight />
          </a>
        </li>
        <li>
          <a className="link-arrow t-small" href={PEGADA.pegava.href}>
            {t("items.pegada.pegava", {
              stars: fmt.format(PEGADA.pegava.stars),
              forks: fmt.format(PEGADA.pegava.forks),
            })}
            <ArrowUpRight />
          </a>
        </li>
      </ul>
    </div>
  );
};

export const MagicModalPanel = async () => {
  const { t, fmt, kb, day, installs } = await context();
  const maxBundle = Math.max(...MODAL_BUNDLE.rows.map((r) => r.kb));
  return (
    <div className={styles.lib}>
      <p className={styles.lede}>{t("items.magicModal.body")}</p>
      <pre className={styles.code} aria-label={t("codeLabel")}>
        <code>
          <span className={styles.k}>const</span>
          {" result = "}
          <span className={styles.k}>await</span>
          {" magicModal.show(Confirm);\n"}
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
      <figure className={styles.chart}>
        <figcaption className={styles.chartTitle}>
          {t("items.magicModal.bundle.title")}
        </figcaption>
        <ol className={styles.bars}>
          {MODAL_BUNDLE.rows.map((row, i) => (
            <li
              key={row.version}
              style={{ "--w": row.kb / maxBundle, "--i": i } as CSSProperties}
            >
              <span className="t-mono">{row.version}</span>
              <span className={styles.barTrack} aria-hidden="true">
                <i />
              </span>
              <span className="num t-small">{kb.format(row.kb)} KB</span>
            </li>
          ))}
        </ol>
        <p className="t-meta">
          {t.rich("items.magicModal.bundle.source", {
            log: linkTo(MODAL_BUNDLE.source),
          })}{" "}
          {t("items.magicModal.installsLine", {
            count: installs("magicModal"),
            date: day(since("magicModal")),
          })}{" "}
          <a href={project("magicModal")?.href}>
            {t("stars", { count: fmt.format(STARS.magicModal) })}
          </a>
        </p>
      </figure>
    </div>
  );
};

export const SafeJsxPanel = async () => {
  const { t, fmt, day, installs } = await context();
  return (
    <div className={styles.lib}>
      <p className={styles.lede}>{t("items.safeJsx.body")}</p>
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
      <p className="t-meta">
        {t("items.safeJsx.installsLine", {
          count: installs("safeJsx"),
          date: day(since("safeJsx")),
        })}{" "}
        <a href={project("safeJsx")?.href}>
          {t("stars", { count: fmt.format(STARS.safeJsx) })}
        </a>
      </p>
    </div>
  );
};

export const CodePushPanel = async () => {
  const { t, fmt, day, monthDay } = await context();
  const maxYear = Math.max(...CODE_PUSH_YEARS.map((y) => y.installs));
  const lastYear = CODE_PUSH_YEARS.at(-1)?.year;
  return (
    <div className={styles.lib}>
      <p className={styles.lede}>{t("items.codePush.body")}</p>
      <figure className={styles.chart}>
        <figcaption className={styles.chartTitle}>
          {t("items.codePush.chartTitle")}
        </figcaption>
        <ol className={styles.columns}>
          {CODE_PUSH_YEARS.map((y, i) => (
            <li
              key={y.year}
              style={{ "--h": y.installs / maxYear, "--i": i } as CSSProperties}
            >
              <span className={styles.column}>
                <span className="num t-small">{fmt.format(y.installs)}</span>
                <i aria-hidden="true" />
              </span>
              <span className="num t-meta">
                {y.year === lastYear
                  ? t("items.codePush.partial", {
                      year: y.year,
                      date: monthDay(NPM_READ_TO),
                    })
                  : y.year}
              </span>
            </li>
          ))}
        </ol>
      </figure>
      <p className="t-small">
        {t("items.codePush.retired", { date: day(CODE_PUSH_RETIRED) })}
      </p>
      <a className="link-arrow t-small" href={project("codePush")?.href}>
        GSTJ/react-native-code-push-plugin
        <ArrowUpRight />
      </a>
    </div>
  );
};

export const MagicToastPanel = async () => {
  const { t } = await context();
  return (
    <div className={styles.toast}>
      <div className={cn(styles.phone, styles.phoneSmall)}>
        <StageVideo
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
      <div className={styles.lib}>
        <p className={styles.lede}>{t("items.magicToast.body")}</p>
        <pre className={styles.code} aria-label={t("codeLabel")}>
          <code>
            <span className={styles.k}>const</span>
            {" { reason } =\n  "}
            <span className={styles.k}>await</span>
            {' magicToast.success("Saved");'}
          </code>
        </pre>
        <a className="link-arrow t-small" href={project("magicToast")?.href}>
          GSTJ/react-native-magic-toast
          <ArrowUpRight />
        </a>
      </div>
    </div>
  );
};

export const ObservabilityPanel = async () => {
  const { t } = await context();
  return (
    <div className={styles.lib}>
      <p className={styles.lede}>{t("items.observability.body")}</p>
      <Image
        className={styles.figure}
        src="/projects/oss/magic-observability.webp"
        width={1200}
        height={675}
        sizes="(width < 1000px) 90vw, 640px"
        alt={t("items.observability.alt")}
      />
      <p className="t-small">{t("items.observability.runs")}</p>
      <a className="link-arrow t-small" href={project("observability")?.href}>
        GSTJ/magic
        <ArrowUpRight />
      </a>
    </div>
  );
};

export const SecurityPanel = async () => {
  const { t, fmt } = await context();
  const maxDiff = Math.max(
    ...SECURITY_PRS.map((pr) => pr.additions + pr.deletions),
  );
  return (
    <div className={styles.lib}>
      <p className={styles.lede}>{t("items.security.body")}</p>
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
                {t(`items.security.items.${pr.id}`)}
              </span>
              <ArrowUpRight />
            </a>
            <span className="visually-hidden">
              {t("items.security.diffLabel", {
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
              +{fmt.format(pr.additions)} &minus;{fmt.format(pr.deletions)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
