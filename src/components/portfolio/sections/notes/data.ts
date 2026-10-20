import { MEDIUM, SPACE_CAST, SPACE_CAST_PLAYLIST } from "../../profile";

export type NowItem = {
  id: "building";
  href?: string;
};

/** The Curvinha line keeps `?ct=gabrieltaveira-dev` (the project card has its own). */
export const NOW: readonly NowItem[] = [
  { id: "building", href: "https://curvinha.app/?ct=gabrieltaveira-dev" },
] as const;

export const PUBLICATIONS = {
  spaceCast: SPACE_CAST,
  playlist: SPACE_CAST_PLAYLIST,
  medium: MEDIUM,
} as const;

export type TalkItem = {
  id: "brooklyn" | "tdc" | "assemble" | "spaceSquad";
  date: string;
  lang: "PT" | "EN";
  href: string;
};

export const TALKS: readonly TalkItem[] = [
  {
    id: "brooklyn",
    date: "2024",
    lang: "PT",
    href: "https://www.figma.com/file/nBdwnIQxwLseSXicLhzRoB/Efici%C3%AAncia-Com-AI---The-Brooklyn-Brothers",
  },
  {
    id: "tdc",
    date: "2024",
    lang: "PT",
    href: "https://thedevconf.com/",
  },
  {
    id: "assemble",
    date: "2023",
    lang: "PT",
    href: "https://www.rocketseat.com.br/",
  },
  {
    id: "spaceSquad",
    date: "2023",
    lang: "PT",
    href: SPACE_CAST,
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

export type ShippedItem = {
  id: "pegada" | "safeJsx" | "codePush" | "magicModal";
  name: string;
  version: string;
  /** Release date, ISO. */
  date: string;
  href: string;
};

/** When SHIPPED was read from GitHub releases (`gh release list`, read only). */
export const SHIPPED_READ = "2026-10-19";

/** Real releases with a user-facing change, newest first. A snapshot, dated. */
export const SHIPPED: readonly ShippedItem[] = [
  {
    id: "pegada",
    name: "pegada",
    version: "1.7.3",
    date: "2026-09-21",
    href: "https://github.com/GSTJ/pegada/releases/tag/v1.7.3",
  },
  {
    id: "safeJsx",
    name: "eslint-plugin-safe-jsx",
    version: "1.3.9",
    date: "2026-08-31",
    href: "https://github.com/GSTJ/safe-jsx/releases/tag/v1.3.9",
  },
  {
    id: "codePush",
    name: "react-native-code-push-plugin",
    version: "2.0.0",
    date: "2026-08-05",
    href: "https://github.com/GSTJ/react-native-code-push-plugin/releases/tag/v2.0.0",
  },
  {
    id: "magicModal",
    name: "magic-modal",
    version: "10.2.0",
    date: "2026-07-31",
    href: "https://github.com/GSTJ/magic-modal/releases/tag/magic-modal-10.2.0",
  },
] as const;

/** When the Now list was last edited. Bump it with the list, so "Updated" stays honest. */
export const NOW_UPDATED = new Date("2026-10-19T12:00:00Z");
