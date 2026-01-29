import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization for local images
  images: {
    unoptimized: false, // Enable optimization (set to true for static export)
    formats: ['image/webp'],
  },
};

export default nextConfig;

