import type { WorkItem } from "../work/data";

/**
 * Where a receipt was earned: a work row (linked as `#work-<id>`), the whole
 * work history (`all`, for claims no single row carries), or a public pull
 * request on one of his own repos.
 */
export type ReceiptSource =
  | { work: WorkItem["id"] | "all" }
  | { pr: { repo: string; name: string; number: number; year: number } };

/** One outcome under an offer. Copy under `services.items.<id>.receipts.<receipt id>`. */
export type Receipt = { id: string; source: ReceiptSource };

export type ServiceItem = {
  id: "audit" | "migrations" | "leadership" | "systems";
  receipts: readonly Receipt[];
};

const PEGADA = { repo: "GSTJ/pegada", name: "Pegada" };

/**
 * Numbers are the best true frame from the source: PR bodies on
 * github.com/GSTJ/pegada (read 2026-10-19) and the work rows' own copy.
 */
export const SERVICES: readonly ServiceItem[] = [
  {
    id: "audit",
    receipts: [
      { id: "coinbase", source: { work: "coinbase" } },
      { id: "groundswell", source: { work: "xteam" } },
      // #153: Android cold start 2113 ms -> 1606 ms, APK 58.97 -> 53.39 MB
      { id: "pegada", source: { pr: { ...PEGADA, number: 153, year: 2026 } } },
    ],
  },
  {
    id: "migrations",
    receipts: [
      { id: "coinbase", source: { work: "coinbase" } },
      { id: "alfred", source: { work: "alfred" } },
      // #14: expo 51 -> 55, react-native 0.74 -> 0.83, react 18 -> 19
      { id: "pegada", source: { pr: { ...PEGADA, number: 14, year: 2026 } } },
    ],
  },
  {
    id: "leadership",
    receipts: [
      { id: "people", source: { work: "all" } },
      { id: "hiring", source: { work: "ze" } },
      { id: "forum", source: { work: "xteam" } },
    ],
  },
  {
    id: "systems",
    receipts: [
      { id: "mozeic", source: { work: "ze" } },
      { id: "kustomer", source: { work: "meta" } },
      // #145: 170 files, 684 style comparisons equal, 64 screenshots 0 px diff
      { id: "pegada", source: { pr: { ...PEGADA, number: 145, year: 2026 } } },
    ],
  },
] as const;

/** "How an engagement runs", in order. Copy under `services.engagement.steps`. */
export const ENGAGEMENT_STEPS = ["review", "plan", "ship", "handoff"] as const;
