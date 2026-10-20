import type { CSSProperties } from "react";

import { cn } from "@/utils/cn";

import styles from "./badges.module.css";

/** What each real placement is struck in, and what is engraved on it. */
const MEDALS = {
  second: {
    metal: styles.silver,
    engraving: (
      <path
        className={styles.numeral}
        d="M9.6 17.6c.4-1.3 1.3-2 2.6-2 1.4 0 2.3.9 2.3 2.1 0 1-.6 1.8-1.7 2.8l-3.2 3h5"
      />
    ),
  },
  kitty: {
    metal: styles.gold,
    engraving: (
      <path
        className={styles.kitty}
        d="M7.8 19.4l.9-4 2.2 2.1h2.2l2.2-2.1.9 4c.5 1.2.5 2.4 0 3.4-.8 1.6-2.4 2.5-4.2 2.5s-3.4-.9-4.2-2.5c-.5-1-.5-2.2 0-3.4zM10.4 20.6a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6zm3.2 0a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z"
      />
    ),
  },
} as const;

export type MedalAward = keyof typeof MEDALS;

/**
 * A small medal on its pen-blue ribbon, the hackathon board's family, shown
 * at rest. It swings onto its ribbon the first time it is in view.
 */
export const Medal = ({
  award,
  className,
}: {
  award: MedalAward;
  className?: string;
}) => (
  <svg
    className={cn(styles.medal, MEDALS[award].metal, className)}
    viewBox="0 0 24 32"
    aria-hidden="true"
    focusable="false"
    data-draw=""
    suppressHydrationWarning
  >
    <path className={styles.ribbon} d="M6 0h5l3 11h-5zM13 0h5l-3 11h-5z" />
    <circle className={styles.disc} cx="12" cy="20" r="9" />
    <circle className={styles.rim} cx="12" cy="20" r="7.6" />
    {MEDALS[award].engraving}
  </svg>
);

const STAR =
  "M8 1.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7z";
const STAR_STEP = 17;
const STARS = [0, 1, 2, 3, 4].map((i) => (
  <path key={i} d={STAR} transform={`translate(${i * STAR_STEP} 0)`} />
));
const ROW_WIDTH = 4 * STAR_STEP + 16;

/** Five stars filled to `value`, the way a store shows a rating. */
export const Rating = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const whole = Math.floor(value);
  const filled = whole * STAR_STEP + (value - whole) * 16;
  return (
    <span
      className={cn(styles.rating, className)}
      aria-hidden="true"
      data-draw=""
      suppressHydrationWarning
    >
      <svg viewBox={`0 0 ${ROW_WIDTH} 16`} focusable="false">
        {STARS}
      </svg>
      <span
        className={styles.ratingFill}
        style={{ "--fill": `${(filled / ROW_WIDTH) * 100}%` } as CSSProperties}
      >
        <svg viewBox={`0 0 ${ROW_WIDTH} 16`} focusable="false">
          {STARS}
        </svg>
      </span>
    </span>
  );
};
