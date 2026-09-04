"use client";

import { useTranslations } from "next-intl";

import { CURRICULUM_PDF, LINKEDIN } from "./data";
import { KineticSculpture } from "./kinetic-sculpture";
import { CAREER_START_YEAR, yearsInIndustry, yearsTinkering } from "./lifeline";
import { ArrowRight, ArrowUpRight, richTags } from "./shared";

export const Hero = () => {
  const t = useTranslations("hero");
  const stats = useTranslations("hero.stats");
  return (
    <section className="folio-hero" id="top">
      <div className="folio-name-row">
        <h1>
          {t("name")} <span>{t("surname")}</span>
        </h1>
        <span className="folio-location">
          Ribeirão Preto, BR
          <span id="ws-clock" />
        </span>
      </div>
      <div className="folio-hero-body">
        <div className="folio-intro">
          <h2>
            {t("role")}
            <span className="folio-asterisk" aria-hidden="true">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <path d="M15 1v28M1 15h28M5 5l20 20M5 25 25 5" />
              </svg>
            </span>
          </h2>
          <p>{t.rich("intro", { ...richTags, years: yearsInIndustry() })}</p>
          <div className="folio-actions">
            <a className="ws-btn ws-btn-primary" href="#work">
              {t("exploreWork")}
              <ArrowRight />
            </a>
            <a
              className="folio-text-link"
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
              <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="folio-note">
            {t("intro2", { tinkering: yearsTinkering() })}
          </p>
        </div>
        <KineticSculpture />
      </div>
      <div className="folio-hero-foot">
        <span>{stats("yearsMeta", { since: CAREER_START_YEAR })}</span>
        <span>{t("disciplines")}</span>
        <a href={CURRICULUM_PDF} target="_blank" rel="noreferrer">
          {t("downloadPdf")}
          <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
};
