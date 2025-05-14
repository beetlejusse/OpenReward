import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import { BountyHunter } from '@/models/BountyHunterModel';
import { BountyProvider } from '@/models/BountyProviderModel';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const hunter = await BountyHunter.findOne({ email });
    const provider = await BountyProvider.findOne({ email });

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