const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { readFileSync, realpathSync } = require("node:fs");
const { createRequire } = require("node:module");
const { createHash } = require("node:crypto");
const path = require("node:path");
const test = require("node:test");

const root = createRequire(path.resolve(__dirname, "../package.json"));
const common = createRequire(root.resolve("magic-codemods")).resolve(
  "ts-morph",
);
const tsMorph = createRequire(common).resolve("@ts-morph/common");
const tinyglobby = createRequire(tsMorph).resolve("tinyglobby");
const entry = createRequire(tinyglobby).resolve("picomatch");
const copies = [path.dirname(realpathSync(entry))];

for (const copy of copies) {
  test(`${copy} bounds repeated wildcard extglobs and preserves ordinary globs`, () => {
    const modulePath = copy;
    const parser = readFileSync(path.join(modulePath, "lib/parse.js"));
    const parserHash = createHash("sha256").update(parser).digest("hex");
    assert.equal(
      parserHash,
      "5c04741270d46b2aa7aaf6797bfa9d0ea3f6e3318200dd3014a9e8db43110a12",
      "expected the reviewed parser patch",
    );
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
assert.equal(picomatch('+(*(a))')('aaaa'), true);
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
