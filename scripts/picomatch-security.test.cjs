const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { readdirSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const store = path.resolve(__dirname, "../node_modules/.pnpm");
const copies = readdirSync(store).filter((name) =>
  name.startsWith("picomatch@4.0.7"),
);

test("picomatch security patch is installed", () => {
  assert.ok(copies.length > 0, "expected patched picomatch 4.0.7");
});

for (const copy of copies) {
  test(`${copy} bounds repeated wildcard extglobs and preserves ordinary globs`, () => {
    const modulePath = path.join(store, copy, "node_modules/picomatch");
    const result = spawnSync(
      process.execPath,
      [
        "-e",
        `const assert = require('node:assert/strict');
const picomatch = require(process.argv[1]);
for (const pattern of ['+(*)b', '+(*a)b', '*(*)b', '*(*a)b', '+(?*)b']) {
  assert.equal(picomatch(pattern)('a'.repeat(48) + 'c'), false);
  assert.equal(picomatch(pattern)(pattern), true);
}
assert.equal(picomatch('+(a|b)')('abba'), true);
assert.equal(picomatch('+([ab])')('abba'), true);
assert.equal(picomatch('src/**/*.ts')('src/components/index.ts'), true);`,
        modulePath,
      ],
      { timeout: 2000, encoding: "utf8" },
    );
    assert.equal(result.error, undefined, result.error?.message);
    assert.equal(result.status, 0, result.stderr);
  });
}
