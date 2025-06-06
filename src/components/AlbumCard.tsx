import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'; // Assuming Card is from shadcn
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlayCircle } from 'lucide-react'; // Icon for play button overlay

interface AlbumCardProps {
  id: string | number;
  title: string;
  artist: string;
  imageUrl: string;
  albumUrl?: string; // Link to album detail page
  onPlay?: (albumId: string | number) => void; // Optional: play entire album
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  id,
  title,
  artist,
  imageUrl,
  albumUrl,
  onPlay,
}) => {
  console.log("Rendering AlbumCard:", title);

  const content = (
    <Card className="w-full group overflow-hidden transition-all duration-300 hover:shadow-xl bg-neutral-800 border-neutral-700 rounded-lg"> {/* Doraemon theme: Rounded corners, specific bg/border */}
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-neutral-700">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlay && (
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onPlay(id); }}
            className="absolute bottom-2 right-2 p-2 bg-green-500 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-green-400" // Doraemon: Use theme play button color (e.g., Doraemon Red or Yellow accent)
            aria-label={`Play album ${title}`}
          >
            <PlayCircle size={28} />
          </button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <h3 className="text-md font-semibold text-white truncate" title={title}>{title}</h3> {/* Doraemon theme: text color */}
        <p className="text-xs text-neutral-400 truncate" title={artist}>{artist}</p> {/* Doraemon theme: secondary text color */}
      </CardContent>
      {/* CardFooter can be used for additional actions if needed */}
    </Card>
  );

  if (albumUrl) {
    return <Link to={albumUrl} className="block">{content}</Link>;
  }
  return content;
};

export default AlbumCard;