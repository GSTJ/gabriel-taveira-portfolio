import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { LanguageSwitch } from "./language-switch";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

import styles from "./shell.module.css";

export const Nav = async () => {
  const t = await getTranslations("nav");
  const tTheme = await getTranslations("common.theme");

  return (
    <header className={styles.nav}>
      <div className={cn("wrap", styles.bar)}>
        <a className={styles.brand} href="#hero">
          <span className={styles.signature} aria-hidden="true" />
          <span className="visually-hidden">Gabriel Taveira</span>
        </a>
        <NavLinks
          label={t("label")}
          labels={{
            projects: t("sections.projects"),
            work: t("sections.work"),
            services: t("sections.services"),
            contact: t("sections.contact"),
          }}
        />
        <LanguageSwitch className={styles.langSlot} />
        <ThemeToggle
          labels={{
            toggle: tTheme("toggle"),
            toDark: tTheme("toDark"),
            toLight: tTheme("toLight"),
          }}
        />
        <a className={cn("btn btn-small", styles.cta)} href="#contact">
          {t("getInTouch")}
        </a>
      </div>
    </header>
  );
};
