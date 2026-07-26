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
  },
  /** Typecheck via `tsc`, not as part of the build */
  typescript: { ignoreBuildErrors: true },
} satisfies NextConfig;

export default createNextIntl(nextConfig);
