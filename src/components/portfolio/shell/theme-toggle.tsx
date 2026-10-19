"use client";

import { useSyncExternalStore } from "react";

import { THEME_COLORS, THEME_STORAGE_KEY, type Theme } from "../ui/theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const systemTheme = (): Theme =>
  window.matchMedia(DARK_QUERY).matches ? "dark" : "light";

const effectiveTheme = (): Theme => {
  const explicit = document.documentElement.dataset.theme;
  return explicit === "light" || explicit === "dark" ? explicit : systemTheme();
};

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(DARK_QUERY);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
};

/**
 * Picking the theme the system already uses clears the choice, so the page
 * goes back to following the system (auto) instead of pinning it forever.
 */
const applyTheme = (next: Theme) => {
  const root = document.documentElement;
  const explicit = next === systemTheme() ? null : next;
  try {
    if (explicit) localStorage.setItem(THEME_STORAGE_KEY, explicit);
    else localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // Private mode without storage: the choice lasts for this page only.
  }
  if (explicit) root.dataset.theme = explicit;
  else delete root.dataset.theme;
  for (const meta of document.querySelectorAll<HTMLMetaElement>(
    'meta[name="theme-color"]',
  )) {
    meta.content =
      THEME_COLORS[
        explicit ?? (meta.media.includes("dark") ? "dark" : "light")
      ];
  }
};

export const ThemeToggle = ({
  labels,
}: {
  labels: { toggle: string; toDark: string; toLight: string };
}) => {
  // Unknown on the server: the label settles on the client, the icon is CSS.
  const theme = useSyncExternalStore(subscribe, effectiveTheme, () => null);

  const toggle = () => {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (document.startViewTransition && !reduce.matches) {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  };

  let label = labels.toggle;
  if (theme === "dark") label = labels.toLight;
  if (theme === "light") label = labels.toDark;

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <svg
        className="only-light"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
      <svg
        className="only-dark"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
    </button>
  );
};
