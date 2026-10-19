import type { ReactNode } from "react";

import { timingStyle } from "./motion";

/**
 * Gabriel's pen underlining a claim: two quick strokes that draw left to
 * right the first time the phrase is in view. Keep the phrase short, it does
 * not wrap. Already drawn under reduced motion and without JS.
 */
export const PenUnderline = ({
  children,
  delay,
}: {
  children: ReactNode;
  delay?: number;
}) => (
  <span
    className="pen"
    data-draw=""
    suppressHydrationWarning
    style={timingStyle({ delay })}
  >
    {children}
    <svg
      className="pen-stroke"
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path pathLength={1} d="M3 9C70 4 150 3 297 6" />
      <path pathLength={1} d="M40 12c60-4 140-5 220-3" />
    </svg>
  </span>
);
