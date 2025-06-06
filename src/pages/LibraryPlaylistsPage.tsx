import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import GlobalPlayerBar from '@/components/layout/GlobalPlayerBar';
import Heading from '@/components/Heading';
import PlaylistCard from '@/components/PlaylistCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const userPlaylists = [
  { id: 'upl1', name: 'My Morning Mix', creator: 'You', imageUrl: 'https://source.unsplash.com/random/400x400/?music,playlist,morning', playlistUrl: '/playlist/upl1' },
  { id: 'upl2', name: 'Late Night Coding', creator: 'You', imageUrl: 'https://source.unsplash.com/random/400x400/?music,playlist,coding', playlistUrl: '/playlist/upl2' },
  { id: 'upl3', name: 'Liked Songs', creator: 'You', imageUrl: 'https://source.unsplash.com/random/400x400/?music,playlist,heart', playlistUrl: '/playlist/liked' },
  { id: 'fpl1', name: '90s Hip Hop', creator: 'MusicApp Staff', imageUrl: 'https://source.unsplash.com/random/400x400/?music,playlist,90s,hiphop', playlistUrl: '/playlist/fpl1'},\
];

const LibraryPlaylistsPage = () => {
  console.log('LibraryPlaylistsPage loaded');

  const handleCreatePlaylist = () => {
    console.log('Create new playlist');
  };

  const handlePlayPlaylist = (playlistId: string | number) => {
    console.log(`Play playlist from library: ${playlistId}`);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="ml-60 flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 bg-background">
          <main className="p-6 pb-[110px]">
            <div className="flex justify-between items-center mb-6">
              <Heading title="Your Playlists" level={1} />
              <Button onClick={handleCreatePlaylist} variant="outline" className="text-foreground border-border hover:bg-secondary">
                <PlusCircle size={18} className="mr-2" />
                Create Playlist
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {userPlaylists.map(playlist => (
                <PlaylistCard key={playlist.id} {...playlist} onPlay={handlePlayPlaylist} />
              ))}
            </div>
            {userPlaylists.length === 0 && (
              <p className="text-muted-foreground mt-4">You haven't created or followed any playlists yet.</p>
            )}\
          </main>
        </ScrollArea>
        <GlobalPlayerBar />
      </div>
    </div>
  );
};\n\nexport default LibraryPlaylistsPage;