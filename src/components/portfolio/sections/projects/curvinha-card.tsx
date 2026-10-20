"use client";

import { useId } from "react";

import Image from "next/image";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import { CURVINHA_STEPS, type CurvinhaStep } from "./data";
import { TourScreen, TourSteps, useTour, type TourStep } from "./tour";

import styles from "./projects.module.css";

export type CurvinhaCopy = {
  title: string;
  role: string;
  body: string;
  cta: string;
  caption: string;
  stepsLabel: string;
  pause: string;
  replay: string;
  steps: Record<CurvinhaStep, TourStep & { alt: string }>;
  pieceAlt: string;
  fitAlt: string;
  fitNote: string;
};

const THEMES = { light: "only-light", dark: "only-dark" } as const;
const PHONE = {
  width: 600,
  height: 1304,
  sizes: "(width < 760px) 45vw, 230px",
};

/**
 * Two whole screens beside the copy: the front phone plays the three steps,
 * the other is a piece page whose "Why it's for you" block is lifted off and
 * enlarged. Reduced motion opens on the furnished room.
 */
export const CurvinhaCard = ({
  copy,
  href,
  lang,
}: {
  copy: CurvinhaCopy;
  href: string;
  lang: "en" | "pt";
}) => {
  const id = useId();
  const tour = useTour(CURVINHA_STEPS.length, CURVINHA_STEPS.indexOf("room"));

  /** Both themes of one capture; CSS shows the one that matches the page. */
  const capture = (
    name: string,
    alt: string,
    size: { width: number; height: number; sizes: string },
  ) =>
    (["light", "dark"] as const).map((theme) => (
      <Image
        key={theme}
        className={THEMES[theme]}
        src={`/projects/curvinha/${name}-${theme}-${lang}.webp`}
        alt={alt}
        {...size}
      />
    ));

  return (
    <article
      className={cn(styles.card, styles.curvinha)}
      aria-labelledby={`${id}-title`}
      data-playing={tour.playing ? "" : undefined}
    >
      <div className={styles.cvCopy}>
        <div className={styles.cvHead}>
          <h3 id={`${id}-title`} className={cn("t-h1", styles.cvTitle)}>
            {copy.title}
          </h3>
          <p className={cn("t-small", styles.cvRole)}>{copy.role}</p>
          <p className={styles.cvBody}>{copy.body}</p>
        </div>

        <TourSteps
          tour={tour}
          id={id}
          label={copy.stepsLabel}
          order={CURVINHA_STEPS}
          steps={copy.steps}
          pause={copy.pause}
          replay={copy.replay}
        />

        <div className={styles.cvFoot}>
          <a className="btn" href={href}>
            {copy.cta}
            <ArrowUpRight />
          </a>
          <span className="t-meta">{copy.caption}</span>
        </div>
      </div>

      <div className={styles.cvStage}>
        <TourScreen
          tour={tour}
          id={id}
          count={CURVINHA_STEPS.length}
          className={styles.cvFront}
          render={(i) => {
            const name = CURVINHA_STEPS[i] ?? "measure";
            return capture(name, copy.steps[name].alt, PHONE);
          }}
        />
        <div className={cn(styles.screen, styles.cvBack)}>
          {capture("piece", copy.pieceAlt, PHONE)}
        </div>
        <figure className={styles.cvPull}>
          {capture("fit", copy.fitAlt, {
            width: 600,
            height: lang === "pt" ? 226 : 196,
            sizes: "(width < 760px) 60vw, 360px",
          })}
          <figcaption className={styles.cvNote}>
            <Marginalia placement="inline" note={copy.fitNote} />
          </figcaption>
        </figure>
      </div>
    </article>
  );
};
