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
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="ml-60 flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 bg-background">
          <main className="p-6 pb-[110px]">
            <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6 sticky top-0 bg-background py-4 z-10 -mx-6 px-6 border-b border">
              <SearchIcon className="text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for songs, artists, albums..."
                className="flex-grow bg-card border-border focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="ghost">Search</Button>
            </form>

            {searchTerm && (\
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">\
                <TabsList className="mb-4 bg-muted text-muted-foreground">
                  <TabsTrigger value="songs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Songs</TabsTrigger>
                  <TabsTrigger value="albums" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Albums</TabsTrigger>
                  <TabsTrigger value="playlists" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Playlists</TabsTrigger>
                  <TabsTrigger value="artists" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Artists</TabsTrigger>
                </TabsList>
                
                <TabsContent value="songs">
                  <Heading title="Songs" level={3} className="mb-2" />
                  <div className="space-y-1">
                    {placeholderSongs.map(song => <SongListItem key={song.id} {...song} onPlayPause={handlePlaySong} />)}
                    {placeholderSongs.length === 0 && <p className="text-muted-foreground">No songs found for "{searchTerm}".</p>}
                  </div>
                </TabsContent>
                <TabsContent value="albums">
                  <Heading title="Albums" level={3} className="mb-2" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {placeholderAlbums.map(album => <AlbumCard key={album.id} {...album} onPlay={(id) => console.log('Play album', id)} />)}
                    {placeholderAlbums.length === 0 && <p className="text-muted-foreground">No albums found for "{searchTerm}".</p>}
                  </div>
                </TabsContent>
                <TabsContent value="playlists">
                  <Heading title="Playlists" level={3} className="mb-2" />
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {placeholderPlaylists.map(pl => <PlaylistCard key={pl.id} {...pl} onPlay={(id) => console.log('Play playlist', id)} />)}
                    {placeholderPlaylists.length === 0 && <p className="text-muted-foreground">No playlists found for "{searchTerm}".</p>}
                  </div>
                </TabsContent>
                 <TabsContent value="artists">
                  <Heading title="Artists" level={3} className="mb-2" />
                  <p className="text-muted-foreground">Artist results for "{searchTerm}" would show here.</p>
                </TabsContent>
              </Tabs>
            )}
            {!searchTerm && (
                <div className="text-center text-muted-foreground mt-10">
                    <Heading title="Search Music" subtitle="Find your favorite songs, artists, albums, and playlists." level={2} />
                </div>
            )}
          </main>
        </ScrollArea>
        <GlobalPlayerBar />
      </div>
    </div>
  );
};\n\nexport default SearchPage;