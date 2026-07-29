/**
 * The one host the site is reachable on. Vercel holds
 * `www.gabrieltaveira.dev` as the project's primary domain, so the apex
 * answers `308 -> https://www.gabrieltaveira.dev/` and nothing is ever served
 * from it.
 *
 * Every public URL the app emits is built from this: the canonical link, the
 * hreflang cluster, `og:url`, the sitemap entries and the JSON-LD `url`. They
 * used to be five separate copies of the apex, which meant every one of them
 * named a URL that redirects. Google resolves a canonical through its redirect
 * and indexes the target instead, so the declared canonical was discarded, and
 * an hreflang entry that redirects drops out of the cluster it was supposed to
 * join.
 *
 * If the primary domain in Vercel ever moves back to the apex, this constant
 * is the only line that changes.
 */
export const SITE_URL = "https://www.gabrieltaveira.dev";
