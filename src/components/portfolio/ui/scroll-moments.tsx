"use client";

import type { Scrub } from "./motion";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect } from "react";

/** Where each moment runs on the page, and how much the scrub lags the scroll. */
const RANGES = {
  ink: { start: "top 85%", end: "center 45%", scrub: 0.6 },
  depth: { start: "top bottom", end: "bottom top", scrub: 0.3 },
} satisfies Record<Scrub, ScrollTrigger.Vars>;

const start = async () => {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    for (const el of document.querySelectorAll<HTMLElement>("[data-scrub]")) {
      gsap.fromTo(
        el,
        { "--scrub": 0 },
        {
          "--scrub": 1,
          ease: "none",
          scrollTrigger: { trigger: el, ...RANGES[el.dataset.scrub as Scrub] },
        },
      );
    }
  });
  return () => mm.revert();
};

/** A short timeout where requestIdleCallback is missing. */
const idle = (run: () => void) =>
  "requestIdleCallback" in window
    ? requestIdleCallback(run)
    : setTimeout(run, 200);

/**
 * Loads GSAP only after load, on the first scroll, once the page is idle and
 * a `[data-scrub]` element is within half a screen. A visitor who never
 * scrolls never pays for it, and it never competes with first paint. Under
 * reduced motion it never loads.
 */
export const ScrollMoments = () => {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        void start().then((stop) => {
          if (cancelled) stop();
          else revert = stop;
        });
      },
      { rootMargin: "50% 0px" },
    );
    const observe = () =>
      idle(() => {
        if (cancelled) return;
        for (const el of document.querySelectorAll("[data-scrub]")) {
          io.observe(el);
        }
      });
    const arm = () =>
      addEventListener("scroll", observe, { once: true, passive: true });
    if (document.readyState === "complete") arm();
    else addEventListener("load", arm, { once: true });
    return () => {
      cancelled = true;
      removeEventListener("load", arm);
      removeEventListener("scroll", observe);
      io.disconnect();
      revert?.();
    };
  }, []);
  return null;
};
