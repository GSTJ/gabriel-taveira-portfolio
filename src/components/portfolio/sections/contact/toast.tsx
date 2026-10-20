"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

import styles from "./contact.module.css";

/** How long the toast stays up, paused while hovered or the tab is hidden. */
const VISIBLE_MS = 2400;
/** A flick up this fast (px/ms) dismisses, however short the drag. */
const FLICK = 0.11;
const SWIPE_PX = 24;

/**
 * A toast that behaves like react-native-magic-toast: drops in from the top,
 * pauses on hover and in a hidden tab, swipes up to dismiss. The real
 * package needs react-native, so this is the same contract in DOM. The live
 * region stays mounted so screen readers hear every message.
 */
export const useToast = () => {
  const [message, setMessage] = useState<{ text: string; ok: boolean }>();
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLOutputElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const left = useRef(VISIBLE_MS);
  const startedAt = useRef(0);
  const paused = useRef(false);
  const drag = useRef<{ y: number; t: number } | null>(null);

  const hide = () => {
    window.clearTimeout(timer.current);
    setShown(false);
  };

  const arm = (ms: number) => {
    paused.current = false;
    left.current = ms;
    startedAt.current = Date.now();
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(hide, ms);
  };

  const pause = () => {
    if (!shown || paused.current) return;
    paused.current = true;
    window.clearTimeout(timer.current);
    left.current -= Date.now() - startedAt.current;
  };

  const resume = () => {
    if (shown && paused.current) arm(Math.max(left.current, 900));
  };

  useEffect(() => {
    const onVisibility = () => (document.hidden ? pause() : resume());
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  });

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const show = (text: string, ok: boolean) => {
    setMessage({ text, ok });
    setShown(true);
    arm(VISIBLE_MS);
  };

  const onPointerDown = (e: PointerEvent<HTMLOutputElement>) => {
    if (drag.current) return;
    drag.current = { y: e.clientY, t: e.timeStamp };
    e.currentTarget.setPointerCapture(e.pointerId);
    pause();
  };

  const onPointerMove = (e: PointerEvent<HTMLOutputElement>) => {
    if (!drag.current || !ref.current) return;
    const dy = e.clientY - drag.current.y;
    // Up follows the finger; down resists, like pulling past the edge.
    const y = dy < 0 ? dy : Math.sqrt(dy) * 2;
    ref.current.style.transform = `translate(-50%, ${y}px)`;
  };

  const onPointerUp = (e: PointerEvent<HTMLOutputElement>) => {
    if (!drag.current || !ref.current) return;
    const dy = e.clientY - drag.current.y;
    const velocity = -dy / Math.max(e.timeStamp - drag.current.t, 1);
    drag.current = null;
    ref.current.style.transform = "";
    if (dy < -SWIPE_PX || velocity > FLICK) hide();
    else resume();
  };

  const toast = (
    <output
      ref={ref}
      className={styles.toast}
      data-shown={shown || undefined}
      onPointerEnter={pause}
      onPointerLeave={() => !drag.current && resume()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      // Empty the region once it's gone, so the next copy is announced again.
      onTransitionEnd={(e) => {
        if (!shown && e.target === e.currentTarget) setMessage(undefined);
      }}
    >
      {message ? (
        <>
          {message.ok ? (
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path pathLength={1} d="M4.5 10.5 8.5 14.5 15.5 6" />
            </svg>
          ) : null}
          <span>{message.text}</span>
        </>
      ) : null}
    </output>
  );

  return { show, toast };
};
