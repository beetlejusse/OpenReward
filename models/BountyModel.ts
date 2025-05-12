import mongoose, {Schema} from 'mongoose';

export interface IBounty {
    contractAddress: string;
    bountyProvider: string;
    bountyAmount: number;
    timeInterval: number;
    initialTimestamp: number; 
    status: 'OPEN' | 'COMPLETED' | 'CLOSED' | 'CANCELLED'; 
    bountyHunters: string[]; 
    bountyWinner: string | null; 
    issueURL: string;
    title: string; 
    description: string;
    createdAt: Date;
    expiresAt: Date; 
    lastSyncedAt: Date; 
}


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
  
  // Participants
  bountyHunters: {
    type: [String],
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
  timestamps: true // Adds updatedAt field automatically
});

// Create indexes for frequently queried fields
BountySchema.index({ contractAddress: 1 });
BountySchema.index({ bountyProvider: 1 });
BountySchema.index({ status: 1 });
BountySchema.index({ expiresAt: 1 });

const Bounty = mongoose.model('Bounty', BountySchema);

module.exports = Bounty;