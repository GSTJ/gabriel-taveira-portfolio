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
          <span className="ws-eyebrow-sep ws-pdf-hide">·</span>
          <span className="ws-eyebrow ws-pdf-hide" id="ws-clock" />
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
            className="ws-btn ws-btn-primary ws-pdf-hide"
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
            className="ws-btn ws-btn-ghost ws-pdf-hide"
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

        <div className="ws-hero-stats">
          <div ref={yearsRef} className="ws-hero-stat">
            <div className="ws-hero-stat-glow ws-hero-stat-glow-ember" />
            <div className="ws-hero-stat-v ws-hero-stat-plus">
              {years}
              <em aria-hidden>+</em>
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
              <Marginalia tilt={-6}>
                <span className="ws-hero-stat-tag-arrow-side" aria-hidden>← </span>
                <span className="ws-hero-stat-tag-arrow-up" aria-hidden>↑ </span>
                {tMarg("yesReally")}
              </Marginalia>
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
                viewBox="0 0 500 500"
                fill="none"
                stroke="currentColor"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="false"
                role="img"
              >
                <title>Hackathon trophy</title>
                <defs>
                  <filter
                    id="trophy-sketchy"
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="150%"
                  >
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.011"
                      numOctaves="2"
                      seed="7"
                      result="noise"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="noise"
                      scale="20"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                  </filter>
                </defs>
                <g filter="url(#trophy-sketchy)">
                  {/* cup body */}
                  <path d="M 148,112 C 210,108 290,113 352,109 C 343,210 322,265 254,288 C 183,264 158,212 148,112 Z" />
                  {/* left handle */}
                  <path d="M 152,132 C 72,105 83,235 161,218 C 176,215 168,258 149,248" />
                  {/* right handle */}
                  <path d="M 348,136 C 424,112 418,242 342,221 C 328,217 332,254 353,244" />
                  {/* stem */}
                  <path d="M 246,286 C 244,315 235,335 206,352 L 294,349 C 268,333 256,312 254,286" />
                  {/* base (outline only) */}
                  <path d="M 178,356 C 220,352 270,355 323,353 C 328,375 321,395 326,413 C 331,414 336,417 333,426 C 270,429 210,424 167,427 C 164,418 171,413 174,413 C 178,392 173,372 178,356 Z" />
                  {/* sparkle highlights */}
                  <circle cx="188" cy="142" r="2.5" fill="currentColor" stroke="none" />
                  <circle cx="312" cy="188" r="3" fill="currentColor" stroke="none" />
                  <circle cx="292" cy="218" r="2.5" fill="currentColor" stroke="none" />
                  <circle cx="296" cy="252" r="3" fill="currentColor" stroke="none" />
                </g>
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
