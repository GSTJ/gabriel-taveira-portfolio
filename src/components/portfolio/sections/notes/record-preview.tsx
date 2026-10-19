"use client";

import { useEffect, useRef, type ReactNode } from "react";

import styles from "./notes.module.css";

/** Pointers that can hover precisely, on people who don't mind motion. */
const QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Hovering a row that carries `data-thumb` shows that episode's real
 * thumbnail next to the pointer. It trails the pointer a little (a lerp per
 * frame) so it reads as an object, and loads nothing until the first hover.
 */
export const RecordPreview = ({ children }: { children: ReactNode }) => {
  const preview = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = preview.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const mq = matchMedia(QUERY);
    const target = { x: 0, y: 0 };
    const at = { x: 0, y: 0 };
    let frame = 0;
    let src = "";

    const tick = () => {
      at.x += (target.x - at.x) * 0.3;
      at.y += (target.y - at.y) * 0.3;
      el.style.translate = `${at.x}px ${at.y}px`;
      frame =
        Math.abs(target.x - at.x) + Math.abs(target.y - at.y) > 0.5
          ? requestAnimationFrame(tick)
          : 0;
    };

    const hide = () => {
      delete el.dataset.on;
    };

    const move = (event: PointerEvent) => {
      if (!mq.matches) return;
      const row = (event.target as Element).closest<HTMLElement>(
        "[data-thumb]",
      );
      if (!row?.dataset.thumb) {
        hide();
        return;
      }
      if (row.dataset.thumb !== src) {
        src = row.dataset.thumb;
        el.style.backgroundImage = `url(${src})`;
      }
      const { width, height } = el.getBoundingClientRect();
      const right = event.clientX + 20 + width < innerWidth;
      target.x = right ? event.clientX + 20 : event.clientX - 20 - width;
      target.y = Math.max(8, event.clientY - height / 2);
      if (!Object.hasOwn(el.dataset, "on")) {
        at.x = target.x;
        at.y = target.y;
        el.dataset.on = "";
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", hide);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div>
      {children}
      <span ref={preview} className={styles.preview} aria-hidden="true" />
    </div>
  );
};
