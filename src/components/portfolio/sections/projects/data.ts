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

/** Curvinha's three steps, each a whole capture of the app's sample room. */
export const CURVINHA_STEPS = ["measure", "room", "list"] as const;
export type CurvinhaStep = (typeof CURVINHA_STEPS)[number];

/** GitHub stars, read by hand. Shown with this date, never as a live number. */
export const STARS_READ_ON = "2026-10-19";
export const STARS = {
  magicModal: 651,
  safeJsx: 29,
  pegada: 28,
  pegava: 433,
  magicToast: 16,
  codePush: 17,
  observability: 0,
} as const;

/** Pegada's three steps, each a real App Store screen (pt-BR, light). */
export const PEGADA_STEPS = ["deck", "match", "chat"] as const;
export type PegadaStep = (typeof PEGADA_STEPS)[number];

export const PEGAVA_HREF = "https://github.com/GSTJ/pegava-dating-app";

/**
 * Pegada's receipts, each with its source. Commits: the public repo's count
 * (gh, read on `STARS_READ_ON`) plus the closed-source history he posted
 * about when he opened it. Rank: Product Hunt's own award page.
 */
export const PEGADA_FACTS = {
  commits: { public: 244, before: 1300 },
  openSourceHref: "https://github.com/GSTJ/pegada/commits",
  openSourcePostHref:
    "https://www.linkedin.com/posts/gabrieltaveira_opensource-reactnative-nextjs-activity-7319492711873437696-RCzo",
  productHunt: {
    rank: 2,
    date: "2024-08-10",
    href: "https://www.producthunt.com/products/pegada/awards",
  },
  forks: { pegada: 9, pegava: 144 },
} as const;

/** What he shipped in Pegada lately, newest work first, from the PRs. */
export const PEGADA_SHIPPED = [
  {
    id: "upgrade",
    number: 14,
    date: "2026-05-19",
    href: "https://github.com/GSTJ/pegada/pull/14",
  },
  {
    id: "perf",
    number: 153,
    date: "2026-08-29",
    href: "https://github.com/GSTJ/pegada/pull/153",
  },
  {
    id: "codemod",
    number: 145,
    date: "2026-08-26",
    href: "https://github.com/GSTJ/pegada/pull/145",
  },
] as const;
export type PegadaShippedId = (typeof PEGADA_SHIPPED)[number]["id"];
/** Where Pegada ships. GitHub comes from `PROJECTS`. */
export const PEGADA_STORES = {
  appStore: "https://apps.apple.com/br/app/pegada/id6450865592",
  googlePlay: "https://play.google.com/store/apps/details?id=app.pegada",
} as const;

/**
 * The npm ledger, biggest first. `names` sums every name a package shipped
 * under (magic-modal was react-native-magic-modal until v10). `stars` is the
 * package's repo in `STARS`.
 */
export const NPM_ROWS = [
  {
    id: "magicModal",
    names: ["magic-modal", "react-native-magic-modal"],
    stars: "magicModal",
  },
  { id: "safeJsx", names: ["eslint-plugin-safe-jsx"], stars: "safeJsx" },
  {
    id: "codePush",
    names: ["react-native-code-push-plugin"],
    stars: "codePush",
  },
  {
    id: "magicToast",
    names: ["react-native-magic-toast"],
    stars: "magicToast",
  },
  {
    id: "observability",
    names: ["magic-observability"],
    stars: "observability",
  },
] as const;
export type NpmRowId = (typeof NPM_ROWS)[number]["id"];

/** The first day any of these packages was on npm (react-native-magic-modal). */
export const NPM_SINCE = "2022-02-22";

/**
 * All-time downloads up to `end`: npm's daily counts summed in 365-day
 * windows from `NPM_SINCE`. The live read adds the days after `end`, and
 * falls back to this whole when npm doesn't answer.
 */
export const NPM_SNAPSHOT = {
  end: "2026-10-18",
  downloads: {
    "magic-modal": 2384,
    "react-native-magic-modal": 219524,
    "eslint-plugin-safe-jsx": 56574,
    "react-native-magic-toast": 10021,
    "magic-observability": 3422,
    "react-native-code-push-plugin": 44907,
  } as Record<string, number>,
};
