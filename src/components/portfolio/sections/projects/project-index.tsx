"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

import { ROWS, type RowId } from "./data";

import styles from "./projects.module.css";

/** Where the index splits into rows on the left and a sticky stage on the right. */
const WIDE = "(width >= 1000px)";
const subscribeWide = (cb: () => void) => {
  const mq = matchMedia(WIDE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
/** A row previews on hover only after the pointer rests on it this long. */
const HOVER_MS = 140;
/** Matches the stage's exit in the CSS. */
const EXIT_MS = 160;

/**
 * One list of projects, two layouts. Wide: rows on the left, the selected
 * row's proof on a sticky stage to the right, always one selected. Narrow:
 * each row is a disclosure and its proof opens right under it. Without JS
 * every panel is open under its row.
 *
 * Every row is a button with `aria-expanded` (the accordion pattern), so the
 * same markup is valid in both layouts. Arrow keys move between rows; on the
 * wide layout they select too, like tabs.
 */
export const ProjectIndex = ({
  heads,
  panels,
}: {
  heads: Record<RowId, ReactNode>;
  panels: Record<RowId, ReactNode>;
}) => {
  const id = useId();
  const first: RowId = "curvinha";
  const [open, setOpen] = useState<RowId | null>(first);
  const [leaving, setLeaving] = useState<RowId | null>(null);
  const buttons = useRef<Partial<Record<RowId, HTMLButtonElement | null>>>({});
  const hover = useRef<number | undefined>(undefined);
  const wide = useSyncExternalStore(
    subscribeWide,
    () => matchMedia(WIDE).matches,
    () => false,
  );

  const current = wide ? (open ?? first) : open;

  const select = (next: RowId, toggle = false) => {
    if (next === current) {
      if (!wide && toggle) setOpen(null);
      return;
    }
    if (wide) {
      if (current) setLeaving(current);
      setOpen(next);
      return;
    }
    // Narrow: a panel closing above the pressed row would yank the row up.
    // Commit the change now, then put the row back where the finger left it.
    const button = buttons.current[next];
    const before = button?.getBoundingClientRect().top ?? 0;
    flushSync(() => setOpen(next));
    const delta = (button?.getBoundingClientRect().top ?? 0) - before;
    if (Math.abs(delta) > 1) scrollBy({ top: delta, behavior: "instant" });
  };

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => setLeaving(null), EXIT_MS);
    return () => clearTimeout(timer);
  }, [leaving]);

  useEffect(() => () => clearTimeout(hover.current), []);

  const onKey = (e: KeyboardEvent, index: number) => {
    const keys: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: ROWS.length - 1,
    };
    const target = keys[e.key];
    if (target === undefined) return;
    e.preventDefault();
    const row = ROWS[(target + ROWS.length) % ROWS.length];
    if (!row) return;
    buttons.current[row]?.focus();
    if (wide) select(row);
  };

  const onEnter = (e: PointerEvent, row: RowId) => {
    if (!wide || e.pointerType !== "mouse") return;
    clearTimeout(hover.current);
    hover.current = window.setTimeout(() => select(row), HOVER_MS);
  };
  const onLeave = () => clearTimeout(hover.current);

  return (
    <div
      className={styles.index}
      style={{ "--rows": ROWS.length } as CSSProperties}
    >
      {ROWS.map((row, i) => {
        const isOpen = row === current;
        const isLeaving = row === leaving && !isOpen;
        const rowId = `${id}-${row}`;
        return (
          <div key={row} className={styles.item}>
            <h3 className={styles.rowHead}>
              <button
                ref={(el) => {
                  buttons.current[row] = el;
                }}
                id={rowId}
                type="button"
                className={styles.row}
                aria-expanded={isOpen}
                aria-controls={`${rowId}-panel`}
                onClick={() => select(row, true)}
                onKeyDown={(e) => onKey(e, i)}
                onPointerEnter={(e) => onEnter(e, row)}
                onPointerLeave={onLeave}
              >
                {heads[row]}
              </button>
            </h3>
            <section
              id={`${rowId}-panel`}
              aria-labelledby={rowId}
              className={styles.panel}
              data-open={isOpen || undefined}
              data-leaving={isLeaving || undefined}
              inert={isLeaving || undefined}
            >
              {panels[row]}
            </section>
          </div>
        );
      })}
    </div>
  );
};
