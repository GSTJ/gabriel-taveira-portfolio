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
