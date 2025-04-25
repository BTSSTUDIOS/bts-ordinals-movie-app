import { NextResponse } from 'next/server';
import ordinalsbot from '@/lib/ob';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'edge';  // Optional: Use edge runtime for better performance

export async function GET() {
  try {
    // Get fee estimation from mempool
    const feeEstimate = await ordinalsbot.Mempool().getFeeEstimation();
    
    return NextResponse.json({
      feeRate: feeEstimate,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching fee rate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fee rate' },
      { status: 500 }
    );
  }
}
