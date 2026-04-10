import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "cdn.pixabay.com" },
    ],
  },
};

export default nextConfig;
