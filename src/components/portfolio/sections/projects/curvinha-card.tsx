"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";

import Image from "next/image";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import { CURVINHA_STEPS, type CurvinhaStep } from "./data";

import styles from "./projects.module.css";

export type CurvinhaCopy = {
  title: string;
  role: string;
  body: string;
  cta: string;
  caption: string;
  stepsLabel: string;
  steps: Record<CurvinhaStep, { title: string; body: string; alt: string }>;
};

/** How long each step holds while the card plays itself. Matches the CSS timer. */
const STEP_MS = 3600;
const LAST = CURVINHA_STEPS.length - 1;
const THEMES = { light: "only-light", dark: "only-dark" } as const;

const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Plays the three steps once while at least 35% of the card is on screen and
 * the tab is visible, then rests on the 3D room. Pressing or focusing a step
 * hands the card to the visitor for good. Reduced motion skips the tour and
 * opens on the room.
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
  const card = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [owned, setOwned] = useState(false);
  const reduce = useSyncExternalStore(
    subscribeReduce,
    () => matchMedia(REDUCE).matches,
    () => false,
  );

  const current = reduce && !owned ? LAST : step;
  const playing = inView && !owned && !reduce && current < LAST;

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    let visible = false;
    const sync = () => setInView(visible && !document.hidden);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(
      () => setStep((i) => Math.min(i + 1, LAST)),
      STEP_MS,
    );
    return () => clearInterval(timer);
  }, [playing]);

  const select = (index: number, focus = false) => {
    const next = (index + CURVINHA_STEPS.length) % CURVINHA_STEPS.length;
    setOwned(true);
    setStep(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: current + 1,
      ArrowRight: current + 1,
      ArrowUp: current - 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: LAST,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  const takeOver = () => {
    if (owned) return;
    setStep(current);
    setOwned(true);
  };

  const panelId = `${id}-panel`;

  return (
    <article
      ref={card}
      className={cn(styles.card, styles.curvinha)}
      aria-labelledby={`${id}-title`}
      data-playing={playing ? "" : undefined}
    >
      <div className={styles.cvCopy}>
        <h3 id={`${id}-title`} className={cn("t-h1", styles.cvTitle)}>
          {copy.title}
        </h3>
        <p className={cn("t-small", styles.cvRole)}>{copy.role}</p>
        <p className={styles.cvBody}>{copy.body}</p>

        <div
          className={styles.cvSteps}
          role="tablist"
          aria-label={copy.stepsLabel}
          aria-orientation="vertical"
        >
          {CURVINHA_STEPS.map((name, i) => (
            <button
              key={name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${id}-tab-${i}`}
              className={styles.cvStep}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-controls={panelId}
              tabIndex={i === current ? 0 : -1}
              onClick={() => select(i)}
              onFocus={takeOver}
              onKeyDown={onKey}
            >
              <span className={cn("num", styles.cvStepN)}>{i + 1}</span>
              <span className={styles.cvStepTitle}>
                {copy.steps[name].title}
              </span>
              <span className={styles.cvStepBody}>{copy.steps[name].body}</span>
              <span
                key={`${current}-${playing}`}
                className={styles.cvTimer}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        <div className={styles.cvFoot}>
          <a className="btn" href={href}>
            {copy.cta}
            <ArrowUpRight />
          </a>
          <span className="t-meta">{copy.caption}</span>
        </div>
      </div>

      <div
        id={panelId}
        className={styles.phone}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${current}`}
      >
        <div className={styles.screen}>
          {CURVINHA_STEPS.map((name, i) => (
            <div
              key={name}
              className={styles.shot}
              data-on={i === current ? "" : undefined}
              aria-hidden={i === current ? undefined : true}
            >
              {(["light", "dark"] as const).map((theme) => (
                <Image
                  key={theme}
                  className={THEMES[theme]}
                  src={`/projects/curvinha/${name}-${theme}-${lang}.webp`}
                  width={600}
                  height={970}
                  sizes="(width < 760px) 270px, 330px"
                  alt={copy.steps[name].alt}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
