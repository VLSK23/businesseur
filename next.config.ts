import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorise l'ouverture du site depuis l'adresse réseau du PC (pas seulement localhost)
  allowedDevOrigins: ["192.168.11.129"],
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
