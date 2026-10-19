import Image from "next/image";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import { CURVINHA_SHOTS, CURVINHA_STEPS, type CurvinhaStep } from "./data";
import { LoopVideo, type LoopVideoCopy } from "./loop-video";
import { Near } from "./near";

import styles from "./projects.module.css";

export type CurvinhaCopy = {
  title: string;
  role: string;
  problem: string;
  stack: string;
  live: string;
  devices: string;
  languages: string;
  cta: string;
  video: LoopVideoCopy;
  scanCaption: string;
  stepsLabel: string;
  steps: Record<CurvinhaStep, { title: string; body: string; alt: string }>;
};

const THEMES = { light: "only-light", dark: "only-dark" } as const;

/**
 * Curvinha as one story: the scan plays in the phone, then the three things
 * it turns into (plan, 3D proposal, fit check), every one a real app screen
 * from the sample room, cropped above the price sheet. Below the card's own
 * width the phone and the outputs share one swipeable strip.
 */
export const CurvinhaCard = ({
  copy,
  href,
  appStore,
  lang,
}: {
  copy: CurvinhaCopy;
  href: string;
  appStore: string;
  lang: "en" | "pt";
}) => (
  <article
    className={cn(styles.card, styles.curvinha)}
    aria-labelledby="cv-title"
  >
    <div className={styles.cvCopy}>
      <h3 id="cv-title" className={cn("t-h1", styles.cvTitle)}>
        {copy.title}
      </h3>
      <p className={cn("t-small", styles.role)}>{copy.role}</p>
      <p className={styles.cvProblem}>{copy.problem}</p>
      <ul className={cn("t-meta", styles.facts)}>
        <li>
          <a href={appStore}>{copy.live}</a>
        </li>
        <li>{copy.devices}</li>
        <li>{copy.languages}</li>
      </ul>
      <p className={cn("t-small", styles.stack)}>{copy.stack}</p>
      <a className={cn("btn", styles.cvCta)} href={href}>
        {copy.cta}
        <ArrowUpRight />
      </a>
    </div>

    <div className={styles.cvStrip}>
      <figure className={styles.cvScan}>
        <div className={styles.phone}>
          <LoopVideo
            src="/projects/curvinha/scan-loop.mp4"
            poster="/projects/curvinha/scan-loop-poster.webp"
            width={480}
            height={980}
            copy={copy.video}
          />
        </div>
        <figcaption className="t-meta">{copy.scanCaption}</figcaption>
      </figure>

      <ol className={styles.cvSteps} aria-label={copy.stepsLabel}>
        {CURVINHA_STEPS.map((step) => (
          <li key={step} className={styles.cvStep} data-step={step}>
            <figure>
              <Near
                className={styles.shot}
                style={{
                  aspectRatio: `${CURVINHA_SHOTS[step].width} / ${CURVINHA_SHOTS[step].height}`,
                }}
              >
                {(["light", "dark"] as const).map((theme) => (
                  <Image
                    key={theme}
                    className={THEMES[theme]}
                    src={`/projects/curvinha/${step}-${theme}-${lang}.webp`}
                    width={CURVINHA_SHOTS[step].width}
                    height={CURVINHA_SHOTS[step].height}
                    sizes="(width < 760px) 70vw, 300px"
                    alt={copy.steps[step].alt}
                  />
                ))}
              </Near>
              <figcaption>
                <span className={styles.stepTitle}>
                  {copy.steps[step].title}
                </span>{" "}
                <span className="t-meta">{copy.steps[step].body}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </div>
  </article>
);
