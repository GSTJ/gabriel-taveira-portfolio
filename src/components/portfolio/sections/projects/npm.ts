import { MOZEIC } from "../work/data";
import { NPM_ROWS, NPM_SINCE, NPM_SNAPSHOT, type NpmRowId } from "./data";
import { getGitHub } from "./github";

export type NpmLedger = {
  since: string;
  end: string;
  total: number;
  stars: number;
  rows: {
    id: NpmRowId;
    names: readonly string[];
    total: number;
    stars: number;
  }[];
};

type Range = { downloads?: unknown; end?: unknown };

const NAMES = NPM_ROWS.flatMap((row) => row.names);
const DAY = 86_400_000;
const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** npm's daily counts for every name over one window of at most 365 days. */
const window = async (start: string, end: string) => {
  const res = await fetch(
    `https://api.npmjs.org/downloads/range/${start}:${end}/${NAMES.join(",")}`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) throw new Error(`npm ${res.status}`);
  const body = (await res.json()) as Record<string, Range | null>;
  const sums: Record<string, number> = {};
  for (const name of NAMES) {
    const days = body[name]?.downloads;
    if (!Array.isArray(days)) throw new Error(`npm: no ${name}`);
    let sum = 0;
    for (const d of days as { downloads?: unknown }[]) {
      if (typeof d.downloads === "number") sum += d.downloads;
    }
    sums[name] = sum;
  }
  return sums;
};

/** The last day npm has finished counting. Later days read as zeros. */
const lastCounted = async () => {
  const res = await fetch(
    `https://api.npmjs.org/downloads/point/last-day/${NAMES[0]}`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) throw new Error(`npm ${res.status}`);
  const { end } = (await res.json()) as { end?: unknown };
  if (typeof end !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(end)) {
    throw new Error("npm: no last day");
  }
  return end;
};

/** The days after `end` up to `last`, in windows of at most 365 days. */
const windowsAfter = (end: string, last: string) => {
  const stop = Date.parse(`${last}T00:00:00Z`);
  const windows: [string, string][] = [];
  let from = Date.parse(`${end}T00:00:00Z`) + DAY;
  for (; from <= stop; from += 365 * DAY) {
    windows.push([iso(from), iso(Math.min(from + 364 * DAY, stop))]);
  }
  return windows;
};

/**
 * All-time downloads: the snapshot plus every day npm has finished counting
 * since it, refreshed daily. Any failed or malformed answer falls back to the
 * snapshot as a whole, so the total never mixes a partial read.
 */
const read = async () => {
  try {
    const last = await lastCounted();
    if (last <= NPM_SNAPSHOT.end) return NPM_SNAPSHOT;
    const downloads = { ...NPM_SNAPSHOT.downloads };
    for (const sums of await Promise.all(
      windowsAfter(NPM_SNAPSHOT.end, last).map(([start, end]) =>
        window(start, end),
      ),
    )) {
      for (const name of NAMES) {
        downloads[name] = (downloads[name] ?? 0) + (sums[name] ?? 0);
      }
    }
    return { end: last, downloads };
  } catch {
    return NPM_SNAPSHOT;
  }
};

/** One name's downloads over one window. npm's bulk read refuses scoped names. */
const point = async (name: string, start: string, end: string) => {
  const res = await fetch(
    `https://api.npmjs.org/downloads/point/${start}:${end}/${name}`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) throw new Error(`npm ${res.status}`);
  const { downloads } = (await res.json()) as { downloads?: unknown };
  if (typeof downloads !== "number") throw new Error(`npm: no ${name}`);
  return downloads;
};

/** Mozeic's all-time downloads, the same way: snapshot plus the days since. */
export const getMozeicDownloads = async () => {
  try {
    const last = await lastCounted();
    const windows = windowsAfter(MOZEIC.end, last);
    const counts = await Promise.all(
      MOZEIC.names.flatMap((name) =>
        windows.map(([start, end]) => point(name, start, end)),
      ),
    );
    return counts.reduce((sum, n) => sum + n, MOZEIC.total);
  } catch {
    return MOZEIC.total;
  }
};

export const getNpmLedger = async (): Promise<NpmLedger> => {
  const [{ end, downloads }, github] = await Promise.all([read(), getGitHub()]);
  const rows: NpmLedger["rows"] = NPM_ROWS.map((row) => ({
    id: row.id,
    names: row.names,
    stars: github.stars[row.stars],
    total: row.names.reduce((sum, name) => sum + (downloads[name] ?? 0), 0),
  }));
  rows.sort((a, b) => b.total - a.total);
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  const stars = rows.reduce((sum, row) => sum + row.stars, 0);
  return { since: NPM_SINCE, end, total, stars, rows };
};
