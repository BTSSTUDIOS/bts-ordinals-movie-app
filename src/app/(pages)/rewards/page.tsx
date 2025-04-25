'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

interface Reward {
  id: string;
  amount: number;
  type: 'view' | 'subscription' | 'purchase';
  date: string;
  description: string;
}

export default function RewardsPage() {
  const { data: session } = useSession();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchRewards = async () => {
      if (session?.user?.email) {
        const q = query(collection(firestore, 'rewards'), where('email', '==', session.user.email));
        const querySnapshot = await getDocs(q);
        const rewardsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Reward[];
        
        setRewards(rewardsData);
        setTotalEarnings(rewardsData.reduce((sum, reward) => sum + reward.amount, 0));
      }
    };
    fetchRewards();
  }, [session]);

  return (
    <div className='min-h-screen py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-2'>Your Rewards</h1>
          <p className='text-xl text-muted-foreground'>Track your earnings and rewards</p>
        </div>

        {/* Total Earnings Card */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-center'>
              <p className='text-4xl font-bold mb-2'>${totalEarnings.toLocaleString()}</p>
              <p className='text-muted-foreground'>Available for withdrawal</p>
            </div>
            <div className='mt-6 flex justify-center space-x-4'>
              <Button>Withdraw to Wallet</Button>
              <Button variant='outline'>View Transaction History</Button>
            </div>
          </CardContent>
        </Card>

        {/* Rewards History */}
        <Card>
          <CardHeader>
            <CardTitle>Rewards History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {rewards.length > 0 ? (
                rewards.map((reward) => (
                  <div key={reward.id} className='flex items-center justify-between p-4 bg-muted rounded-lg'>
                    <div>
                      <p className='font-semibold'>{reward.description}</p>
                      <p className='text-sm text-muted-foreground'>{new Date(reward.date).toLocaleDateString()}</p>
                    </div>
                    <div className='text-right'>
                      <p className='font-semibold text-green-500'>+${reward.amount.toLocaleString()}</p>
                      <p className='text-sm text-muted-foreground capitalize'>{reward.type}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-8'>
                  <p className='text-muted-foreground'>No rewards history yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Earn */}
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>How to Earn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='space-y-2'>
                <h3 className='font-semibold'>🎬 Upload Content</h3>
                <p className='text-sm text-muted-foreground'>Earn from views and subscriptions to your content</p>
              </div>
              <div className='space-y-2'>
                <h3 className='font-semibold'>👥 Refer Friends</h3>
                <p className='text-sm text-muted-foreground'>Get rewards when friends join and make purchases</p>
              </div>
              <div className='space-y-2'>
                <h3 className='font-semibold'>💎 Premium Content</h3>
                <p className='text-sm text-muted-foreground'>Earn more from premium content subscriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 