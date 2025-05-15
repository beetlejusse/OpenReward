import { Document } from "mongoose";

export interface IBountyHunterEntry {
    email: string;
    walletAddress: string;
    joinedAt: Date;
    prRaised: boolean;
    prUrl?: string;
    prRaisedAt?: Date;
}

export interface IBounty {
    contractAddress: string;
    bountyProvider: string;
    bountyAmount: number;
    timeInterval: number;
    initialTimestamp: number;
    status: 'OPEN' | 'COMPLETED' | 'CLOSED' | 'CANCELLED';
    bountyHunters: IBountyHunterEntry[];
    bountyWinner: string | null;
    issueURL: string;
    title: string;
    description: string;
    createdAt: Date;
    expiresAt: Date;
    lastSyncedAt: Date;
}


export interface IBountyProvider extends Document {
    walletAddress: string;
    email: string;
    name: string;
    profilePicture?: string;
    bio?: string;
    website?: string;
    githubProfile?: string;
    organizationName?: string;
    organizationRole?: string;
    organizationGithub?: string; //can be the organization's github profile or the user's github repository
    bountiesListed: number;
    bountiesDistributed: number;
    totalAmountDistributed: number;
    activeBounties: string[];
    completedBounties: string[];
    availableBalance: number;
    lockedBalance: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface AddBountyProviderRequest {
    walletAddress: string;
    email: string;
    name: string;
    profilePicture?: string;
    bio?: string;
    website?: string;
    githubProfile?: string;
    companyName?: string;
}

export interface AddBountyHunterRequest {
    walletAddress: string;
    email: string;
    name: string;
    profilePicture?: string;
    bio?: string;
    skills?: string[];
    githubProfile?: string;
}

export interface HunterFormData {
    name: string
    bio?: string
    skills: string
    githubProfile?: string
}

export interface ProviderFormData {
    name: string
    bio?: string
    website?: string
    companyName?: string
    githubProfile?: string
}