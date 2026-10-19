import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { LanguageSwitch } from "./language-switch";
import { ThemeToggle } from "./theme-toggle";

import styles from "./shell.module.css";

/** In page order. `notes` is reached by scrolling, it has no link of its own. */
const SECTION_LINKS = ["projects", "work", "services", "contact"] as const;

export const Nav = async () => {
  const t = await getTranslations("nav");
  const tTheme = await getTranslations("common.theme");

  return (
    <header className={styles.nav}>
      <div className={cn("wrap", styles.bar)}>
        <a className={styles.brand} href="#hero">
          Gabriel Taveira
          <span className={styles.hand} aria-hidden="true">
            gt
          </span>
        </a>
        <nav className={styles.links} aria-label={t("label")}>
          {SECTION_LINKS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(id === "contact" && styles.ctaTwin)}
            >
              {t(`sections.${id}`)}
            </a>
          ))}
        </nav>
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
