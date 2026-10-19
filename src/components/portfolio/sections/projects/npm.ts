import { PROJECTS, type ProjectId } from "./data";

/**
 * npm installs since each package's first publish, per npm name. Past years
 * never change, so they're summed once here (npm's range API, read
 * 2026-10-19); only the current year is read live, in one bulk request.
 * ponytail: add 2026 to CLOSED in January 2027, or the live read (which
 * starts on Jan 1, 2026) outgrows npm's 365-day bulk limit and falls back.
 */
const CLOSED_THROUGH_2025: Record<string, number> = {
  "react-native-magic-modal": 134_118,
  "magic-modal": 0,
  "eslint-plugin-safe-jsx": 40_842,
  "react-native-code-push-plugin": 41_925,
  "react-native-magic-toast": 5_744,
  "magic-observability": 0,
};
const YEAR_START = "2026-01-01";

/** The last good read of 2026 so far, used when npm doesn't answer. */
const FALLBACK = {
  end: "2026-10-18",
  downloads: {
    "react-native-magic-modal": 85_406,
    "magic-modal": 2_384,
    "eslint-plugin-safe-jsx": 15_732,
    "react-native-code-push-plugin": 2_982,
    "react-native-magic-toast": 4_277,
    "magic-observability": 3_422,
  } as Record<string, number>,
};

const NAMES = Object.keys(CLOSED_THROUGH_2025);

type Point = { downloads?: unknown; end?: unknown };

const today = () => new Date().toISOString().slice(0, 10);

const read = async () => {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/${YEAR_START}:${today()}/${NAMES.join(",")}`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return FALLBACK;
    const body = (await res.json()) as Record<string, Point | null>;
    const end = body[NAMES[0] ?? ""]?.end;
    if (typeof end !== "string") return FALLBACK;
    const downloads: Record<string, number> = {};
    for (const name of NAMES) {
      const point = body[name];
      if (typeof point?.downloads !== "number" || point.end !== end) {
        return FALLBACK;
      }
      downloads[name] = point.downloads;
    }
    return { end, downloads };
  } catch {
    return FALLBACK;
  }
};

export type Installs = {
  /** Last day counted, YYYY-MM-DD. */
  end: string;
  total: Partial<Record<ProjectId, number>>;
  /** npm-stat chart for the same packages and range, for the source link. */
  source: (id: ProjectId) => string;
};

export const getInstalls = async (): Promise<Installs> => {
  const { end, downloads } = await read();
  const total: Installs["total"] = {};
  for (const p of PROJECTS.filter((item) => item.npm)) {
    total[p.id] = (p.npm ?? []).reduce(
      (sum, name) =>
        sum + (CLOSED_THROUGH_2025[name] ?? 0) + (downloads[name] ?? 0),
      0,
    );
  }
  return {
    end,
    total,
    source: (id) => {
      const names = PROJECTS.find((p) => p.id === id)?.npm ?? [];
      return `https://npm-stat.com/charts.html?${names.map((n) => `package=${n}`).join("&")}&from=2022-01-01&until=${end}`;
    },
  };
};
