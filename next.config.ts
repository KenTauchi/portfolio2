import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // /v3 was this design's preview route while it lived alongside the previous
  // layout; it is now the site itself.
  async redirects() {
    return [{ source: "/v3", destination: "/", permanent: true }];
  },
};

export default nextConfig;
