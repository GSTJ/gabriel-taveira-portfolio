"use client";

import { useLocale } from "next-intl";

import { cn } from "@/utils/cn";
import { Link, usePathname } from "@/utils/navigation";
import { routing } from "@/utils/routing";

/**
 * A two-position slide switch. Each position is a real link, so it works
 * without JS and each locale stays a crawlable URL.
 */
export const LanguageSwitcher = () => {
  const current = useLocale();
  const pathname = usePathname(); // locale-stripped pathname

  return (
    <nav
      className={cn("gt-switch", current === "pt-BR" && "gt-switch-right")}
      aria-label="Language"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === current;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            className={cn("gt-switch-pos", isActive && "gt-switch-pos-active")}
            aria-current={isActive ? "true" : undefined}
          >
            {locale === "en-US" ? "EN" : "PT"}
          </Link>
        );
      })}
    </nav>
  );
};
