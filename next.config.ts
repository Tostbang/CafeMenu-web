import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  experimental: {
    serverActions: {
      // Allow logo/background uploads via Server Actions up to 10 MB.
      // Default is 1 MB which rejects typical menu images and surfaces as
      // an opaque "an error occurred on the server components render" in
      // production (the real message is masked). Keep this >= the client
      // cap in components/FileUpload.tsx (5 MB).
      bodySizeLimit: '10mb',
    },
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
