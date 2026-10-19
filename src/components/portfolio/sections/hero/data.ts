import { CURRICULUM_PDF, LINKEDIN } from "../../profile";

export const HERO_LINKS = {
  linkedin: LINKEDIN,
  pdf: CURRICULUM_PDF,
} as const;

/** The real call from magic-modal's README, shown as written (not translated). */
export const MAGIC_MODAL_CALL = [
  "const result =",
  "  await magicModal.show(Confirm);",
] as const;

/**
 * Every npm name his packages shipped under (magic-modal was
 * react-native-magic-modal until v10), summed into one 30-day total.
 * ponytail: same list as projects/data.ts NPM_ROWS; the lead can promote one
 * shared reader once both slots settle.
 */
export const NPM_NAMES = [
  "magic-modal",
  "react-native-magic-modal",
  "eslint-plugin-safe-jsx",
  "react-native-magic-toast",
  "magic-observability",
  "react-native-code-push-plugin",
] as const;

/** Last good read (npm, last 30 days), used when the API doesn't answer. */
export const NPM_FALLBACK = {
  start: "2026-09-19",
  end: "2026-10-18",
  total: 22_939,
};
