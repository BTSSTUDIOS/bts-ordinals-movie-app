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
      href: '/stream'
    },
    {
      icon: '💎',
      title: 'Bitcoin Integration',
      description: 'Wallet connection, content inscription, and payment processing',
      color: 'from-orange-400 to-yellow-500',
      buttonText: 'Connect Wallet',
      href: '/wallet'
    },
    {
      icon: '🎨',
      title: 'AI-Powered Tools',
      description: 'Movie poster generation and content optimization',
      color: 'from-purple-400 to-pink-500',
      buttonText: 'Create Poster',
      href: '/ai-tools'
    },
    {
      icon: '💰',
      title: 'Rewards System',
      description: 'Creator earnings, view rewards, and referral bonuses',
      color: 'from-green-400 to-emerald-500',
      buttonText: 'Earn Rewards',
      href: '/rewards'
    },
    {
      icon: '🔒',
      title: 'Secure Authentication',
      description: 'NextAuth.js powered secure user authentication',
      color: 'from-red-400 to-pink-500',
      buttonText: 'Sign In',
      href: '/auth'
    },
    {
      icon: '🌐',
      title: 'Global Distribution',
      description: 'Worldwide content distribution on Bitcoin blockchain',
      color: 'from-indigo-400 to-purple-500',
      buttonText: 'Explore',
      href: '/explore'
    }
  ];

  return (
    <div className='min-h-screen py-2 gap-3 bg-gradient-to-br from-white via-gray-50 to-gray-100'>
      <Container>
        <div className='flex text-4l flex-col items-center justify-center h-[60vh]'>
          <h1 className='text-4xl font-bold mb-4 text-gray-900'>🎬 Welcome to BTS STUDIOS 🎬</h1>
          <p className='text-2xl font-semibold mb-4 text-gray-800'>The World&apos;s First Decentralized Film Studio & Streaming Platform</p>
          <p className='text-xl mb-4 text-gray-700'>Powered by <Image src={BTC} alt='btc-logo' width={width} height={height} className='inline' /> Bitcoin & Ordinals</p>
          <p className='text-lg mb-4 text-gray-700'>🎥 Where Blockchain Meets Cinema 🎥</p>
          <p className='text-md text-gray-600'>Experience the future of filmmaking and content distribution on the Bitcoin blockchain</p>
          <p className='my-4 font-bold text-gray-800'>Visit <Link className='hover:text-sky-500 text-blue-600' href='/inscribe'>/inscribe</Link> to explore our decentralized content platform</p>
        </div>

        <div className='py-12'>
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

        <div className='py-16 text-center'>
          <div className='bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl p-12 shadow-2xl'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              🚀 Ready to Join the Future? 🚀
            </h2>
            <p className='text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
              Be part of the revolution in decentralized filmmaking. Create, share, and earn on the Bitcoin blockchain.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/inscribe'
                className='bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
              >
                🎬 Start Creating
              </Link>
              <Link
                href='/explore'
                className='border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200'
              >
                🌟 Explore Content
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
