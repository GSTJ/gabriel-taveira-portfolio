"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import { CURRICULUM_PDF, LINKEDIN } from "./data";
import { yearsInIndustry } from "./lifeline";
import { ArrowUpRight, richTags } from "./shared";

export const Hero = () => {
  const t = useTranslations("hero");
  return (
    <section className="folio-hero" id="top">
      <div className="folio-identity">
        <div className="folio-bio">
          <h1 aria-label={`${t("name")} ${t("surname")}`}>
            <span>{t("name")}</span>
            <span>
              {t("surname")}
              <b aria-hidden="true">.</b>
            </span>
          </h1>
          <h2>{t("humanRole")}</h2>
          <p>
            {t.rich("humanIntro", { ...richTags, years: yearsInIndustry() })}
          </p>
          <div className="folio-actions">
            <a href="#contact">
              {t("getInTouch")}
              <ArrowUpRight size={18} />
            </a>
            <a href={CURRICULUM_PDF} target="_blank" rel="noreferrer">
              {t("downloadPdf")}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="folio-portrait">
          <details className="folio-photo">
            <summary>
              <span className="folio-photo-front">
                <Image
                  src="/gabriel.jpg"
                  alt={t("portraitAlt")}
                  width={460}
                  height={460}
                  fetchPriority="high"
                />
                <span className="folio-photo-caption">
                  Gabriel, Ribeirão Preto.
                </span>
              </span>
              <span className="folio-photo-toggle">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 11a8 8 0 1 1 2 7M4 11V4m0 7h7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="folio-photo-open">{t("flipPhoto")}</span>
                <span className="folio-photo-close">{t("restorePhoto")}</span>
              </span>
            </summary>
            <div className="folio-photo-back">
              <span className="folio-photo-age" aria-hidden="true">
                8
              </span>
              <h2>{t("originTitle")}</h2>
              <p>{t("originStory")}</p>
              <span className="folio-photo-sign">gt.</span>
            </div>
          </details>
          <div className="folio-location">
            <span>Ribeirão Preto, BR</span>
            <span id="ws-clock" />
          </div>
        </div>
      </div>
      <div className="folio-personal">
        <p>{t("selectedIntro")}</p>
        <a href={LINKEDIN} target="_blank" rel="noreferrer">
          LinkedIn
          <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="folio-projects">
        <a
          href="#work-coinbase"
          className="folio-project folio-project-coinbase"
        >
          <div className="folio-project-meta">
            <span>G2i / 2024 / 25</span>
            <ArrowUpRight size={24} />
          </div>
          <span className="folio-project-name">coinbase</span>
          <div className="folio-project-bottom">
            <h2>{t("coinbaseFocus")}</h2>
            <span>React Native / Expo</span>
          </div>
        </a>
        <a href="#work-ateam" className="folio-project folio-project-did">
          <div className="folio-project-meta">
            <span>A.Team / 2023 / 25</span>
            <ArrowUpRight size={24} />
          </div>
          <span className="folio-project-name">
            D-ID
            <span className="folio-project-cursor" aria-hidden="true" />
          </span>
          <div className="folio-project-bottom">
            <h2>{t("didFocus")}</h2>
            <span>{t("didRole")}</span>
          </div>
        </a>
      </div>
    </section>
  );
};
