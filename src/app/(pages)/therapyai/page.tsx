'use client';

export default function TherapyAIPage() {
  return (
    <div className='min-h-screen py-8 px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-2'>
            <span className='bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent'>
              🧠 BTS Therapy AI 🧠
            </span>
          </h1>
          <p className='text-xl text-gray-600'>AI-powered guidance to help filmmakers evolve in the changing film industry landscape</p>
        </div>

        <div className='relative group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden'>
          <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-teal-400 to-cyan-500'></div>
          <div className='relative z-10'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>
              <span className='bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent'>
                ✨ AI Therapy Studio ✨
              </span>
            </h2>
            <div className='aspect-[16/9] relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-lg'>
              <iframe 
                src="https://therapy.bts.network/"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className='mt-6 text-center'>
              <p className='text-gray-600 mb-4'>
                Connect with our AI therapy system designed specifically for filmmakers and content creators. 
                Get personalized guidance to navigate the evolving landscape of the film industry.
              </p>
              <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-500'>
                <span className='flex items-center gap-1'>
                  <span className='text-green-500'>✓</span>
                  AI-powered guidance
                </span>
                <span className='flex items-center gap-1'>
                  <span className='text-green-500'>✓</span>
                  Industry insights
                </span>
                <span className='flex items-center gap-1'>
                  <span className='text-green-500'>✓</span>
                  Personalized support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 