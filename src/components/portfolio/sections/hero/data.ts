import { CURRICULUM_PDF, LINKEDIN } from "../../profile";

export const HERO_LINKS = {
  linkedin: LINKEDIN,
  pdf: CURRICULUM_PDF,
} as const;

/**
 * Every npm name his packages shipped under, summed for the ledger's last
 * row. Same list as the projects ledger (magic-modal includes its old name).
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
