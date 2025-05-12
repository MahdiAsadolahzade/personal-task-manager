// next.config.ts
import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Other Next.js config if needed
  reactStrictMode: true,
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

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
cacheOnFrontEndNav:true,
aggressiveFrontEndNavCaching:true,
reloadOnOnline:true,
cacheStartUrl:true,
  customWorkerSrc: 'worker', // Directory containing index.js or index.ts (default: 'worker')
  customWorkerDest: 'public', // Output directory for bundled worker (default: same as dest)
  customWorkerPrefix: 'worker',
})(nextConfig);
