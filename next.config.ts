// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ❌ elimina esto si lo tienes:
  // experimental: { appDir: true },
  // (opcional) configura domains si usas imágenes externas
  images: {
    domains: ["logo.clearbit.com"],
  },
};

export default nextConfig;
