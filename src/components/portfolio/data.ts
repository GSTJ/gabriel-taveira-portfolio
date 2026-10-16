/**
 * Static, locale-neutral data for the portfolio.
 * URLs, identifiers, ordering and billing rank, anything that isn't user-facing
 * copy lives here. Translatable strings live in `/src/i18n/locales`.
 */

export const LINKEDIN = "https://www.linkedin.com/in/gabrieltaveira/";
export const GITHUB = "https://github.com/GSTJ";
export const EMAIL = "mailto:gabrielstaveira@gmail.com";
export const EMAIL_ADDR = "gabrielstaveira@gmail.com";
export const MEDIUM = "https://medium.com/@gabrieltaveira";
export const SPACE_CAST = "https://www.youtube.com/@spacesquad-rocketseat";
export const SPACE_SQUAD = "https://www.rocketseat.com.br/space-squad";
export const SPACE_CAST_PLAYLIST =
  "https://www.youtube.com/playlist?list=PLRqjZNegpUk8KgQxIvOh49093Iu-vFc9V";
export const CURRICULUM_PDF = "/curriculum.pdf";

export const SECURITY_TOPICS = [
  "Application Security",
  "Authentication",
  "Authorization",
  "Secure SDLC",
  "Threat Modeling",
  "Vulnerability Remediation",
] as const;

export type SecurityCase = {
  id: "assetBoundary" | "identity" | "authorization";
  eyebrow: string;
  metric: string;
  tags: readonly string[];
  href: string;
};

export const SECURITY_CASES: readonly SecurityCase[] = [
  {
    id: "assetBoundary",
    eyebrow: "GABRIELTAVEIRA.DEV · 2026",
    metric: "XSS",
    tags: ["Threat modeling", "Cloud boundary", "HTTP headers"],
    href: "https://github.com/GSTJ/gabriel-taveira-portfolio/pull/163",
  },
  {
    id: "identity",
    eyebrow: "PEGADA · 2026",
    metric: "25×",
    tags: ["Authentication", "Concurrency", "Release integrity"],
    href: "https://github.com/GSTJ/pegada/pull/181",
  },
  {
    id: "authorization",
    eyebrow: "PEGADA · 2026",
    metric: "10m",
    tags: ["Authorization", "Signed uploads", "Abuse controls"],
    href: "https://github.com/GSTJ/pegada/pull/180",
  },
] as const;

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
   * Billing rank, like a poster's credits: "top" gets the largest row, "main"
   * a standard row, "agate" the small print at the foot of the list.
   */
  billing: "current" | "top" | "main" | "agate";
  href: string;
};

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
    billing: "top",
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

export type Topic = "leadership" | "tech";

export type TalkItem = {
  id: "brooklyn" | "tdc" | "assemble" | "spaceSquad";
  date: string;
  topic: Topic;
  lang: "PT" | "EN";
  href: string;
};

export const TALKS: readonly TalkItem[] = [
  {
    id: "brooklyn",
    date: "2024",
    topic: "leadership",
    lang: "PT",
    href: "https://www.figma.com/file/nBdwnIQxwLseSXicLhzRoB/Efici%C3%AAncia-Com-AI---The-Brooklyn-Brothers",
  },
  {
    id: "tdc",
    date: "2024",
    topic: "tech",
    lang: "PT",
    href: "https://thedevconf.com/",
  },
  {
    id: "assemble",
    date: "2023",
    topic: "leadership",
    lang: "PT",
    href: "https://www.rocketseat.com.br/",
  },
  {
    id: "spaceSquad",
    date: "2023",
    topic: "tech",
    lang: "PT",
    href: SPACE_SQUAD,
  },
] as const;

export type Position = "first" | "second" | "finalist";

export type AwardItem = {
  id: "globalLegal" | "maoNaCevada" | "hackRibeirao" | "jovemInovador" | "nasa";
  year: number;
  position: Position;
};

export const AWARDS: readonly AwardItem[] = [
  { id: "globalLegal", year: 2020, position: "first" },
  { id: "maoNaCevada", year: 2019, position: "first" },
  { id: "hackRibeirao", year: 2019, position: "second" },
  { id: "jovemInovador", year: 2019, position: "second" },
  { id: "nasa", year: 2019, position: "finalist" },
] as const;

export const WRITING_TOPICS = [
  "leadership",
  "mobile",
  "design",
  "hiring",
  "reverse",
] as const;

export const NOW = ["consulting", "hosting", "mentoring", "tinkering"] as const;

export const SERVICES = [
  "audit",
  "migrations",
  "leadership",
  "systems",
] as const;

/** The order an engagement runs in, like a manual's operating sequence. */
export const ENGAGEMENT_STEPS = ["review", "plan", "ship", "handoff"] as const;

/**
 * Plain skill keywords, listed on the resume and emitted as `knowsAbout` in
 * the JSON-LD. Written the way recruiters and ATS filters search for them.
 */
export const SKILLS = [
  "React Native",
  "Expo",
  "React",
  "TypeScript",
  "React Compiler",
  "React Native New Architecture",
  "iOS & Android",
  "Mobile Architecture",
  "Design Systems",
  "Testing (Jest, MSW)",
  "CI/CD & App Releases",
  "Engineering Leadership",
  "Technical Hiring",
  "Mentoring",
] as const;

export type ChannelIcon = "linkedin" | "github" | "mail" | "book" | "youtube";

export type Channel = {
  id: "linkedin" | "github" | "email" | "medium" | "spaceCast";
  handle: string;
  url: string;
  icon: ChannelIcon;
};

export const CHANNELS: readonly Channel[] = [
  {
    id: "linkedin",
    handle: "/in/gabrieltaveira",
    url: LINKEDIN,
    icon: "linkedin",
  },
  { id: "github", handle: "@GSTJ", url: GITHUB, icon: "github" },
  { id: "email", handle: EMAIL_ADDR, url: EMAIL, icon: "mail" },
  { id: "medium", handle: "@gabrieltaveira", url: MEDIUM, icon: "book" },
  {
    id: "spaceCast",
    handle: "Rocketseat / YouTube",
    url: SPACE_CAST,
    icon: "youtube",
  },
] as const;
