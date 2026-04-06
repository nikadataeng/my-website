import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
