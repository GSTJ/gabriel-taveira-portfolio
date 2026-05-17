"use client";

import { useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { CURRICULUM_PDF, LINKEDIN } from "./data";
import { useCountUp } from "./hooks";
import {
  CAREER_START_YEAR,
  yearsInIndustry,
  yearsTinkering,
} from "./lifeline";
import { Marginalia } from "./Marginalia";
import { Mark } from "./Mark";
import { ArrowRight, richTags } from "./Shared";

export function Hero({ onContact }: { onContact: () => void }) {
  const t = useTranslations("hero");
  const tStats = useTranslations("hero.stats");
  const tMarg = useTranslations("marginalia");

  const yearsRef = useRef<HTMLDivElement | null>(null);
  const reportsRef = useRef<HTMLDivElement | null>(null);
  const tinkerRef = useRef<HTMLDivElement | null>(null);
  const awardsRef = useRef<HTMLDivElement | null>(null);

  const yearsTarget = yearsInIndustry();
  const tinkerTarget = yearsTinkering();

  const years = useCountUp(yearsTarget, yearsRef);
  const reports = useCountUp(56, reportsRef);
  const tinker = useCountUp(tinkerTarget, tinkerRef);
  const awards = useCountUp(5, awardsRef);

  return (
    <section className="ws-hero" id="top">
      <div className="ws-hero-bg" />
      <div className="ws-hero-aurora" />

      <div className="ws-hero-inner">
        <span className="ws-hero-eyebrow">
          <span className="ws-eyebrow ws-eyebrow-accent">{t("role")}</span>
          <span className="ws-eyebrow-sep">·</span>
          <span className="ws-eyebrow" id="ws-clock" />
        </span>

        <h1 className="ws-hero-title">
          {t("name")} <em>{t("surname")}</em>
          <span className="ws-hero-title-period">.</span>
        </h1>

        <p className="ws-hero-sub">
          {t.rich("intro", {
            ...richTags,
            strong: (chunks: ReactNode) => (
              <Mark>
                <strong>{chunks}</strong>
              </Mark>
            ),
            years: yearsTarget,
          })}
        </p>

        <p className="ws-hero-sub-2">
          {t("intro2", { tinkering: tinkerTarget })}
        </p>

        <div className="ws-hero-cta-row">
          <button
            type="button"
            className="ws-btn ws-btn-primary"
            onClick={onContact}
          >
            {t("getInTouch")}
            <ArrowRight />
          </button>
          <a
            className="ws-btn ws-btn-secondary"
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            {t("viewLinkedIn")}
          </a>
          <a
            className="ws-btn ws-btn-ghost"
            href={CURRICULUM_PDF}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t("downloadPdf")}
          </a>
        </div>

        <div className="ws-hero-status">
          <span className="ws-eyebrow">{t("currently")}</span>
          <span className="ws-hero-status-sep">·</span>
          <span className="ws-hero-status-co">{t("consulting")}</span>
          <span className="ws-hero-status-sep">·</span>
          <span className="ws-hero-status-meta">{t("location")}</span>
        </div>

        <div className="ws-hero-stats">
          <div ref={yearsRef} className="ws-hero-stat">
            <div className="ws-hero-stat-glow ws-hero-stat-glow-ember" />
            <div className="ws-hero-stat-v">
              {years}
              <em>+</em>
            </div>
            <div className="ws-hero-stat-l">{tStats("years")}</div>
            <div className="ws-hero-stat-meta">
              {tStats("yearsMeta", { since: CAREER_START_YEAR })}
            </div>
          </div>
          <div ref={reportsRef} className="ws-hero-stat">
            <div className="ws-hero-stat-glow ws-hero-stat-glow-coral" />
            <div className="ws-hero-stat-v">{reports}</div>
            <div className="ws-hero-stat-l">{tStats("reports")}</div>
            <div className="ws-hero-stat-meta">{tStats("reportsMeta")}</div>
            <span className="ws-hero-stat-tag">
              <Marginalia tilt={-6}>{tMarg("yesReally")}</Marginalia>
            </span>
          </div>
          <div ref={tinkerRef} className="ws-hero-stat">
            <div className="ws-hero-stat-glow ws-hero-stat-glow-brass" />
            <div className="ws-hero-stat-v">{tinker}</div>
            <div className="ws-hero-stat-l">{tStats("tinkering")}</div>
            <div className="ws-hero-stat-meta">{tStats("tinkeringMeta")}</div>
          </div>
          <div ref={awardsRef} className="ws-hero-stat">
            <div className="ws-hero-stat-glow ws-hero-stat-glow-teal" />
            <div className="ws-hero-stat-v ws-hero-stat-trophy">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="miter"
                strokeMiterlimit="2"
                aria-hidden="false"
                role="img"
              >
                <title>Hackathon trophy</title>
                {/* cup body — slight wobble, gap-free but bowed */}
                <path
                  d="M6.2 2.3 C 9 1.9, 15.2 1.9, 17.9 2.2 L 17.7 9.1 C 17.8 12.7, 14.9 15.4, 12.05 15.35 C 9.05 15.4, 6.25 12.6, 6.35 9.05 Z"
                  strokeWidth="1.7"
                />
                {/* doubled-back faint ghost of the cup, offset 1px */}
                <path
                  d="M6.6 2.7 C 9.2 2.4, 15 2.4, 17.5 2.6 L 17.3 8.9 C 17.45 12.4, 14.7 14.95, 12.05 14.95 C 9.2 14.95, 6.55 12.3, 6.7 8.85"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                {/* left handle — wobbly loop */}
                <path
                  d="M6.25 4.1 C 4.7 3.95, 3.05 4.6, 3.15 6.4 C 3.25 8.25, 4.85 9.15, 6.55 9.05"
                  strokeWidth="1.5"
                />
                {/* right handle — wobbly loop */}
                <path
                  d="M17.85 4.1 C 19.4 3.9, 21 4.65, 20.85 6.45 C 20.7 8.25, 19.15 9.2, 17.5 9.0"
                  strokeWidth="1.5"
                />
                {/* stem — two slightly imperfect verticals (left a bit longer, leaving a tiny gap at top) */}
                <path d="M10.1 15.2 C 10 16.1, 10.05 17, 10.15 17.6 C 9.4 18.4, 8.55 19.4, 8.4 21.7" strokeWidth="1.5" />
                <path d="M14 15.25 C 14.1 16.15, 14 17.1, 13.9 17.7 C 14.7 18.5, 15.55 19.5, 15.65 21.65" strokeWidth="1.5" />
                {/* base — bowed line, not perfectly straight */}
                <path d="M5.4 21.85 C 9 22.2, 15 22.15, 18.65 21.8" strokeWidth="2" />
                {/* tiny shine tick on the cup */}
                <path d="M8.2 4.6 C 8.55 5.4, 8.6 6.3, 8.45 7.2" strokeWidth="1.1" opacity="0.7" />
                {/* small base hatch — single dash */}
                <path d="M11.4 22.6 L 13.0 22.55" strokeWidth="1.2" opacity="0.55" />
              </svg>
              <span>{awards}</span>
            </div>
            <div className="ws-hero-stat-l">{tStats("awards")}</div>
            <div className="ws-hero-stat-meta">{tStats("awardsMeta")}</div>
          </div>
        </div>
      </div>

      <div className="ws-shelf-edge" />
    </section>
  );
}
