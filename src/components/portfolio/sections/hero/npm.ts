import { NPM_FALLBACK, NPM_NAMES } from "./data";

type Point = { downloads?: unknown; start?: unknown; end?: unknown };

const URL = `https://api.npmjs.org/downloads/point/last-month/${NPM_NAMES.join(",")}`;

/** npm-stat charts the same packages and range, so the number can be checked. */
export const npmSource = ({ start, end }: { start: string; end: string }) =>
  `https://npm-stat.com/charts.html?package=${NPM_NAMES.join("&package=")}&from=${start}&until=${end}`;

/**
 * Total npm downloads of his packages over the last 30 days, refreshed with
 * the page (daily). Any missing, malformed or mixed-range answer falls back
 * to the last good read as a whole.
 */
export const getNpmTotal = async () => {
  try {
    const res = await fetch(URL, { next: { revalidate: 86400 } });
    if (!res.ok) return NPM_FALLBACK;
    const body = (await res.json()) as Record<string, Point | null>;
    const first = body[NPM_NAMES[0]];
    if (typeof first?.start !== "string" || typeof first.end !== "string") {
      return NPM_FALLBACK;
    }
    let total = 0;
    for (const name of NPM_NAMES) {
      const point = body[name];
      if (
        typeof point?.downloads !== "number" ||
        point.start !== first.start ||
        point.end !== first.end
      ) {
        return NPM_FALLBACK;
      }
      total += point.downloads;
    }
    return { start: first.start, end: first.end, total };
  } catch {
    return NPM_FALLBACK;
  }
};
