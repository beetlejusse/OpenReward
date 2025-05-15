import mongoose, {Schema} from 'mongoose';
import { IBountyHunterEntry, IBounty } from '@/interfaces/Interface';

const BountyHunterEntrySchema = new Schema({
  email: {
    type: String,
    required: true
  },
  walletAddress: {
    type: String,
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  prRaised: {
    type: Boolean,
    default: false
  },
  prUrl: {
    type: String,
    default: null
  },
  prRaisedAt: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['INTERESTED', 'WORKING', 'SUBMITTED', 'ACCEPTED', 'REJECTED'],
    default: 'INTERESTED'
  }
});

const BountySchema = new Schema({
  contractAddress: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  bountyProvider: {
    type: String,
    required: true,
    index: true
  },
  bountyAmount: {
    type: Number,
    required: true
  },
  timeInterval: {
    type: Number,
    required: true
  },
  initialTimestamp: {
    type: Number,
    required: true
  },
  
  // Status information
  status: {
    type: String,
    enum: ['OPEN', 'COMPLETED', 'CLOSED', 'CANCELLED'],
    default: 'OPEN',
    index: true
  },
  
  // Participants - now using the nested schema
  bountyHunters: {
    type: [BountyHunterEntrySchema],
    default: []
  },
  bountyWinner: {
    type: String,
    default: null
  },
  
  // Additional metadata (not in contract)
  issueURL: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  lastSyncedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true 
});

const Bounty = mongoose.models.Bounty || mongoose.model('Bounty', BountySchema);

export default Bounty;
