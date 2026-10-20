import type { MedalAward } from "../../ui/badges";

import { LINKEDIN } from "../../profile";

export type WorkItem = {
  id:
    | "consulting"
    | "coinbase"
    | "ateam"
    | "meta"
    | "xteam"
    | "ze"
    | "alfred"
    | "micro";
  /** Primary organization first, then the agency or parent company. */
  orgs: readonly string[];
  start: number;
  end: number | "now";
  tags: readonly string[];
  /**
   * How much room the row gets: "current" is the open engagement, "main" a
   * standard row, "agate" the small print at the end.
   */
  billing: "current" | "main" | "agate";
  /** The company's own site, or LinkedIn when there's nothing public. */
  href: string;
  /**
   * Public artifacts behind the blurb, strongest first. Each `id` has a
   * `label` and a `meta` line under `work.items.<job>.proof.<id>`. A
   * `badge` leads the meta line: a medal for a real award, or the store's
   * star rating, both already said in words.
   */
  proof?: readonly {
    id: string;
    href: string;
    badge?: { medal: MedalAward } | { rating: number };
  }[];
};

/** Newest first. `orgs`, `start` and `end` feed the resume, llms.txt and JSON-LD. */
export const WORK: readonly WorkItem[] = [
  {
    id: "consulting",
    orgs: ["Independent"],
    start: 2025,
    end: "now",
    tags: ["Consulting", "Leadership", "AI"],
    billing: "current",
    href: LINKEDIN,
  },
  {
    id: "coinbase",
    orgs: ["Coinbase", "G2i"],
    start: 2024,
    end: 2025,
    tags: ["React Native", "Expo", "Architecture"],
    billing: "main",
    href: "https://www.coinbase.com/",
  },
  {
    id: "ateam",
    orgs: ["D-ID", "A.Team"],
    start: 2023,
    end: 2025,
    tags: ["Lead", "React Native", "AI"],
    billing: "main",
    href: "https://www.d-id.com/",
    proof: [
      // US App Store, fetched 2026-10-19: released 2023-10-23, 4.6 from 3,399 ratings.
      {
        id: "app",
        href: "https://apps.apple.com/us/app/d-id-ai-video-generator/id6463755563",
        badge: { rating: 4.6 },
      },
      // Golden Kitty Awards 2023 winners (Jan 2024): "Marketing & Sales: D-ID".
      {
        id: "kitty",
        href: "https://www.producthunt.com/newsletters/archive/27186-and-the-award-goes-to",
        badge: { medal: "kitty" },
      },
    ],
  },
  {
    id: "meta",
    orgs: ["Kustomer", "Meta"],
    start: 2022,
    end: 2023,
    tags: ["Design Systems", "DevX", "SDKs"],
    billing: "main",
    href: "https://www.kustomer.com/",
  },
  {
    id: "xteam",
    orgs: ["Groundswell", "X-Team"],
    start: 2022,
    end: 2023,
    tags: ["Mentorship", "Fintech", "Testing"],
    billing: "main",
    href: "https://groundswell.io/",
  },
  {
    id: "ze",
    orgs: ["Zé Delivery", "AB InBev"],
    start: 2020,
    end: 2022,
    tags: ["Hiring", "Native", "Design Systems"],
    billing: "main",
    href: "https://www.ze.delivery/",
    proof: [
      // Mozeic's three packages (app, web, style dictionary), Gabriel a listed
      // maintainer on each. All-time npm downloads to 2026-10-18: 77,396 +
      // 9,911 + 90,276 = 177,583. The first Mozeic package, unscoped
      // `mozeic-app-design-system` 0.1.0, went out from his own npm account on
      // 2020-12-22, a week before the scoped one.
      {
        id: "mozeic",
        href: "https://www.npmjs.com/package/@zedelivery/mozeic-app-design-system",
      },
    ],
  },
  {
    id: "alfred",
    orgs: ["Alfred Delivery"],
    start: 2019,
    end: 2020,
    tags: ["Migration", "React Native"],
    billing: "agate",
    href: "https://alfreddelivery.com/",
  },
  {
    id: "micro",
    orgs: ["Micro Import Group"],
    start: 2017,
    end: 2019,
    tags: ["Full-stack", "PHP", "Gatsby"],
    billing: "agate",
    href: LINKEDIN,
  },
] as const;

/**
 * The orgs line as a page shows it. "Independent" stays English in the data
 * (llms.txt, JSON-LD alumni filter); pages pass the locale's word for it.
 */
export const workOrgs = (item: WorkItem, independent: string) =>
  item.orgs.map((org) => (org === "Independent" ? independent : org));

/** "2024 → 2025", or "2025 → now" with the locale's word for now. */
export const workDates = (item: WorkItem, present: string) =>
  `${item.start} → ${item.end === "now" ? present : item.end}`;
