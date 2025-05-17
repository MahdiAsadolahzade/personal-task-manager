// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Other Next.js config if needed
  reactStrictMode: true,
  output:'standalone',
  swcMinify: true,
  experimental: {
    externalDir: true, // Allows importing from src directory
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig
