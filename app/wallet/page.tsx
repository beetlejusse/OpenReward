'use client';

import { useEffect, useState } from 'react';
import { useUser, UserButton } from '@civic/auth-web3/react';
import { ethers } from 'ethers';

// Define interface for the user object
interface CivicUser {
  name?: string;
  email?: string;
  ethereum?: {
    address: string;
  };
  [key: string]: any; // Allow for other properties
}

export default function WalletPage() {
  const { user, isLoading } = useUser() as { user: CivicUser | null; isLoading: boolean };
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  useEffect(() => {
    async function fetchWalletInfo() {
      if (!user) return;
      
      try {
        setIsLoadingBalance(true);
        
        // Connect to Sepolia network
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL
        );
        
        // Get wallet address from Civic Auth
        const address = user?.ethereum?.address || null;
        
        if (address) {
          setWalletAddress(address);
          
          // Get wallet balance
          const weiBalance = await provider.getBalance(address);
          const ethBalance = ethers.formatEther(weiBalance);
          setBalance(ethBalance);
        }
      } catch (error) {
        console.error("Error fetching wallet info:", error);
      } finally {
        setIsLoadingBalance(false);
      }
    }
    
    fetchWalletInfo();
  }, [user]);

  if (isLoading) {
    return <div className="p-8">Loading user data...</div>;
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your wallet</h1>
        <UserButton />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Wallet</h1>
        <UserButton />
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">User Information</h2>
          <p><strong>Name:</strong> {user.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Wallet Information</h2>
          {walletAddress ? (
            <>
              <p><strong>Wallet Address:</strong></p>
              <p className="break-all text-sm text-gray-600">{walletAddress}</p>
            </>
          ) : (
            <p>No wallet address found</p>
          )}
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Sepolia ETH Balance</h2>
          {isLoadingBalance ? (
            <p>Loading balance...</p>
          ) : balance ? (
            <p><strong>{balance} ETH</strong></p>
          ) : (
            <p>Unable to fetch balance</p>
          )}
        </div>
      </div>
    </div>
  );
}