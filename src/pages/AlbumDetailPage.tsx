import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import GlobalPlayerBar from '@/components/layout/GlobalPlayerBar';
import Heading from '@/components/Heading';
import SongListItem from '@/components/SongListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlayCircle, Shuffle } from 'lucide-react';

const albumsData: { [key: string]: any } = {\
  album1: {\
    id: 'album1',\
    title: 'Future Nostalgia',\
    artist: 'Dua Lipa',\
    artistUrl: '/artist/dualipa',\
    releaseDate: 'March 27, 2020',\
    imageUrl: 'https://source.unsplash.com/random/800x800/?music,album,pop',\
    songs: [\
      { id: 's1', title: 'Future Nostalgia', artist: 'Dua Lipa', duration: '3:04', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,pop,song1' },\
      { id: 's2', title: "Don't Start Now", artist: 'Dua Lipa', duration: '3:03', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,pop,song2' },\
      { id: 's3', title: 'Cool', artist: 'Dua Lipa', duration: '3:29', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,pop,song3' },\
      { id: 's4', title: 'Physical', artist: 'Dua Lipa', duration: '3:13', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,pop,song4' },\
      { id: 's5', title: 'Levitating', artist: 'Dua Lipa', duration: '3:23', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,pop,song5' },\
    ]\
  },\
  album2: {\
    id: 'album2',\
    title: 'After Hours',\
    artist: 'The Weeknd',\
    artistUrl: '/artist/theweeknd',\
    releaseDate: 'March 20, 2020',\
    imageUrl: 'https://source.unsplash.com/random/800x800/?music,album,rnb',\
    songs: [\
      { id: 's6', title: 'Alone Again', artist: 'The Weeknd', duration: '4:10', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,rnb,song1' },\
      { id: 's7', title: 'Too Late', artist: 'The Weeknd', duration: '3:59', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,rnb,song2' },\
      { id: 's8', title: 'Hardest to Love', artist: 'The Weeknd', duration: '3:31', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,rnb,song3' },\
      { id: 's9', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', albumArtUrl: 'https://source.unsplash.com/random/100x100/?music,rnb,song4' },\
    ]\
  }\
};\

const AlbumDetailPage = () => {\
  const { albumId } = useParams<{ albumId: string }>();\
  console.log(`AlbumDetailPage loaded for albumId: ${albumId}`);\
  \
  const album = albumId ? albumsData[albumId] : null;\

  if (!album) {\
    return (\
        <div className="flex h-screen bg-background text-foreground">\
            <Sidebar />\
            <div className="ml-60 flex-1 flex flex-col overflow-hidden">\
                <ScrollArea className="flex-1 bg-background">\
                    <main className="p-6 pb-[110px] text-center">\
                        <Heading title="Album Not Found" level={1} className="mt-10" />\
                        <p className="text-muted-foreground">The album you are looking for does not exist or could not be loaded.</p>\
                    </main>\
                </ScrollArea>\
                <GlobalPlayerBar />\
            </div>\
        </div>\
    );\
  }\

  const handlePlaySong = (songId: string | number) => {\
    console.log(`Play song ${songId} from album ${album.title}`);\
  };\
  \
  const handlePlayAlbum = () => {\
    console.log(`Play entire album: ${album.title}`);\
  };\

  const handleShufflePlayAlbum = () => {\
    console.log(`Shuffle play album: ${album.title}`);\
  };\

  return (\
    <div className="flex h-screen bg-background text-foreground">\
      <Sidebar />\
      <div className="ml-60 flex-1 flex flex-col overflow-hidden">\
        <ScrollArea className="flex-1 bg-background">\
          <main className="p-6 pb-[110px]">
            <header className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-end">\
              <img \
                src={album.imageUrl} \
                alt={album.title} \
                className="w-48 h-48 md:w-60 md:h-60 rounded-lg shadow-2xl object-cover"\
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/240')}\
              />\
              <div className="flex-1 text-center md:text-left">\
                <p className="text-xs uppercase text-muted-foreground mb-1">Album</p>\
                <Heading title={album.title} level={1} className="mb-1 text-4xl md:text-5xl" />\
                <p className="text-lg text-foreground mb-1">\
                  By <Link to={album.artistUrl} className="hover:underline font-semibold text-primary">{album.artist}</Link>\
                </p>\
                <p className="text-sm text-muted-foreground">{album.releaseDate} &bull; {album.songs.length} songs</p>\
                <div className="mt-4 flex gap-3 justify-center md:justify-start">\
                    <Button onClick={handlePlayAlbum} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">\
                        <PlayCircle size={20} className="mr-2" /> Play\
                    </Button>\
                    <Button onClick={handleShufflePlayAlbum} size="lg" variant="outline" className="text-foreground border-border hover:bg-secondary">\
                        <Shuffle size={20} className="mr-2" /> Shuffle\
                    </Button>\
                </div>\
              </div>\
            </header>\

            <section>\
              <Heading title="Tracks" level={2} className="mb-4 sr-only" />\
              <div className="space-y-1">\
                {album.songs.map((song: any) => (\
                  <SongListItem \
                    key={song.id} \
                    {...song} \
                    album={album.title}\
                    onPlayPause={handlePlaySong} \
                  />\
                ))}\
              </div>\
            </section>\
          </main>\
        </ScrollArea>\
        <GlobalPlayerBar />\
      </div>\
    </div>\
  );\
};\n\nexport default AlbumDetailPage;