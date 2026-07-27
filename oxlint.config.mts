import { extendConfig } from "magic-oxlint-config";
import next from "magic-oxlint-config/next";

// `extendConfig` flattens the preset and the overrides below into one config,
// so `ignorePatterns`, `plugins` and `jsPlugins` all land at the top level.
// oxlint's own `extends` drops `ignorePatterns` — oxlint has no per-override
// ignore, so 1.2.0 cannot defend them either and leaves `extends` undocumented.
// That is why this is not `defineConfig`.
export default extendConfig(next, {
  jsPlugins: [{ name: "magic", specifier: "magic-oxlint-plugin" }],
  rules: {
    // Every class in this repo comes from design-portfolio.css (`ws-*`), and
    // the components used to splice them together with template literals —
    // which is exactly the drift this rule exists to stop. Conditionals go
    // through `cn`, one-of-N tone/side/topic tables through `cva`.
    "magic/no-manual-classname": "error",
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
