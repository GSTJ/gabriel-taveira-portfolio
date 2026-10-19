import { NPM_FALLBACK, NPM_ROWS, type NpmRowId } from "./data";

export type NpmLedger = {
  start: string;
  end: string;
  rows: { id: NpmRowId; names: readonly string[]; total: number }[];
};

type Point = { downloads?: unknown; start?: unknown; end?: unknown };

const NAMES = NPM_ROWS.flatMap((row) => row.names);
const URL = `https://api.npmjs.org/downloads/point/last-month/${NAMES.join(",")}`;

/**
 * npm's last 30 days for every package, refreshed with the page (daily). Any
 * missing or malformed answer falls back to the last good read as a whole,
 * so the ledger never mixes two date ranges.
 */
const read = async () => {
  try {
    const res = await fetch(URL, { next: { revalidate: 86400 } });
    if (!res.ok) return NPM_FALLBACK;
    const body = (await res.json()) as Record<string, Point | null>;
    const first = body[NAMES[0] ?? ""];
    if (typeof first?.start !== "string" || typeof first.end !== "string") {
      return NPM_FALLBACK;
    }
    const downloads: Record<string, number> = {};
    for (const name of NAMES) {
      const point = body[name];
      if (
        typeof point?.downloads !== "number" ||
        point.start !== first.start ||
        point.end !== first.end
      ) {
        return NPM_FALLBACK;
      }
      downloads[name] = point.downloads;
    }
    return { start: first.start, end: first.end, downloads };
  } catch {
    return NPM_FALLBACK;
  }
};

export const getNpmLedger = async (): Promise<NpmLedger> => {
  const { start, end, downloads } = await read();
  const rows: NpmLedger["rows"] = NPM_ROWS.map((row) => ({
    id: row.id,
    names: row.names,
    total: row.names.reduce((sum, name) => sum + (downloads[name] ?? 0), 0),
  }));
  rows.sort((a, b) => b.total - a.total);
  return { start, end, rows };
};
