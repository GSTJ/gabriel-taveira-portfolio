export type ProjectId =
  | "curvinha"
  | "pegada"
  | "magicModal"
  | "safeJsx"
  | "codePush"
  | "magicToast"
  | "observability";

export type ProjectItem = {
  id: ProjectId;
  kind: "app" | "library";
  href: string;
  /** Every npm name the package shipped under, for install totals. */
  npm?: readonly string[];
};

/**
 * Order is the page's order. Curvinha keeps `?ct=gabriel-site`; the Now line
 * in Notes uses `?ct=gabrieltaveira-dev`, so the two placements are measured
 * apart. llms.txt lists these with `projects.items.<id>.title/body`.
 */
export const PROJECTS: readonly ProjectItem[] = [
  {
    id: "curvinha",
    kind: "app",
    href: "https://curvinha.app/?ct=gabriel-site",
  },
  { id: "pegada", kind: "app", href: "https://github.com/GSTJ/pegada" },
  {
    id: "magicModal",
    kind: "library",
    href: "https://github.com/GSTJ/magic-modal",
    npm: ["react-native-magic-modal", "magic-modal"],
  },
  {
    id: "safeJsx",
    kind: "library",
    href: "https://github.com/GSTJ/safe-jsx",
    npm: ["eslint-plugin-safe-jsx"],
  },
  {
    id: "codePush",
    kind: "library",
    href: "https://github.com/GSTJ/react-native-code-push-plugin",
    npm: ["react-native-code-push-plugin"],
  },
  {
    id: "magicToast",
    kind: "library",
    href: "https://github.com/GSTJ/react-native-magic-toast",
    npm: ["react-native-magic-toast"],
  },
  {
    id: "observability",
    kind: "library",
    href: "https://github.com/GSTJ/magic/tree/main/packages/observability",
    npm: ["magic-observability"],
  },
] as const;

export const href = (id: ProjectId) =>
  PROJECTS.find((p) => p.id === id)?.href ?? "";

/** Read on the App Store's lookup API. */
export const CURVINHA = {
  appStore: "https://apps.apple.com/br/app/id6816957870",
  liveSince: "2026-10-16",
} as const;

/** The three things a scan turns into, each a real capture without prices. */
export const CURVINHA_OUTPUTS = ["plan", "room", "fit"] as const;
export type CurvinhaOutput = (typeof CURVINHA_OUTPUTS)[number];

export const PEGADA = {
  appStore: "https://apps.apple.com/br/app/pegada/id6450865592",
  play: "https://play.google.com/store/apps/details?id=app.pegada",
  pegava: "https://github.com/GSTJ/pegava-dating-app",
  liveSince: "2023-07-05",
  rating: 3.8,
  ratings: 25,
  pegavaStars: 433,
  pegavaForks: 144,
} as const;

/** Real App Store screens, in the order a match happens. */
export const PEGADA_SCREENS = ["deck", "match", "chat"] as const;
export type PegadaScreen = (typeof PEGADA_SCREENS)[number];

/** GitHub stars, read by hand. Shown with this date, never as a live number. */
export const STARS_READ_ON = "2026-10-19";
export const STARS = { magicModal: 651, safeJsx: 29 } as const;

export const MAGIC_MODAL = {
  first: "2022-02-22",
  releases: 55,
  changelog:
    "https://github.com/GSTJ/magic-modal/blob/main/packages/modal/CHANGELOG.md",
  /** Web bundle, gzip, from the changelog (#334, #336). */
  bundle: [
    { version: "9.x", kb: 176.6 },
    { version: "10.0", kb: 32.2 },
    { version: "10.1", kb: 5.3 },
  ],
} as const;

export const SAFE_JSX_FIRST = "2023-05-12";
export const CODE_PUSH_RETIRED = "2025-03-31";
export const OBSERVABILITY_FIRST = "2026-07-28";

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
