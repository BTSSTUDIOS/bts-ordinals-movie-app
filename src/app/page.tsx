import { Container } from '@/components/common/Container';
import { BTC, DEFAULT_METADATA, DEFAULT_DIMENSIONS } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Home() {
  const { width, height } = DEFAULT_DIMENSIONS;
  return (
    <div className='min-h-screen py-2 gap-3'>
      <Container>
        <div className='flex text-4l flex-col items-center justify-center h-[80vh]'>
          <h1 className='text-4xl font-bold mb-4'>🎬 Welcome to BTS STUDIOS 🎬</h1>
          <p className='text-2xl font-semibold mb-4'>The World's First Decentralized Film Studio & Streaming Platform</p>
          <p className='text-xl mb-4'>Powered by <Image src={BTC} alt='btc-logo' width={width} height={height} className='inline' /> Bitcoin & Ordinals</p>
          <p className='text-lg mb-4'>🎥 Where Blockchain Meets Cinema 🎥</p>
          <p className='text-md'>Experience the future of filmmaking and content distribution on the Bitcoin blockchain</p>
          <p className='my-4 font-bold'>Visit <Link className='hover:text-sky-500' href='/inscribe'>/inscribe</Link> to explore our decentralized content platform</p>
        </div>
      </Container>
    </div>
  );
};
