"use client";
import { CivicAuthIframeContainer, useUser } from "@civic/auth-web3/react";
import { useAutoConnect } from "@civic/auth-web3/wagmi";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";
import { useEffect, useState } from "react";

function UserDashboard({
  walletCreationInProgress,
}: {
  walletCreationInProgress?: boolean;
}) {
  const { isConnected, address, chain } = useAccount();
  const { user, isLoading: userLoading } = useUser();
  const isLoading = userLoading || walletCreationInProgress;
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const ethBalance = useBalance({
    address,
    query: {
      refetchInterval: false, // Don't auto-update
    },
  });

  const formatBalanceEth = (balance: bigint | undefined) => {
    if (!balance) return (0.0).toFixed(5);
    return Number.parseFloat(formatEther(balance)).toFixed(5);
  };

  // Save user data to the database when they sign in
  useEffect(() => {
    async function saveUserData() {
      if (user && address && !saveStatus) {
        try {
          setSaveStatus("saving");
          
          // Prepare the hunter data
          const hunterData = {
            walletAddress: address,
            email: user.email || "",
            name: user.name || "Anonymous User",
            // If user has a picture from auth, use it
            profilePicture: user.picture || null,
            // Initialize with empty skills array
            skills: []
          };

          // Call the API to save the user data
          const response = await fetch('/api/addBountyHunter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(hunterData),
          });

          const data = await response.json();

          if (response.ok) {
            setSaveStatus("saved");
            console.log("User data saved successfully:", data);
          } else {
            // If user already exists, that's okay
            if (response.status === 409) {
              setSaveStatus("exists");
              console.log("User already exists");
            } else {
              setSaveStatus("error");
              console.error("Error saving user data:", data.error);
            }
          }
        } catch (error) {
          setSaveStatus("error");
          console.error("Error saving user data:", error);
        }
      }
    }

    saveUserData();
  }, [user, address, saveStatus]);

  return (
    <>
      {!isConnected || isLoading ? (
        <div>
          <div>Connecting wallet. Please wait...</div>
        </div>
      ) : null}
      {isConnected && !isLoading && (
        <div className={`${!isConnected ? "pointer-events-none opacity-50" : ""} flex flex-col gap-4`}>
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <div className="flex flex-col">
              <span>Chain: {chain?.name}</span>
              <span>Wallet Address: {address}</span>
              <span>Wallet Balance: {formatBalanceEth(ethBalance?.data?.value)} ETH</span>
              
              {/* Display user information */}
              {user && (
                <div className="mt-4">
                  <h3 className="font-bold">User Information</h3>
                  <p>Name: {user.name || "Not provided"}</p>
                  <p>Email: {user.email || "Not provided"}</p>
                  
                  {/* Show save status */}
                  {saveStatus === "saving" && <p className="text-blue-500">Saving your profile...</p>}
                  {saveStatus === "saved" && <p className="text-green-500">Profile saved successfully!</p>}
                  {saveStatus === "exists" && <p className="text-green-500">Welcome back!</p>}
                  {saveStatus === "error" && <p className="text-red-500">Error saving profile. Please try again.</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Dashboard() {
  const { user, isLoading, walletCreationInProgress } = useUser();
  useAutoConnect();

  if (!isLoading && !user)
    return <CivicAuthIframeContainer />;

  return <UserDashboard walletCreationInProgress={walletCreationInProgress} />;
}

export { Dashboard };