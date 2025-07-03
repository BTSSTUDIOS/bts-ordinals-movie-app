import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Metadata } from 'next';
import { DEFAULT_METADATA } from '@/lib/constants';
import Providers from './providers';
import { getServerSession } from 'next-auth';

import Footer from '@/components/Footer';
import { authOptions } from '@/lib/auth';
import { Toaster } from 'sonner';

const font = Roboto_Mono({ subsets: ['latin']});

export const metadata: Metadata = DEFAULT_METADATA;

export default async function RootLayout({
  children,
}: Readonly<{
  children: NonNullable<React.ReactNode>;
  metadata: Metadata
}>) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta property="og:logo" content="https://blog.bts.network/wp-content/uploads/2025/07/BTS_LOGO-scaled.png" />
      </head>
      <body className={font.className}>
        <Providers session={session}>
          <Header />
          {children}
          <Footer />
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
