"use client";

import { useEffect, useState } from "react";

/* Everything that animates into view. Rows are staggered per observer
   batch so a screenful of ledger rows cascades instead of popping in
   at once. */
const REVEAL_SELECTOR = [
  ".ws-section-head",
  ".ws-work-row",
  ".ws-talks-row",
  ".ws-awards-row",
  ".ws-now-row",
  ".ws-pubs-feature",
  ".ws-pubs-card",
  ".ws-writing-callout",
  ".ws-contact-grid",
].join(", ");

/**
 * Scroll-driven reveal for the ledger rows and section heads.
 *
 * Fail-open by design: the SSR HTML ships fully visible; elements are
 * hidden only after mount, only below the fold, only when motion is
 * allowed, and never in headless/PDF contexts. Once revealed, the
 * animation classes are removed so each row's own hover transitions
 * take back over.
 */
export function useRevealOnScroll(): void {
  useEffect(() => {
    const isHeadless =
      /HeadlessChrome|Puppeteer/i.test(navigator.userAgent) ||
      (navigator as unknown as { webdriver?: boolean }).webdriver === true;
    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isHeadless || reducedMotion) return;

    // Only elements below the fold at mount get hidden — anything already
    // on screen would flash out and back in.
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    ).filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    if (!els.length) return;

    document.body.classList.add("ws-motion");
    els.forEach((el) => el.classList.add("ws-anim"));

    const cleanupTimers: number[] = [];
    const reveal = (el: HTMLElement, order: number) => {
      el.style.transitionDelay = `${order * 70}ms`;
      el.classList.add("is-in");
      cleanupTimers.push(
        window.setTimeout(() => {
          el.classList.remove("ws-anim", "is-in");
          el.style.removeProperty("transition-delay");
        }, 900 + order * 70),
      );
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            reveal(e.target as HTMLElement, i);
            obs.unobserve(e.target);
          });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    els.forEach((el) => obs.observe(el));

    return () => {
      obs.disconnect();
      cleanupTimers.forEach((id) => window.clearTimeout(id));
      document.body.classList.remove("ws-motion");
      els.forEach((el) => {
        el.classList.remove("ws-anim", "is-in");
        el.style.removeProperty("transition-delay");
      });
    };
  }, []);
}

/**
 * CONCRETO ambient motion — the page's entire moving-graphics budget:
 *   1. The Duarte sunburst (#ws-sunburst-rays) rotates with scroll delta.
 *   2. On coarse pointers the hero name grid gets one jitter pass when it
 *      first enters view (fine pointers jitter on hover via CSS).
 * Both skip entirely in headless/reduced-motion contexts.
 */
export function useConcretoMotion(): void {
  useEffect(() => {
    const headless =
      /HeadlessChrome|Puppeteer/i.test(navigator.userAgent) ||
      (navigator as unknown as { webdriver?: boolean }).webdriver === true;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (headless || reduced) return;

    // 1 · Sunburst: write the rotation straight to the SVG node.
    const rays = document.getElementById("ws-sunburst-rays");
    let deg = 0;
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (!rays || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        deg += Math.max(-1, Math.min(1, (y - lastY) * 0.02));
        lastY = y;
        rays.style.transform = `rotate(${deg}deg)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 2 · Name-grid jitter, once, on touch devices.
    const grid = document.querySelector<HTMLElement>(".ws-name-grid");
    let obs: IntersectionObserver | undefined;
    if (grid && matchMedia("(pointer: coarse)").matches) {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            grid.classList.add("ws-jitter-once");
            window.setTimeout(
              () => grid.classList.remove("ws-jitter-once"),
              1200,
            );
            obs?.disconnect();
          }
        },
        { threshold: 0.5 },
      );
      obs.observe(grid);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      obs?.disconnect();
    };
  }, []);
}

/**
 * Tracks which section is currently in view, used to highlight the nav.
 * Returns the section id (mapped: `contact`→`about`, `writing`→`publications`).
 */
export function useScrollSpy(): string {
  const [active, setActive] = useState("work");
  useEffect(() => {
    const ids = [
      "work",
      "publications",
      "talks",
      "awards",
      "writing",
      "about",
      "contact",
    ];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const onScroll = () => {
      const y = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (y >= sections[i].offsetTop) {
          const id = sections[i].id;
          setActive(
            id === "contact"
              ? "about"
              : id === "writing"
                ? "publications"
                : id,
          );
          return;
        }
      }
      setActive("work");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

/**
 * Writes a São Paulo wall-clock time into the element with id `targetId`.
 * Updates every second. Kept as a side-effect (vs state) to avoid re-rendering
 * the whole app every tick.
 */
export function useLiveClock(targetId = "ws-clock"): void {
  useEffect(() => {
    const tick = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const now = new Date();
      const t = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/Sao_Paulo",
      });
      el.textContent = `${t} BRT`;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetId]);
}

export type ToastPayload = { message: string; sub?: string };

export type KeyboardEffectsConfig = {
  onKonami: () => ToastPayload;
  onAudit: () => void;
};

/**
 * Wires up the three keyboard easter eggs:
 *   • `/`            — scroll to #contact and focus the first input
 *   • `gt`           — open the system audit overlay
 *   • Konami code    — CRT scanlines + beer rain + a toast
 *
 * Note: the Konami sequence ends in `b`, `a`, so we do not bind `b` as a
 * standalone shortcut — that always fired before Konami could complete.
 */
export function useKeyboardEffects(
  config: KeyboardEffectsConfig,
  setToast: (t: ToastPayload | null) => void,
): void {
  useEffect(() => {
    const KONAMI = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    const konamiRef: string[] = [];
    const gtRef: Array<{ k: string; t: number }> = [];

    const PENNANT_COLORS = ["#d8291a", "#1d3fbf", "#171410"];
    const spawnSpark = (i: number) => {
      const el = document.createElement("div");
      el.className = "ws-spark-rain";
      el.innerHTML = `<svg viewBox="0 0 56 76" aria-hidden="true"><path d="M0 0 H56 L28 76 Z" fill="${PENNANT_COLORS[i % 3]}"/></svg>`;
      el.style.left = 10 + Math.random() * 80 + "vw";
      el.style.animationDuration = 2.2 + Math.random() * 1.5 + "s";
      document.body.appendChild(el);
      window.setTimeout(() => el.remove(), 4500);
    };

    const onKey = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName ?? "";
      const inForm = tag === "INPUT" || tag === "TEXTAREA";

      konamiRef.push(e.key);
      if (konamiRef.length > KONAMI.length) konamiRef.shift();
      const konamiMatched =
        konamiRef.length === KONAMI.length &&
        konamiRef.every(
          (x, i) => x.toLowerCase() === KONAMI[i].toLowerCase(),
        );
      if (konamiMatched) {
        setToast(config.onKonami());
        for (let i = 0; i < 18; i++)
          window.setTimeout(() => spawnSpark(i), i * 70);
        konamiRef.length = 0;
        return;
      }

      if (e.key === "/" && !inForm) {
        e.preventDefault();
        const el = document.getElementById("contact");
        const input = document.querySelector<HTMLInputElement>(
          ".ws-contact-form .ws-input",
        );
        if (el)
          window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
        window.setTimeout(() => input?.focus(), 450);
        return;
      }

      if (!inForm) {
        gtRef.push({ k: e.key.toLowerCase(), t: Date.now() });
        while (gtRef.length && Date.now() - gtRef[0].t > 1000) gtRef.shift();
        const seq = gtRef.map((x) => x.k).join("");
        if (seq.endsWith("gt")) {
          config.onAudit();
          gtRef.length = 0;
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [config, setToast]);
}

/**
 * Prints the ASCII banner + hiring hint to the dev console on mount.
 * Pure side-effect, no React state.
 */
export function useConsoleBanner(): void {
  useEffect(() => {
    const css1 = "color:#c65524;font:600 14px ui-monospace,monospace;";
    const css2 = "color:#8d8471;font:400 13px ui-monospace,monospace;";
    const css3 = "color:#8d8471;font:400 11px ui-monospace,monospace;";
    /* eslint-disable no-console */
    // Block-character "GT" rendered in a single console.log so the
    // browser preserves the per-row alignment. Concatenating newlines
    // into one string is the only reliable way to get a consistent
    // monospace grid in DevTools — separate console.log calls add
    // implicit padding/leading that breaks the letterforms.
    const banner = [
      "  ██████   ████████ ",
      " ██           ██    ",
      " ██   ███     ██    ",
      " ██    ██     ██    ",
      "  ██████      ██    ",
    ].join("\n");
    console.log("%c" + banner, css1);
    console.log(
      "%cGabriel Taveira · Engineering Lead, currently consulting",
      css2,
    );
    console.log("%cBuilding and breaking systems since age 8.", css3);
    console.log(
      "%c   ↳ shortcuts: '/' to contact · 'gt' for system audit · ↑↑↓↓←→←→BA for science",
      css3,
    );
    console.log("%c   ↳ hiring? gabrielstaveira@gmail.com", css3);
    /* eslint-enable no-console */
  }, []);
}
