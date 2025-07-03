'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ScriptGeneratorPage() {
  return (
    <div className='min-h-screen py-8 px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-2'>
            <span className='bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent'>
              📝 Movie Script Generator 📝
            </span>
          </h1>
          <p className='text-xl text-gray-600'>Create compelling movie scripts with ᗺTS AI</p>
        </div>

        <div className='relative group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden'>
          <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-red-500'></div>
          <div className='relative z-10'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>
              <span className='bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent'>
                ✨ ScriptAI Studio ✨
              </span>
            </h2>
            <div className='aspect-[16/9] relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-lg'>
              <iframe 
                src="https://scripts.bts.network/"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className='mt-6 text-center'>
              <p className='text-gray-600 mb-4'>
                Use our AI-powered script generator to create professional movie scripts for your films. 
                Simply describe your vision and let our AI bring your story to life!
              </p>
              <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-500'>
                <span className='flex items-center gap-1'>
                  <span className='text-green-500'>✓</span>
                  AI-powered script writing
                </span>
                <span className='flex items-center gap-1'>
                  <span className='text-green-500'>✓</span>
                  Multiple genres supported
                </span>
                <span className='flex items-center gap-1'>
                  <span className='text-green-500'>✓</span>
                  Professional formatting
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 