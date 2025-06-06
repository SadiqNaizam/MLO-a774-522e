import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlayCircle } from 'lucide-react';

interface AlbumCardProps {
  id: string | number;
  title: string;
  artist: string;
  imageUrl: string;
  albumUrl?: string;
  onPlay?: (albumId: string | number) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({\
  id,\
  title,\
  artist,\
  imageUrl,\
  albumUrl,\
  onPlay,\
}) => {\
  console.log("Rendering AlbumCard:", title);

  const content = (\
    <Card className="w-full group overflow-hidden transition-all duration-300 hover:shadow-xl bg-card border rounded-lg">
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-muted">
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
            className="absolute bottom-2 right-2 p-2 bg-accent text-accent-foreground rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={`Play album ${title}`}
          >\
            <PlayCircle size={28} />
          </button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <h3 className="text-md font-semibold text-card-foreground truncate" title={title}>{title}</h3>
        <p className="text-xs text-muted-foreground truncate" title={artist}>{artist}</p>
      </CardContent>
    </Card>
  );

  if (albumUrl) {
    return <Link to={albumUrl} className="block">{content}</Link>;
  }
  return content;
};\n\nexport default AlbumCard;