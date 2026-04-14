import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "cdn.pixabay.com" },
      {hostname: 'tostbangadmin.blob.core.windows.net'},
      {hostname: "example.com"}
    ],
  },
};

export default nextConfig;
