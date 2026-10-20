import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";
import { routing } from "@/utils/routing";

import styles from "./shell.module.css";

/**
 * Plain links, so a switch is a full load of the other locale's static page.
 * It is rare enough that a client transition would buy nothing.
 */
export const LanguageSwitch = async ({ className }: { className?: string }) => {
  const t = await getTranslations("common.language");
  const current = await getLocale();

  return (
    <nav className={cn(styles.lang, className)} aria-label={t("label")}>
      {routing.locales.map((locale) => (
        <a
          key={locale}
          href={`/${locale}`}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === current ? "page" : undefined}
          title={t(`names.${locale}`)}
        >
          {t(locale)}
          <span className="visually-hidden">, {t(`names.${locale}`)}</span>
        </a>
      ))}
    </nav>
  );
};
