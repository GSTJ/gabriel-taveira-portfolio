/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: { domains: ["i.ytimg.com"] },
  experimental: {
    appDir: true,
    optimizeCss: true,
  },
  redirects: async () => {
    return [
      {
        source: "/links",
        destination: "/#socials",
      },
      {
        source: "/socials",
        destination: "/#socials",
      },
    ];
  },
};

module.exports = nextConfig;
