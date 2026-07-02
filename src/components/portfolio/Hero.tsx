import type { CSSProperties, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { CURRICULUM_PDF, LINKEDIN } from "./data";
import {
  CAREER_START_YEAR,
  yearsInIndustry,
  yearsTinkering,
} from "./lifeline";
import { Mark } from "./Mark";
import { richTags } from "./Shared";

/**
 * Concrete-poetry name grid: GABRIEL / TAVEIRA stacked in a 7-column
 * grid. The columns where both words carry the same letter (A at col 1,
 * I at col 4) are set in cobalt and never move — the shared letters are
 * the poem. Falls back to a plain stacked title if a locale ever changes
 * the names away from 7 + 7 letters.
 */
function NameGrid({ first, last }: { first: string; last: string }) {
  const a = first.toUpperCase();
  const b = last.toUpperCase();
  if (a.length !== 7 || b.length !== 7) {
    return (
      <h1 className="ws-hero-title">
        {first} <em>{last}</em>
      </h1>
    );
  }
  const shared = new Set(
    Array.from({ length: 7 }, (_, i) => i).filter((i) => a[i] === b[i]),
  );
  return (
    <h1 className="ws-name-grid" aria-label={`${first} ${last}`}>
      {[a, b].map((word, row) => (
        <span className="ws-name-row" key={row} aria-hidden>
          {word.split("").map((ch, col) => (
            <span
              key={col}
              className={
                "ws-name-cell" + (shared.has(col) ? " ws-name-cell-shared" : "")
              }
              style={{ "--col": col } as CSSProperties}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("hero.stats");

  const years = yearsInIndustry();
  const tinker = yearsTinkering();

  return (
    <section className="ws-hero" id="top">
      <div className="ws-hero-spine" aria-hidden>
        <span>{t("role")}</span>
      </div>
      <div className="ws-hero-inner">
        <p className="ws-hero-eyebrow">
          <span className="ws-eyebrow ws-eyebrow-accent">{t("role")}</span>
          <span className="ws-eyebrow-sep">/</span>
          <span className="ws-eyebrow">{t("location")}</span>
          <span className="ws-eyebrow ws-pdf-hide" id="ws-clock" />
        </p>

        <NameGrid first={t("name")} last={t("surname")} />

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
