import mongoose, { Document, Schema } from 'mongoose';

// Interface for the BountyProvider document
export interface IBountyProvider extends Document {
  walletAddress: string;
  email: string;
  name: string;
  profilePicture?: string;
  bio?: string;
  website?: string;
  githubProfile?: string;
  companyName?: string;
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

// Schema definition
const BountyProviderSchema = new Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  
  // Profile Information
  profilePicture: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  website: {
    type: String,
    default: null
  },
  githubProfile: {
    type: String,
    default: null
  },
  companyName: {
    type: String,
    default: null
  },
  
  // Bounty Management
  bountiesListed: {
    type: Number,
    default: 0
  },
  bountiesDistributed: {
    type: Number,
    default: 0
  },
  totalAmountDistributed: {
    type: Number,
    default: 0
  },
  activeBounties: {
    type: [String],
    default: []
  },
  completedBounties: {
    type: [String],
    default: []
  },
  
  // Financial Information
  availableBalance: {
    type: Number,
    default: 0
  },
  lockedBalance: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create indexes for frequently queried fields
BountyProviderSchema.index({ walletAddress: 1 });
BountyProviderSchema.index({ email: 1 });

// Create the model (check if it already exists to prevent overwriting)
export const BountyProvider = mongoose.models.BountyProvider || 
  mongoose.model<IBountyProvider>('BountyProvider', BountyProviderSchema);
