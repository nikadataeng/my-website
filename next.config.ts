import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/career", destination: "/" },
      { source: "/personal", destination: "/" },
    ];
  },
};

export default nextConfig;
