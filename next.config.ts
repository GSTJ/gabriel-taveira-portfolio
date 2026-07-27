import type { NextConfig } from "next";

import withNextIntl from "next-intl/plugin";

const createNextIntl = withNextIntl(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n/index.ts",
);

/**
 * Where the generated assets live. `demo.gif` and `curriculum.pdf` are built by
 * the `Generate static files` workflow and uploaded to the `portfolio-assets`
 * R2 bucket, so neither binary is committed here. The only other references are
 * that workflow's upload step and README's `<img src>`.
 */
const ASSETS_ORIGIN =
  process.env.ASSETS_ORIGIN ?? "https://assets.gabrieltaveira.dev";

const nextConfig = {
  devIndicators: false,
  reactCompiler: true,
  /**
   * The resume keeps its own URL. Metadata and the download link both point at
   * `/curriculum.pdf`, so this proxies rather than redirects. R2 already
   * answers with `application/pdf`, an ETag and a cache-control the workflow
   * sets, and Next hands those through untouched.
   */
  rewrites: () =>
    Promise.resolve([
      {
        source: "/curriculum.pdf",
        destination: `${ASSETS_ORIGIN}/curriculum.pdf`,
      },
    ]),
  experimental: {
    /**
     * Next inlines critical CSS with a literal `require("critters")` in
     * `postProcessHTML`, so that specifier has to keep resolving. critters is
     * deprecated, so package.json aliases the name to `beasties`, the fork the
     * Nuxt team took over. Both builds produce byte-identical inlined CSS.
     *
     * When Next starts requiring `beasties` by name, drop the alias and depend
     * on it directly.
     */
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
