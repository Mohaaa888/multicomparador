// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ❌ elimina esto si lo tienes:
  // experimental: { appDir: true },
  // (opcional) configura domains si usas imágenes externas
  images: {
    domains: ["logo.clearbit.com"],
    localPatterns: [
      {
        pathname: "/icon-192.png",
      },
    ],
  },
};

export default nextConfig;
