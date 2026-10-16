import { useTranslations } from "next-intl";
import { Provider as BalancerProvider, Balancer } from "react-wrap-balancer";

import { Contact } from "./contact";
import { GITHUB, SECURITY_TOPICS } from "./data";
import { yearsInIndustry } from "./lifeline";
import { SecurityPractice } from "./security-practice";
import { ArrowRight, ArrowUpRight, Led, richTags, Tag } from "./shared";

export const SecurityPortfolio = ({ locale }: { locale: string }) => {
  const t = useTranslations("securityPage");

  return (
    <BalancerProvider>
      <header className="gt-nav">
        <nav className="gt-nav-inner" aria-label={t("navLabel")}>
          <a className="gt-nav-brand" href={`/${locale}`}>
            Gabriel Taveira
          </a>
          <div className="gt-nav-links">
            <a className="gt-nav-link" href={`/${locale}`}>
              {t("fullProfile")}
            </a>
          </div>
          <a className="gt-key gt-key-sm" href="#contact">
            <Led on />
            {t("getInTouch")}
          </a>
        </nav>
      </header>

      <main className="gt-page">
        <section className="gt-hero gt-hero-security" id="top">
          <div className="gt-hero-copy">
            <h1 className="gt-hero-name gt-hero-name-sm">
              <Balancer>{t.rich("title", richTags)}</Balancer>
            </h1>
            <p className="gt-hero-role">{t("eyebrow")}</p>
            <p className="gt-hero-intro">
              {t("intro", { years: yearsInIndustry() })}
            </p>
            <p className="gt-hero-aside">{t("proof")}</p>
            <div className="gt-keys">
              <a className="gt-key" href={`/${locale}`}>
                {t("fullProfile")}
                <ArrowRight />
              </a>
              <a
                className="gt-key gt-key-flat"
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
              >
                {t("viewGitHub")}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <aside className="gt-plate" aria-label={t("eyebrow")}>
            <div className="gt-plate-top">
              <div className="gt-grille" aria-hidden />
            </div>
            <div className="gt-tags gt-plate-tags">
              {SECURITY_TOPICS.map((topic) => (
                <Tag key={topic}>{topic}</Tag>
              ))}
            </div>
          </aside>
        </section>

        <SecurityPractice />
      </main>
      <Contact showFooterTag={false} />
    </BalancerProvider>
  );
};
