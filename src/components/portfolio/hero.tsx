"use client";

import { useTranslations } from "next-intl";

import { CURRICULUM_PDF, LINKEDIN } from "./data";
import { yearsInIndustry, yearsTinkering } from "./lifeline";
import { ArrowUpRight, richTags } from "./shared";

export const Hero = () => {
  const t = useTranslations("hero");
  return (
    <section className="folio-hero" id="top">
      <div className="folio-identity">
        <h1 aria-label={`${t("name")} ${t("surname")}`}>
          <span>{t("name")}</span>
          <span>
            {t("surname")}
            <b aria-hidden="true">.</b>
          </span>
        </h1>
        <div className="folio-bio">
          <h2>{t("role")}</h2>
          <p>{t.rich("intro", { ...richTags, years: yearsInIndustry() })}</p>
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
          <div className="folio-location">
            <span>Ribeirão Preto, BR</span>
            <span id="ws-clock" />
          </div>
        </div>
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
      <div className="folio-personal">
        <p>{t("intro2", { tinkering: yearsTinkering() })}</p>
        <a href={LINKEDIN} target="_blank" rel="noreferrer">
          LinkedIn
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
};
