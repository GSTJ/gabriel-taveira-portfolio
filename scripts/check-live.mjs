import assert from "node:assert/strict";
import { createServer } from "node:http";

import {
  count,
  DEADLINE_MS,
  day,
  get,
  rating,
} from "../src/components/portfolio/sections/live.ts";

/**
 * Checks the boundary the live numbers cross: bad counts, ratings and days
 * throw (so readers fall back to their snapshot), and a stalled upstream
 * fails by the deadline instead of hanging the build. `pnpm check:live`.
 */
assert.equal(count(0), 0);
assert.equal(count(219_524), 219_524);
for (const bad of [
  -1,
  1.5,
  Number.NaN,
  Number.POSITIVE_INFINITY,
  JSON.parse("1e309"),
  2 ** 53,
  "5",
]) {
  assert.throws(() => count(bad), `count rejects ${bad}`);
}

assert.equal(rating(4.6317), 4.6317);
for (const bad of [0, 5.1, Number.NaN, Number.POSITIVE_INFINITY, "4.6"]) {
  assert.throws(() => rating(bad), `rating rejects ${bad}`);
}

assert.equal(day("2026-10-19"), "2026-10-19");
for (const bad of ["2026-02-30", "9999-99-99", "2026-1-9", 20_261_019]) {
  assert.throws(() => day(bad), `day rejects ${bad}`);
}

const server = createServer((req, res) => {
  if (req.url === "/body") {
    res.writeHead(200, { "content-type": "application/json" });
    res.write('{"downloads":');
  }
});
await new Promise((resolve) => {
  server.listen(0, "127.0.0.1", resolve);
});
const base = `http://127.0.0.1:${server.address().port}`;
const started = Date.now();
const watchdog = setTimeout(() => {
  console.error("live: a stalled read outlived the deadline");
  process.exit(1);
}, DEADLINE_MS + 2000);
await Promise.all([
  assert.rejects(get(`${base}/headers`), { name: "TimeoutError" }),
  assert.rejects(
    get(`${base}/body`).then((res) => res.json()),
    { name: "TimeoutError" },
  ),
]);
clearTimeout(watchdog);
const took = Date.now() - started;
server.closeAllConnections();
server.close();

console.log(`live: validators ok, stalled headers and body cut at ${took}ms`);
