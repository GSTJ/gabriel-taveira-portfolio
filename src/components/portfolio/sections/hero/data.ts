import { CURRICULUM_PDF, LINKEDIN } from "../../profile";

export const HERO_LINKS = {
  linkedin: LINKEDIN,
  pdf: CURRICULUM_PDF,
} as const;

export type HeroApp = {
  id: "coinbase" | "did" | "ze" | "groundswell" | "curvinha" | "pegada";
  name: string;
  /** The work row or project card that says what he did on it. */
  href: `#${string}`;
  /**
   * Where `public/hero/<id>.webp` came from: the App Store listing's
   * `artworkUrl512` (iTunes Lookup API) as PNG, resized to 192px, webp q82.
   */
  source: { store: string; artwork: string; fetched: string };
};

/**
 * Real app icons of apps he worked on, in the order the cluster lays them out.
 * Kustomer and Alfred Delivery have no public App Store app to show.
 */
export const HERO_APPS: readonly HeroApp[] = [
  {
    id: "coinbase",
    name: "Coinbase",
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
    id: "did",
    name: "D-ID",
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
    id: "curvinha",
    name: "Curvinha",
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
    id: "ze",
    name: "Zé Delivery",
    href: "#work-ze",
    source: {
      store: "https://apps.apple.com/br/app/z%C3%A9-delivery/id1070070438",
      artwork:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e2/71/78/e271783c-752b-bb73-6351-15a4502c58b0/AppIcon-0-0-1x_U007ephone-0-11-0-85-220.png/512x512bb.png",
      fetched: "2026-10-20",
    },
  },
  {
    id: "groundswell",
    name: "Groundswell",
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
    id: "pegada",
    name: "Pegada",
    href: "#project-pegada",
    source: {
      store: "https://apps.apple.com/br/app/pegada/id6450865592",
      artwork:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f2/6c/ce/f26cce95-cb8a-763c-fa54-bcd46c1633ea/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.png",
      fetched: "2026-10-20",
    },
  },
] as const;
