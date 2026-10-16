import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

/**
 * An indicator light. Off is a dull lens, on is lit from inside, the way a
 * Braun power LED reads. Decorative, so it is always hidden from screen
 * readers; the label next to it carries the meaning.
 */
export const Led = ({ on = false }: { on?: boolean }) => (
  <span className={cn("gt-led", on && "gt-led-on")} aria-hidden />
);

/** A numbered callout, like the circled numbers on a manual's diagram. */
export const Callout = ({ n }: { n: number }) => (
  <span className="gt-callout" aria-hidden>
    {n}
  </span>
);

export const Tag = ({ children }: { children: ReactNode }) => (
  <span className="gt-tag">{children}</span>
);

export const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="7 17 17 7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

/**
 * Standard `em` / `strong` / `mark` render callbacks for `t.rich(...)`. The
 * copy uses `<em>` and `<strong>` for emphasis and `<mark>` for the outcome
 * numbers inside work blurbs.
 */
export const richTags = {
  em: (chunks: ReactNode) => <em>{chunks}</em>,
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
  mark: (chunks: ReactNode) => <strong className="gt-figure">{chunks}</strong>,
};
