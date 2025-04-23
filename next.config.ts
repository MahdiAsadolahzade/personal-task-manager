// next.config.ts
import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Other Next.js config if needed
  reactStrictMode: true,
  swcMinify: true,
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // skipWaiting: true,
})(nextConfig);
