"use client";

import { useEffect, useState } from "react";

/** Height of the sticky nav, so a scrolled-to heading isn't hidden under it. */
const NAV_OFFSET = 80;

/**
 * Smooth-scrolls to a section by id. `top` goes to the very top of the page
 * rather than to `#top`'s offset, so the hero's full bleed stays visible.
 */
export function scrollToSection(id: string): void {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector<HTMLElement>(`#${id}`);
  if (el) {
    window.scrollTo({ top: el.offsetTop - NAV_OFFSET, behavior: "smooth" });
  }
}

/** Sections that highlight a differently-named nav entry. */
const NAV_ALIASES: Record<string, string> = {
  contact: "about",
  writing: "publications",
};

/**
 * Tracks which section is currently in view, used to highlight the nav.
 * Returns the section id (mapped: `contact`→`about`, `writing`→`publications`).
 */
export function useScrollSpy(): string {
  const [active, setActive] = useState("services");
  useEffect(() => {
    const ids = [
      "services",
      "work",
      "publications",
      "talks",
      "awards",
      "writing",
      "about",
      "contact",
    ];
    const sections = ids
      .map((id) => document.querySelector(`#${id}`))
      .filter((el): el is HTMLElement => Boolean(el));
    const onScroll = () => {
      const y = window.scrollY + 200;
      // `sections` is in document order, so the last one whose top has been
      // passed is the one on screen.
      let current = "services";
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
