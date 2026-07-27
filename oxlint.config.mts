import next from "magic-oxlint-config/next";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [next],
  // `extends` does not carry ignorePatterns across — only the patterns written
  // at the top level of the config oxlint loads are applied — so the preset's
  // list has to be re-declared here. Without it the generated `.next` output
  // gets linted.
  ignorePatterns: next.ignorePatterns,
});
