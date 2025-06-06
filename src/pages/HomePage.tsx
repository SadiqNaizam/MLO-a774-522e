import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import GlobalPlayerBar from '@/components/layout/GlobalPlayerBar';
import Heading from '@/components/Heading';
import AlbumCard from '@/components/AlbumCard';
import PlaylistCard from '@/components/PlaylistCard';
import { ScrollArea } from '@/components/ui/scroll-area';

const placeholderAlbums = [
  { id: 'album1', title: 'Future Nostalgia', artist: 'Dua Lipa', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,pop', albumUrl: '/album/album1' },
  { id: 'album2', title: 'After Hours', artist: 'The Weeknd', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,rnb', albumUrl: '/album/album2' },
  { id: 'album3', title: 'Montero', artist: 'Lil Nas X', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,hiphop', albumUrl: '/album/album3' },
  { id: 'album4', title: 'Happier Than Ever', artist: 'Billie Eilish', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,alternative', albumUrl: '/album/album4' },
  { id: 'album5', title: 'Sour', artist: 'Olivia Rodrigo', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,teen', albumUrl: '/album/album5' },
];

const placeholderPlaylists = [
  { id: 'pl1', name: 'Chill Vibes', creator: 'MusicApp Curated', imageUrl: 'https://source.unsplash.com/random/400x400/?music,playlist,chill', playlistUrl: '/playlist/pl1' },
  { id: 'pl2', name: 'Workout Beats', creator: 'User123', imageUrl: 'https://source.unsplash.com/random/400x400/?music,playlist,gym', playlistUrl: '/playlist/pl2' },
  { id: 'pl3', name: 'Focus Flow', imageUrl: 'https://source.unsplash.com/random/400x400/?music,playlist,focus', playlistUrl: '/playlist/pl3' },
  { id: 'pl4', name: 'Indie Discovery', creator: 'MusicLover', imageUrl: 'https://source.unsplash.com/random/400x400/?music,playlist,indie', playlistUrl: '/playlist/pl4' },
];

const HomePage = () => {
  console.log('HomePage loaded');

  const handlePlayAlbum = (albumId: string | number) => {
    console.log(`Play album: ${albumId}`);
    // Implement play album logic, e.g., update global player context
  };

  const handlePlayPlaylist = (playlistId: string | number) => {
    console.log(`Play playlist: ${playlistId}`);
    // Implement play playlist logic
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      <Sidebar />
      <div className="ml-60 flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 bg-neutral-900">
          <main className="p-6 pb-[110px]">
            <section className="mb-8">
              <Heading title="New Releases" level={2} className="mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {placeholderAlbums.slice(0,6).map(album => (
                  <AlbumCard key={album.id} {...album} onPlay={handlePlayAlbum} />
                ))}
              </div>
            </section>

            <section className="mb-8">
              <Heading title="Featured Playlists" level={2} className="mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {placeholderPlaylists.map(playlist => (
                  <PlaylistCard key={playlist.id} {...playlist} onPlay={handlePlayPlaylist} />
                ))}
              </div>
            </section>

            <section>
              <Heading title="Recently Played" level={2} className="mb-4" />
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {placeholderAlbums.slice(2,5).map(album => ( // Different set for variety
                  <AlbumCard key={album.id} {...album} onPlay={handlePlayAlbum} />
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

export default HomePage;