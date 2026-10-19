"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

import styles from "./projects.module.css";

export type LoopVideoCopy = {
  label: string;
  play: string;
  pause: string;
};

const REDUCE = "(prefers-reduced-motion: reduce)";
/** How much of the video has to be on screen before it plays. */
const VISIBLE = 0.5;

/**
 * A real screen recording, muted and looping inside a phone. Plays while half
 * of it is on screen and the tab is visible, pauses otherwise. The first press
 * on the button hands it to the visitor for good. Reduced motion never
 * autoplays: the poster stays until someone presses Play.
 */
export const LoopVideo = ({
  src,
  poster,
  width,
  height,
  copy,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  copy: LoopVideoCopy;
}) => {
  const video = useRef<HTMLVideoElement>(null);
  const owned = useRef(false);
  const [playing, setPlaying] = useState(false);
  /** Within a screen of the viewport: time to fetch the poster. */
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el || matchMedia(REDUCE).matches) return;
    let visible = false;
    const sync = () => {
      if (owned.current) return;
      if (visible && !document.hidden) void el.play().catch(() => undefined);
      else el.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = (entry?.intersectionRatio ?? 0) >= VISIBLE;
        sync();
      },
      { threshold: [0, VISIBLE] },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    owned.current = true;
    if (el.paused) void el.play().catch(() => undefined);
    else el.pause();
  };

  return (
    <>
      <video
        ref={video}
        className={styles.loop}
        src={src}
        poster={near ? poster : undefined}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={copy.label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <noscript>
        {/* oxlint-disable-next-line nextjs/no-img-element -- no-JS fallback only */}
        <img className={styles.loopPoster} src={poster} alt="" />
      </noscript>
      <button
        type="button"
        className={cn("icon-btn", styles.loopToggle)}
        onClick={toggle}
        aria-label={playing ? copy.pause : copy.play}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          {playing ? (
            <path d="M5 3.5v9M11 3.5v9" />
          ) : (
            <path d="M5.5 3.2v9.6L12.6 8z" />
          )}
        </svg>
      </button>
    </>
  );
};
