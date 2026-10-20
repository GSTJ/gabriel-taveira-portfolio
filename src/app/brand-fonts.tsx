import { bricolage, caveat } from "./fonts";

/**
 * Points the font tokens at Bricolage and Caveat. Rendered by the branded
 * pages only, so next/font preloads Bricolage there and the system-font
 * /resume skips the ~108 KB download. `:root`, not a wrapper class, so
 * portals such as the magic-modal demo get the same type. React hoists the
 * tag into <head>, so the first paint already has it.
 *
 * Caveat (49 KB) is only his handwriting, and every note writes itself in
 * well after the first paint, so it waits for the `hand` class boot.ts adds
 * a frame after that paint instead of competing with Bricolage for the
 * first bytes. Without JS, or under reduced motion where the notes show
 * at once, it loads straight away.
 */
const hand = `--font-caveat:${caveat.style.fontFamily}`;
const css = [
  `:root{--font-bricolage:${bricolage.style.fontFamily}}`,
  `:root:not(.js),:root.hand{${hand}}`,
  `@media (prefers-reduced-motion:reduce){:root{${hand}}}`,
].join("");

export const BrandFonts = () => (
  <style href="brand-fonts" precedence="default">
    {css}
  </style>
);
