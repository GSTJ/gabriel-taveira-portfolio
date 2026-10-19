import type { ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel, yearsInIndustry } from "../../lifeline";
import { ArrowUpRight } from "../../ui/icons";
import { Annotated, Marginalia } from "../../ui/marginalia";
import { enter } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { HERO_LINKS } from "./data";

import styles from "./hero.module.css";

/** The gloss's rows (narrow) and lines (wide), fixed so a font swap can't rewrap it. */
const glossTags = {
  r: (chunks: ReactNode) => <span className={styles.row}>{chunks}</span>,
  l: (chunks: ReactNode) => <span className={styles.line}>{chunks}</span>,
};

/** The title's renderers: the pen underlines the claim, then the gloss explains it. */
const titleTags = (gloss: ReactNode) => ({
  me: (chunks: ReactNode) => <span className={styles.me}>{chunks}</span>,
  pen: (chunks: ReactNode) => (
    <>
      <PenUnderline delay={480}>{chunks}</PenUnderline>
      <Marginalia note={gloss} delay={1080} />
    </>
  ),
});

const noteTag = (note: string) => (chunks: ReactNode) => (
  <Marginalia note={note} delay={1900}>
    <strong>{chunks}</strong>
  </Marginalia>
);

/**
 * Name, offer, proof, in that order. The pen underlines "the hard parts" and
 * glosses it in the margin with what they are; the paragraph under it is the
 * proof: the Coinbase work, then his note on the number people doubt.
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
          underline and the gloss inside it still draw themselves in. */}
      <Annotated
        as="h1"
        id="hero-title"
        className={cn("t-display", styles.title)}
      >
        {t.rich("title", titleTags(t.rich("notes.hardParts", glossTags)))}
      </Annotated>

      <div className={styles.body}>
        <p className="t-lede" {...enter(200)}>
          {t("body")}
        </p>
        <Annotated as="p" className="t-lede" {...enter(280)}>
          {t.rich("body2", {
            years: yearsInIndustry(),
            note: noteTag(t("notes.yesReally")),
          })}
        </Annotated>
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
