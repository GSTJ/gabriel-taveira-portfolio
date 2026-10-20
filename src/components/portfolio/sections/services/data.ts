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

/**
 * Numbers are the best true frame from the work rows' own copy.
 */
export const SERVICES: readonly ServiceItem[] = [
  {
    id: "audit",
    receipts: [
      { id: "coinbase", source: { work: "coinbase" } },
      { id: "groundswell", source: { work: "xteam" } },
    ],
  },
  {
    id: "migrations",
    receipts: [
      { id: "coinbase", source: { work: "coinbase" } },
      { id: "alfred", source: { work: "alfred" } },
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
    ],
  },
] as const;

/** "How an engagement runs", in order. Copy under `services.engagement.steps`. */
export const ENGAGEMENT_STEPS = ["review", "plan", "ship", "handoff"] as const;
