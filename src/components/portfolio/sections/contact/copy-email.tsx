"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

import { EMAIL_ADDR } from "./data";

import styles from "./contact.module.css";

export type CopyEmailCopy = Record<"copy" | "copied" | "copyFailed", string>;

/** How long the toast stays up, paused while hovered or the tab is hidden. */
const VISIBLE_MS = 2400;
/** A flick up this fast (px/ms) dismisses, however short the drag. */
const FLICK = 0.11;
const SWIPE_PX = 24;
/** How long the marker stays on the address after a copy. */
const SWEEP_MS = 1400;

/**
 * Copy email with a toast that behaves like react-native-magic-toast: drops
 * in from the top, pauses on hover and in a hidden tab, swipes up to dismiss.
 * The real package needs react-native, so this is the same contract in DOM.
 * The live region stays mounted so screen readers hear every message.
 */
export const CopyEmail = ({
  copy,
  addressId,
}: {
  copy: CopyEmailCopy;
  addressId: string;
}) => {
  const [message, setMessage] = useState<{ text: string; ok: boolean }>();
  const [shown, setShown] = useState(false);
  const toast = useRef<HTMLOutputElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const left = useRef(VISIBLE_MS);
  const startedAt = useRef(0);
  const paused = useRef(false);
  const drag = useRef<{ y: number; t: number } | null>(null);
  const sweep = useRef<number | undefined>(undefined);

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

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      window.clearTimeout(sweep.current);
    },
    [],
  );

  /** Marks the address the way a highlighter would, then lets it go. */
  const markAddress = () => {
    const address = document.querySelector<HTMLElement>(`#${addressId}`);
    if (!address) return;
    window.clearTimeout(sweep.current);
    delete address.dataset.swept;
    // Read layout so a second copy restarts the sweep from the left.
    void address.offsetWidth;
    address.dataset.swept = "";
    sweep.current = window.setTimeout(
      () => delete address.dataset.swept,
      SWEEP_MS,
    );
  };

  const show = (text: string, ok: boolean) => {
    setMessage({ text, ok });
    setShown(true);
    arm(VISIBLE_MS);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDR);
      markAddress();
      show(copy.copied, true);
    } catch {
      // No clipboard (insecure context, denied): select it for a manual copy.
      const address = document.querySelector<HTMLElement>(`#${addressId}`);
      if (address) window.getSelection()?.selectAllChildren(address);
      show(copy.copyFailed, false);
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLOutputElement>) => {
    if (drag.current) return;
    drag.current = { y: e.clientY, t: e.timeStamp };
    e.currentTarget.setPointerCapture(e.pointerId);
    pause();
  };

  const onPointerMove = (e: PointerEvent<HTMLOutputElement>) => {
    if (!drag.current || !toast.current) return;
    const dy = e.clientY - drag.current.y;
    // Up follows the finger; down resists, like pulling past the edge.
    const y = dy < 0 ? dy : Math.sqrt(dy) * 2;
    toast.current.style.transform = `translate(-50%, ${y}px)`;
  };

  const onPointerUp = (e: PointerEvent<HTMLOutputElement>) => {
    if (!drag.current || !toast.current) return;
    const dy = e.clientY - drag.current.y;
    const velocity = -dy / Math.max(e.timeStamp - drag.current.t, 1);
    drag.current = null;
    toast.current.style.transform = "";
    if (dy < -SWIPE_PX || velocity > FLICK) hide();
    else resume();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-ghost btn-small"
        onClick={onCopy}
      >
        {copy.copy}
      </button>
      <output
        ref={toast}
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
    </>
  );
};
