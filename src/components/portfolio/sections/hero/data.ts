import { CURRICULUM_PDF, LINKEDIN } from "../../profile";

export const HERO_LINKS = {
  linkedin: LINKEDIN,
  pdf: CURRICULUM_PDF,
} as const;

export type HeroApp = {
  id:
    | "meta"
    | "coinbase"
    | "ze"
    | "did"
    | "mm"
    | "g2i"
    | "groundswell"
    | "alfred"
    | "curvinha"
    | "pegada";
  name: string;
  /**
   * The big names sit large in the middle, the rest orbit smaller, and his own
   * apps go tiny at the edge. Below 1000px only `core` shows.
   */
  tier: "core" | "orbit" | "own";
  /** The work row or project card that says what he did on it. */
  href: `#${string}`;
  /**
   * Where `public/hero/<id>.webp` came from. Store apps: the listing's
   * `artworkUrl512` (iTunes Lookup API) as PNG. Brand marks: the official
   * asset set on a full-bleed tile. Then resized to 192px, webp q82.
   */
  source: { store: string; artwork: string; fetched: string };
};

/** Each app or brand he worked on, in the order the cluster lays them out. */
export const HERO_APPS: readonly HeroApp[] = [
  {
    id: "meta",
    name: "Meta",
    tier: "core",
    href: "#work-meta",
    // No Meta app on the App Store wears the company mark, so the mark from
    // Meta's logo sits at 64% width on a white tile, as Meta's own icons do.
    source: {
      store:
        "https://commons.wikimedia.org/wiki/File:Meta_Platforms_Inc._logo_(cropped).svg",
      artwork:
        "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg",
      fetched: "2026-10-20",
    },
  },
  {
    id: "coinbase",
    name: "Coinbase",
    tier: "core",
    href: "#work-coinbase",
    source: {
      store:
        "https://apps.apple.com/us/app/coinbase-buy-crypto-stocks/id886427730",
      artwork:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b4/bb/11/b4bb1146-1e34-ff68-70a1-64d133c0afae/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.png",
      fetched: "2026-10-20",
    },
  },
  {
    id: "ze",
    name: "Zé Delivery",
    tier: "core",
    href: "#work-ze",
    source: {
      store: "https://apps.apple.com/br/app/z%C3%A9-delivery/id1070070438",
      artwork:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e2/71/78/e271783c-752b-bb73-6351-15a4502c58b0/AppIcon-0-0-1x_U007ephone-0-11-0-85-220.png/512x512bb.png",
      fetched: "2026-10-20",
    },
  },
  {
    id: "did",
    name: "D-ID",
    tier: "core",
    href: "#work-ateam",
    source: {
      store:
        "https://apps.apple.com/us/app/d-id-ai-video-generator/id6463755563",
      artwork:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4e/42/1d/4e421d2c-6283-2300-b2fd-64c37c45b21b/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.png",
      fetched: "2026-10-20",
    },
  },
  {
    id: "mm",
    name: "Morgan & Morgan",
    tier: "orbit",
    // No work row: the section itself.
    href: "#work",
    source: {
      store: "https://apps.apple.com/us/app/morgan-morgan-mobile/id1605206916",
      artwork:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6a/7b/8f/6a7b8f36-364e-4a86-b51c-d1e7238f2e23/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.png",
      fetched: "2026-10-20",
    },
  },
  {
    id: "g2i",
    name: "G2i",
    tier: "orbit",
    // The row that names G2i as the agency.
    href: "#work-coinbase",
    // The red disc of G2i's site logo traded for a full-bleed tile, glyphs as is.
    source: {
      store: "https://www.g2i.co/",
      artwork: "https://www.g2i.co/logo-wordmark.svg",
      fetched: "2026-10-20",
    },
  },
  {
    id: "groundswell",
    name: "Groundswell",
    tier: "orbit",
    href: "#work-xteam",
    source: {
      store:
        "https://apps.apple.com/us/app/groundswell-giving-charity/id1597818417",
      artwork:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a8/64/8c/a8648cd6-9aea-b393-18fa-09d9321d6ff0/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.png",
      fetched: "2026-10-20",
    },
  },
  {
    id: "alfred",
    name: "Alfred Delivery",
    tier: "orbit",
    href: "#work-alfred",
    // Off the stores since 2023. The 2020 listing's art, from its Wayback
    // snapshot, still resolves on Apple's image server.
    source: {
      store:
        "https://web.archive.org/web/20201001054737/https://apps.apple.com/us/app/alfred-delivery/id1336677028",
      artwork:
        "https://is3-ssl.mzstatic.com/image/thumb/Purple124/v4/a3/bb/49/a3bb4970-a051-704c-c367-ce7d7d1e7322/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.png",
      fetched: "2026-10-20",
    },
  },
  {
    id: "curvinha",
    name: "Curvinha",
    tier: "own",
    href: "#project-curvinha",
    // The listing's art carries a hairline rim; 6px shaved off before resizing.
    source: {
      store:
        "https://apps.apple.com/br/app/curvinha-design-de-interiores/id6816957870",
      artwork:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/95/0d/e8/950de848-0966-5be6-b748-d0cfd5e1c2c4/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.png",
      fetched: "2026-10-20",
    },
  },
  {
    id: "pegada",
    name: "Pegada",
    tier: "own",
    href: "#project-pegada",
    source: {
      store: "https://apps.apple.com/br/app/pegada/id6450865592",
      artwork:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f2/6c/ce/f26cce95-cb8a-763c-fa54-bcd46c1633ea/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.png",
      fetched: "2026-10-20",
    },
  },
] as const;
