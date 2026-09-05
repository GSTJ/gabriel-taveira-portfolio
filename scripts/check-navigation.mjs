import assert from "node:assert/strict";

import { scrollToSection } from "../src/components/portfolio/hooks.ts";

const calls = [];
let reduced = false;
globalThis.window = {
  matchMedia: () => ({ matches: reduced }),
  scrollTo: (options) => calls.push(options),
};
globalThis.document = {
  querySelector: (selector) =>
    selector === "#work" ? { offsetTop: 500 } : null,
};
scrollToSection("work");
reduced = true;
scrollToSection("work");
scrollToSection("top");
scrollToSection("missing");
assert.deepEqual(calls, [
  { top: 420, behavior: "smooth" },
  { top: 420, behavior: "instant" },
  { top: 0, behavior: "instant" },
]);
console.log("PASS: section offsets, reduced motion, and missing targets");
