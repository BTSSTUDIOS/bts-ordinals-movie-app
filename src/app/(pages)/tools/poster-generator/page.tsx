'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PosterGeneratorPage() {
  return (
    <div className='min-h-screen py-8 px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-2'>
            <span className='bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent'>
              🎨 Movie Poster Generator 🎨
            </span>
          </h1>
          <p className='text-xl text-gray-600'>Create stunning movie posters with ᗺTS AI</p>
        </div>

        <div className='relative group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden'>
          <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-pink-400 to-rose-500'></div>
          <div className='relative z-10'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>
              <span className='bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent'>
                ✨ PosterAI Studio ✨
              </span>
            </h2>
            <div className='aspect-[16/9] relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-lg'>
              <iframe 
                src="https://studio--posterai-p48gs.us-central1.hosted.app/"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className='mt-6 text-center'>
              <p className='text-gray-600 mb-4'>
                Use our AI-powered poster generator to create professional movie posters for your films. 
                Simply describe your vision and let our AI bring it to life!
              </p>
              <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-500'>
                <span className='flex items-center gap-1'>
                  <span className='text-green-500'>✓</span>
                  AI-powered design
                </span>
                <span className='flex items-center gap-1'>
                  <span className='text-green-500'>✓</span>
                  High-resolution output
                </span>
                <span className='flex items-center gap-1'>
                  <span className='text-green-500'>✓</span>
                  Customizable styles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 