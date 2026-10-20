import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";

import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import { enter } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { HERO_APPS, HERO_LINKS } from "./data";

import styles from "./hero.module.css";

/** Rich-text renderers for the title and body, at module scope so each is one stable function. */
const titleTags = {
  pen: (chunks: ReactNode) => <PenUnderline delay={720}>{chunks}</PenUnderline>,
};

const bodyTags = {
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
};

/**
 * A short line in his voice, one paragraph of proof, the CTAs, then straight
 * into Projects. The pen underlines one phrase of the title and nothing else.
 */
export const HeroSection = async () => {
  const t = await getTranslations("hero");

  return (
    <section
      id="hero"
      className={cn("wrap", styles.hero)}
      aria-labelledby="hero-title"
    >
      {/* No entrance: the headline is readable on first paint. The pen
          underline inside it still draws itself in. */}
      <h1 id="hero-title" className={cn("t-display", styles.title)}>
        {t.rich("title", titleTags)}
      </h1>

      <div className={styles.body}>
        <p className="t-lede" {...enter(200)}>
          {t.rich("body", bodyTags)}
        </p>
        <div className={styles.actions} {...enter(280)}>
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

      {/* Pre-sized 192px webps, so no optimizer. Lazy and low priority: the
          lede stays the LCP and the box is sized before they arrive. */}
      <ul className={styles.apps} aria-label={t("apps.label")} {...enter(360)}>
        {HERO_APPS.map((app, i) => (
          <li
            key={app.id}
            className={styles.app}
            style={{ "--i": i } as CSSProperties}
          >
            <a href={app.href}>
              <Image
                src={`/hero/${app.id}.webp`}
                alt=""
                width={96}
                height={96}
                unoptimized
                loading="lazy"
                fetchPriority="low"
              />
              <span className={styles.label}>
                {app.name} · {t(`apps.items.${app.id}`)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
