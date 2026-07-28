import type { NextConfig } from "next";

import withNextIntl from "next-intl/plugin";

const createNextIntl = withNextIntl(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n/index.ts",
);

/**
 * Applied to every response. None of these depend on the page, so they live
 * here rather than in the middleware, which only does locale routing.
 *
 * No `Content-Security-Policy` yet. The page loads GTM, Google Fonts, PostHog
 * and Vercel Analytics, so a useful policy is an allowlist that has to be
 * verified against the real deploy, not a line added blind. `frame-ancestors`
 * is the part worth having today and `X-Frame-Options` already covers it.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  devIndicators: false,
  reactCompiler: true,
  /** `X-Powered-By: Next.js` tells an attacker which CVEs to try. */
  poweredByHeader: false,
  headers: () =>
    Promise.resolve([{ source: "/(.*)", headers: SECURITY_HEADERS }]),
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
