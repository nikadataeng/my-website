import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
    ],
  },
  async rewrites() {
    return [
      { source: "/career", destination: "/" },
      { source: "/personal", destination: "/" },
    ];
  },
};

export default nextConfig;
