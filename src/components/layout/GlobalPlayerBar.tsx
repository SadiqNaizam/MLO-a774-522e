import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress'; // Or use Slider for seek
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Repeat, Shuffle } from 'lucide-react';

interface CurrentTrack {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  duration: number; // in seconds
  audioSrc: string; // URL to the audio file
}

// Example: This component would likely get track info and controls from a global state (Context/Redux/Zustand)
const GlobalPlayerBar: React.FC = () => {
  // Placeholder state - in a real app, this would come from a global music player service/context
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [progress, setProgress] = useState(0); // 0-100
  const [volume, setVolume] = useState(50); // 0-100
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  console.log("Rendering GlobalPlayerBar. Current track:", currentTrack?.title, "Playing:", isPlaying);

  // Dummy track for demonstration
  useEffect(() => {
    setCurrentTrack({
      id: '1',
      title: 'Doraemon no Uta',
      artist: 'Kumiko Osugi',
      albumArtUrl: '/placeholder.svg', // Replace with actual art
      duration: 180, // 3 minutes
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Placeholder audio
    });
  }, []);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? "Pausing" : "Playing", currentTrack.title);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false); // Unmute if adjusting volume
    console.log("Volume changed to:", value[0]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? "Unmuting" : "Muting");
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current && currentTrack) {
      const newTime = (value[0] / 100) * currentTrack.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentTrack) {
    // Optionally render a minimal bar or nothing if no track is loaded
    return (
      <footer className="fixed bottom-0 left-0 right-0 h-20 bg-neutral-800 border-t border-neutral-700 text-white p-3 flex items-center justify-center z-50">
        <p className="text-sm text-neutral-400">No track selected</p>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[90px] bg-neutral-800 border-t border-neutral-700 text-white p-3 flex items-center justify-between z-50"> {/* Doraemon theme: Use theme background and border */}
      {currentTrack && <audio ref={audioRef} src={currentTrack.audioSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => { if (audioRef.current) setProgress(0); }} onEnded={() => setIsPlaying(false)} />}
      
      {/* Left: Track Info */}
      <div className="flex items-center gap-3 w-1/4">
        <AspectRatio ratio={1/1} className="w-14 h-14 rounded overflow-hidden bg-neutral-700">
            <img src={currentTrack.albumArtUrl} alt={currentTrack.title} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '/placeholder.svg')} />
        </AspectRatio>
        <div>
          <h4 className="text-sm font-medium truncate">{currentTrack.title}</h4>
          <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Center: Player Controls & Seek Bar */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white"> {/* Doraemon theme: Icon color */}
            <Shuffle size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <SkipBack size={20} />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={handlePlayPause}
            className="bg-white text-black hover:bg-neutral-200 rounded-full w-10 h-10" /* Doraemon: Main play button (e.g., Doraemon Blue with White icon) */
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5"/>}
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <SkipForward size={20} />
          </Button>
           <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <Repeat size={18} />
          </Button>
        </div>
        <div className="w-full flex items-center gap-2 text-xs">
            <span className="text-neutral-400">{formatTime(audioRef.current?.currentTime || 0)}</span>
            <Slider
                defaultValue={[0]}
                value={[progress]}
                max={100}
                step={1}
                onValueChange={handleSeek}
                className="flex-1 [&>span:first-child]:h-1 [&>span>span]:h-1 [&>span>span]:bg-white [&>span:first-child]:bg-neutral-600" // Doraemon: Themed slider colors
            />
            <span className="text-neutral-400">{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center gap-3 w-1/4 justify-end">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-neutral-400 hover:text-white">
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
        <Slider
          defaultValue={[50]}
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 [&>span:first-child]:h-1 [&>span>span]:h-1 [&>span>span]:bg-white [&>span:first-child]:bg-neutral-600" // Doraemon: Themed slider colors
        />
        {/* <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
          <Maximize2 size={18} /> // Example: Fullscreen or lyrics button
        </Button> */}
      </div>
    </footer>
  );
};

export default GlobalPlayerBar;