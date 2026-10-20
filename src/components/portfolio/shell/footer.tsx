import type { ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../lifeline";
import {
  CURRICULUM_PDF,
  EMAIL,
  EMAIL_ADDR,
  GITHUB,
  LINKEDIN,
  MEDIUM,
  NPM,
  SITE_SOURCE,
} from "../profile";
import { NOW_UPDATED } from "../sections/notes/data";
import { ArrowUpRight, CHANNEL_ICONS } from "../ui/icons";

import styles from "./shell.module.css";

const NpmIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
  </svg>
);

const ELSEWHERE: readonly { name: string; url: string; icon: ReactNode }[] = [
  { name: "GitHub", url: GITHUB, icon: CHANNEL_ICONS.github },
  { name: "LinkedIn", url: LINKEDIN, icon: CHANNEL_ICONS.linkedin },
  { name: "Medium", url: MEDIUM, icon: CHANNEL_ICONS.medium },
  { name: "npm", url: NPM, icon: NpmIcon },
];

const SECTIONS = ["projects", "work", "services", "contact"] as const;

/** A route handler serving plain text, not a page: a plain link is right. */
const LLMS_TXT = "/llms.txt";

/**
 * The page ends the way a letter does: a closing line, his name written in
 * his pen with a flourish under it, the line a signature carries (what he
 * does, his email) and a P.S. Beside it, a quiet map of the site, where else
 * he is and the files; under it, a fine line with the date the page was last
 * touched. Also renders on /security, so every link is absolute.
 */
export const Footer = async () => {
  const t = await getTranslations("common.footer");
  const tNav = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.footCols}>
          <div className={styles.signoff}>
            <p className={styles.closing}>{t("closing")}</p>
            <p className={styles.sign} data-draw="" suppressHydrationWarning>
              <span className={styles.signName}>Gabriel Taveira</span>
              <svg
                className={styles.flourish}
                viewBox="0 0 320 28"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  pathLength={1}
                  d="M6 17C70 12 150 10 236 13c34 1 58-1 72-9 6-3 9 0 5 5"
                />
              </svg>
            </p>
            <p>{t("tagline")}</p>
            <a className={styles.footMail} href={EMAIL}>
              <span className={styles.footIcon}>{CHANNEL_ICONS.email}</span>
              {EMAIL_ADDR}
            </a>
            <p className={styles.ps}>
              <span className={styles.psMark}>P.S.</span> {t("ps")}{" "}
              <a className="link-arrow" href={SITE_SOURCE}>
                <span className={styles.glue}>
                  {t("psLink")}
                  <ArrowUpRight />
                </span>
              </a>
            </p>
          </div>

          <nav aria-label={t("site")}>
            <h2>{t("site")}</h2>
            {SECTIONS.map((id) => (
              <a key={id} href={`/${locale}#${id}`}>
                {tNav(`sections.${id}`)}
              </a>
            ))}
          </nav>

          <nav aria-label={t("elsewhere")}>
            <h2>{t("elsewhere")}</h2>
            {ELSEWHERE.map((item) => (
              <a key={item.name} className="link-arrow" href={item.url}>
                <span className={styles.footIcon}>{item.icon}</span>
                <span className={styles.glue}>
                  {item.name}
                  <ArrowUpRight />
                </span>
              </a>
            ))}
          </nav>

          <nav aria-label={t("files")}>
            <h2>{t("files")}</h2>
            <a href={`/${locale}/resume`}>{t("resume")}</a>
            <a href={CURRICULUM_PDF}>{t("pdf")}</a>
            <a href={`/${locale}/links`}>{t("links")}</a>
            <a href={LLMS_TXT}>llms.txt</a>
          </nav>
        </div>

        <div className={cn("t-meta", styles.footFine)}>
          <p>
            © {NOW_UPDATED.getUTCFullYear()} Gabriel Taveira · {t("role")}
          </p>
          <p>
            {t("updated", { date: currentMonthLabel(locale, NOW_UPDATED) })} ·{" "}
            {t("place")}
          </p>
        </div>
      </div>
    </footer>
  );
};
