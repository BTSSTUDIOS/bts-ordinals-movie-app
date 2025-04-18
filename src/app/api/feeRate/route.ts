import { NextResponse } from 'next/server';
import ordinalsbot from '@/lib/ob';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'edge';  // Optional: Use edge runtime for better performance

export async function GET() {
  try {
    const feeEstimate = await ordinalsbot.Mempool().getFeeEstimation();
    
    return NextResponse.json({
      feeRate: feeEstimate,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch fee rate' },
      { status: 500 }
    );
  }
}
