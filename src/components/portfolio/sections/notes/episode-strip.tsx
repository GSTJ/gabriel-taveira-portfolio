"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { cn } from "@/utils/cn";

import styles from "./notes.module.css";

export type EpisodeStripCopy = {
  list: string;
  prev: string;
  next: string;
  source: string;
};

const Chevron = ({ flip }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn(flip && styles.flip)}
  >
    <path d="M10 3.5 5.5 8l4.5 4.5" />
  </svg>
);

/**
 * The scroll-snap strip of episodes. Native horizontal scroll does the work
 * (touch, trackpad, keyboard through the links); the two buttons page it by
 * most of its width. They stay invisible until hydration, so a no-JS visitor
 * never sees a button that does nothing, and the row keeps its height.
 */
export const EpisodeStrip = ({
  copy,
  children,
}: {
  copy: EpisodeStripCopy;
  children: ReactNode;
}) => {
  const id = useId();
  const ref = useRef<HTMLUListElement>(null);
  const [ready, setReady] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdge({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    setReady(true);
    el.addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className={styles.stripWrap}>
      <div className={styles.stripBar}>
        <p className="t-meta">{copy.source}</p>
        <div className={styles.stripButtons} data-ready={ready || undefined}>
          <button
            type="button"
            className="icon-btn"
            aria-label={copy.prev}
            aria-controls={id}
            disabled={edge.start}
            onClick={() => page(-1)}
          >
            <Chevron />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={copy.next}
            aria-controls={id}
            disabled={edge.end}
            onClick={() => page(1)}
          >
            <Chevron flip />
          </button>
        </div>
      </div>
      <ul ref={ref} id={id} className={styles.strip} aria-label={copy.list}>
        {children}
      </ul>
    </div>
  );
};
