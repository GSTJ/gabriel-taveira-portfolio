"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

import styles from "./projects.module.css";

export type StageVideoCopy = { label: string; play: string; pause: string };

const REDUCE = "(prefers-reduced-motion: reduce)";
/** How much of the video has to be on screen before it plays. */
const VISIBLE = 0.5;

/**
 * A muted product loop. Plays while half of it is on screen (a closed panel
 * is `display: none`, so it never is) and the tab is visible. The first press
 * on the button hands it to the visitor for good. Reduced motion never
 * autoplays: the poster stays until someone presses play.
 */
export const StageVideo = ({
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
  copy: StageVideoCopy;
}) => {
  const video = useRef<HTMLVideoElement>(null);
  const owned = useRef(false);
  const [playing, setPlaying] = useState(false);

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
        className={styles.video}
        src={src}
        poster={poster}
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
      <button
        type="button"
        className={cn("icon-btn", styles.videoToggle)}
        onClick={toggle}
        aria-label={playing ? copy.pause : copy.play}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          {playing ? (
            <path d="M5.5 3.5v9M10.5 3.5v9" />
          ) : (
            <path d="M5.5 3.2v9.6L12.6 8z" />
          )}
        </svg>
      </button>
    </>
  );
};
