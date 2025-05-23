import type { NextConfig } from "next";

import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";
const withCivicAuth = createCivicAuthPlugin({
  // eslint-disable-next-line no-undef
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
  // eslint-disable-next-line no-undef
  oauthServer: process.env.AUTH_SERVER || 'https://auth.civic.com/oauth',
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withCivicAuth(nextConfig);;
