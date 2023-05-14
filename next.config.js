const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n/index.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: { domains: ["i.ytimg.com"] },
  experimental: {
    appDir: true,
    optimizeCss: true,
  },
};

module.exports = withNextIntl(nextConfig);
