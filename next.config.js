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
        permanent: false,
      },
      {
        source: "/socials",
        destination: "/#socials",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
