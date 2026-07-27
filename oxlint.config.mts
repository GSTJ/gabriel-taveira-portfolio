import { extendConfig } from "magic-oxlint-config";
import next from "magic-oxlint-config/next";

// `extendConfig` flattens the preset and the overrides below into one config,
// so `ignorePatterns`, `plugins` and `jsPlugins` all land at the top level.
// oxlint's own `extends` drops `ignorePatterns` (still true on 1.75.0 with
// magic-oxlint-config 1.1.0 — verified), which is why this is not `defineConfig`.
export default extendConfig(next, {
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
