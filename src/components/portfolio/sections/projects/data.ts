export type ProjectItem = {
  id: "curvinha" | "magicModal" | "safeJsx" | "magicToast" | "pegada";
  kind: "app" | "library";
  href: string;
  repo?: string;
  /** Every npm name the package shipped under, oldest last. */
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

/** Read by hand on this day: stars, store ratings. Shown with the date. */
export const READ_ON = "2026-10-19";

/** npm installs are the sum of npm's daily counts from first publish to here. */
export const NPM_SINCE_END = "2026-10-18";

export const CURVINHA = {
  appStore: "https://apps.apple.com/br/app/id6816957870",
  liveSince: "2026-10-16",
} as const;

/** Curvinha's story, scan first, then what the scan turns into. */
export const CURVINHA_STEPS = ["plan", "room", "fit"] as const;
export type CurvinhaStep = (typeof CURVINHA_STEPS)[number];
export const CURVINHA_SHOTS: Record<
  CurvinhaStep,
  { width: number; height: number }
> = {
  plan: { width: 600, height: 780 },
  room: { width: 600, height: 780 },
  fit: { width: 600, height: 200 },
};

export const PEGADA = {
  appStore: "https://apps.apple.com/br/app/pegada/id6450865592",
  play: "https://play.google.com/store/apps/details?id=app.pegada",
  liveSince: "2023-07-05",
  rating: 3.8,
  ratings: 25,
  playDownloads: "500+",
  pegava: "https://github.com/GSTJ/pegava-dating-app",
  pegavaStars: 433,
  pegavaForks: 144,
  stars: 28,
} as const;

/** App Store screens, in the order a match happens. */
export const PEGADA_SCREENS = ["deck", "match", "chat"] as const;
export type PegadaScreen = (typeof PEGADA_SCREENS)[number];

export const STARS = {
  magicModal: 651,
  safeJsx: 29,
} as const;

/**
 * npm installs from first publish to `NPM_SINCE_END`, summed over every name
 * the package shipped under (magic-modal was react-native-magic-modal until
 * 10.0.0).
 */
export const INSTALLS = {
  magicModal: { total: 221908, since: "2022-02-22" },
  safeJsx: { total: 56574, since: "2023-05-12" },
  magicToast: { total: 10021, since: "2022-02-22" },
  codePush: { total: 44907, since: "2023-11-06" },
  observability: { total: 3422, since: "2026-07-28" },
} as const;

export const npmStat = (names: readonly string[], since: string) =>
  `https://npm-stat.com/charts.html?${names.map((n) => `package=${n}`).join("&")}&from=${since}&until=${NPM_SINCE_END}`;

/** magic-modal's web bundle (gzip), from its CHANGELOG. */
export const MODAL_CHANGELOG =
  "https://github.com/GSTJ/magic-modal/blob/main/packages/modal/CHANGELOG.md";
export const MODAL_BUNDLE = [
  { version: "9.x", kb: 176.6 },
  { version: "10.0", kb: 32.2 },
  { version: "10.1", kb: 5.3 },
] as const;

/** react-native-code-push-plugin installs per year, 2026 to Oct 18. */
export const CODE_PUSH_YEARS = [
  { year: 2023, installs: 1924 },
  { year: 2024, installs: 15836 },
  { year: 2025, installs: 24165 },
  { year: 2026, installs: 2982 },
] as const;

export const TOOLS = {
  codePush: {
    href: "https://github.com/GSTJ/react-native-code-push-plugin",
    npm: ["react-native-code-push-plugin"],
  },
  observability: {
    href: "https://github.com/GSTJ/magic/tree/main/packages/observability",
    npm: ["magic-observability"],
  },
  magicToast: { npm: ["react-native-magic-toast"] },
} as const;

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
