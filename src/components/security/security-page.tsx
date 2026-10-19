import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { yearsInIndustry } from "../portfolio/lifeline";
import { GITHUB } from "../portfolio/profile";
import { ContactSection } from "../portfolio/sections/contact";
import { Footer } from "../portfolio/shell/footer";
import { ArrowUpRight } from "../portfolio/ui/icons";
import { enter } from "../portfolio/ui/motion";
import { SecurityPractice } from "./security-practice";

import styles from "./security.module.css";

/** The unlisted AppSec profile: three merged fixes, then the same contact. */
export const SecurityPortfolio = async ({ locale }: { locale: string }) => {
  const t = await getTranslations("securityPage");

  return (
    <>
      <header className={styles.bar}>
        <nav className="wrap" aria-label={t("navLabel")}>
          <a href={`/${locale}`}>{t("fullProfile")}</a>
          <a className="btn btn-small" href="#contact">
            {t("getInTouch")}
          </a>
        </nav>
      </header>
      <main id="main">
        <section
          className={cn("wrap", styles.hero)}
          aria-labelledby="security-title"
        >
          <p className="t-meta" {...enter()}>
            {t("eyebrow")}
          </p>
          <h1 id="security-title" className="t-h2">
            {t("title")}
          </h1>
          <p className="t-lede" {...enter(160)}>
            {t("intro", { years: yearsInIndustry() })}
          </p>
          <p className="t-body" {...enter(220)}>
            {t("proof")}
          </p>
          <p className={styles.actions} {...enter(280)}>
            <a className="btn btn-ghost" href={`/${locale}`}>
              {t("fullProfile")}
            </a>
            <a className="link-arrow" href={GITHUB}>
              {t("viewGitHub")}
              <ArrowUpRight />
            </a>
          </p>
          <p className="t-meta">{t("topics")}</p>
        </section>
        <SecurityPractice />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};
