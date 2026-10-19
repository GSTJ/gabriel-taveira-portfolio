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
  /** First public release, ISO date. */
  since: string;
  /** npm installs, all time up to `NPM_READ_TO`, every name the package shipped under summed. */
  installs?: number;
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
    since: "2026-10-16",
  },
  {
    id: "pegada",
    kind: "app",
    href: "https://github.com/GSTJ/pegada",
    since: "2023-07-05",
  },
  {
    id: "magicModal",
    kind: "library",
    href: "https://github.com/GSTJ/magic-modal",
    since: "2022-02-22",
    installs: 221_908,
  },
  {
    id: "safeJsx",
    kind: "library",
    href: "https://github.com/GSTJ/safe-jsx",
    since: "2023-05-12",
    installs: 56_574,
  },
  {
    id: "codePush",
    kind: "library",
    href: "https://github.com/GSTJ/react-native-code-push-plugin",
    since: "2023-11-06",
    installs: 44_907,
  },
  {
    id: "magicToast",
    kind: "library",
    href: "https://github.com/GSTJ/react-native-magic-toast",
    since: "2022-02-22",
    installs: 10_021,
  },
  {
    id: "observability",
    kind: "library",
    href: "https://github.com/GSTJ/magic/tree/main/packages/observability",
    since: "2026-07-28",
    installs: 3_422,
  },
] as const;

/** The index lists every project, then the merged security fixes as one row. */
export const ROWS = [...PROJECTS.map((p) => p.id), "security"] as const;
export type RowId = ProjectId | "security";

/** npm all-time totals sum the yearly range API up to this day. */
export const NPM_READ_TO = "2026-10-18";
/** Stars, store ratings and listings, read by hand on this day. */
export const READ_ON = "2026-10-19";

export const CURVINHA = {
  appStore: "https://apps.apple.com/br/app/id6816957870",
} as const;

export const PEGADA = {
  appStore: "https://apps.apple.com/br/app/pegada/id6450865592",
  play: "https://play.google.com/store/apps/details?id=app.pegada",
  rating: 3.8,
  ratings: 25,
  openSince: "2025-04-19",
  stars: 28,
  pegava: {
    href: "https://github.com/GSTJ/pegava-dating-app",
    stars: 433,
    forks: 144,
  },
} as const;

export const STARS = { magicModal: 651, safeJsx: 29 } as const;

/** magic-modal's web entry, gzip, from its CHANGELOG (10.0.0 and 10.1.0). */
export const MODAL_BUNDLE = {
  source:
    "https://github.com/GSTJ/magic-modal/blob/main/packages/modal/CHANGELOG.md",
  rows: [
    { version: "9.x", kb: 176.6 },
    { version: "10.0.0", kb: 32.2 },
    { version: "10.1.0", kb: 5.3 },
  ],
} as const;

/** react-native-code-push-plugin installs per calendar year (2026 to NPM_READ_TO). */
export const CODE_PUSH_YEARS = [
  { year: 2023, installs: 1_924 },
  { year: 2024, installs: 15_836 },
  { year: 2025, installs: 24_165 },
  { year: 2026, installs: 2_982 },
] as const;
export const CODE_PUSH_RETIRED = "2025-03-31";

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
