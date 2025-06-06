import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, MoreHorizontal, Heart } from 'lucide-react'; // Example icons
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For small album art

interface SongListItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  albumArtUrl?: string;
  duration: string; // e.g., "3:45"
  isPlaying?: boolean; // To show play/pause state if this item is the current playing song
  isCurrent?: boolean; // To highlight if it's the current active song in player
  onPlayPause: (songId: string | number) => void;
  onAddToQueue?: (songId: string | number) => void;
  onOptions?: (songId: string | number, event: React.MouseEvent) => void; // For context menu
}

const SongListItem: React.FC<SongListItemProps> = ({
  id,
  title,
  artist,
  album,
  albumArtUrl,
  duration,
  isPlaying = false,
  isCurrent = false,
  onPlayPause,
  // onAddToQueue,
  onOptions,
}) => {
  console.log("Rendering SongListItem:", title, "isCurrent:", isCurrent, "isPlaying:", isPlaying);

  // Doraemon theme: Use theme colors for text, hover, active states. Rounded corners for hover effects.
  const baseClasses = "flex items-center p-2.5 pr-4 rounded-md transition-colors w-full text-left";
  const hoverClasses = "hover:bg-neutral-700/70"; // Doraemon theme: themed hover background
  const activeClasses = isCurrent ? "bg-neutral-700 text-green-400" : "text-neutral-200"; // Doraemon theme: themed active background and text (e.g., Doraemon Blue for bg, accent for text)

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${activeClasses} group`}
      role="button"
      tabIndex={0}
      onClick={() => { if(!isCurrent || !isPlaying) onPlayPause(id);}} // Play if not current playing song
      onKeyDown={(e) => e.key === 'Enter' && (!isCurrent || !isPlaying) && onPlayPause(id)}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {albumArtUrl ? (
            <Avatar className="h-10 w-10 rounded">
                <AvatarImage src={albumArtUrl} alt={album || title} />
                <AvatarFallback className="bg-neutral-600 text-xs">{title.charAt(0)}</AvatarFallback>
            </Avatar>
        ) : (
            <span className="w-10 text-center text-sm text-neutral-400 group-hover:hidden">
                {/* Placeholder for track number or play icon */}
            </span>
        )}
         <button
            onClick={(e) => { e.stopPropagation(); onPlayPause(id); }}
            className={`w-10 text-center ${isCurrent ? 'text-green-400' : 'text-neutral-400'} group-hover:text-white focus:outline-none md:hidden group-hover:block`}
            aria-label={isPlaying && isCurrent ? `Pause ${title}` : `Play ${title}`}
          >
           {(isPlaying && isCurrent) ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${isCurrent ? 'text-green-400' : 'text-white'}`}>{title}</p> {/* Doraemon theme: main text color, active color */}
          <p className="text-xs text-neutral-400 truncate">{artist}</p> {/* Doraemon theme: secondary text color */}
        </div>
      </div>

      {album && <p className="hidden md:block text-xs text-neutral-400 w-1/4 truncate px-2">{album}</p>}

      <div className="flex items-center gap-3 ml-auto pl-2">
        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 focus:opacity-100" onClick={(e) => { e.stopPropagation(); console.log('Like clicked for', id); /* Implement like functionality */}}>
            <Heart size={16} />
        </Button>
        <span className="text-xs text-neutral-400 w-10 text-right">{duration}</span>
        {onOptions && (
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 focus:opacity-100"
            onClick={(e) => { e.stopPropagation(); onOptions(id, e); }}
            aria-label="More options"
          >
            <MoreHorizontal size={18} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SongListItem;