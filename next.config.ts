// next.config.ts
import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  customWorkerSrc: 'worker',
  customWorkerDest: 'public',
  customWorkerPrefix: 'worker',
  workboxOptions: {
    navigationPreload: true,
    runtimeCaching: [
      {
        urlPattern: /^\/$/, // Cache the root page
        handler: "CacheFirst",
        options: {
          cacheName: "page-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
          },
        },
      },
      {
        urlPattern: /^\/tasks$/,
        handler: "CacheFirst",
        options: {
          cacheName: "page-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /^\/configuration$/,
        handler: "CacheFirst",
        options: {
          cacheName: "page-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /^\/settings$/,
        handler: "CacheFirst",
        options: {
          cacheName: "page-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
    ],
  },
})(nextConfig);
