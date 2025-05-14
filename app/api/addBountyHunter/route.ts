import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb'; 
import {AddBountyHunterRequest} from '@/interfaces/Interface';
import { BountyHunter } from '@/models/BountyHunterModel';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data: AddBountyHunterRequest = await request.json();

    if (!data.walletAddress || !data.email || !data.name) {
      return NextResponse.json(
        { error: 'Missing required fields: walletAddress, email, and name are required' },
        { status: 400 }
      );
    }

    const existingHunter = await BountyHunter.findOne({
      $or: [
        { walletAddress: data.walletAddress },
        { email: data.email }
      ]
    });

    if (existingHunter) {
      return NextResponse.json(
        { 
          message: 'User already exists',
          hunter: existingHunter 
        },
        { status: 200 }
      );
    }

    const newBountyHunter = new BountyHunter({
      walletAddress: data.walletAddress,
      email: data.email,
      name: data.name,
      profilePicture: data.profilePicture || null,
      bio: data.bio || null,
      skills: data.skills || [],
      githubProfile: data.githubProfile || null,
      joinedDate: new Date(),
      bountiesParticipatedIn: 0,
      bountiesWon: 0,
      totalAmountWon: 0,
      activeBounties: []
    });

    const savedHunter = await newBountyHunter.save();

    return NextResponse.json(
      { 
        message: 'Bounty hunter created successfully',
        hunter: savedHunter 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating bounty hunter:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: 'Validation error', details: error?.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create bounty hunter' },
      { status: 500 }
    );
  }
}