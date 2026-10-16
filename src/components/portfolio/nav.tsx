"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import { useScrollSpy } from "./hooks";
import { LanguageSwitcher } from "./language-switcher";
import { Led } from "./shared";

const NAV_LINKS = [
  { id: "services", key: "services" },
  { id: "work", key: "work" },
  { id: "publications", key: "media" },
  { id: "talks", key: "talks" },
] as const;

export const Nav = () => {
  const t = useTranslations("nav");
  const active = useScrollSpy();

  return (
    <header className="gt-nav">
      <nav className="gt-nav-inner" aria-label={t("label")}>
        <a className="gt-nav-brand" href="#top">
          Gabriel Taveira
        </a>
        <div className="gt-nav-links">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              className={cn(
                "gt-nav-link",
                active === l.id && "gt-nav-link-active",
              )}
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
            >
              {t(l.key)}
            </a>
          ))}
        </div>
        <LanguageSwitcher />
        <a className="gt-key gt-key-sm" href="#contact">
          <Led on />
          {t("getInTouch")}
        </a>
      </nav>
    </header>
  );
};
