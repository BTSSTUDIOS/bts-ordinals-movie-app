'use client';

import { AuthContext } from '@/app/providers/AuthContext';
import { useContext } from 'react';
import ConnectWallet from './ConnectWallet';
import { Loading } from '../forms/common';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';

export default function Header() {
  
  const { loading: authLoading } = useContext(AuthContext);

  return (
    <header className='h-[--header-height] flex justify-center items-center bg-white border-b border-gray-200 shadow-sm'>
      <div className='
          flex justify-between items-center 
          px-4 md:px-16 
          w-full
        '
      >
        <div className='flex items-center space-x-3'>
          <Image 
            src="https://i0.wp.com/blog.bts-studios.io/wp-content/uploads/2024/09/xBTS_STUDIOS_ORG.png?w=200&ssl=1"
            alt="BTS STUDIOS Logo"
            width={40}
            height={40}
            className='rounded-lg'
          />
          <h1 className='text-2xl font-bold text-gray-900'>{APP_NAME}</h1>
        </div>
        { authLoading && <Loading /> }
        { !authLoading && <ConnectWallet />}
      </div>
    </header>
  );
}