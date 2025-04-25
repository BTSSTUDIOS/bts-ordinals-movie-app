'use client';

import { FIREBASE } from '@/lib/constants';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

interface UserStats {
  totalViews: number;
  totalUploads: number;
  totalEarnings: number;
  watchTime: number;
}

export default function Page() {
  const { data: session } = useSession();
  const [userStats, setUserStats] = useState<UserStats>({
    totalViews: 0,
    totalUploads: 0,
    totalEarnings: 0,
    watchTime: 0
  });

  useEffect(() => {
    // Fetch user stats from Firebase
    const fetchUserStats = async () => {
      if (session?.user?.email) {
        const q = query(collection(firestore, 'userStats'), where('email', '==', session.user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserStats(querySnapshot.docs[0].data() as UserStats);
        }
      }
    };
    fetchUserStats();
  }, [session]);

  return (
    <div className='min-h-screen py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Welcome Section */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-2'>Welcome to BTS STUDIOS Dashboard</h1>
          <p className='text-xl text-muted-foreground'>Your decentralized film and streaming platform</p>
        </div>

        {/* Top Section - Rewards and Management */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <Card>
            <CardHeader>
              <CardTitle>💎 Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold'>${userStats.totalEarnings.toLocaleString()}</p>
              <p className='text-sm text-muted-foreground'>Total earnings</p>
              <Button asChild className='w-full mt-4'>
                <Link href='/rewards'>Manage Rewards</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>👥 Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center space-x-4'>
                <div className='w-16 h-16 relative rounded-full overflow-hidden'>
                  <Image
                    src={session?.user?.image || '/default-avatar.png'}
                    alt='Profile'
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h3 className='font-semibold'>{session?.user?.name || 'Anonymous User'}</h3>
                  <p className='text-sm text-muted-foreground'>{session?.user?.email || 'No email provided'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <p className='flex justify-between'>
                  <span>Views:</span>
                  <span className='font-semibold'>{userStats.totalViews.toLocaleString()}</span>
                </p>
                <p className='flex justify-between'>
                  <span>Uploads:</span>
                  <span className='font-semibold'>{userStats.totalUploads}</span>
                </p>
                <p className='flex justify-between'>
                  <span>Watch Time:</span>
                  <span className='font-semibold'>{Math.floor(userStats.watchTime / 60)}h</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎥 Vimeo Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>Connected to Vimeo Pro</p>
              <p className='text-sm text-muted-foreground'>Storage: 2.5GB / 5TB</p>
              <Button asChild className='w-full mt-4'>
                <Link href='/settings/video'>Manage Videos</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Center Section - Featured Movie */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>Featured Movie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='max-w-3xl mx-auto'>
              <div className='aspect-video relative rounded-lg overflow-hidden bg-muted'>
                <iframe 
                  src="https://player.vimeo.com/video/358185350?h=fc495ed011" 
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                />
              </div>
              <div className='mt-4 flex justify-between items-center'>
                <div>
                  <h3 className='text-xl font-semibold'>NIGHTSHADE - FULL LENGTH TRAILER</h3>
                  <p className='text-muted-foreground'>A BTS STUDIOS Production</p>
                </div>
                <Button asChild>
                  <Link href='/movies'>Watch on ᗺTS</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Section - Film Tools */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>🎨 Movie Poster Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p className='text-sm text-muted-foreground'>
                  Create stunning movie posters using our AI-powered generator. Perfect for promoting your films.
                </p>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <span className='text-green-500'>✓</span>
                    <span className='text-sm'>AI-powered design</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-green-500'>✓</span>
                    <span className='text-sm'>Customizable styles</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-green-500'>✓</span>
                    <span className='text-sm'>High-resolution output</span>
                  </div>
                </div>
                <Button asChild className='w-full'>
                  <Link href='/tools/poster-generator'>Generate Poster</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📝 Content Inscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p className='text-sm text-muted-foreground'>
                  Inscribe your content on the Bitcoin blockchain to make it permanent and immutable.
                </p>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <span className='text-green-500'>✓</span>
                    <span className='text-sm'>Permanent storage on Bitcoin</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-green-500'>✓</span>
                    <span className='text-sm'>Immutable content</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-green-500'>✓</span>
                    <span className='text-sm'>Decentralized ownership</span>
                  </div>
                </div>
                <Button asChild className='w-full'>
                  <Link href='/inscribe'>Start Inscription</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎬 Upload Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p className='text-sm text-muted-foreground'>
                  Upload your film or video content to our decentralized platform. Share your work with the world.
                </p>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <span className='text-green-500'>✓</span>
                    <span className='text-sm'>Secure storage</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-green-500'>✓</span>
                    <span className='text-sm'>Global distribution</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-green-500'>✓</span>
                    <span className='text-sm'>Revenue sharing</span>
                  </div>
                </div>
                <Button asChild className='w-full'>
                  <Link href='/upload'>Upload Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between p-4 bg-muted rounded-lg'>
                <div>
                  <p className='font-semibold'>Welcome to BTS STUDIOS</p>
                  <p className='text-sm text-muted-foreground'>Your journey begins here</p>
                </div>
                <span className='text-sm text-muted-foreground'>Just now</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}