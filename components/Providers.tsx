"use client";

import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CivicAuthProvider } from "@civic/auth-web3/nextjs";
import { sepolia, mainnet } from "viem/chains";
import { Chain, http } from "viem";
import { createConfig, WagmiProvider } from "wagmi";
import { embeddedWallet } from "@civic/auth-web3/wagmi";

const queryClient = new QueryClient();

// Configure chains and RPC URLs.
export const supportedChains = [sepolia, mainnet] as [
  Chain,
  ...Chain[],
];

const wagmiConfig = createConfig({
  chains: supportedChains,
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  },
  connectors: [embeddedWallet()],
  ssr: true,
});

// Add this type for the Providers props
type ProvidersProps = PropsWithChildren<{
  onSessionEnd?: () => void;
}>;

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
      <QueryClientProvider client={queryClient}>
            <WagmiProvider config={wagmiConfig}>
              {/* The need for initialChain here will be removed in an upcoming release */}
              <CivicAuthProvider initialChain={sepolia}>
                {children}
              </CivicAuthProvider>
            </WagmiProvider>
      </QueryClientProvider>
  );
};
