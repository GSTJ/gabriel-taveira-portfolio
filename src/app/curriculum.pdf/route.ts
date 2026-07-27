/**
 * `curriculum.pdf` is regenerated from the live site by the `Generate static
 * files` workflow and published to the orphan `assets` branch, so the binary
 * never accumulates in main's history. The URL stays on the domain because
 * metadata and the resume link both point at `/curriculum.pdf`.
 *
 * A `next.config.ts` rewrite can't set the headers this needs.
 * raw.githubusercontent serves every file as `application/octet-stream` with
 * `x-content-type-options: nosniff` and a sandbox CSP, an external rewrite
 * passes all of that through verbatim, and `headers()` doesn't override it, so
 * the resume downloads as an unnamed blob. Proxying it here sets the content
 * type and lets the response carry `s-maxage`, which is the more useful half:
 * Vercel's CDN takes the traffic, and raw.githubusercontent is neither a CDN
 * nor generous about limits.
 */

/**
 * The one place the asset host is named on the serving side. Set
 * `ASSETS_ORIGIN` in the Vercel project to move these bytes somewhere else
 * (R2, a bucket, anything that serves the same filenames) without a code
 * change. The workflow's publish step and README's GIF link are the other two
 * places that know where the assets live.
 */
const ASSETS_ORIGIN =
  process.env.ASSETS_ORIGIN ??
  "https://raw.githubusercontent.com/GSTJ/gabriel-taveira-portfolio/assets";

const ASSET_URL = `${ASSETS_ORIGIN}/curriculum.pdf`;

const ONE_DAY = 60 * 60 * 24;
const ONE_WEEK = ONE_DAY * 7;

/**
 * Never prerender. A build-time fetch would freeze whichever PDF existed when
 * the deploy happened, and the whole point is that regenerating the asset
 * doesn't need a deploy.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const upstream = await fetch(ASSET_URL, { cache: "no-store" });

  if (!upstream.ok || !upstream.body) {
    return new Response("Resume is unavailable right now.", {
      status: 502,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="gabriel-taveira.pdf"',
      "Cache-Control": `public, max-age=0, s-maxage=${ONE_DAY}, stale-while-revalidate=${ONE_WEEK}`,
    },
  });
}
