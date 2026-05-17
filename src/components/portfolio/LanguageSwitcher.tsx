"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/utils/navigation";
import { routing } from "@/utils/routing";

export function LanguageSwitcher() {
  const current = useLocale();
  const pathname = usePathname(); // locale-stripped pathname

  return (
    <nav className="ws-lang-switch" aria-label="Language">
      {routing.locales.map((locale) => {
        const label = locale === "en-US" ? "EN" : "PT";
        const isActive = locale === current;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            className={
              "ws-lang-link" + (isActive ? " ws-lang-link-active" : "")
            }
            aria-current={isActive ? "true" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
