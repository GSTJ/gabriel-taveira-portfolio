import { NPM_FALLBACK, NPM_NAMES } from "./data";

type Point = { downloads?: unknown; start?: unknown; end?: unknown };

const URL = `https://api.npmjs.org/downloads/point/last-month/${NPM_NAMES.join(",")}`;

/**
 * npm's last 30 days for all of his packages, summed, refreshed with the page
 * (daily). Any missing or mismatched answer falls back to the last good read
 * as a whole, so the total never mixes two date ranges.
 */
export const getNpmTotal = async () => {
  try {
    const res = await fetch(URL, { next: { revalidate: 86400 } });
    if (!res.ok) return NPM_FALLBACK;
    const body = (await res.json()) as Record<string, Point | null>;
    const { start, end } = body[NPM_NAMES[0]] ?? {};
    if (typeof start !== "string" || typeof end !== "string") {
      return NPM_FALLBACK;
    }
    let total = 0;
    for (const name of NPM_NAMES) {
      const point = body[name];
      if (
        typeof point?.downloads !== "number" ||
        point.start !== start ||
        point.end !== end
      ) {
        return NPM_FALLBACK;
      }
      total += point.downloads;
    }
    return { start, end, total };
  } catch {
    return NPM_FALLBACK;
  }
};
