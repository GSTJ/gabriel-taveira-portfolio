/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: { domains: ["i.ytimg.com"] },
  experimental: {
    appDir: true,
    optimizeCss: true,
  },
};

module.exports = nextConfig;
