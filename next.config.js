/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    appDir: true,
    optimizeCss: true,
  },
};

module.exports = nextConfig;
