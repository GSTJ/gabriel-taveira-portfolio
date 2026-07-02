"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { BrandMark } from "./Shared";

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
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reading-progress hairline under the masthead. Written straight to the
  // DOM (no state) so scrolling never re-renders the nav.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        progressRef.current?.style.setProperty("transform", `scaleX(${p})`);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
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
        <button className="ws-nav-cta" onClick={() => onNav("contact")}>
          {t("getInTouch")}
        </button>
      </nav>
      <div className="ws-nav-progress" ref={progressRef} aria-hidden />
    </div>
  );
}
