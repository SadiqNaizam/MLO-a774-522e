import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlayCircle, ListMusic } from 'lucide-react';

interface PlaylistCardProps {
  id: string | number;
  name: string;
  creator?: string; // Or track count, etc.
  imageUrl?: string; // Optional image for the playlist
  playlistUrl?: string;
  onPlay?: (playlistId: string | number) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  id,
  name,
  creator,
  imageUrl,
  playlistUrl,
  onPlay,
}) => {
  console.log("Rendering PlaylistCard:", name);

  const content = (
    <Card className="w-full group overflow-hidden transition-all duration-300 hover:shadow-xl bg-neutral-800 border-neutral-700 rounded-lg"> {/* Doraemon theme: Rounded corners, bg/border */}
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-neutral-700 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          ) : (
            <ListMusic size={48} className="text-neutral-500" /> // Default icon if no image
          )}
        </AspectRatio>
        {onPlay && (
           <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onPlay(id); }}
            className="absolute bottom-2 right-2 p-2 bg-green-500 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-green-400" // Doraemon: Use theme play button color
            aria-label={`Play playlist ${name}`}
          >
            <PlayCircle size={28} />
          </button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <h3 className="text-md font-semibold text-white truncate" title={name}>{name}</h3> {/* Doraemon theme: text color */}
        {creator && <p className="text-xs text-neutral-400 truncate" title={creator}>{creator}</p>} {/* Doraemon theme: secondary text color */}
      </CardContent>
    </Card>
  );

  if (playlistUrl) {
    return <Link to={playlistUrl} className="block">{content}</Link>;
  }
  return content;
};

export default PlaylistCard;