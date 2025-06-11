import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const createNextIntl = withNextIntl(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n/index.ts"
);

const nextConfig = {
  devIndicators: false,
  images: { remotePatterns: [{ hostname: "i.ytimg.com" }] },
  experimental: {
    reactCompiler: true,
    optimizeCss: true,
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
} satisfies NextConfig;

export default createNextIntl(nextConfig);
