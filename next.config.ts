// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    localPatterns: [
      {
        pathname: "/icon-192.png",
      },
      {
        pathname: "/logos/*",
      },
      {
        pathname: "/stores/*",
      },
    ],
  },
};

export default nextConfig;
