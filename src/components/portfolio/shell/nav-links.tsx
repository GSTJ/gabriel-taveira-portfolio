"use client";

import {
  type PointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/utils/cn";

import styles from "./shell.module.css";

/** In page order. `notes` is reached by scrolling, it has no link of its own. */
const SECTION_LINKS = ["projects", "work", "services", "contact"] as const;

type SectionId = (typeof SECTION_LINKS)[number];

/**
 * The section links, with a pill that slides to the hovered link and rests
 * on the section in view (also marked `aria-current`). The pill is one
 * element clipped to the target link, so it glides between links instead of
 * fading out and in. Without JS the links still work, just without the pill.
 */
export const NavLinks = ({
  label,
  labels,
}: {
  label: string;
  labels: Record<SectionId, string>;
}) => {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const target = hovered ?? current;

  // The section crossing a line 40% down the viewport is the one in view.
  // Sections without a link (hero, notes) clear it; the footer counts as the
  // last link, since you only get there through it.
  useEffect(() => {
    const ids = new Set<string>(SECTION_LINKS);
    const last = SECTION_LINKS.at(-1) ?? null;
    const targets = [
      ...document.querySelectorAll<HTMLElement>(
        "main section[id], main ~ footer",
      ),
    ];
    const crossing = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target);
          else crossing.delete(entry.target);
        }
        // A jump (a link, End) can skip sections, so read the whole set.
        const hit = [...targets]
          .reverse()
          .find((target) => crossing.has(target));
        if (!hit) return setCurrent(null);
        if (hit.tagName === "FOOTER") return setCurrent(last);
        setCurrent(ids.has(hit.id) ? hit.id : null);
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const place = () => {
      const link = target
        ? nav.querySelector<HTMLElement>(`a[href="#${target}"]`)
        : null;
      // Hidden links (Contact at 390, the CTA covers it) get no pill.
      if (!link?.offsetWidth) {
        delete pill.dataset.on;
        return;
      }
      const width = nav.scrollWidth;
      // Appearing from nothing: land on the link, then only fade in.
      pill.toggleAttribute("data-jump", !("on" in pill.dataset));
      pill.style.width = `${width}px`;
      pill.style.setProperty("--l", `${link.offsetLeft}px`);
      pill.style.setProperty(
        "--r",
        `${width - link.offsetLeft - link.offsetWidth}px`,
      );
      pill.dataset.on = "";
    };
    place();
    // Font swap, locale widths, the narrow layout: re-measure.
    const observer = new ResizeObserver(place);
    observer.observe(nav);
    for (const link of nav.querySelectorAll("a")) observer.observe(link);
    return () => observer.disconnect();
  }, [target]);

  const hover = (id: string) => (event: PointerEvent) => {
    if (event.pointerType === "mouse") setHovered(id);
  };

  return (
    <nav
      ref={navRef}
      className={styles.links}
      aria-label={label}
      onPointerLeave={() => setHovered(null)}
    >
      <span ref={pillRef} className={styles.pill} aria-hidden="true" />
      {SECTION_LINKS.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          // The CTA beside it already goes to #contact; narrow hides this one.
          className={cn(id === "contact" && styles.ctaTwin)}
          aria-current={id === current ? "true" : undefined}
          onPointerEnter={hover(id)}
        >
          {labels[id]}
        </a>
      ))}
    </nav>
  );
};
