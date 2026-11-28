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
      "eddbd5fcdabdac7e5983ac07c955d2d0b1b5a2d2833cac88ca71cb4a4a6fa6a8",
      "expected the reviewed parser patch",
    );
    const result = spawnSync(
      process.execPath,
      [
        "-e",
        `const assert = require('node:assert/strict');
const picomatch = require(process.argv[1]);
for (const pattern of ['+(*)b', '+(*a)b', '*(*)b', '*(*a)b', '+(?*)b', '+(@(*a))b', '+(@(*))b', '+(@(a*))b']) {
  assert.equal(picomatch(pattern)('a'.repeat(48) + 'c'), false);
  assert.equal(picomatch(pattern)(pattern), true);
}
assert.equal(picomatch('+(a|b)')('abba'), true);
assert.equal(picomatch('+(*(a))')('aaaa'), true);
assert.equal(picomatch('+([ab])')('abba'), true);
assert.equal(picomatch('src/**/*.ts')('src/components/index.ts'), true);
for (const [pattern, input] of [
  ['+(file?.ts)', 'file1.tsfile2.ts'],
  ['+("*")', '***'],
  ['+([[:alpha:]*])', 'a*a'],
]) assert.equal(picomatch(pattern)(input), true, pattern);
const patterns = new Set();
for (const body of ['*', '*a', 'a*', '?*', 'a?', '*(a)', '+(a)', '?(a)', '@(a)', '!(a)', '[a*]', '[ab]']) {
  for (const outer of ['+', '*']) {
    patterns.add(outer + '(' + body + ')b');
    for (const inner of ['@', '+', '*', '?', '!']) patterns.add(outer + '(' + inner + '(' + body + '))b');
  }
}
for (const extra of ['+([a]a*|c)b', '+(abc|abcabc)b', '+(@(a|aa))b', '+(@(a|a?))b', '+(@(@(*a)))b', '+([[]*a)b']) patterns.add(extra);
for (const pattern of patterns) {
  for (const input of ['a'.repeat(48)+'c', 'abc'.repeat(30)+'c', 'x'.repeat(48)+'c']) picomatch(pattern)(input);
}`,
        modulePath,
      ],
      { timeout: 5000, encoding: "utf8" },
    );
    assert.equal(result.error, undefined, result.error?.message);
    assert.equal(result.status, 0, result.stderr);
  });
}
