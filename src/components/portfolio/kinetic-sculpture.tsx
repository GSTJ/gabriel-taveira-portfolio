"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { useTranslations } from "next-intl";

const RIBS = Array.from({ length: 40 }, (_, index) => index);

export const KineticSculpture = () => {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry?.isIntersecting ?? false),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="kinetic" ref={ref}>
      <div className="kinetic-stage" aria-hidden="true">
        <div className="kinetic-shadow" />
        <div className="kinetic-orientation">
          <div
            className="kinetic-object"
            style={{
              animationPlayState: paused || !visible ? "paused" : "running",
            }}
          >
            {RIBS.map((rib) => (
              <span
                className="kinetic-rib"
                key={rib}
                style={{ "--rib": rib } as CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="kinetic-caption">
        <span>{t("sculptureCaption")}</span>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
            aria-hidden="true"
          >
            {paused ? (
              <path d="M3 1 11 6 3 11Z" />
            ) : (
              <path d="M2 1h3v10H2zm5 0h3v10H7z" />
            )}
          </svg>
          {paused ? t("playMotion") : t("pauseMotion")}
        </button>
      </div>
    </div>
  );
};
