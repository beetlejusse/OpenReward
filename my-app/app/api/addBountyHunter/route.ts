// app/api/addBountyHunter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb'; 
// Define the BountyHunter schema
const BountyHunterSchema = new mongoose.Schema({
  // Core Identity Fields
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

  // Bounty Participation
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
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create the model (only if it doesn't exist)
const BountyHunter = mongoose.models.BountyHunter || mongoose.model('BountyHunter', BountyHunterSchema);

// Define the expected request body type
interface AddBountyHunterRequest {
  walletAddress: string;
  email: string;
  name: string;
  profilePicture?: string;
  bio?: string;
  skills?: string[];
  githubProfile?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body: AddBountyHunterRequest = await request.json();

    // Validate required fields
    if (!body.walletAddress || !body.email || !body.name) {
      return NextResponse.json(
        { error: 'Missing required fields: walletAddress, email, and name are required' },
        { status: 400 }
      );
    }

    // Check if a hunter with the same wallet address or email already exists
    const existingHunter = await BountyHunter.findOne({
      $or: [
        { walletAddress: body.walletAddress },
        { email: body.email }
      ]
    });

    if (existingHunter) {
      return NextResponse.json(
        { error: 'A bounty hunter with this wallet address or email already exists' },
        { status: 409 }
      );
    }

    // Create a new bounty hunter
    const newBountyHunter = new BountyHunter({
      walletAddress: body.walletAddress,
      email: body.email,
      name: body.name,
      profilePicture: body.profilePicture || null,
      bio: body.bio || null,
      skills: body.skills || [],
      githubProfile: body.githubProfile || null,
      joinedDate: new Date(),
      bountiesParticipatedIn: 0,
      bountiesWon: 0,
      totalAmountWon: 0,
      activeBounties: []
    });

    // Save the new bounty hunter to the database
    const savedHunter = await newBountyHunter.save();

    // Return the saved hunter
    return NextResponse.json(
      { 
        message: 'Bounty hunter created successfully',
        hunter: savedHunter 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating bounty hunter:', error);
    
    // Handle duplicate key errors specifically
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { error: 'Failed to create bounty hunter' },
      { status: 500 }
    );
  }
}
