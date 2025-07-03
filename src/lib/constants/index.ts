import type { Metadata } from 'next';
export * from './imgs';
export * from './time';

export const APP_NAME = 'ᗺTS STUDIOS';
const CLEAN_APP_NAME = 'bts-studios-films'; // Simplified version for cookie names

export const DEFAULT_METADATA: Metadata = {
  title: APP_NAME,
  description: 'The World\'s First Decentralized Film Studio & Streaming Platform',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: APP_NAME,
    description: 'The World\'s First Decentralized Film Studio & Streaming Platform',
    url: 'https://app.bts.network',
    siteName: APP_NAME,
    images: [
      {
        url: 'https://blog.bts.network/wp-content/uploads/2025/07/bts_OG2MAIN.png',
        width: 1200,
        height: 630,
        alt: 'BTS STUDIOS - Decentralized Film Studio & Streaming Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: 'The World\'s First Decentralized Film Studio & Streaming Platform',
    images: ['https://blog.bts.network/wp-content/uploads/2025/07/bts_OG2MAIN.png'],
    creator: '@hodlbtsstudios',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
  },
};

export const DEFAULT_DIMENSIONS = {
  width: 50,
  height: 50
};

// The wallet cookie is a string with no spaces in it. We prefix the APP_NAME with __wallet-cookie and then attach the APP_NAME at the end for uniqueness
export const WALLET_COOKIE = `__wallet-cookie-${CLEAN_APP_NAME}`;
export const WALLET_SIGN_IN_MESSAGE = 'Sign into BTS STUDIOS';

export const SESSION_TOKEN_NAME = `${CLEAN_APP_NAME}.session-token`;

export const USE_LOW_POSTAGE = true;
export const ONE_BITCOIN = 100000000;

export const EXPLORER_URL = process.env.ORDINALS_EXPLORER_URL || 'https://explorer.ordinalsbot.com';
export const MEMPOOL_URL = process.env.MEMPOOL_URL || 'https://mempool.space';