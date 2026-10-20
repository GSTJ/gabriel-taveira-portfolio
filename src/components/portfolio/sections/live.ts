/**
 * The boundary every live number crosses. Each check throws, so a reader's
 * catch falls back to its snapshot as a whole. Imports nothing, so
 * `scripts/check-live.mjs` runs it under plain Node.
 */

/** Past this, a request or its body counts as failed, well inside Next's 60s page budget. */
export const DEADLINE_MS = 8000;

/** A count copy can print: a non-negative safe integer. */
export const count = (n: unknown) => {
  if (typeof n !== "number" || !Number.isSafeInteger(n) || n < 0) {
    throw new Error(`live: bad count ${String(n)}`);
  }
  return n;
};

/** A store rating: finite, from 1 to 5. */
export const rating = (n: unknown) => {
  if (typeof n !== "number" || !Number.isFinite(n) || n < 1 || n > 5) {
    throw new Error(`live: bad rating ${String(n)}`);
  }
  return n;
};

/** A real calendar day as `YYYY-MM-DD`, so a date format never throws on it. */
export const day = (s: unknown) => {
  const ms = typeof s === "string" ? Date.parse(`${s}T00:00:00Z`) : Number.NaN;
  if (Number.isNaN(ms) || new Date(ms).toISOString().slice(0, 10) !== s) {
    throw new Error(`live: bad day ${String(s)}`);
  }
  return s as string;
};

/**
 * Rejects once the deadline passes, whatever the promise is doing. Next drops
 * a fetch's `signal` when it revalidates stale data, so the signal alone
 * can't bound a stalled upstream.
 */
const within = <T>(work: Promise<T>) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => reject(new Error("live: deadline")), DEADLINE_MS);
  });
  return Promise.race([work, deadline]).finally(() => clearTimeout(timer));
};

/**
 * A GET cached for a day, headers and body read inside one deadline. The body
 * is buffered here, so callers read it from memory and can't stall past it.
 * A signal opts the call out of Next's per-render memoization (the data cache
 * still applies), so readers memoize themselves with React's `cache`.
 */
export const get = (url: string, headers?: HeadersInit) =>
  within(
    (async () => {
      const res = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(DEADLINE_MS),
        next: { revalidate: 86400 },
      });
      if (!res.ok) throw new Error(`live: ${res.status} ${url}`);
      const body = await res.text();
      return new Response(body, { status: res.status, headers: res.headers });
    })(),
  );
