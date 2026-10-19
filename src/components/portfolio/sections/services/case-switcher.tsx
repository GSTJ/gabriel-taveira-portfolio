"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import styles from "./services.module.css";

export type Case = { id: string; problem: string; panel: ReactNode };

/**
 * The visitor picks the problem that sounds like their team; the stage shows
 * that case. Panels arrive rendered from the server, so this island only owns
 * which one is selected. Every panel stays in the HTML: without JS they read
 * as a stacked list, with JS the unselected ones fade out in the same grid
 * cell, so the stage keeps the tallest case's height and nothing shifts.
 */
export const CaseSwitcher = ({
  copy: { cases, label },
}: {
  copy: { cases: readonly Case[]; label: string };
}) => {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  // The bar follows the selected tab. Written straight to `transform`, and
  // re-measured when the rail reflows (wrapping copy, font swap).
  useLayoutEffect(() => {
    const place = () => {
      const tab = tabs.current[selected];
      if (!tab || !bar.current) return;
      bar.current.style.transform = `translateY(${tab.offsetTop}px) scaleY(${tab.offsetHeight})`;
    };
    place();
    const ro = new ResizeObserver(place);
    if (list.current) ro.observe(list.current);
    return () => ro.disconnect();
  }, [selected]);

  const select = (index: number) => {
    const next = (index + cases.length) % cases.length;
    setSelected(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
      e.key
    ];
    if (step) select(selected + step);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(cases.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className={styles.switcher}>
      <div
        ref={list}
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className={styles.tabs}
      >
        <span ref={bar} className={styles.bar} aria-hidden="true" />
        {cases.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`${id}-tab-${c.id}`}
            type="button"
            role="tab"
            aria-selected={i === selected}
            aria-controls={`${id}-panel-${c.id}`}
            tabIndex={i === selected ? 0 : -1}
            className={styles.tab}
            onClick={() => setSelected(i)}
            onKeyDown={onKeyDown}
          >
            {c.problem}
          </button>
        ))}
      </div>
      <div className={styles.stage}>
        {cases.map((c, i) => (
          <div
            key={c.id}
            id={`${id}-panel-${c.id}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${c.id}`}
            tabIndex={i === selected ? 0 : -1}
            data-active={i === selected ? "" : undefined}
            className={styles.panel}
          >
            {c.panel}
          </div>
        ))}
      </div>
    </div>
  );
};
