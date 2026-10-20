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
  href: string;
};

/** Newest first. `orgs`, `start` and `end` feed the resume, llms.txt and JSON-LD. */
export const WORK: readonly WorkItem[] = [
  {
    id: "consulting",
    orgs: ["Independent"],
    start: 2025,
    end: "now",
    tags: ["Consulting", "Mobile", "Leadership"],
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
  },
  {
    id: "alfred",
    orgs: ["Alfred Delivery"],
    start: 2019,
    end: 2020,
    tags: ["Migration", "React Native"],
    billing: "agate",
    href: LINKEDIN,
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
