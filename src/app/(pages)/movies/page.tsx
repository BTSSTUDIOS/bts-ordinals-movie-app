'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Play } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  category: string;
  price: number;
  vimeoId: string;
}

export default function MoviesPage() {
  const { data: session } = useSession();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      // For now, let's use some dummy data until we set up Vimeo
      const dummyMovies: Movie[] = [
        {
          id: '1',
          title: 'Sample Movie 1',
          description: 'This is a sample movie description',
          thumbnail: 'https://picsum.photos/400/225',
          duration: 120,
          category: 'action',
          price: 0.0001,
          vimeoId: '123456789'
        },
        {
          id: '2',
          title: 'Sample Movie 2',
          description: 'Another sample movie description',
          thumbnail: 'https://picsum.photos/400/225',
          duration: 90,
          category: 'drama',
          price: 0.0002,
          vimeoId: '987654321'
        }
      ];
      
      setMovies(dummyMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'action', 'drama', 'comedy', 'documentary'];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Watch Movies</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Movie */}
        {selectedMovie ? (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>{selectedMovie.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Video Player Coming Soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Featured Movie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-3xl mx-auto">
                <div className="aspect-video">
                  <iframe 
                    src="https://player.vimeo.com/video/358185350?h=fc495ed011" 
                    className="w-full h-full rounded-lg"
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    <a href="https://vimeo.com/358185350" className="hover:text-primary">NIGHTSHADE - FULL LENGTH TRAILER</a> from{' '}
                    <a href="https://vimeo.com/primitivemind" className="hover:text-primary">BTS STUDIOS</a> on{' '}
                    <a href="https://vimeo.com" className="hover:text-primary">Vimeo</a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Movie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <Card
              key={movie.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedMovie(movie)}
            >
              <div className="relative aspect-video">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{movie.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {movie.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {Math.floor(movie.duration / 60)}:{(movie.duration % 60).toString().padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium">
                    {movie.price} BTC
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading movies...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredMovies.length === 0 && (
          <Card className="text-center py-8">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No movies found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 