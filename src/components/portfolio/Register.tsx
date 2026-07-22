"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useTranslations } from "next-intl";

/**
 * The 4 → 56 register: one square per direct report at peak, the first
 * four in ink (where the career started), the rest in cobalt. On scroll
 * into view the squares fill left to right as discrete cuts — moveable
 * type, not a progress bar.
 *
 * Fail-open: the SSR default is fully filled. Squares are only emptied
 * (armed) after mount, in motion-friendly, non-headless browsers.
 */
export function Register() {
  const t = useTranslations("work.register");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const headless =
      /HeadlessChrome|Puppeteer/i.test(navigator.userAgent) ||
      (navigator as unknown as { webdriver?: boolean }).webdriver === true;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (headless || reduced) return;

    el.classList.add("ws-register-armed");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-filled");
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="ws-register" ref={ref} role="img" aria-label={t("label")}>
      <span className="ws-register-end">{t("start")}</span>
      <div className="ws-register-track" aria-hidden>
        {Array.from({ length: 56 }, (_, i) => (
          <span
            key={i}
            className={"ws-register-sq" + (i < 4 ? " ws-register-sq-ink" : "")}
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </div>
      <span className="ws-register-end">{t("end")}</span>
    </div>
  );
}
