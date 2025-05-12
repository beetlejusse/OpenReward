// app/api/addBountyProvider/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase  from '@/lib/mongodb';
import {BountyProvider} from '@/models/BountyProviderModel';
// Define the expected request body type
interface AddBountyProviderRequest {
  walletAddress: string;
  email: string;
  name: string;
  profilePicture?: string;
  bio?: string;
  website?: string;
  githubProfile?: string;
  companyName?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body: AddBountyProviderRequest = await request.json();

    // Validate required fields
    if (!body.walletAddress || !body.email || !body.name) {
      return NextResponse.json(
        { error: 'Missing required fields: walletAddress, email, and name are required' },
        { status: 400 }
      );
    }

    // Check if a provider with the same wallet address or email already exists
    const existingProvider = await BountyProvider.findOne({
      $or: [
        { walletAddress: body.walletAddress },
        { email: body.email }
      ]
    });

    if (existingProvider) {
      return NextResponse.json(
        { error: 'A bounty provider with this wallet address or email already exists' },
        { status: 409 }
      );
    }

    // Create a new bounty provider
    const newBountyProvider = new BountyProvider({
      walletAddress: body.walletAddress,
      email: body.email,
      name: body.name,
      profilePicture: body.profilePicture || null,
      bio: body.bio || null,
      website: body.website || null,
      githubProfile: body.githubProfile || null,
      companyName: body.companyName || null,
      bountiesListed: 0,
      bountiesDistributed: 0,
      totalAmountDistributed: 0,
      activeBounties: [],
      completedBounties: [],
      availableBalance: 0,
      lockedBalance: 0
    });

    // Save the new bounty provider to the database
    const savedProvider = await newBountyProvider.save();

    // Return the saved provider
    return NextResponse.json(
      { 
        message: 'Bounty provider created successfully',
        provider: savedProvider 
      }, 
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating bounty provider:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { error: 'Failed to create bounty provider', details: error.message },
      { status: 500 }
    );
  }
}
