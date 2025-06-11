const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n/index.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  swcMinify: true,
  images: { domains: ["i.ytimg.com"] },
  experimental: {
    reactCompiler: true,
    optimizeCss: true,
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = withNextIntl(nextConfig);
