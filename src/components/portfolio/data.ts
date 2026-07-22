/**
 * Static, locale-neutral data for the portfolio.
 * URLs, identifiers, tone/flourish wiring — anything that isn't user-facing
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

export type Tone = "ember" | "coral" | "brass" | "teal";

/** Color of the thin ledger spine on a work row. Red is rationed to the
 *  loudest entries; cobalt marks the current engagement. */
export type Spine = "cobalt" | "red" | "ink";

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
  eyebrow: string;
  tags: readonly string[];
  spine: Spine;
  href: string;
};

export const WORK: readonly WorkItem[] = [
  {
    id: "consulting",
    eyebrow: "INDEPENDENT · 2025 → NOW",
    tags: ["Consulting", "Mobile", "Leadership"],
    spine: "cobalt",
    href: LINKEDIN,
  },
  {
    id: "coinbase",
    eyebrow: "COINBASE · G2I · 2024 → 25",
    tags: ["React Native", "Expo", "Architecture"],
    spine: "red",
    href: "https://www.coinbase.com/",
  },
  {
    id: "ateam",
    eyebrow: "A.TEAM · D-ID · 2023 → 25",
    tags: ["Lead", "React Native", "AI"],
    spine: "ink",
    href: "https://www.d-id.com/",
  },
  {
    id: "meta",
    eyebrow: "META · KUSTOMER · 2022 → 23",
    tags: ["Design Systems", "DevX", "SDKs"],
    spine: "ink",
    href: "https://www.kustomer.com/",
  },
  {
    id: "xteam",
    eyebrow: "X-TEAM · GROUNDSWELL · 2022 → 23",
    tags: ["Mentorship", "Fintech", "Testing"],
    spine: "ink",
    href: "https://groundswell.io/",
  },
  {
    id: "ze",
    eyebrow: "ZÉ DELIVERY · AB INBEV · 2020 → 22",
    tags: ["Hiring", "Native", "Design Systems"],
    spine: "red",
    href: "https://www.ze.delivery/",
  },
  {
    id: "alfred",
    eyebrow: "ALFRED DELIVERY · 2019 → 20",
    tags: ["Migration", "React Native"],
    spine: "ink",
    href: LINKEDIN,
  },
  {
    id: "micro",
    eyebrow: "MICRO IMPORT GROUP · 2017 → 19",
    tags: ["Full-stack", "PHP", "Gatsby"],
    spine: "ink",
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

export type Trophy = "gold" | "silver" | "bronze";
export type Position = "first" | "second" | "finalist";

export type AwardItem = {
  id: "globalLegal" | "maoNaCevada" | "hackRibeirao" | "jovemInovador" | "nasa";
  year: number;
  position: Position;
  trophy: Trophy;
};

export const AWARDS: readonly AwardItem[] = [
  { id: "globalLegal", year: 2020, position: "first", trophy: "gold" },
  { id: "maoNaCevada", year: 2019, position: "first", trophy: "gold" },
  { id: "hackRibeirao", year: 2019, position: "second", trophy: "silver" },
  { id: "jovemInovador", year: 2019, position: "second", trophy: "silver" },
  { id: "nasa", year: 2019, position: "finalist", trophy: "bronze" },
] as const;

export type TopicChip = {
  id: "leadership" | "mobile" | "design" | "hiring" | "reverse";
  tone: Tone;
};

export const WRITING_TOPICS: readonly TopicChip[] = [
  { id: "leadership", tone: "ember" },
  { id: "mobile", tone: "coral" },
  { id: "design", tone: "brass" },
  { id: "hiring", tone: "teal" },
  { id: "reverse", tone: "ember" },
] as const;

export type NowItem = {
  id: "consulting" | "hosting" | "mentoring" | "tinkering";
  tone: Tone;
};

export const NOW: readonly NowItem[] = [
  { id: "consulting", tone: "ember" },
  { id: "hosting", tone: "brass" },
  { id: "mentoring", tone: "teal" },
  { id: "tinkering", tone: "coral" },
] as const;

export type ChannelIcon = "linkedin" | "github" | "mail" | "book" | "youtube";

export type Channel = {
  id: "linkedin" | "github" | "email" | "medium" | "spaceCast";
  handle: string;
  url: string;
  icon: ChannelIcon;
};

export const CHANNELS: readonly Channel[] = [
  { id: "linkedin", handle: "/in/gabrieltaveira", url: LINKEDIN, icon: "linkedin" },
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
