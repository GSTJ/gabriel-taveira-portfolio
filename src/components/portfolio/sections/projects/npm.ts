import {
  NPM_ROWS,
  NPM_SINCE,
  NPM_SNAPSHOT,
  STARS,
  type NpmRowId,
} from "./data";

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

/**
 * All-time downloads: the snapshot plus every day npm has finished counting
 * since it, refreshed daily. Any failed or malformed answer falls back to the
 * snapshot as a whole, so the total never mixes a partial read.
 */
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

const read = async () => {
  let from = Date.parse(`${NPM_SNAPSHOT.end}T00:00:00Z`) + DAY;
  try {
    const last = await lastCounted();
    if (last <= NPM_SNAPSHOT.end) return NPM_SNAPSHOT;
    const stop = Date.parse(`${last}T00:00:00Z`);
    const windows: [string, string][] = [];
    for (; from <= stop; from += 365 * DAY) {
      windows.push([iso(from), iso(Math.min(from + 364 * DAY, stop))]);
    }
    const downloads = { ...NPM_SNAPSHOT.downloads };
    for (const sums of await Promise.all(
      windows.map(([start, end]) => window(start, end)),
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

export const getNpmLedger = async (): Promise<NpmLedger> => {
  const { end, downloads } = await read();
  const rows: NpmLedger["rows"] = NPM_ROWS.map((row) => ({
    id: row.id,
    names: row.names,
    stars: STARS[row.stars],
    total: row.names.reduce((sum, name) => sum + (downloads[name] ?? 0), 0),
  }));
  rows.sort((a, b) => b.total - a.total);
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  const stars = rows.reduce((sum, row) => sum + row.stars, 0);
  return { since: NPM_SINCE, end, total, stars, rows };
};
