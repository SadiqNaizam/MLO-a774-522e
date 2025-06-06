import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, MoreHorizontal, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface SongListItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  albumArtUrl?: string;
  duration: string;
  isPlaying?: boolean;
  isCurrent?: boolean;
  onPlayPause: (songId: string | number) => void;
  onAddToQueue?: (songId: string | number) => void;
  onOptions?: (songId: string | number, event: React.MouseEvent) => void;
}

const SongListItem: React.FC<SongListItemProps> = ({\
  id,\
  title,\
  artist,\
  album,\
  albumArtUrl,\
  duration,\
  isPlaying = false,\
  isCurrent = false,\
  onPlayPause,\
  onOptions,\
}) => {\
  console.log("Rendering SongListItem:", title, "isCurrent:", isCurrent, "isPlaying:", isPlaying);

  const baseClasses = "flex items-center p-2.5 pr-4 rounded-md transition-colors w-full text-left";
  const hoverClasses = "hover:bg-secondary";
  const currentItemClasses = isCurrent ? "bg-accent/10 text-accent-foreground" : "text-foreground";

  return (
    <div
      className={cn(baseClasses, hoverClasses, currentItemClasses, 'group')}
      role="button"
      tabIndex={0}
      onClick={() => { if(!isCurrent || !isPlaying) onPlayPause(id);}}
      onKeyDown={(e) => e.key === 'Enter' && (!isCurrent || !isPlaying) && onPlayPause(id)}\
    >\
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {albumArtUrl ? (\
            <Avatar className="h-10 w-10 rounded">\
                <AvatarImage src={albumArtUrl} alt={album || title} />
                <AvatarFallback className="bg-muted text-muted-foreground text-xs">{title.charAt(0)}</AvatarFallback>\
            </Avatar>\
        ) : (\
            <span className="w-10 text-center text-sm text-muted-foreground group-hover:hidden">\
                {/* Placeholder for track number or play icon */}\
            </span>\
        )}\
         <button\
            onClick={(e) => { e.stopPropagation(); onPlayPause(id); }}\
            className={cn(\
              "w-10 text-center focus:outline-none md:hidden group-hover:block",\
              isCurrent ? 'text-primary' : 'text-muted-foreground',\
              'group-hover:text-primary'\
            )}\
            aria-label={isPlaying && isCurrent ? `Pause ${title}` : `Play ${title}`}\
          >\
           {(isPlaying && isCurrent) ? <Pause size={20} /> : <Play size={20} />}\
        </button>

        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-medium truncate", isCurrent ? 'text-primary' : 'text-foreground')}>{title}</p>
          <p className="text-xs text-muted-foreground truncate">{artist}</p>
        </div>
      </div>

      {album && <p className="hidden md:block text-xs text-muted-foreground w-1/4 truncate px-2">{album}</p>}

      <div className="flex items-center gap-3 ml-auto pl-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 focus:opacity-100" onClick={(e) => { e.stopPropagation(); console.log('Like clicked for', id); }}>\
            <Heart size={16} />
        </Button>
        <span className="text-xs text-muted-foreground w-10 text-right">{duration}</span>
        {onOptions && (
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 focus:opacity-100"
            onClick={(e) => { e.stopPropagation(); onOptions(id, e); }}
            aria-label="More options"
          >\
            <MoreHorizontal size={18} />
          </Button>
        )}\
      </div>
    </div>
  );
};\n\nexport default SongListItem;