'use client';

import Link from 'next/link';
import { UserButton } from '@civic/auth-web3/react';

export default function Home() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Web3 App with Civic Auth</h1>
        <UserButton />
      </div>
      
      <p className="mb-6">
        Sign in with your email to create a wallet and view your Sepolia ETH balance.
      </p>
      
      <Link 
        href="/wallet" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View My Wallet
      </Link>
    </div>
  );
}