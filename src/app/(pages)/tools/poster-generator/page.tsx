'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PosterGeneratorPage() {
  return (
    <div className='min-h-screen py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-2'>Movie Poster Generator</h1>
          <p className='text-xl text-muted-foreground'>Create stunning movie posters with ᗺTS AI</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>PosterAI Studio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='aspect-[16/9] relative rounded-lg overflow-hidden bg-muted'>
              <iframe 
                src="https://studio--posterai-p48gs.us-central1.hosted.app/"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 