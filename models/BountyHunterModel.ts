import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BountyHunterSchema = new Schema({
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
  skills: {
    type: [String],
    default: []
  },
  githubProfile: {
    type: String,
    default: null
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },

  bountiesParticipatedIn: {
    type: Number,
    default: 0
  },
  bountiesWon: {
    type: Number,
    default: 0
  },
  totalAmountWon: {
    type: Number,
    default: 0
  },
  activeBounties: {
    type: [String],
    default: []
  }
}, {
  timestamps: true 
});

// Create indexes for frequently queried fields
BountyHunterSchema.index({ walletAddress: 1 });
BountyHunterSchema.index({ email: 1 });
BountyHunterSchema.index({ githubProfile: 1 });

export const BountyHunter = mongoose.model('BountyHunter', BountyHunterSchema);

module.exports = BountyHunter;
