import { useTranslations } from "next-intl";
import { Provider as BalancerProvider, Balancer } from "react-wrap-balancer";

import { Contact } from "./contact";
import { GITHUB, SECURITY_TOPICS } from "./data";
import { yearsInIndustry } from "./lifeline";
import { SecurityPractice } from "./security-practice";
import { ArrowRight, ArrowUpRight, BrandMark, richTags, Tag } from "./shared";

export const SecurityPortfolio = ({ locale }: { locale: string }) => {
  const t = useTranslations("securityPage");

  return (
    <BalancerProvider>
      <div className="ws-nav-wrap ws-nav-scrolled ws-pdf-hide">
        <nav className="ws-nav" aria-label={t("navLabel")}>
          <a
            className="ws-nav-brand"
            href={`/${locale}`}
            aria-label={t("fullProfile")}
          >
            <BrandMark size={22} withText={false} />
          </a>
          <div className="ws-nav-spacer" />
          <a
            className="ws-nav-link ws-security-nav-profile"
            href={`/${locale}`}
          >
            {t("fullProfile")}
          </a>
          <a className="ws-btn ws-btn-primary" href="#contact">
            {t("getInTouch")}
            <ArrowRight />
          </a>
        </nav>
      </div>

      <main>
        <section className="ws-security-hero" id="top">
          <div className="ws-hero-bg" />
          <div className="ws-security-hero-grid">
            <div className="ws-security-hero-copy">
              <span className="ws-eyebrow ws-eyebrow-accent">
                {t("eyebrow")}
              </span>
              <h1 className="ws-security-hero-title">
                <Balancer>{t.rich("title", richTags)}</Balancer>
              </h1>
              <p className="ws-security-hero-intro">
                {t("intro", { years: yearsInIndustry() })}
              </p>
              <p className="ws-security-hero-proof">{t("proof")}</p>
              <div className="ws-security-hero-actions">
                <a className="ws-btn ws-btn-secondary" href={`/${locale}`}>
                  {t("fullProfile")}
                  <ArrowRight />
                </a>
                <a
                  className="ws-btn ws-btn-ghost"
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("viewGitHub")}
                  <ArrowUpRight />
                </a>
              </div>
            </div>

            <aside className="ws-security-scope" aria-label={t("eyebrow")}>
              {SECURITY_TOPICS.map((topic) => (
                <Tag key={topic}>{topic}</Tag>
              ))}
            </aside>
          </div>
        </section>

        <SecurityPractice />
        <Contact />
      </main>
    </BalancerProvider>
  );
};
