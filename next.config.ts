import { createCivicAuthPlugin } from "@civic/auth/nextjs";
import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

const withCivicAuth = createCivicAuthPlugin({
  clientId: '4ad3aa19-4fe3-4d6c-a22b-0f7840c307ae',
});

export default withCivicAuth(nextConfig);
