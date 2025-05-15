import mongoose, { Schema } from 'mongoose';
import { IBountyProvider } from '@/interfaces/Interface';

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
  organizationName: {
    type: String,
    default: null
  },
  organizationRole: {
    type: String,
    default: null
  },
  organizationGithub: {
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

export const BountyProvider = mongoose.models.BountyProvider || 
  mongoose.model<IBountyProvider>('BountyProvider', BountyProviderSchema);
