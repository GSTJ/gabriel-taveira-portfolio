/** Browser chrome color per scheme. Same values as `--paper` in tokens.css. */
export const THEME_COLORS = { light: "#f6f6f3", dark: "#121211" } as const;

export type Theme = keyof typeof THEME_COLORS;

export const THEME_STORAGE_KEY = "theme";
