import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;