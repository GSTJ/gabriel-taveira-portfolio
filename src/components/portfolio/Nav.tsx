"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, BrandMark } from "./Shared";

const NAV_LINKS = [
  { id: "work", key: "work" },
  { id: "publications", key: "media" },
  { id: "talks", key: "talks" },
  { id: "awards", key: "awards" },
  { id: "about", key: "now" },
] as const;

export function Nav({
  active,
  onNav,
}: {
  active: string;
  onNav: (id: string) => void;
}) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const triggerBurst = () => {
    setBurst(true);
    window.setTimeout(() => setBurst(false), 700);
  };

  return (
    <div className={`ws-nav-wrap ws-pdf-hide${scrolled ? " ws-nav-scrolled" : ""}`}>
      <nav className="ws-nav">
        <a
          className={"ws-nav-brand" + (burst ? " ws-nav-brand-burst" : "")}
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            triggerBurst();
            onNav("top");
          }}
        >
          <BrandMark size={22} withText={false} />
        </a>
        <div className="ws-nav-links">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              className={
                "ws-nav-link" + (active === l.id ? " ws-nav-link-active" : "")
              }
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNav(l.id);
              }}
            >
              {t(l.key)}
            </a>
          ))}
        </div>
        <div className="ws-nav-spacer" />
        <button
          className="ws-btn ws-btn-primary"
          onClick={() => onNav("contact")}
        >
          {t("getInTouch")}
          <ArrowRight />
        </button>
      </nav>
    </div>
  );
}
