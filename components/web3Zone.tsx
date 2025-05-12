"use client";
import { CivicAuthIframeContainer, useUser } from "@civic/auth-web3/react";
import { useAutoConnect } from "@civic/auth-web3/wagmi";
import { useAccount, useBalance, useSendTransaction, useSwitchChain } from "wagmi";
import { formatEther } from "viem";
import { useCallback, useEffect, useState } from "react";
import { baseSepolia } from "wagmi/chains";


function Web3U({
  walletCreationInProgress,
}: {
  walletCreationInProgress?: boolean;
}) {
  const { isConnected, address, chain } = useAccount();
  const user = useUser();
  const isLoading = user.isLoading || walletCreationInProgress;

  const ethBalance = useBalance({
    address,
    query: {
      refetchInterval: 3000,
    },
  });

  const formatBalanceEth = (balance: bigint | undefined) => {
    if (!balance) return (0.0).toFixed(5);
    return Number.parseFloat(formatEther(balance)).toFixed(5);
  };


  console.log("Chain is", chain);

  return (
    <>
      {!isConnected || isLoading ? (
        <div>
          <div>Connecting wallet. Please wait...</div>
        </div>
      ) : null}
      {isConnected && !isLoading && <div
        className={`${!isConnected ? "pointer-events-none opacity-50" : ""} flex flex-col gap-4`}
      >
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex flex-col">
            <span>Chain: {chain?.name}</span>
            <span>Wallet Address: {address}</span>
            <span>Wallet Balance: {formatBalanceEth(ethBalance?.data?.value)} ETH</span>
          </div>
        </div>
     </div>}
    </>
  );
}

function Web3Zone() {
  const { user, isLoading, walletCreationInProgress } = useUser();
  useAutoConnect();

  if (!isLoading && !user)
    return (
      
        <CivicAuthIframeContainer />
      
    );

  return (
    <Web3U walletCreationInProgress={walletCreationInProgress} />
  );
}
export { Web3Zone };
