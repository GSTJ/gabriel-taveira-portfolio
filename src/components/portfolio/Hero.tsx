import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { CURRICULUM_PDF, LINKEDIN } from "./data";
import {
  CAREER_START_YEAR,
  yearsInIndustry,
  yearsTinkering,
} from "./lifeline";
import { Mark } from "./Mark";
import { richTags } from "./Shared";

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("hero.stats");

  const years = yearsInIndustry();
  const tinker = yearsTinkering();

  return (
    <section className="ws-hero" id="top">
      <div className="ws-hero-inner">
        <p className="ws-hero-eyebrow">
          <span className="ws-eyebrow ws-eyebrow-accent">{t("role")}</span>
          <span className="ws-eyebrow-sep">/</span>
          <span className="ws-eyebrow">{t("location")}</span>
          <span className="ws-eyebrow ws-pdf-hide" id="ws-clock" />
        </p>

        <h1 className="ws-hero-title">
          {t("name")} {t("surname")}
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
          </div>
          <div className="ws-hero-stat">
            <div className="ws-hero-stat-v">{tinker}</div>
            <div className="ws-hero-stat-l">{tStats("tinkering")}</div>
            <div className="ws-hero-stat-meta">{tStats("tinkeringMeta")}</div>
          </div>
          <div className="ws-hero-stat">
            <div className="ws-hero-stat-v">5</div>
            <div className="ws-hero-stat-l">{tStats("awards")}</div>
            <div className="ws-hero-stat-meta">{tStats("awardsMeta")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
