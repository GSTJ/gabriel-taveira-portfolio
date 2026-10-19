import { SPACE_CAST, SPACE_CAST_PLAYLIST } from "../../profile";

export type NowItem = {
  id: "consulting" | "building" | "mentoring" | "tinkering";
  href?: string;
};

/** The Curvinha line keeps `?ct=gabrieltaveira-dev` (the project card has its own). */
export const CURVINHA_NOW = "https://curvinha.app/?ct=gabrieltaveira-dev";

export const NOW: readonly NowItem[] = [
  { id: "consulting" },
  { id: "building", href: CURVINHA_NOW },
  { id: "mentoring" },
  { id: "tinkering" },
] as const;

/** When the Now list was last edited. Bump it with the list, so "Updated" stays honest. */
export const NOW_UPDATED = new Date("2026-10-19T12:00:00Z");

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
  { id: "tdc", date: "2024", lang: "PT", href: "https://thedevconf.com/" },
  {
    id: "assemble",
    date: "2023",
    lang: "PT",
    href: "https://www.rocketseat.com.br/",
  },
  { id: "spaceSquad", date: "2023", lang: "PT", href: SPACE_CAST },
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

export type ShippedItem = {
  id: "pegada" | "safeJsx" | "codePush" | "magicModal";
  name: string;
  version: string;
  /** Release date, ISO. */
  date: string;
  href: string;
};

/** When SHIPPED, the stars and the episode list were read (GitHub, YouTube, Medium; read only). */
export const RECORD_READ = "2026-10-19";

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

export type ArticleItem = {
  id: "modalsWrong" | "modalsGuide";
  date: string;
  lang: "PT" | "EN";
  /** Verbatim, as published. */
  title: string;
  publication: string;
  href: string;
  /** The library the article turned into, with its stars on RECORD_READ. */
  became?: { name: string; href: string; stars: number };
};

/** From his Medium RSS feed. Titles stay as published. */
export const ARTICLES: readonly ArticleItem[] = [
  {
    id: "modalsGuide",
    date: "2022-09-16",
    lang: "PT",
    title: "O Guia Definitivo de Modais no React Native",
    publication: "Medium",
    href: "https://medium.com/@gabrieltaveira/o-guia-definitivo-de-modais-no-react-native-d39d0b6846fe",
  },
  {
    id: "modalsWrong",
    date: "2022-08-01",
    lang: "EN",
    title: "You Have Been Using React Native Modals Wrong",
    publication: "JavaScript in Plain English",
    href: "https://javascript.plainenglish.io/you-have-been-using-react-native-modals-wrong-9b8c17de2f96",
    became: {
      name: "magic-modal",
      href: "https://github.com/GSTJ/magic-modal",
      stars: 650,
    },
  },
] as const;

export const SPACE_CAST_LINKS = {
  playlist: SPACE_CAST_PLAYLIST,
  spotify: "https://open.spotify.com/show/5TvGqomzjc81obDK7iNiTu",
} as const;

/** Rocketseat's weekly show ran #1 to #40 in 2023. */
export const SPACE_CAST_TOTAL = 40;

export type Episode = {
  n: number;
  /** YouTube video id; the thumbnail is public/notes/space-cast/<id>.webp. */
  id: string;
  date: string;
  minutes: number;
  /** Verbatim YouTube title, minus the "| Space Cast #n" suffix. */
  title: string;
};

/**
 * The 37 Space Cast episodes whose YouTube description names Gabriel as a
 * host (#19, #24 and #25 don't), newest first.
 */
export const EPISODES: readonly Episode[] = [
  {
    n: 40,
    id: "FD2BsDW7jJg",
    date: "2023-10-18",
    minutes: 60,
    title: "Sistemas Legados e Organização com Gi Bordignon",
  },
  {
    n: 39,
    id: "D6QtBuJoQ1A",
    date: "2023-10-11",
    minutes: 62,
    title: "Ser DevRel no Github com Pachi Parra",
  },
  {
    n: 38,
    id: "r_g_UpP5j1o",
    date: "2023-10-04",
    minutes: 64,
    title: "Se Tornando Dev com Simara Conceição",
  },
  {
    n: 37,
    id: "UIYb8zd02ZY",
    date: "2023-09-27",
    minutes: 46,
    title: "Mercado Dev para 40+ com Dan Vitoriano",
  },
  {
    n: 36,
    id: "DLEaut5emsU",
    date: "2023-09-20",
    minutes: 72,
    title: "Abraçando o Caos com Josi Assis",
  },
  {
    n: 35,
    id: "FAzEPoQBY2I",
    date: "2023-09-13",
    minutes: 56,
    title: "Decolando sua Carreira Júnior com Fernanda Kipper",
  },
  {
    n: 34,
    id: "ErHBAMZ9qjI",
    date: "2023-09-06",
    minutes: 46,
    title: "Mercado de Tecnologia para Pessoas Atípicas com Gui Estevão",
  },
  {
    n: 33,
    id: "JLMvXHPZABE",
    date: "2023-08-30",
    minutes: 47,
    title: "Transformação Digital Em Empresas Centenárias com Heitor Penha",
  },
  {
    n: 32,
    id: "ioQ5gjjOaf4",
    date: "2023-08-23",
    minutes: 65,
    title: "Liderança Ágil com Alexandre Abdalla",
  },
  {
    n: 31,
    id: "3DZEftUeSLM",
    date: "2023-08-16",
    minutes: 54,
    title: "Construindo A Sua História com Joel Backschat",
  },
  {
    n: 30,
    id: "n7ppFE9xybw",
    date: "2023-08-09",
    minutes: 85,
    title: "Desenvolvimento Mobile com Rodrigo Gonçalves",
  },
  {
    n: 29,
    id: "hITHDVvTYnk",
    date: "2023-08-02",
    minutes: 78,
    title: "Como ser Fullcycle com Wesley Willians",
  },
  {
    n: 28,
    id: "kD0kf75N7WE",
    date: "2023-07-26",
    minutes: 77,
    title: "Perspectiva Gringa: Devs Brasileiros com Patrick Cason",
  },
  {
    n: 27,
    id: "jtyi0PmJzLQ",
    date: "2023-07-19",
    minutes: 77,
    title: "Conheça o Space Squad com Julião",
  },
  {
    n: 26,
    id: "tKc91BExzrY",
    date: "2023-07-12",
    minutes: 50,
    title: "Carreira de DevRel com Gabriel Bolzi",
  },
  {
    n: 23,
    id: "Y0lL018lwAs",
    date: "2023-06-21",
    minutes: 63,
    title: "Comunidade PHP com PokemãoBR",
  },
  {
    n: 22,
    id: "fIbMAq43OFs",
    date: "2023-06-14",
    minutes: 52,
    title: "Redes Sociais para Devs com Valks Carvalho",
  },
  {
    n: 21,
    id: "Gd1DpDf65HM",
    date: "2023-06-07",
    minutes: 64,
    title: "Encontrando Um Propósito com Abraão Sena",
  },
  {
    n: 20,
    id: "bgTW6PInZDs",
    date: "2023-05-31",
    minutes: 55,
    title: "Evolução Constante com Kamila Code",
  },
  {
    n: 18,
    id: "MNeH30-zr1o",
    date: "2023-05-17",
    minutes: 46,
    title: "Angular no Exterior com Leonardo Natal",
  },
  {
    n: 17,
    id: "H6O5vxtXRfM",
    date: "2023-05-10",
    minutes: 98,
    title: "A Interface Perfeita com Jonas Milan",
  },
  {
    n: 16,
    id: "oR8E5yTGIo4",
    date: "2023-05-03",
    minutes: 66,
    title: "Trabalhando No Exterior com Ilda Neta",
  },
  {
    n: 15,
    id: "xmhFe-7NvcI",
    date: "2023-04-26",
    minutes: 52,
    title: "A Pressão do SHOW ME THE CODE com José Carlos Teles",
  },
  {
    n: 14,
    id: "mH42lps6O7A",
    date: "2023-04-19",
    minutes: 58,
    title: "Equilibrando vida pessoal e trabalho com Laura Kibum",
  },
  {
    n: 13,
    id: "4rlktCGOFRQ",
    date: "2023-04-12",
    minutes: 62,
    title: "Qual o Papel de um Head de Engenharia com Sergio Fiorotti",
  },
  {
    n: 12,
    id: "mCPU7G9IqCA",
    date: "2023-04-05",
    minutes: 63,
    title: "Nathally Souza",
  },
  {
    n: 11,
    id: "isBi6IYMdjs",
    date: "2023-03-29",
    minutes: 61,
    title: "Ahirton Lopes",
  },
  {
    n: 10,
    id: "6rBT5UbhQ64",
    date: "2023-03-22",
    minutes: 51,
    title: "Jakeliny Gracielly",
  },
  {
    n: 9,
    id: "t0W2Eas3TYY",
    date: "2023-03-15",
    minutes: 57,
    title: "Gerando Valor com Ana Neri",
  },
  {
    n: 8,
    id: "GzsE5kj5utc",
    date: "2023-03-08",
    minutes: 70,
    title: "Desenvolvendo Sua Liderança com Eduardo Matos",
  },
  {
    n: 7,
    id: "mqNxEA-mrmE",
    date: "2023-03-01",
    minutes: 52,
    title: "Desvendando o Design com David Arty",
  },
  {
    n: 6,
    id: "mBHhp0AvKm0",
    date: "2023-02-22",
    minutes: 57,
    title: "De Atleta à Tech Lead na Zup: A Trajetória de Lucas Thomaz",
  },
  {
    n: 5,
    id: "SmkOSCqnBsg",
    date: "2023-02-15",
    minutes: 79,
    title: "As tendências e frameworks com Diego Fernandes",
  },
  {
    n: 4,
    id: "ZYD_sMkg5V0",
    date: "2023-02-08",
    minutes: 50,
    title: "Construindo uma plataforma de ensino com Gabriel Buzzi",
  },
  {
    n: 3,
    id: "k2vWbLIc9vU",
    date: "2023-02-01",
    minutes: 78,
    title:
      "A Importância da Comunidade na Vida do Dev com Jakeliny Gracielly e Nadia Lidia",
  },
  {
    n: 2,
    id: "6WgEpSh5L1c",
    date: "2023-01-25",
    minutes: 31,
    title: "Elevando a Carreira com Daniel Costa",
  },
  {
    n: 1,
    id: "9bfIwqwun6Q",
    date: "2023-01-18",
    minutes: 89,
    title: "Iniciando na Programação com Mayk Brito",
  },
] as const;
