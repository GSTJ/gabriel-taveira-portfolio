"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import { cn } from "@/utils/cn";

import styles from "./projects.module.css";

/** How long each step holds while a card plays itself. Matches the CSS timer. */
const STEP_MS = 3600;
/** How much of the screen has to be on screen before the tour plays. */
const VISIBLE = 0.35;
/** A horizontal drag this long, in px, turns the screen like a swipe. */
const SWIPE = 40;

const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export type TourStep = { title: string; body: string };

/**
 * A card that shows an app in steps. It plays the steps once while at least
 * 35% of the screen is in view and the tab is visible, then rests on `rest`
 * (the last step unless the card says otherwise).
 * Pressing, focusing or swiping hands the card to the visitor for good.
 * Reduced motion skips the tour and opens on `still`.
 */
export const useTour = (count: number, still = 0, rest = count - 1) => {
  const last = count - 1;
  const screen = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  /** The screen is within a viewport of the window: time to fetch images. */
  const [near, setNear] = useState(false);
  const [owned, setOwned] = useState(false);
  const [done, setDone] = useState(false);
  /** Screens shown so far stay mounted; the rest load one step ahead. */
  const [seen, setSeen] = useState<readonly number[]>([]);
  const reduce = useSyncExternalStore(
    subscribeReduce,
    () => matchMedia(REDUCE).matches,
    () => false,
  );

  const active = reduce && !owned ? still : step;
  const auto = !owned && !reduce && !done;
  const playing = inView && auto;
  if (!seen.includes(active)) setSeen([...seen, active]);

  useEffect(() => {
    const el = screen.current;
    if (!el) return;
    let visible = false;
    const sync = () => setInView(visible && !document.hidden);
    // `isIntersecting` is true from the first pixel, so read the ratio.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = (entry?.intersectionRatio ?? 0) >= VISIBLE;
        sync();
      },
      { threshold: [0, VISIBLE] },
    );
    io.observe(el);
    const approach = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setNear(true);
        approach.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    approach.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      approach.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      if (step < last) return setStep(step + 1);
      setStep(rest);
      setDone(true);
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [playing, step, last, rest]);

  const select = (index: number, focus = false) => {
    const next = (index + count) % count;
    setOwned(true);
    setStep(next);
    if (focus) tabs.current[next]?.focus();
  };

  const takeOver = () => {
    if (owned) return;
    setStep(active);
    setOwned(true);
  };

  return {
    screen,
    tabs,
    active,
    playing,
    near,
    seen,
    select,
    takeOver,
  };
};

export type Tour = ReturnType<typeof useTour>;

/** The numbered steps, as tabs. */
export const TourSteps = ({
  tour,
  id,
  label,
  order,
  steps,
}: {
  tour: Tour;
  id: string;
  label: string;
  order: readonly string[];
  steps: Record<string, TourStep>;
}) => {
  const { active } = tour;
  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: order.length - 1,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    tour.select(next, true);
  };

  return (
    <div
      className={styles.steps}
      role="tablist"
      aria-label={label}
      aria-orientation="vertical"
    >
      {order.map((name, i) => (
        <button
          key={name}
          ref={(el) => {
            tour.tabs.current[i] = el;
          }}
          id={`${id}-tab-${i}`}
          className={styles.step}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-controls={`${id}-panel`}
          tabIndex={i === active ? 0 : -1}
          onClick={() => tour.select(i)}
          onFocus={tour.takeOver}
          onKeyDown={onKey}
        >
          <span className={cn("num", styles.stepN)}>{i + 1}</span>
          <span className={styles.stepTitle}>{steps[name]?.title}</span>
          <span className={styles.stepBody}>
            <span>{steps[name]?.body}</span>
          </span>
          <span
            key={`${active}-${tour.playing}`}
            className={styles.timer}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
};

/**
 * The phone screen the steps control. Each step's capture crossfades in; a
 * horizontal drag on the screen goes to the next or previous step. The first
 * screen also renders without JavaScript.
 */
export const TourScreen = ({
  tour,
  id,
  count,
  className,
  render,
}: {
  tour: Tour;
  id: string;
  count: number;
  className?: string;
  render: (index: number) => ReactNode;
}) => {
  const { screen, active, near, seen, select } = tour;
  const start = useRef<number | null>(null);
  const down = (e: PointerEvent) => {
    start.current = e.clientX;
  };
  const up = (e: PointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    start.current = null;
    if (Math.abs(dx) < SWIPE) return;
    select(active + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      ref={screen}
      id={`${id}-panel`}
      className={cn(styles.screen, styles.tourScreen, className)}
      role="tabpanel"
      aria-labelledby={`${id}-tab-${active}`}
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={() => {
        start.current = null;
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={styles.shot}
          data-on={i === active ? "" : undefined}
          aria-hidden={i === active ? undefined : true}
        >
          {/* Fetched once the screen is a viewport away: the step on show,
              the next one, and any already seen. */}
          {near && (seen.includes(i) || i === active + 1) ? render(i) : null}
          {i === 0 ? <noscript>{render(i)}</noscript> : null}
        </div>
      ))}
    </div>
  );
};
