"use client";

import { useEffect, useState } from "react";

/** Sections that highlight a differently-named nav entry. */
const NAV_ALIASES: Record<string, string> = {
  engagement: "services",
  awards: "talks",
  writing: "publications",
  about: "publications",
};

const SPY_IDS = [
  "services",
  "engagement",
  "work",
  "publications",
  "talks",
  "awards",
  "writing",
  "about",
  "contact",
];

/**
 * Tracks which section is currently in view, used to highlight the nav.
 * Returns "" above the first section so nothing is lit over the hero.
 */
export function useScrollSpy(): string {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = SPY_IDS.map((id) =>
      document.querySelector(`#${id}`),
    ).filter((el): el is HTMLElement => Boolean(el));
    const onScroll = () => {
      const y = window.scrollY + 200;
      // `sections` is in document order, so the last one whose top has been
      // passed is the one on screen.
      let current = "";
      for (const section of sections) {
        if (y >= section.offsetTop) current = section.id;
      }
      setActive(NAV_ALIASES[current] ?? current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}
