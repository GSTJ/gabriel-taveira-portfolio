"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { CURRICULUM_PDF, LINKEDIN } from "./data";
import { useCountUp } from "./hooks";
import {
  CAREER_START_YEAR,
  yearsInIndustry,
  yearsTinkering,
} from "./lifeline";
import { ArrowRight, richTags } from "./Shared";

export function Hero({ onContact }: { onContact: () => void }) {
  const t = useTranslations("hero");
  const tStats = useTranslations("hero.stats");

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
          {t("name")} <em>{t("surname")}</em>.
        </h1>

        <p className="ws-hero-sub">
          {t.rich("intro", { ...richTags, years: yearsTarget })}
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
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
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
