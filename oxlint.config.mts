import { extendConfig } from "magic-oxlint-config";
import next from "magic-oxlint-config/next";

export default extendConfig(next, {
  rules: {
    /**
     * `reactCompiler: true` is on in next.config.ts, so the compiler memoizes
     * props and handlers for every component here. These four rules ask for the
     * same thing by hand — useCallback / useMemo around every inline arrow and
     * every style object — which is what the React team tells you to stop
     * writing once the compiler is doing it. `react/react-compiler` stays on at
     * error, and that is what keeps the memoization real.
     *
     * Two of the reports can't be satisfied at all:
     * `dangerouslySetInnerHTML={{ __html }}` has to build a fresh object, and so
     * does `style={{ "--tilt": … }}` when the value comes from a prop.
     */
    "react-perf/jsx-no-new-function-as-prop": "off",
    "react-perf/jsx-no-new-object-as-prop": "off",
    "react-perf/jsx-no-new-array-as-prop": "off",
    "react-perf/jsx-no-jsx-as-prop": "off",
  },
});
