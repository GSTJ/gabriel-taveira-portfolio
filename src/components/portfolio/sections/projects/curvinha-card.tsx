"use client";

import { useId, type ReactNode } from "react";

import Image from "next/image";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import {
  CURVINHA_STACK,
  CURVINHA_STEPS,
  type CurvinhaStackId,
  type CurvinhaStep,
} from "./data";
import { TourScreen, TourSteps, useTour, type TourStep } from "./tour";

import styles from "./projects.module.css";

export type CurvinhaCopy = {
  title: string;
  role: string;
  stackLabel: string;
  stack: Record<CurvinhaStackId, string>;
  body: string;
  cta: string;
  caption: string;
  stepsLabel: string;
  steps: Record<CurvinhaStep, TourStep & { alt: string }>;
  roomAlt: string;
  fitAlt: string;
  fitNote: string;
  countedOn: string;
};

const THEMES = { light: "only-light", dark: "only-dark" } as const;
const PHONE = {
  width: 600,
  height: 1304,
  sizes: "(width < 760px) 45vw, 230px",
};

/**
 * Two whole screens beside the copy: the front phone plays the three steps
 * from the LiDAR scan, the other holds the room RoomKit furnished in 3D, with
 * a piece page's "Why it's for you" block enlarged over its foot. `facts` are
 * the repo's counts, rich text from the server.
 */
export const CurvinhaCard = ({
  copy,
  href,
  lang,
  facts,
}: {
  copy: CurvinhaCopy;
  href: string;
  lang: "en" | "pt";
  facts: { swift: ReactNode; tests: ReactNode; versions: ReactNode };
}) => {
  const id = useId();
  const tour = useTour(CURVINHA_STEPS.length);

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
          <ul className={styles.cvStack} aria-label={copy.stackLabel}>
            {CURVINHA_STACK.map((item) => (
              <li key={item.id}>
                <span lang="en">{item.name}</span> {copy.stack[item.id]}
              </li>
            ))}
          </ul>
        </div>

        <TourSteps
          tour={tour}
          id={id}
          label={copy.stepsLabel}
          order={CURVINHA_STEPS}
          steps={copy.steps}
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
            const name = CURVINHA_STEPS[i] ?? "scan";
            return capture(name, copy.steps[name].alt, PHONE);
          }}
        />
        <div className={cn(styles.screen, styles.cvBack)}>
          {capture("room", copy.roomAlt, PHONE)}
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

      <div className={styles.cvFacts}>
        <ul>
          <li>{facts.swift}</li>
          <li>{facts.tests}</li>
          <li>{facts.versions}</li>
        </ul>
        <p className="t-meta">{copy.countedOn}</p>
      </div>
    </article>
  );
};
