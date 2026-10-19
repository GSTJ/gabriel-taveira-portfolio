import type { TalkItem } from "../notes/data";
import type { WorkItem } from "../work/data";

/**
 * Where a receipt was earned: a work row (linked as `#work-<id>`), the whole
 * work history (for "4 to 56", which no single row carries), a talk, or an
 * open-source repo with its dated npm downloads.
 */
export type ReceiptSource =
  | { work: WorkItem["id"] }
  | { history: true }
  | { talk: TalkItem["id"] }
  | { repo: string; npm: string };

export type Receipt = {
  /** Copy under `services.items.<service>.receipts.<id>`. */
  id: string;
  /** The outcome, set large. A number is formatted per locale. */
  figure?: string | number;
  source: ReceiptSource;
};

export type ServiceItem = {
  id: "audit" | "migrations" | "leadership" | "systems";
  receipts: readonly Receipt[];
};

/** npm downloads below were read for this window (api.npmjs.org, last-month). */
export const NPM_WINDOW = { from: "2026-09-19", to: "2026-10-18" } as const;

export const SERVICES: readonly ServiceItem[] = [
  {
    id: "audit",
    receipts: [
      { id: "coinbase", figure: "25% → 45%", source: { work: "coinbase" } },
      { id: "groundswell", figure: "30% → 80%+", source: { work: "xteam" } },
      { id: "msw", figure: "16k", source: { work: "xteam" } },
    ],
  },
  {
    id: "migrations",
    receipts: [
      { id: "coinbase", source: { work: "coinbase" } },
      { id: "alfred", figure: "90+", source: { work: "alfred" } },
      {
        id: "codePush",
        figure: 378,
        source: {
          repo: "https://github.com/GSTJ/react-native-code-push-plugin",
          npm: "react-native-code-push-plugin",
        },
      },
    ],
  },
  {
    id: "leadership",
    receipts: [
      { id: "reports", figure: "4 → 56", source: { history: true } },
      { id: "ze", source: { work: "ze" } },
      { id: "biweekly", source: { work: "xteam" } },
      { id: "talk", source: { talk: "assemble" } },
    ],
  },
  {
    id: "systems",
    receipts: [
      { id: "mozeic", source: { work: "ze" } },
      { id: "kustomer", source: { work: "meta" } },
      {
        id: "safeJsx",
        figure: 7228,
        source: {
          repo: "https://github.com/GSTJ/safe-jsx",
          npm: "eslint-plugin-safe-jsx",
        },
      },
    ],
  },
] as const;
