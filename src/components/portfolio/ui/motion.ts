import type { CSSProperties } from "react";

/**
 * Spread these on an element to join the page's one motion layer (ui.css,
 * boot.ts). `index` staggers siblings in reading order; `delay` adds ms.
 *
 *   <h2 {...enter()}>              first viewport, CSS only, runs at paint
 *   <li {...reveal(i)}>            below the fold, once, when 12% in view
 */
type Timing = { index?: number; delay?: number };

const timing = ({ index, delay }: Timing): CSSProperties | undefined =>
  index || delay
    ? ({
        ...(index ? { "--i": index } : {}),
        ...(delay ? { "--d": `${delay}ms` } : {}),
      } as CSSProperties)
    : undefined;

export const enter = (delay = 0) => ({
  "data-enter": "",
  style: timing({ delay }),
});

/**
 * The boot script may mark `data-in` before React hydrates, so the element
 * opts out of the hydration attribute check (one level, this element only).
 */
export const reveal = (index = 0, delay = 0) => ({
  "data-reveal": "",
  suppressHydrationWarning: true,
  style: timing({ index, delay }),
});

/** For a primitive's own root: the timing style alone. */
export const timingStyle = timing;
