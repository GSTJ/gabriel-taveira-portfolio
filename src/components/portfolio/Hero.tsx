import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { CURRICULUM_PDF, LINKEDIN } from "./data";
import {
  CAREER_START_YEAR,
  yearsInIndustry,
  yearsTinkering,
} from "./lifeline";
import { Marginalia } from "./Marginalia";
import { Mark } from "./Mark";
import { richTags } from "./Shared";

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("hero.stats");
  const tMarg = useTranslations("marginalia");

  const years = yearsInIndustry();
  const tinker = yearsTinkering();

  return (
    <section className="ws-hero" id="top">
      <div className="ws-hero-inner">
        <p className="ws-hero-eyebrow">
          <span className="ws-eyebrow ws-eyebrow-accent">{t("role")}</span>
          <span className="ws-eyebrow-sep">—</span>
          <span className="ws-eyebrow">{t("location")}</span>
          <span className="ws-eyebrow ws-pdf-hide" id="ws-clock" />
        </p>

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
            years,
          })}
        </p>

        <p className="ws-hero-sub-2">{t("intro2", { tinkering: tinker })}</p>

        <div className="ws-hero-cta-row">
          <a className="ws-btn ws-btn-primary ws-pdf-hide" href="#contact">
            {t("getInTouch")}
          </a>
          <a
            className="ws-btn ws-btn-secondary"
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
          >
            {t("viewLinkedIn")}
          </a>
          <a
            className="ws-btn ws-btn-ghost ws-pdf-hide"
            href={CURRICULUM_PDF}
            target="_blank"
            rel="noreferrer"
          >
            {t("downloadPdf")}
          </a>
        </div>

        <div className="ws-hero-stats">
          <div className="ws-hero-stat">
            <div className="ws-hero-stat-v">
              {years}
              <em aria-hidden>+</em>
            </div>
            <div className="ws-hero-stat-l">{tStats("years")}</div>
            <div className="ws-hero-stat-meta">
              {tStats("yearsMeta", { since: CAREER_START_YEAR })}
            </div>
          </div>
          <div className="ws-hero-stat">
            <div className="ws-hero-stat-v">56</div>
            <div className="ws-hero-stat-l">{tStats("reports")}</div>
            <div className="ws-hero-stat-meta">{tStats("reportsMeta")}</div>
            <span className="ws-hero-stat-tag">
              <Marginalia tilt={-6}>
                <span aria-hidden>← </span>
                {tMarg("yesReally")}
              </Marginalia>
            </span>
          </div>
          <div className="ws-hero-stat">
            <div className="ws-hero-stat-v">{tinker}</div>
            <div className="ws-hero-stat-l">{tStats("tinkering")}</div>
            <div className="ws-hero-stat-meta">{tStats("tinkeringMeta")}</div>
          </div>
          <div className="ws-hero-stat">
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
                </g>
              </svg>
              <span>5</span>
            </div>
            <div className="ws-hero-stat-l">{tStats("awards")}</div>
            <div className="ws-hero-stat-meta">{tStats("awardsMeta")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
