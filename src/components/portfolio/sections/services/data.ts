import type { NpmRowId } from "../projects/data";
import type { WorkItem } from "../work/data";

/**
 * Where a receipt was earned: a work row (linked as `#work-<id>`), the whole
 * work history (`all`, for "4 to 56 direct reports", which no single row
 * carries), an open-source repo, or an npm package (read live, shown with
 * its dates).
 */
export type ReceiptSource =
  | { work: WorkItem["id"] | "all" }
  | { repo: string }
  | { npm: NpmRowId };

export type Receipt = { id: string; source: ReceiptSource };

export type ServiceItem = {
  id: "audit" | "migrations" | "leadership" | "systems";
  /** Copy under `services.items.<id>.receipts.<receipt id>`. */
  receipts: readonly Receipt[];
};

export const SERVICES: readonly ServiceItem[] = [
  {
    id: "audit",
    receipts: [
      { id: "coinbase", source: { work: "coinbase" } },
      { id: "groundswell", source: { work: "xteam" } },
      { id: "msw", source: { work: "xteam" } },
    ],
  },
  {
    id: "migrations",
    receipts: [
      { id: "coinbase", source: { work: "coinbase" } },
      { id: "alfred", source: { work: "alfred" } },
      {
        id: "codePush",
        source: {
          repo: "https://github.com/GSTJ/react-native-code-push-plugin",
        },
      },
    ],
  },
  {
    id: "leadership",
    receipts: [
      { id: "reports", source: { work: "all" } },
      { id: "hiring", source: { work: "ze" } },
      { id: "forum", source: { work: "xteam" } },
    ],
  },
  {
    id: "systems",
    receipts: [
      { id: "mozeic", source: { work: "ze" } },
      { id: "kustomer", source: { work: "meta" } },
      {
        id: "safeJsx",
        source: { npm: "safeJsx" },
      },
    ],
  },
] as const;
