import type { ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import {
  currentMonthLabel,
  yearsInIndustry,
  yearsTinkering,
} from "../../lifeline";
import { ArrowUpRight } from "../../ui/icons";
import { Annotated, Marginalia } from "../../ui/marginalia";
import { enter } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { HERO_LINKS } from "./data";

import styles from "./hero.module.css";

/** Rich-text renderers for the title and body, at module scope so each is one stable function. */
const titleTags = {
  me: (chunks: ReactNode) => <span className={styles.me}>{chunks}</span>,
  pen: (chunks: ReactNode) => <PenUnderline delay={720}>{chunks}</PenUnderline>,
};

const noteTag = (note: string) => (chunks: ReactNode) => (
  <Marginalia note={note} delay={820}>
    <strong>{chunks}</strong>
  </Marginalia>
);

/**
 * Placeholder: C's opening in plain form. Name, offer, proof, in that order;
 * the pen underlines the claim, then annotates the proof.
 */
export const HeroSection = async () => {
  const t = await getTranslations("hero");
  const locale = await getLocale();

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

      {/* No entrance: the headline is readable on first paint. The pen
          underline inside it still draws itself in. */}
      <h1 id="hero-title" className={cn("t-display", styles.title)}>
        {t.rich("title", titleTags)}
      </h1>

      <div className={styles.body}>
        <Annotated as="p" className="t-lede" {...enter(200)}>
          {t.rich("body", {
            years: yearsInIndustry(),
            note: noteTag(t("notes.yesReally")),
          })}
        </Annotated>
        <p className="t-lede" {...enter(280)}>
          {t("body2", { tinkering: yearsTinkering() })}
        </p>
        <div className={styles.actions} {...enter(360)}>
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
    </section>
  );
};
