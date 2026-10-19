import {
  MEDIUM,
  SPACE_CAST,
  SPACE_CAST_PLAYLIST,
  SPACE_SQUAD,
} from "../../profile";

export type NowItem = {
  id: "consulting" | "building" | "hosting" | "mentoring" | "tinkering";
  href?: string;
};

/** The Curvinha line keeps `?ct=gabrieltaveira-dev` (the project card has its own). */
export const NOW: readonly NowItem[] = [
  { id: "consulting" },
  { id: "building", href: "https://curvinha.app/?ct=gabrieltaveira-dev" },
  { id: "hosting" },
  { id: "mentoring" },
  { id: "tinkering" },
] as const;

export const PUBLICATIONS = {
  spaceCast: SPACE_CAST,
  playlist: SPACE_CAST_PLAYLIST,
  medium: MEDIUM,
  spaceSquad: SPACE_SQUAD,
} as const;

export type TalkItem = {
  id: "brooklyn" | "tdc" | "assemble" | "spaceSquad";
  date: string;
  topic: "leadership" | "tech";
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

export type AwardItem = {
  id: "globalLegal" | "maoNaCevada" | "hackRibeirao" | "jovemInovador" | "nasa";
  year: number;
  position: "first" | "second" | "finalist";
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
