import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import GlobalPlayerBar from '@/components/layout/GlobalPlayerBar';
import Heading from '@/components/Heading';
import AlbumCard from '@/components/AlbumCard';
import SongListItem from '@/components/SongListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { PlayCircle, UserPlus } from 'lucide-react';

// Placeholder data
const artistsData: { [key: string]: any } = {
  dualipa: {
    id: 'dualipa',
    name: 'Dua Lipa',
    imageUrl: 'https://source.unsplash.com/random/400x400/?musician,pop,female',
    bio: 'Dua Lipa is an English-Albanian singer and songwriter. Her musical career began at age 14, when she began covering songs by other artists on YouTube.',
    topTracks: [
      { id: 's5', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,pop,song5' },
      { id: 's2', title: 'Don\'t Start Now', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:03', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,pop,song2' },
      { id: 's4', title: 'Physical', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:13', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,pop,song4' },
    ],
    albums: [
      { id: 'album1', title: 'Future Nostalgia', artist: 'Dua Lipa', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,pop', albumUrl: '/album/album1' },
      { id: 'albumX', title: 'Dua Lipa (Deluxe)', artist: 'Dua Lipa', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,singer', albumUrl: '/album/albumX' },
    ]
  },
   theweeknd: {
    id: 'theweeknd',
    name: 'The Weeknd',
    imageUrl: 'https://source.unsplash.com/random/400x400/?musician,rnb,male',
    bio: 'Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer.',
    topTracks: [
      { id: 's9', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,rnb,song4' },
      { id: 's3', title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,rnb,song3' },
      { id: 'sStarboy', title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: '3:50', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,rnb,star' },
    ],
    albums: [
      { id: 'album2', title: 'After Hours', artist: 'The Weeknd', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,rnb', albumUrl: '/album/album2' },
      { id: 'albumStarboy', title: 'Starboy', artist: 'The Weeknd', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,night', albumUrl: '/album/albumStarboy' },
    ]
  }
};

const ArtistDetailPage = () => {
  const { artistId } = useParams<{ artistId: string }>();
  console.log(`ArtistDetailPage loaded for artistId: ${artistId}`);
  
  const artist = artistId ? artistsData[artistId] : null;

  if (!artist) {
    return (
        <div className="flex h-screen bg-neutral-950 text-white">
            <Sidebar />
            <div className="ml-60 flex-1 flex flex-col overflow-hidden">
                <ScrollArea className="flex-1 bg-neutral-900">
                    <main className="p-6 pb-[110px] text-center">
                        <Heading title="Artist Not Found" level={1} className="mt-10" />
                        <p className="text-neutral-400">The artist you are looking for does not exist.</p>
                    </main>
                </ScrollArea>
                <GlobalPlayerBar />
            </div>
        </div>
    );
  }
  
  const handlePlaySong = (songId: string | number) => {
    console.log(`Play song ${songId} by ${artist.name}`);
  };

  const handlePlayTopSongs = () => {
    console.log(`Play top songs by ${artist.name}`);
  };

  const handleFollowArtist = () => {
    console.log(`Follow artist: ${artist.name}`);
  };
  
  const handlePlayAlbum = (albumId: string | number) => {
    console.log(`Play album ${albumId} by ${artist.name}`);
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      <Sidebar />
      <div className="ml-60 flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 bg-neutral-900">
          <main className="p-6 pb-[110px]">
            <header className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <Avatar className="w-40 h-40 md:w-48 md:h-48 shadow-2xl">
                <AvatarImage src={artist.imageUrl} alt={artist.name} className="object-cover" />
                <AvatarFallback className="text-5xl bg-neutral-700">{artist.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs uppercase text-neutral-400 mb-1">Artist</p>
                <Heading title={artist.name} level={1} className="mb-2 text-4xl md:text-5xl" />
                <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{artist.bio}</p>
                <div className="flex gap-3 justify-center md:justify-start">
                    <Button onClick={handlePlayTopSongs} size="lg" className="bg-green-500 hover:bg-green-600 text-black">
                        <PlayCircle size={20} className="mr-2" /> Play Top Songs
                    </Button>
                    <Button onClick={handleFollowArtist} size="lg" variant="outline" className="text-white border-neutral-600 hover:bg-neutral-700">
                        <UserPlus size={20} className="mr-2" /> Follow
                    </Button>
                </div>
              </div>
            </header>

            <section className="mb-8">
              <Heading title="Top Tracks" level={2} className="mb-4" />
              <div className="space-y-1">
                {artist.topTracks.map((song: any) => (
                  <SongListItem 
                    key={song.id} 
                    {...song}
                    onPlayPause={handlePlaySong} 
                  />
                ))}
              </div>
            </section>

            <section>
              <Heading title="Albums" level={2} className="mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {artist.albums.map((album: any) => (
                  <AlbumCard 
                    key={album.id} 
                    {...album}
                    onPlay={handlePlayAlbum}
                  />
                ))}
              </div>
            </section>
          </main>
        </ScrollArea>
        <GlobalPlayerBar />
      </div>
    </div>
  );
};

export default ArtistDetailPage;