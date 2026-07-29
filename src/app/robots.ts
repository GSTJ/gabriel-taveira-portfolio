import type { MetadataRoute } from "next";

import { SITE_URL } from "@/utils/site";

/**
 * No `host`. That directive is Yandex's, Yandex dropped support for it in 2018,
 * and no other crawler ever read it, so the line only ever named a host for
 * nobody. `sitemap` and the canonical links carry the same information to
 * crawlers that act on it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
