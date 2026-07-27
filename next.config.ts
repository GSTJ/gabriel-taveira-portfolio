import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const createNextIntl = withNextIntl(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n/index.ts"
);

const nextConfig = {
  devIndicators: false,
  reactCompiler: true,
  experimental: {
    optimizeCss: true,
    /**
     * TypeScript 7 ships the native compiler and no `lib/typescript.js`, so
     * Next has to spawn the `tsc` binary instead of importing the compiler API.
     * Without this the build fails with E1150 before it compiles anything.
     */
    useTypeScriptCli: true,
  },
  /** Typecheck via `tsc`, not as part of the build */
  typescript: { ignoreBuildErrors: true },
} satisfies NextConfig;

export default createNextIntl(nextConfig);
