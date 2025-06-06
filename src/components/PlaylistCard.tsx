import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlayCircle, ListMusic } from 'lucide-react';

interface PlaylistCardProps {
  id: string | number;
  name: string;
  creator?: string;
  imageUrl?: string;
  playlistUrl?: string;
  onPlay?: (playlistId: string | number) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({\
  id,\
  name,\
  creator,\
  imageUrl,\
  playlistUrl,\
  onPlay,\
}) => {\
  console.log("Rendering PlaylistCard:", name);

  const content = (\
    <Card className="w-full group overflow-hidden transition-all duration-300 hover:shadow-xl bg-card border rounded-lg">
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-muted flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          ) : (
            <ListMusic size={48} className="text-muted-foreground" />
          )}
        </AspectRatio>
        {onPlay && (
           <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onPlay(id); }}
            className="absolute bottom-2 right-2 p-2 bg-accent text-accent-foreground rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={`Play playlist ${name}`}
          >\
            <PlayCircle size={28} />
          </button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <h3 className="text-md font-semibold text-card-foreground truncate" title={name}>{name}</h3>
        {creator && <p className="text-xs text-muted-foreground truncate" title={creator}>{creator}</p>}
      </CardContent>
    </Card>
  );

  if (playlistUrl) {
    return <Link to={playlistUrl} className="block">{content}</Link>;
  }
  return content;
};\n\nexport default PlaylistCard;