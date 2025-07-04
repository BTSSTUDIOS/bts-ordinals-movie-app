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
    <div className='min-h-screen py-8 px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100'>
      <div className='max-w-7xl mx-auto'>
        {/* Welcome Section */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-2'>
            <span className='bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent'>
              🎬 BTS STUDIOS Dashboard 🎬
            </span>
          </h1>
          <p className='text-xl text-gray-600'>Your decentralized film and streaming platform</p>
        </div>

        {/* Featured Movie Section - Moved to Top */}
        <div className='relative group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 mb-8 overflow-hidden'>
          <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-indigo-400 to-purple-500'></div>
          <div className='relative z-10'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>
              <span className='bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent'>
                🎬 Featured Movie
              </span>
            </h2>
            <div className='max-w-3xl mx-auto'>
              <div className='aspect-video relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200'>
                <iframe 
                  src="https://player.vimeo.com/video/290191024?h=9ffdbfbdee" 
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                />
              </div>
              <div className='mt-4 flex justify-between items-center'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-800'>SUPEzero</h3>
                  <p className='text-gray-600'>A BTS STUDIOS Production</p>
                </div>
                <a 
                  href='https://movies.bts.network/' 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='inline-block px-6 py-3 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200'
                >
                  Watch on ᗺTS
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Top Section - AI Tools and Services */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'>
            <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-pink-400 to-rose-500'></div>
            <div className='relative z-10'>
              <div className='text-2xl mb-2'>🎨</div>
              <h3 className='text-lg font-bold mb-2 text-gray-800'>Movie Poster Generator</h3>
              <p className='text-sm text-gray-600 mb-4'>
                Create stunning movie posters using our AI-powered generator. Perfect for promoting your films.
              </p>
              <div className='space-y-2 mb-4'>
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
              <Link href='/tools/poster-generator' className='inline-block w-full px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-full font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200'>
                Generate Poster
              </Link>
            </div>
          </div>

          <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'>
            <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-cyan-400 to-blue-500'></div>
            <div className='relative z-10'>
              <div className='text-2xl mb-2'>📝</div>
              <h3 className='text-lg font-bold mb-2 text-gray-800'>Content Inscription</h3>
              <p className='text-sm text-gray-600 mb-4'>
                Inscribe your content on the Bitcoin blockchain to make it permanent and immutable.
              </p>
              <div className='space-y-2 mb-4'>
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
              <Link href='/inscribe' className='inline-block w-full px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200'>
                Start Inscription
              </Link>
            </div>
          </div>

          <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'>
            <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-teal-400 to-cyan-500'></div>
            <div className='relative z-10'>
              <div className='text-2xl mb-2'>🧠</div>
              <h3 className='text-lg font-bold mb-2 text-gray-800'>BTS Therapy AI</h3>
              <p className='text-sm text-gray-600 mb-4'>
                Get AI-powered guidance to help you evolve and adapt in the changing film industry landscape.
              </p>
              <div className='space-y-2 mb-4'>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>AI-powered guidance</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>Industry insights</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>Personalized support</span>
                </div>
              </div>
              <Link href='/therapyai' className='inline-block w-full px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-full font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200'>
                Get Guidance
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Section - New Features */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'>
            <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-red-500'></div>
            <div className='relative z-10'>
              <div className='text-2xl mb-2'>📝</div>
              <h3 className='text-lg font-bold mb-2 text-gray-800'>Movie Script Generator</h3>
              <p className='text-sm text-gray-600 mb-4'>
                Create compelling movie scripts using our advanced AI-powered script generator. Transform your ideas into professional screenplays.
              </p>
              <div className='space-y-2 mb-4'>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>AI-powered script writing</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>Multiple genres supported</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>Professional formatting</span>
                </div>
              </div>
              <Link href='/tools/script-generator' className='inline-block w-full px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200'>
                Generate Script
              </Link>
            </div>
          </div>

          <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'>
            <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-yellow-400 to-orange-500'></div>
            <div className='relative z-10'>
              <div className='text-2xl mb-2'>🪙</div>
              <h3 className='text-lg font-bold mb-2 text-gray-800'>BTS Token</h3>
              <p className='text-sm text-gray-600 mb-4'>
                Explore the BTS ecosystem token. Trade, stake, and earn rewards while supporting the future of decentralized filmmaking.
              </p>
              <div className='space-y-2 mb-4'>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>Token trading & staking</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>Governance participation</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>Reward distribution</span>
                </div>
              </div>
              <Link href='#' className='inline-block w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200'>
                View Token
              </Link>
            </div>
          </div>

          <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'>
            <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-indigo-400 to-purple-500'></div>
            <div className='relative z-10'>
              <div className='text-2xl mb-2'>🌐</div>
              <h3 className='text-lg font-bold mb-2 text-gray-800'>BTS Metaverse</h3>
              <p className='text-sm text-gray-600 mb-4'>
                Step into the BTS Metaverse. Experience immersive virtual worlds, attend virtual premieres, and connect with creators globally.
              </p>
              <div className='space-y-2 mb-4'>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>Virtual movie theaters</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>Creator networking</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-green-500'>✓</span>
                  <span className='text-sm'>Immersive experiences</span>
                </div>
              </div>
              <Link href='#' className='inline-block w-full px-4 py-2 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-full font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200'>
                Enter Metaverse
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section - Stats and Management */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'>
            <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-green-400 to-emerald-500'></div>
            <div className='relative z-10'>
              <div className='text-2xl mb-2'>💎</div>
              <h3 className='text-lg font-bold mb-2 text-gray-800'>Rewards</h3>
              <p className='text-3xl font-bold text-green-600 mb-2'>${userStats.totalEarnings.toLocaleString()}</p>
              <p className='text-sm text-gray-600 mb-4'>Total earnings</p>
              <Link href='/rewards' className='inline-block w-full px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200'>
                Manage Rewards
              </Link>
            </div>
          </div>

          <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'>
            <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-blue-400 to-cyan-500'></div>
            <div className='relative z-10'>
              <div className='text-2xl mb-2'>👥</div>
              <h3 className='text-lg font-bold mb-2 text-gray-800'>Profile</h3>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 relative rounded-full overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center'>
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt='Profile'
                      fill
                      className='object-cover'
                    />
                  ) : (
                    <span className='text-white font-bold text-lg'>
                      {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className='font-semibold text-sm'>{session?.user?.name || 'Anonymous User'}</h4>
                  <p className='text-xs text-gray-600'>{session?.user?.email || 'No email provided'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'>
            <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-purple-400 to-pink-500'></div>
            <div className='relative z-10'>
              <div className='text-2xl mb-2'>📊</div>
              <h3 className='text-lg font-bold mb-2 text-gray-800'>Stats</h3>
              <div className='space-y-2'>
                <p className='flex justify-between text-sm'>
                  <span>Views:</span>
                  <span className='font-semibold text-purple-600'>{userStats.totalViews.toLocaleString()}</span>
                </p>
                <p className='flex justify-between text-sm'>
                  <span>Uploads:</span>
                  <span className='font-semibold text-purple-600'>{userStats.totalUploads}</span>
                </p>
                <p className='flex justify-between text-sm'>
                  <span>Watch Time:</span>
                  <span className='font-semibold text-purple-600'>{Math.floor(userStats.watchTime / 60)}h</span>
                </p>
              </div>
            </div>
          </div>

          <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'>
            <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-red-400 to-pink-500'></div>
            <div className='relative z-10'>
              <div className='text-2xl mb-2'>🎬</div>
              <h3 className='text-lg font-bold mb-2 text-gray-800'>BTS STUDIOS Streaming</h3>
              <p className='text-sm text-gray-600 mb-1'>Premium Movie Platform</p>
              <p className='text-sm text-gray-600 mb-4'>$10/month or $77/year</p>
              <a 
                href='https://movies.bts.network/' 
                target='_blank' 
                rel='noopener noreferrer'
                className='inline-block w-full px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-full font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200'
              >
                Subscribe Now
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className='relative group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 mt-8 overflow-hidden'>
          <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-violet-400 to-purple-500'></div>
          <div className='relative z-10'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>
              <span className='bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent'>
                📈 Recent Activity
              </span>
            </h2>
            <div className='space-y-4'>
              <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200'>
                <div>
                  <p className='font-semibold text-gray-800'>Welcome to BTS STUDIOS</p>
                  <p className='text-sm text-gray-600'>Your journey begins here</p>
                </div>
                <span className='text-sm text-gray-500'>Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}