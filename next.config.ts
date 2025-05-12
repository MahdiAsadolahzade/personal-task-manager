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
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  cacheStartUrl: true,
  customWorkerSrc: "worker",
  customWorkerDest: "public",
  customWorkerPrefix: "worker",
  workboxOptions: {
    navigationPreload: true,

    // Precache fallback routes
    runtimeCaching: [
      {
        urlPattern: /^\/$/, // Home page
        handler: "NetworkFirst",
        options: {
          cacheName: "start-page",
          expiration: {
            maxEntries: 1,
            maxAgeSeconds: 24 * 60 * 60, // 1 day
          },
        },
      },
      {
        urlPattern: /^\/tasks$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "tasks-page",
          expiration: {
            maxEntries: 1,
            maxAgeSeconds: 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /^\/configuration$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "configuration-page",
          expiration: {
            maxEntries: 1,
            maxAgeSeconds: 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /^\/settings$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "settings-page",
          expiration: {
            maxEntries: 1,
            maxAgeSeconds: 24 * 60 * 60,
          },
        },
      },
    ],
  },
})(nextConfig);
