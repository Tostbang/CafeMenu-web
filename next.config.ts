import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "cdn.pixabay.com" },
      {hostname: 'tostbangadmin.blob.core.windows.net'},
      {hostname: "example.com"}
    ],
  },
 allowedDevOrigins: ['vid-invite-polished-peterson.trycloudflare.com'],
};

export default nextConfig;
