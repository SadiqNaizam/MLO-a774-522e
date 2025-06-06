import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import GlobalPlayerBar from '@/components/layout/GlobalPlayerBar';
import Heading from '@/components/Heading';
import AlbumCard from '@/components/AlbumCard';
import PlaylistCard from '@/components/PlaylistCard';
import SongListItem from '@/components/SongListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon } from 'lucide-react';

const placeholderSongs = [
  { id: 'song1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,song1' },
  { id: 'song2', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,song2' },
  { id: 'song3', title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,song3' },
];

const placeholderAlbums = [
  { id: 'albumSearch1', title: 'Nostalgic Beats', artist: 'Various Artists', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,electronic', albumUrl: '/album/albumSearch1' },
  { id: 'albumSearch2', title: 'Acoustic Dreams', artist: 'Singer Songwriter', imageUrl: 'https://source.unsplash.com/random/400x400/?music,album,acoustic', albumUrl: '/album/albumSearch2' },
];

const placeholderPlaylists = [
  { id: 'plSearch1', name: 'Road Trip Anthems', creator: 'Community', imageUrl: 'https://source.unsplash.com/random/400x400/?music,playlist,roadtrip', playlistUrl: '/playlist/plSearch1' },
];

const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("songs");

  const handlePlaySong = (songId: string | number) => {
    console.log(`Play song from search: ${songId}`);
    // Implement play song logic
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
    // Implement search logic here
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      <Sidebar />
      <div className="ml-60 flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 bg-neutral-900">
          <main className="p-6 pb-[110px]">
            <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6 sticky top-0 bg-neutral-900 py-4 z-10 -mx-6 px-6">
              <SearchIcon className="text-neutral-400" />
              <Input
                type="search"
                placeholder="Search for songs, artists, albums..."
                className="flex-grow bg-neutral-800 border-neutral-700 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="ghost">Search</Button>
            </form>

            {searchTerm && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4 bg-neutral-800">
                  <TabsTrigger value="songs" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Songs</TabsTrigger>
                  <TabsTrigger value="albums" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Albums</TabsTrigger>
                  <TabsTrigger value="playlists" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Playlists</TabsTrigger>
                  <TabsTrigger value="artists" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Artists</TabsTrigger>
                </TabsList>
                
                <TabsContent value="songs">
                  <Heading title="Songs" level={3} className="mb-2" />
                  <div className="space-y-1">
                    {placeholderSongs.map(song => <SongListItem key={song.id} {...song} onPlayPause={handlePlaySong} />)}
                    {placeholderSongs.length === 0 && <p className="text-neutral-400">No songs found for "{searchTerm}".</p>}
                  </div>
                </TabsContent>
                <TabsContent value="albums">
                  <Heading title="Albums" level={3} className="mb-2" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {placeholderAlbums.map(album => <AlbumCard key={album.id} {...album} onPlay={(id) => console.log('Play album', id)} />)}
                    {placeholderAlbums.length === 0 && <p className="text-neutral-400">No albums found for "{searchTerm}".</p>}
                  </div>
                </TabsContent>
                <TabsContent value="playlists">
                  <Heading title="Playlists" level={3} className="mb-2" />
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {placeholderPlaylists.map(pl => <PlaylistCard key={pl.id} {...pl} onPlay={(id) => console.log('Play playlist', id)} />)}
                    {placeholderPlaylists.length === 0 && <p className="text-neutral-400">No playlists found for "{searchTerm}".</p>}
                  </div>
                </TabsContent>
                 <TabsContent value="artists">
                  <Heading title="Artists" level={3} className="mb-2" />
                  {/* Placeholder for artist items. Could be similar to AlbumCard or a dedicated ArtistCard */}
                  <p className="text-neutral-400">Artist results for "{searchTerm}" would show here.</p>
                </TabsContent>
              </Tabs>
            )}
            {!searchTerm && (
                <div className="text-center text-neutral-500 mt-10">
                    <Heading title="Search Music" subtitle="Find your favorite songs, artists, albums, and playlists." level={2} />
                </div>
            )}
          </main>
        </ScrollArea>
        <GlobalPlayerBar />
      </div>
    </div>
  );
};

export default SearchPage;