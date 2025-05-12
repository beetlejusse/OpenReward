"use client";
import { CivicAuthIframeContainer, useUser } from "@civic/auth-web3/react";
import { useAutoConnect } from "@civic/auth-web3/wagmi";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// User role types
type UserRole = "hunter" | "provider" | null;

// Form data types
interface HunterFormData {
  name: string;
  bio?: string;
  skills: string;
  githubProfile?: string;
}

interface ProviderFormData {
  name: string;
  bio?: string;
  website?: string;
  companyName?: string;
  githubProfile?: string;
}

function UserDashboard({
  walletCreationInProgress,
}: {
  walletCreationInProgress?: boolean;
}) {
  const { isConnected, address, chain } = useAccount();
  const { user, isLoading: userLoading } = useUser();
  const isLoading = userLoading || walletCreationInProgress;
  
  // State for user role and onboarding
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  // Form setup for hunter
  const hunterForm = useForm<HunterFormData>({
    defaultValues: {
      name: user?.name || "",
      bio: "",
      skills: "",
      githubProfile: ""
    }
  });

  // Form setup for provider
  const providerForm = useForm<ProviderFormData>({
    defaultValues: {
      name: user?.name || "",
      bio: "",
      website: "",
      companyName: "",
      githubProfile: ""
    }
  });

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

  // Check if user already has a role
  useEffect(() => {
    async function checkUserRole() {
      if (!user?.email || !address) return;
      
      setIsCheckingRole(true);
      
      try {
        const response = await fetch(`/api/checkUserRole?email=${user.email}`);
        const data = await response.json();
        
        if (response.ok) {
          if (data.isHunter) {
            setUserRole("hunter");
            setUserData(data.hunter);
          } else if (data.isProvider) {
            setUserRole("provider");
            setUserData(data.provider);
          } else {
            setShowRoleSelection(true);
          }
        } else {
          console.error("Error checking user role:", data.error);
          setShowRoleSelection(true);
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        setShowRoleSelection(true);
      } finally {
        setIsCheckingRole(false);
      }
    }
    
    if (user && address) {
      checkUserRole();
    }
  }, [user, address]);

  // Handle role selection
  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setShowRoleSelection(false);
    setShowOnboarding(true);
  };

  // Handle hunter form submission
  const onHunterSubmit = async (data: HunterFormData) => {
    if (!user?.email || !address) return;
    
    setSaveStatus("saving");
    
    try {
      const hunterData = {
        walletAddress: address,
        email: user.email,
        name: data.name,
        bio: data.bio || null,
        skills: data.skills.split(',').map(skill => skill.trim()),
        githubProfile: data.githubProfile || null
      };
      
      const response = await fetch('/api/addBountyHunter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hunterData),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        setSaveStatus("saved");
        setUserData(responseData.hunter);
        setShowOnboarding(false);
      } else {
        setSaveStatus("error");
        console.error("Error saving hunter data:", responseData.error);
      }
    } catch (error) {
      setSaveStatus("error");
      console.error("Error saving hunter data:", error);
    }
  };

  // Handle provider form submission
  const onProviderSubmit = async (data: ProviderFormData) => {
    if (!user?.email || !address) return;
    
    setSaveStatus("saving");
    
    try {
      const providerData = {
        walletAddress: address,
        email: user.email,
        name: data.name,
        bio: data.bio || null,
        website: data.website || null,
        companyName: data.companyName || null,
        githubProfile: data.githubProfile || null
      };
      
      const response = await fetch('/api/addBountyProvider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(providerData),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        setSaveStatus("saved");
        setUserData(responseData.provider);
        setShowOnboarding(false);
      } else {
        setSaveStatus("error");
        console.error("Error saving provider data:", responseData.error);
      }
    } catch (error) {
      setSaveStatus("error");
      console.error("Error saving provider data:", error);
    }
  };

  // Loading state
  if (!isConnected || isLoading || isCheckingRole) {
    return (
      <div className="text-center p-8">
        <div className="animate-pulse">
          <p>Connecting wallet. Please wait...</p>
        </div>
      </div>
    );
  }

  // Role selection screen
  if (showRoleSelection) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Role</h2>
        
        <div className="space-y-4">
          <div 
            onClick={() => handleRoleSelect("hunter")}
            className="border rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <h3 className="text-lg font-semibold">Bounty Hunter</h3>
            <p className="text-gray-600">Find and solve bounties to earn rewards</p>
          </div>
          
          <div 
            onClick={() => handleRoleSelect("provider")}
            className="border rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <h3 className="text-lg font-semibold">Bounty Provider</h3>
            <p className="text-gray-600">Create bounties for issues you need solved</p>
          </div>
        </div>
      </div>
    );
  }

  // Onboarding forms
  if (showOnboarding) {
    if (userRole === "hunter") {
      return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Complete Your Hunter Profile</h2>
          
          <form onSubmit={hunterForm.handleSubmit(onHunterSubmit)}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  {...hunterForm.register("name", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {hunterForm.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  {...hunterForm.register("bio")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma separated)
                </label>
                <input
                  {...hunterForm.register("skills", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="React, Solidity, Web3"
                />
                {hunterForm.formState.errors.skills && (
                  <p className="text-red-500 text-sm mt-1">Skills are required</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Profile
                </label>
                <input
                  {...hunterForm.register("githubProfile")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
            
            {saveStatus === "error" && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                Error saving profile. Please try again.
              </div>
            )}
            
            <button
              type="submit"
              disabled={saveStatus === "saving"}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {saveStatus === "saving" ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      );
    } else if (userRole === "provider") {
      return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Complete Your Provider Profile</h2>
          
          <form onSubmit={providerForm.handleSubmit(onProviderSubmit)}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  {...providerForm.register("name", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {providerForm.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  {...providerForm.register("companyName")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  {...providerForm.register("bio")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  {...providerForm.register("website")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Profile
                </label>
                <input
                  {...providerForm.register("githubProfile")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
            
            {saveStatus === "error" && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                Error saving profile. Please try again.
              </div>
            )}
            
            <button
              type="submit"
              disabled={saveStatus === "saving"}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {saveStatus === "saving" ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      );
    }
  }

  // Main dashboard view (user has a role)
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">
        {userRole === "hunter" ? "Bounty Hunter" : "Bounty Provider"} Dashboard
      </h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Blockchain Info</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p><strong>Chain:</strong> {chain?.name}</p>
          <p><strong>Wallet:</strong> <span className="text-sm break-all">{address}</span></p>
          <p><strong>Balance:</strong> {formatBalanceEth(ethBalance?.data?.value)} ETH</p>
        </div>
      </div>
      
      {userData && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Profile Info</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            
            {userData.bio && <p><strong>Bio:</strong> {userData.bio}</p>}
            
            {userRole === "hunter" && (
              <>
                {userData.skills && userData.skills.length > 0 && (
                  <p><strong>Skills:</strong> {userData.skills.join(", ")}</p>
                )}
                <p><strong>Bounties Participated:</strong> {userData.bountiesParticipatedIn || 0}</p>
                <p><strong>Bounties Won:</strong> {userData.bountiesWon || 0}</p>
              </>
            )}
            
            {userRole === "provider" && (
              <>
                {userData.companyName && <p><strong>Company:</strong> {userData.companyName}</p>}
                {userData.website && <p><strong>Website:</strong> {userData.website}</p>}
                <p><strong>Bounties Listed:</strong> {userData.bountiesListed || 0}</p>
                <p><strong>Bounties Distributed:</strong> {userData.bountiesDistributed || 0}</p>
              </>
            )}
            
            {userData.githubProfile && (
              <p>
                <strong>GitHub:</strong>{" "}
                <a 
                  href={userData.githubProfile} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {userData.githubProfile.replace("https://github.com/", "")}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
      
      {userRole === "hunter" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Available Bounties</h3>
          <p className="text-gray-500">No bounties available at the moment.</p>
        </div>
      )}
      
      {userRole === "provider" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Bounties</h3>
          <p className="text-gray-500">You haven't created any bounties yet.</p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Create New Bounty
          </button>
        </div>
      )}
    </div>
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
