import type { WorkItem } from "../work/data";

/** Where an outside source's numbers were read, shown next to them. */
export const READ_ON = "2026-09-19 → 2026-10-18";

/**
 * A footnote's source: a work row on this page (`#work-<id>`), another anchor
 * on the page, or outside links (GitHub, npm). Copy under
 * `services.items.<id>.notes.n<k>` and `services.sources`.
 */
export type ServiceNote =
  | { work: WorkItem["id"] }
  | { anchor: "work" | "notes-talks" }
  | { links: readonly { source: "github" | "npm"; href: string }[] };

export type ServiceItem = {
  id: "audit" | "migrations" | "leadership" | "systems";
  /** In the order the paragraph cites them: tags `<n1>`, `<n2>`, ... */
  notes: readonly ServiceNote[];
};

export const SERVICES: readonly ServiceItem[] = [
  { id: "audit", notes: [{ work: "coinbase" }, { work: "xteam" }] },
  {
    id: "migrations",
    notes: [
      { work: "coinbase" },
      { work: "alfred" },
      {
        links: [
          {
            source: "github",
            href: "https://github.com/GSTJ/react-native-code-push-plugin",
          },
          {
            source: "npm",
            href: "https://www.npmjs.com/package/react-native-code-push-plugin",
          },
        ],
      },
    ],
  },
  {
    id: "leadership",
    notes: [
      { anchor: "work" },
      { work: "ze" },
      { work: "xteam" },
      { anchor: "notes-talks" },
    ],
  },
  {
    id: "systems",
    notes: [
      { work: "ze" },
      { work: "meta" },
      {
        links: [
          {
            source: "npm",
            href: "https://www.npmjs.com/package/eslint-plugin-safe-jsx",
          },
          { source: "github", href: "https://github.com/GSTJ/safe-jsx" },
        ],
      },
    ],
  },
] as const;
