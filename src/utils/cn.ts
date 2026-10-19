/**
 * Joins class names and drops falsy pieces. No Tailwind here, so there is
 * nothing to merge: classes are tokens-backed globals or CSS Module names.
 */
export const cn = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(" ");
