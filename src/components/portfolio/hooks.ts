"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Counts up to `target` once the ref enters the viewport.
 * Used in the hero stats strip.
 */
export function useCountUp(
  target: number,
  ref: RefObject<Element | null>,
  duration = 1400,
): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    // Detect non-interactive contexts (Puppeteer, screenshot tools,
    // print preview, reduced-motion users). Render the final value
    // immediately so the PDF capture and accessibility consumers see
    // the right number instead of the initial 0.
    const isHeadless =
      typeof navigator !== "undefined" &&
      (/HeadlessChrome|Puppeteer/i.test(navigator.userAgent) ||
        (navigator as unknown as { webdriver?: boolean }).webdriver === true);
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (isHeadless || reducedMotion) {
      // Landing on the final value right after hydration is the whole point.
      // It cannot be the initial state: `navigator` and `matchMedia` do not
      // exist during the server render, and reading them lazily would make the
      // client's first render disagree with the HTML it is hydrating.
      // eslint-disable-next-line react/react-compiler -- see above
      setValue(target);
      return;
    }

    if (!ref.current) return;
    let frame: number;
    let started = false;

    const begin = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / duration);
        const eased = 1 - (1 - k) ** 3;
        setValue(Math.round(eased * target));
        if (k < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    // Belt-and-suspenders: if the element is already above the fold
    // at mount, start immediately rather than waiting for the observer
    // (which might not fire in some print/render environments).
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < (window.innerHeight || 0)) {
      begin();
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) begin();
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);

    // Final safety net: if the observer never fires within 2s, force
    // the final value so the UI never gets stuck on 0.
    const timeoutId = window.setTimeout(() => {
      if (!started) setValue(target);
    }, 2000);

    return () => {
      cancelAnimationFrame(frame);
      obs.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [target, ref, duration]);
  return value;
}

/** Height of the sticky nav, so a scrolled-to heading isn't hidden under it. */
const NAV_OFFSET = 80;

/**
 * Smooth-scrolls to a section by id. `top` goes to the very top of the page
 * rather than to `#top`'s offset, so the hero's full bleed stays visible.
 */
export function scrollToSection(id: string): void {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector<HTMLElement>(`#${id}`);
  if (el) {
    window.scrollTo({ top: el.offsetTop - NAV_OFFSET, behavior: "smooth" });
  }
}

/** Sections that highlight a differently-named nav entry. */
const NAV_ALIASES: Record<string, string> = {
  contact: "about",
  writing: "publications",
};

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
      .map((id) => document.querySelector(`#${id}`))
      .filter((el): el is HTMLElement => Boolean(el));
    const onScroll = () => {
      const y = window.scrollY + 200;
      // `sections` is in document order, so the last one whose top has been
      // passed is the one on screen.
      let current = "work";
      for (const section of sections) {
        if (y >= section.offsetTop) current = section.id;
      }
      setActive(NAV_ALIASES[current] ?? current);
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
      const el = document.querySelector(`#${targetId}`);
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

export type ToastPayload = {
  message: string;
  sub?: string;
};

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
    const gtRef: { k: string; t: number }[] = [];

    const spawnSpark = () => {
      const el = document.createElement("div");
      el.className = "ws-spark-rain";
      el.textContent = "⚡";
      el.style.left = `${10 + Math.random() * 80}vw`;
      el.style.animationDuration = `${2.2 + Math.random() * 1.5}s`;
      document.body.append(el);
      window.setTimeout(() => el.remove(), 4500);
    };

    const onKey = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName ?? "";
      const inForm = tag === "INPUT" || tag === "TEXTAREA";

      konamiRef.push(e.key);
      if (konamiRef.length > KONAMI.length) konamiRef.shift();
      const konamiMatched =
        konamiRef.length === KONAMI.length &&
        konamiRef.every((x, i) => x.toLowerCase() === KONAMI[i]?.toLowerCase());
      if (konamiMatched) {
        setToast(config.onKonami());
        document.body.classList.add("ws-crt");
        window.setTimeout(() => document.body.classList.remove("ws-crt"), 4000);
        for (let i = 0; i < 18; i++) window.setTimeout(spawnSpark, i * 70);
        konamiRef.length = 0;
        return;
      }

      if (e.key === "/" && !inForm) {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>(
          ".ws-contact-form .ws-input",
        );
        scrollToSection("contact");
        window.setTimeout(() => input?.focus(), 450);
        return;
      }

      if (!inForm) {
        gtRef.push({ k: e.key.toLowerCase(), t: Date.now() });
        // Drop keystrokes older than a second, so "g" then "t" only counts as
        // the `gt` shortcut when they were typed together.
        const cutoff = Date.now() - 1000;
        while ((gtRef.at(0)?.t ?? Infinity) < cutoff) gtRef.shift();
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
    const css1 =
      "color:#e07a1f;font:600 14px ui-monospace,monospace;text-shadow:0 0 8px rgba(224,122,31,.5);";
    const css2 = "color:#f6f1e6;font:400 13px ui-monospace,monospace;";
    const css3 = "color:#8a827a;font:400 11px ui-monospace,monospace;";
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
    console.log(`%c${banner}`, css1);
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
