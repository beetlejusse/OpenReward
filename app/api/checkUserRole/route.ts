import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';

// Create or import models
const BountyHunterSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
});

const BountyProviderSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
});

// Create the models (only if they don't exist)
const BountyHunter = mongoose.models.BountyHunter || mongoose.model('BountyHunter', BountyHunterSchema);
const BountyProvider = mongoose.models.BountyProvider || mongoose.model('BountyProvider', BountyProviderSchema);

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the email from the query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // Validate that email is provided
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Check if the user exists as either a hunter or provider
    const hunter = await BountyHunter.findOne({ email });
    const provider = await BountyProvider.findOne({ email });

    // Return the user's role(s)
    return NextResponse.json({
      isHunter: !!hunter,
      isProvider: !!provider,
      hunter: hunter || null,
      provider: provider || null
    }, { status: 200 });
  } catch (error) {
    console.error('Error checking user role:', error);
    
    return NextResponse.json(
      { error: 'Failed to check user role' },
      { status: 500 }
    );
  }
} 