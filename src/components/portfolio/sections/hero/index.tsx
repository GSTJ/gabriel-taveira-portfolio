import type { ReactNode } from "react";

import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../../lifeline";
import { ArrowUpRight } from "../../ui/icons";
import { Annotated, Marginalia } from "../../ui/marginalia";
import { enter } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { HERO_LINKS, MAGIC_MODAL_CALL } from "./data";
import { getNpmTotal } from "./npm";

import styles from "./hero.module.css";

/** Rich-text renderers for the title and lede, at module scope so each is one stable function. */
const titleTags = {
  me: (chunks: ReactNode) => <span className={styles.me}>{chunks}</span>,
  pen: (chunks: ReactNode) => <PenUnderline delay={720}>{chunks}</PenUnderline>,
};

const noteTag = (note: string) => (chunks: ReactNode) => (
  <Marginalia note={note} delay={1100}>
    <strong>{chunks}</strong>
  </Marginalia>
);

const THEMES = { light: "only-light", dark: "only-dark" } as const;

/** Points down: the proof is further down this page. */
const ArrowDown = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 3v10M4 9l4 4 4-4" />
  </svg>
);

/** The way down to the section that proves an artifact. */
const more = (label: string) => (
  <span className={cn("t-small", styles.more)}>
    {label}
    <ArrowDown />
  </span>
);

/**
 * The letter, then a contact sheet: three real artifacts, each a way down to
 * the section that proves it. Name, offer, proof, in that order.
 */
export const HeroSection = async () => {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const lang = locale.startsWith("pt") ? "pt" : "en";

  const npm = await getNpmTotal();
  const day = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <section
      id="hero"
      className={cn("wrap", styles.hero)}
      aria-labelledby="hero-title"
    >
      <p className={cn("t-small", styles.letterhead)} {...enter()}>
        <span className={styles.status}>{t("status")}</span>
        <span>{t("place", { month: currentMonthLabel(locale) })}</span>
      </p>

      {/* No entrance: the headline is the LCP and reads on first paint. The
          pen underline inside it still draws itself in. */}
      <h1 id="hero-title" className={cn("t-display", styles.title)}>
        {t.rich("title", titleTags)}
      </h1>

      <div className={styles.body}>
        <div className={styles.letter} {...enter(120)}>
          <Annotated as="p" className="t-lede">
            {t.rich("lede", { note: noteTag(t("notes.yesReally")) })}
          </Annotated>
          <p className={cn("t-small", styles.origin)}>{t("origin")}</p>
        </div>
        <div className={styles.actions} {...enter(200)}>
          <a className="btn" href="#contact">
            {t("cta.getInTouch")}
          </a>
          <a className="btn btn-ghost" href={HERO_LINKS.pdf}>
            {t("cta.downloadPdf")}
          </a>
          <a
            className={cn("link-arrow", styles.plain)}
            href={HERO_LINKS.linkedin}
          >
            {t("cta.linkedIn")}
            <ArrowUpRight />
          </a>
        </div>
      </div>

      <ul className={styles.sheet} aria-label={t("sheet.label")}>
        <li {...enter(320)}>
          <a className={cn(styles.item, styles.app)} href="#projects">
            <span className={styles.phone}>
              {(["light", "dark"] as const).map((theme) => (
                <Image
                  key={theme}
                  className={THEMES[theme]}
                  src={`/hero/curvinha-plan-${theme}-${lang}.webp`}
                  width={600}
                  height={970}
                  sizes="112px"
                  alt={t("sheet.curvinha.alt")}
                />
              ))}
            </span>
            <span className={styles.text}>
              <span className="t-title">{t("sheet.curvinha.title")}</span>
              <span className={cn("t-small", styles.body2)}>
                {t("sheet.curvinha.body")}
              </span>
              {more(t("sheet.toProjects"))}
            </span>
          </a>
        </li>
        <li {...enter(400)}>
          <a className={styles.item} href="#projects">
            <code className={cn("t-mono", styles.code)}>
              {MAGIC_MODAL_CALL.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </code>
            <span className={cn("t-small", styles.body2)}>
              {t("sheet.oss.body", {
                total: npm.total,
                start: day.format(new Date(npm.start)),
                end: day.format(new Date(npm.end)),
              })}
            </span>
            {more(t("sheet.toProjects"))}
          </a>
        </li>
        <li {...enter(480)}>
          <a className={styles.item} href="#work">
            <span className="t-meta">{t("sheet.coinbase.meta")}</span>
            <span className="t-title">{t("sheet.coinbase.title")}</span>
            <span className={cn("t-small", styles.body2)}>
              {t("sheet.coinbase.body")}
            </span>
            {more(t("sheet.toWork"))}
          </a>
        </li>
      </ul>
    </section>
  );
};
