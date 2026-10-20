import { GITHUB_TOKEN } from "@/env";

import { GITHUB_SNAPSHOT, REPOS, type RepoId } from "./data";

export type GitHubNumbers = typeof GITHUB_SNAPSHOT;

const IDS = Object.keys(REPOS) as RepoId[];

const get = async (path: string) => {
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    },
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`github ${res.status}`);
  return res;
};

const count = (n: unknown) => {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 0) {
    throw new Error("github: bad count");
  }
  return n;
};

/** The day GitHub answered, from its own `Date` header, kept with the cached response. */
const answeredOn = (res: Response) => {
  const date = new Date(res.headers.get("date") ?? "");
  if (Number.isNaN(date.getTime())) throw new Error("github: no date");
  return date.toISOString().slice(0, 10);
};

const read = async (): Promise<GitHubNumbers> => {
  const [commits, ...repos] = await Promise.all([
    get(`repos/${REPOS.pegada}/commits?per_page=1`),
    ...IDS.map((id) => get(`repos/${REPOS[id]}`)),
  ]);
  const bodies = (await Promise.all(repos.map((res) => res.json()))) as {
    stargazers_count?: unknown;
    forks_count?: unknown;
  }[];
  const repo = (id: RepoId) => bodies[IDS.indexOf(id)] ?? {};
  // One commit per page, so the last page's number is the commit count.
  const last = /[?&]page=(\d+)>; rel="last"/.exec(
    commits.headers.get("link") ?? "",
  )?.[1];
  return {
    read: [commits, ...repos].map(answeredOn).sort()[0] ?? "",
    stars: Object.fromEntries(
      IDS.map((id) => [id, count(repo(id).stargazers_count)]),
    ) as Record<RepoId, number>,
    forks: {
      pegada: count(repo("pegada").forks_count),
      pegava: count(repo("pegava").forks_count),
    },
    commits: count(Number(last)),
  };
};

/**
 * Stars, forks and Pegada's public commits, refreshed daily and dated by the
 * oldest answer. Any failed or malformed answer falls back to the snapshot as
 * a whole, so the numbers never mix a partial read under one date.
 */
export const getGitHub = async (): Promise<GitHubNumbers> => {
  try {
    return await read();
  } catch {
    return GITHUB_SNAPSHOT;
  }
};
