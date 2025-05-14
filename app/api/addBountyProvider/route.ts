import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { BountyProvider } from '@/models/BountyProviderModel';
import { AddBountyProviderRequest } from '@/interfaces/Interface';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data: AddBountyProviderRequest = await request.json();

    if (!data.walletAddress || !data.email || !data.name) {
      return NextResponse.json(
        { error: 'Missing required fields: walletAddress, email, and name are required' },
        { status: 400 }
      );
    }

    const existingProvider = await BountyProvider.findOne({
      $or: [
        { walletAddress: data.walletAddress },
        { email: data.email }
      ]
    });

    if (existingProvider) {
      return NextResponse.json(
        { error: 'A bounty provider with this wallet address or email already exists' },
        { status: 409 }
      );
    }

    const newBountyProvider = new BountyProvider({
      walletAddress: data.walletAddress,
      email: data.email,
      name: data.name,
      profilePicture: data.profilePicture || null,
      bio: data.bio || null,
      website: data.website || null,
      githubProfile: data.githubProfile || null,
      companyName: data.companyName || null,
      bountiesListed: 0,
      bountiesDistributed: 0,
      totalAmountDistributed: 0,
      activeBounties: [],
      completedBounties: [],
      availableBalance: 0,
      lockedBalance: 0
    });

    const savedProvider = await newBountyProvider.save();

    return NextResponse.json(
      {
        message: 'Bounty provider created successfully',
        provider: savedProvider
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating bounty provider:', error);

    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create bounty provider', details: error.message },
      { status: 500 }
    );
  }
}
