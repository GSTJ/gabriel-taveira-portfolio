/**
 * The resume keeps its own URL on this origin. `demo.gif` and `curriculum.pdf`
 * are built by the `Generate static files` workflow and uploaded to the
 * `portfolio-assets` R2 bucket, so neither binary is committed here.
 *
 * This used to be a `rewrites()` entry pointing at R2. A rewrite passes the
 * upstream response through untouched, `Content-Type` included, which means
 * whoever can write that bucket object decides what type `gabrieltaveira.dev`
 * serves. Flip it to `text/html` and the browser renders attacker HTML at
 * `https://gabrieltaveira.dev/curriculum.pdf`, same origin as the site: stored
 * XSS, not a defaced PDF. Re-emitting the bytes here pins the type in code,
 * where the bucket cannot reach it, and drops the upstream's other headers
 * instead of forwarding them verbatim.
 */
const ASSETS_ORIGIN =
  process.env.ASSETS_ORIGIN ?? "https://assets.gabrieltaveira.dev";

/** Matches what the workflow uploads and what the old rewrite served. */
const PDF_CACHE_CONTROL = "public, max-age=14400, s-maxage=14400";

/**
 * Dynamic on purpose. Prerendering this would make every deploy depend on R2
 * being reachable at build time, and the CDN already absorbs the traffic via
 * `s-maxage` — one upstream hit per region per four hours.
 */
export const dynamic = "force-dynamic";

function unavailable() {
  return new Response("Resume unavailable", {
    status: 502,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function GET() {
  let upstream: Response;

  try {
    upstream = await fetch(`${ASSETS_ORIGIN}/curriculum.pdf`, {
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    // R2 unreachable or too slow. A 502 beats a 500 with a stack trace.
    return unavailable();
  }

  if (!upstream.ok) return unavailable();

  return new Response(upstream.body, {
    status: 200,
    /**
     * Built from scratch rather than copied off `upstream.headers`. Only these
     * four reach the client, and every value is a literal.
     */
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="gabriel-taveira.pdf"',
      "Cache-Control": PDF_CACHE_CONTROL,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
