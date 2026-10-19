import { MEDIUM, SPACE_CAST, SPACE_CAST_PLAYLIST } from "../../profile";

export type NowItem = {
  id: "consulting" | "building" | "mentoring" | "tinkering";
  href?: string;
};

/** The Curvinha line keeps `?ct=gabrieltaveira-dev` (the project card has its own). */
export const NOW: readonly NowItem[] = [
  { id: "consulting" },
  { id: "building", href: "https://curvinha.app/?ct=gabrieltaveira-dev" },
  { id: "mentoring" },
  { id: "tinkering" },
] as const;

/**
 * Space Cast ran weekly on Rocketseat's Space Squad channel through 2023. The
 * episode list and the "Hosts:" line in each description were read from
 * YouTube on 2026-10-19; `host: false` marks the three he isn't listed on.
 */
export const SPACE_CAST_LINKS = {
  playlist: SPACE_CAST_PLAYLIST,
  spotify: "https://open.spotify.com/show/5TvGqomzjc81obDK7iNiTu",
  channel: SPACE_CAST,
} as const;

export type Episode = {
  n: number;
  /** YouTube video id, also the thumbnail file in public/notes/space-cast. */
  id: string;
  date: string;
  /** The episode title as published, in Portuguese. */
  title: string;
  host?: false;
};

export const EPISODES: readonly Episode[] = [
  {
    n: 1,
    id: "9bfIwqwun6Q",
    date: "2023-01-18",
    title: "Iniciando na Programação com Mayk Brito",
  },
  {
    n: 2,
    id: "6WgEpSh5L1c",
    date: "2023-01-25",
    title: "Elevando a Carreira com Daniel Costa",
  },
  {
    n: 3,
    id: "k2vWbLIc9vU",
    date: "2023-02-01",
    title:
      "A Importância da Comunidade na Vida do Dev com Jakeliny Gracielly e Nadia Lidia",
  },
  {
    n: 4,
    id: "ZYD_sMkg5V0",
    date: "2023-02-08",
    title: "Construindo uma plataforma de ensino com Gabriel Buzzi",
  },
  {
    n: 5,
    id: "SmkOSCqnBsg",
    date: "2023-02-15",
    title: "As tendências e frameworks com Diego Fernandes",
  },
  {
    n: 6,
    id: "mBHhp0AvKm0",
    date: "2023-02-22",
    title: "De Atleta à Tech Lead na Zup: A Trajetória de Lucas Thomaz",
  },
  {
    n: 7,
    id: "mqNxEA-mrmE",
    date: "2023-03-01",
    title: "Desvendando o Design com David Arty",
  },
  {
    n: 8,
    id: "GzsE5kj5utc",
    date: "2023-03-08",
    title: "Desenvolvendo Sua Liderança com Eduardo Matos",
  },
  {
    n: 9,
    id: "t0W2Eas3TYY",
    date: "2023-03-15",
    title: "Gerando Valor com Ana Neri",
  },
  { n: 10, id: "6rBT5UbhQ64", date: "2023-03-22", title: "Jakeliny Gracielly" },
  { n: 11, id: "isBi6IYMdjs", date: "2023-03-29", title: "Ahirton Lopes" },
  { n: 12, id: "mCPU7G9IqCA", date: "2023-04-05", title: "Nathally Souza" },
  {
    n: 13,
    id: "4rlktCGOFRQ",
    date: "2023-04-12",
    title: "Qual o Papel de um Head de Engenharia com Sergio Fiorotti",
  },
  {
    n: 14,
    id: "mH42lps6O7A",
    date: "2023-04-19",
    title: "Equilibrando vida pessoal e trabalho com Laura Kibum",
  },
  {
    n: 15,
    id: "xmhFe-7NvcI",
    date: "2023-04-26",
    title: "A Pressão do SHOW ME THE CODE com José Carlos Teles",
  },
  {
    n: 16,
    id: "oR8E5yTGIo4",
    date: "2023-05-03",
    title: "Trabalhando No Exterior com Ilda Neta",
  },
  {
    n: 17,
    id: "H6O5vxtXRfM",
    date: "2023-05-10",
    title: "A Interface Perfeita com Jonas Milan",
  },
  {
    n: 18,
    id: "MNeH30-zr1o",
    date: "2023-05-17",
    title: "Angular no Exterior com Leonardo Natal",
  },
  {
    n: 19,
    id: "mDWqnYIgUy0",
    date: "2023-05-24",
    title: "Agarrando Oportunidades com Vitor Castro",
    host: false,
  },
  {
    n: 20,
    id: "bgTW6PInZDs",
    date: "2023-05-31",
    title: "Evolução Constante com Kamila Code",
  },
  {
    n: 21,
    id: "Gd1DpDf65HM",
    date: "2023-06-07",
    title: "Encontrando Um Propósito com Abraão Sena",
  },
  {
    n: 22,
    id: "fIbMAq43OFs",
    date: "2023-06-14",
    title: "Redes Sociais para Devs com Valks Carvalho",
  },
  {
    n: 23,
    id: "Y0lL018lwAs",
    date: "2023-06-21",
    title: "Comunidade PHP com PokemãoBR",
  },
  {
    n: 24,
    id: "I3UykAUPvAs",
    date: "2023-06-28",
    title: "Cybersegurança com Laís e Lillian",
    host: false,
  },
  {
    n: 25,
    id: "lX2v1TS7gM4",
    date: "2023-07-05",
    title: "O Mundo da Inteligência Artificial com Carla Vieira",
    host: false,
  },
  {
    n: 26,
    id: "tKc91BExzrY",
    date: "2023-07-12",
    title: "Carreira de DevRel com Gabriel Bolzi",
  },
  {
    n: 27,
    id: "jtyi0PmJzLQ",
    date: "2023-07-19",
    title: "Conheça o Space Squad com Julião",
  },
  {
    n: 28,
    id: "kD0kf75N7WE",
    date: "2023-07-26",
    title: "Perspectiva Gringa: Devs Brasileiros com Patrick Cason",
  },
  {
    n: 29,
    id: "hITHDVvTYnk",
    date: "2023-08-02",
    title: "Como ser Fullcycle com Wesley Willians",
  },
  {
    n: 30,
    id: "n7ppFE9xybw",
    date: "2023-08-09",
    title: "Desenvolvimento Mobile com Rodrigo Gonçalves",
  },
  {
    n: 31,
    id: "3DZEftUeSLM",
    date: "2023-08-16",
    title: "Construindo A Sua História com Joel Backschat",
  },
  {
    n: 32,
    id: "ioQ5gjjOaf4",
    date: "2023-08-23",
    title: "Liderança Ágil com Alexandre Abdalla",
  },
  {
    n: 33,
    id: "JLMvXHPZABE",
    date: "2023-08-30",
    title: "Transformação Digital Em Empresas Centenárias com Heitor Penha",
  },
  {
    n: 34,
    id: "ErHBAMZ9qjI",
    date: "2023-09-06",
    title: "Mercado de Tecnologia para Pessoas Atípicas com Gui Estevão",
  },
  {
    n: 35,
    id: "FAzEPoQBY2I",
    date: "2023-09-13",
    title: "Decolando sua Carreira Júnior com Fernanda Kipper",
  },
  {
    n: 36,
    id: "DLEaut5emsU",
    date: "2023-09-20",
    title: "Abraçando o Caos com Josi Assis",
  },
  {
    n: 37,
    id: "UIYb8zd02ZY",
    date: "2023-09-27",
    title: "Mercado Dev para 40+ com Dan Vitoriano",
  },
  {
    n: 38,
    id: "r_g_UpP5j1o",
    date: "2023-10-04",
    title: "Se Tornando Dev com Simara Conceição",
  },
  {
    n: 39,
    id: "D6QtBuJoQ1A",
    date: "2023-10-11",
    title: "Ser DevRel no Github com Pachi Parra",
  },
  {
    n: 40,
    id: "FD2BsDW7jJg",
    date: "2023-10-18",
    title: "Sistemas Legados e Organização com Gi Bordignon",
  },
] as const;

export const episodeUrl = (id: string) =>
  `https://www.youtube.com/watch?v=${id}`;

export const MEDIUM_URL = MEDIUM;

export type Article = {
  id: "modalsEn" | "modalsPt";
  lang: "EN" | "PT";
  date: string;
  outlet: string;
  href: string;
};

/** From his Medium feed (read 2026-10-19). Both versions of the modal guide. */
export const ARTICLES: readonly Article[] = [
  {
    id: "modalsPt",
    lang: "PT",
    date: "2022-09-16",
    outlet: "Medium",
    href: "https://medium.com/@gabrieltaveira/o-guia-definitivo-de-modais-no-react-native-d39d0b6846fe",
  },
  {
    id: "modalsEn",
    lang: "EN",
    date: "2022-08-01",
    outlet: "JavaScript in Plain English",
    href: "https://javascript.plainenglish.io/you-have-been-using-react-native-modals-wrong-9b8c17de2f96",
  },
] as const;

/** The library the modal article turned into. Stars drift: shown with their read date. */
export const MAGIC_MODAL = {
  href: "https://github.com/GSTJ/magic-modal",
  stars: 650,
  read: "2026-10-19",
} as const;

export type TalkItem = {
  id: "brooklyn" | "tdc" | "assemble" | "spaceSquad";
  date: string;
  lang: "PT" | "EN";
  href: string;
  /** What the link opens, so the row can say so. */
  link: "slides" | "event" | "channel";
};

export const TALKS: readonly TalkItem[] = [
  {
    id: "brooklyn",
    date: "2024",
    lang: "PT",
    href: "https://www.figma.com/file/nBdwnIQxwLseSXicLhzRoB/Efici%C3%AAncia-Com-AI---The-Brooklyn-Brothers",
    link: "slides",
  },
  {
    id: "tdc",
    date: "2024",
    lang: "PT",
    href: "https://thedevconf.com/",
    link: "event",
  },
  {
    id: "assemble",
    date: "2023",
    lang: "PT",
    href: "https://www.rocketseat.com.br/",
    link: "event",
  },
  {
    id: "spaceSquad",
    date: "2023",
    lang: "PT",
    href: SPACE_CAST,
    link: "channel",
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
