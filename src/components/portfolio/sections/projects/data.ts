export type ProjectItem = {
  id: "curvinha" | "magicModal" | "safeJsx" | "magicToast" | "pegada";
  kind: "app" | "library";
  href: string;
  repo?: string;
  /** Every npm name the package shipped under, oldest last, for download totals. */
  npm?: readonly string[];
};

/**
 * Curvinha keeps `?ct=gabriel-site`; the Now line in Notes uses
 * `?ct=gabrieltaveira-dev`, so the two placements are measured apart.
 */
export const PROJECTS: readonly ProjectItem[] = [
  {
    id: "curvinha",
    kind: "app",
    href: "https://curvinha.app/?ct=gabriel-site",
  },
  {
    id: "magicModal",
    kind: "library",
    href: "https://github.com/GSTJ/magic-modal",
    repo: "GSTJ/magic-modal",
    npm: ["magic-modal", "react-native-magic-modal"],
  },
  {
    id: "safeJsx",
    kind: "library",
    href: "https://github.com/GSTJ/safe-jsx",
    repo: "GSTJ/safe-jsx",
    npm: ["eslint-plugin-safe-jsx"],
  },
  {
    id: "magicToast",
    kind: "library",
    href: "https://github.com/GSTJ/react-native-magic-toast",
    repo: "GSTJ/react-native-magic-toast",
    npm: ["react-native-magic-toast"],
  },
  {
    id: "pegada",
    kind: "app",
    href: "https://github.com/GSTJ/pegada",
    repo: "GSTJ/pegada",
  },
] as const;

/** Curvinha's three steps, each a real app capture cropped above the price sheet. */
export const CURVINHA_STEPS = ["measure", "plan", "room"] as const;
export type CurvinhaStep = (typeof CURVINHA_STEPS)[number];

/** GitHub stars, read by hand. Shown with this date, never as a live number. */
export const STARS_READ_ON = "2026-10-19";
export const STARS = {
  magicModal: 651,
  safeJsx: 29,
  pegada: 28,
  pegava: 433,
} as const;

export const PEGAVA_HREF = "https://github.com/GSTJ/pegava-dating-app";
export const PEGADA_LAUNCH_HREF =
  "https://pt.linkedin.com/posts/gabrieltaveira_pegada-find-a-match-for-your-dog-product-activity-7228105550360657921-BukN";

/**
 * The npm ledger, biggest first. `names` sums every name a package shipped
 * under (magic-modal was react-native-magic-modal until v10).
 */
export const NPM_ROWS = [
  { id: "magicModal", names: ["magic-modal", "react-native-magic-modal"] },
  { id: "safeJsx", names: ["eslint-plugin-safe-jsx"] },
  { id: "magicToast", names: ["react-native-magic-toast"] },
  { id: "observability", names: ["magic-observability"] },
  { id: "codePush", names: ["react-native-code-push-plugin"] },
] as const;
export type NpmRowId = (typeof NPM_ROWS)[number]["id"];

/** Last good read (npm, last 30 days), used when the API doesn't answer. */
export const NPM_FALLBACK = {
  start: "2026-09-19",
  end: "2026-10-18",
  downloads: {
    "magic-modal": 466,
    "react-native-magic-modal": 12440,
    "eslint-plugin-safe-jsx": 7228,
    "react-native-magic-toast": 1350,
    "magic-observability": 1077,
    "react-native-code-push-plugin": 378,
  } as Record<string, number>,
};

/** The merged fixes behind /security, with their real diff size from GitHub. */
export const SECURITY_PRS = [
  {
    id: "authorization",
    repo: "pegada",
    number: 180,
    additions: 712,
    deletions: 52,
    href: "https://github.com/GSTJ/pegada/pull/180",
  },
  {
    id: "identity",
    repo: "pegada",
    number: 181,
    additions: 514,
    deletions: 157,
    href: "https://github.com/GSTJ/pegada/pull/181",
  },
  {
    id: "assetBoundary",
    repo: "gabriel-taveira-portfolio",
    number: 163,
    additions: 86,
    deletions: 19,
    href: "https://github.com/GSTJ/gabriel-taveira-portfolio/pull/163",
  },
] as const;
export type SecurityPrId = (typeof SECURITY_PRS)[number]["id"];
