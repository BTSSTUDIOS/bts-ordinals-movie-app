import { Container } from '@/components/common/Container';
import { BTC, DEFAULT_METADATA, DEFAULT_DIMENSIONS } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Home() {
  const { width, height } = DEFAULT_DIMENSIONS;
  
  const features = [
    {
      icon: '🎥',
      title: 'Decentralized Streaming',
      description: 'High-quality video playback with global CDN distribution',
      color: 'from-cyan-400 to-blue-500',
      buttonText: 'Start Watching',
      href: '#'
    },
    {
      icon: '💎',
      title: 'Bitcoin Integration',
      description: 'Wallet connection, content inscription, and payment processing',
      color: 'from-orange-400 to-yellow-500',
      buttonText: 'Connect Wallet',
      href: '#'
    },
    {
      icon: '🎨',
      title: 'AI-Powered Tools',
      description: 'Movie poster generation and content optimization',
      color: 'from-purple-400 to-pink-500',
      buttonText: 'Create Poster',
      href: '#'
    },
    {
      icon: '💰',
      title: 'Rewards System',
      description: 'Creator earnings, view rewards, and referral bonuses',
      color: 'from-green-400 to-emerald-500',
      buttonText: 'Earn Rewards',
      href: '#'
    },
    {
      icon: '🧠',
      title: 'BTS Therapy AI',
      description: 'AI-powered guidance to help filmmakers evolve and adapt in the changing film industry landscape',
      color: 'from-teal-400 to-cyan-500',
      buttonText: 'Get Guidance',
      href: '#'
    },
    {
      icon: '📝',
      title: 'Movie Script Generator',
      description: 'Create compelling movie scripts using our advanced AI-powered script generator',
      color: 'from-orange-400 to-red-500',
      buttonText: 'Generate Script',
      href: '#'
    },
    {
      icon: '🪙',
      title: 'BTS Token',
      description: 'Explore the BTS ecosystem token. Trade, stake, and earn rewards',
      color: 'from-yellow-400 to-orange-500',
      buttonText: 'View Token',
      href: '#'
    },
    {
      icon: '🌐',
      title: 'BTS Metaverse',
      description: 'Step into the BTS Metaverse. Experience immersive virtual worlds and connect with creators',
      color: 'from-indigo-400 to-purple-500',
      buttonText: 'Enter Metaverse',
      href: '#'
    },
    {
      icon: '⬆️🟧',
      title: 'Connect Your Wallet',
      description: 'Click the CONNECT WALLET button at the top of the screen to get started',
      color: 'from-indigo-400 to-purple-500',
      buttonText: 'Connect Now',
      href: '#'
    }
  ];

  return (
    <div className='min-h-screen py-2 gap-3 bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden'>
      {/* Animated Background Particles */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none z-0'>
        <div className='absolute top-20 left-10 text-4xl opacity-10 animate-bounce' style={{animationDelay: '0s'}}>🎬</div>
        <div className='absolute top-40 right-20 text-3xl opacity-10 animate-bounce' style={{animationDelay: '1s'}}>💎</div>
        <div className='absolute bottom-40 left-20 text-3xl opacity-10 animate-bounce' style={{animationDelay: '2s'}}>🎥</div>
        <div className='absolute bottom-20 right-10 text-4xl opacity-10 animate-bounce' style={{animationDelay: '3s'}}>⚡</div>
        <div className='absolute top-1/2 left-1/4 text-2xl opacity-10 animate-pulse' style={{animationDelay: '0.5s'}}>🎨</div>
        <div className='absolute top-1/3 right-1/3 text-2xl opacity-10 animate-pulse' style={{animationDelay: '1.5s'}}>💰</div>
      </div>

      {/* Animated Gradient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-neon-green-50 via-neon-pink-50 to-neon-purple-50 animate-gradient z-0'></div>

      <Container className='relative z-10'>
        {/* Hero Section Card - Enhanced with Effects */}
        <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-200/50 mb-8 mx-4 md:mx-0 relative overflow-hidden'>
          {/* Subtle animated border */}
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-green-400 via-neon-pink-500 to-neon-purple-600 opacity-20 animate-slow-pulse'></div>
          
          <div className='flex flex-col items-center justify-center min-h-[50vh] md:h-[60vh] text-center relative z-10'>
            <h1 className='text-2xl md:text-5xl font-black mb-4 text-gray-900 px-2 tracking-tight hover:scale-105 transition-transform duration-300'>
              <span className='bg-gradient-to-r from-neon-green-400 via-neon-pink-500 to-neon-purple-600 bg-clip-text text-transparent animate-gradient-x'>
                🎬 Welcome to BTS STUDIOS 🎬
              </span>
            </h1>
            <p className='text-lg md:text-2xl font-bold mb-4 text-gray-800 px-2 leading-relaxed hover:text-gray-900 transition-colors duration-300'>
              The World&apos;s First Decentralized Film Studio & Streaming Platform
            </p>
            <p className='text-lg md:text-2xl mb-4 text-gray-700 px-2 hover:scale-105 transition-transform duration-300 font-semibold'>
              Powered by <Image src="https://i0.wp.com/blog.bts-studios.io/wp-content/uploads/2024/09/xBTS_STUDIOS_ORG.png?w=200&ssl=1" alt='bts-logo' width={width} height={height} className='inline animate-pulse' /> BTS STUDIOS and <Image src={BTC} alt='btc-logo' width={width} height={height} className='inline animate-pulse' /> BITCOIN
            </p>
          </div>
        </div>

        <div className='py-12 relative z-10'>
          <h2 className='text-3xl font-bold text-center mb-12 text-gray-800'>
            <span className='bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent'>
              ✨ Platform Features ✨
            </span>
          </h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`
                  relative group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200
                  hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2
                  hover:border-opacity-50 overflow-hidden
                `}
                style={{
                  background: `linear-gradient(135deg, white 0%, ${feature.color.split(' ')[0].replace('from-', '')} 100%)`,
                }}
              >
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300
                  bg-gradient-to-r ${feature.color}
                `}></div>
                
                <div className='relative z-10'>
                  <div className='text-4xl mb-4 text-center'>{feature.icon}</div>
                  <h3 className='text-xl font-bold mb-3 text-gray-800 text-center'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 text-center mb-6 leading-relaxed'>
                    {feature.description}
                  </p>
                  <div className='text-center'>
                    <Link
                      href={feature.href}
                      className={`
                        inline-block px-6 py-3 rounded-full font-semibold text-white
                        bg-gradient-to-r ${feature.color} shadow-lg
                        hover:shadow-xl transform hover:scale-105 transition-all duration-200
                        border-2 border-transparent hover:border-white/20
                      `}
                    >
                      {feature.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='py-16 text-center relative z-10'>
          <div className='bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl p-12 shadow-2xl'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              🚀 Ready to Join the Future? 🚀
            </h2>
            <p className='text-xl text-white/90 mb-4 max-w-2xl mx-auto'>
              🎥 Where Blockchain Meets Cinema 🎥
            </p>
            <p className='text-lg text-white/90 mb-8 max-w-2xl mx-auto'>
              Experience the future of filmmaking and content distribution on the Bitcoin blockchain
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='#'
                className='bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
              >
                🎬 Start Creating
              </Link>
              <Link
                href='https://explore.bts.network/'
                target='_blank'
                rel='noopener noreferrer'
                className='border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200'
              >
                🌟 Explore more
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
