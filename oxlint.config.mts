import next from "magic-oxlint-config/next";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [next],
  // `extends` does not carry ignorePatterns across — only the patterns written
  // at the top level of the config oxlint loads are applied — so the preset's
  // list has to be re-declared here. Without it the generated `.next` output
  // gets linted.
  ignorePatterns: next.ignorePatterns,
  rules: {
    // next.config.ts sets `reactCompiler: true`, so every component in this
    // repo is compiled with the React Compiler and its props are memoized
    // automatically. These two rules ask for the hand-written useCallback /
    // useMemo the compiler exists to remove — following them here would mean
    // writing worse code (event-delegation plumbing, per-prop useMemo) to
    // restate a guarantee the build already provides. `react/react-compiler`
    // stays on precisely so that guarantee keeps holding.
    "react-perf/jsx-no-new-function-as-prop": "off",
    "react-perf/jsx-no-new-object-as-prop": "off",
  },
});
