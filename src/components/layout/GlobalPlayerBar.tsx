import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
// import { Progress } from '@/components/ui/progress'; // Or use Slider for seek
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';

interface CurrentTrack {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  duration: number; // in seconds
  audioSrc: string; // URL to the audio file
}

const GlobalPlayerBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [progress, setProgress] = useState(0); // 0-100
  const [volume, setVolume] = useState(50); // 0-100
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  console.log("Rendering GlobalPlayerBar. Current track:", currentTrack?.title, "Playing:", isPlaying);

  useEffect(() => {
    setCurrentTrack({
      id: '1',
      title: 'Doraemon no Uta',
      artist: 'Kumiko Osugi',
      albumArtUrl: '/placeholder.svg',
      duration: 180,
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
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
    setIsMuted(false);
    console.log("Volume changed to:", value[0]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? "Unmuting" : "Muting");
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) { // ensure duration is available
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current && currentTrack && currentTrack.duration) { // ensure duration
      const newTime = (value[0] / 100) * currentTrack.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };
  
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds === Infinity) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentTrack) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t border text-foreground p-3 flex items-center justify-center z-50">
        <p className="text-sm text-muted-foreground">No track selected</p>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[90px] bg-card border-t border text-foreground p-3 flex items-center justify-between z-50">
      {currentTrack && <audio ref={audioRef} src={currentTrack.audioSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => { if (audioRef.current) setProgress(0); }} onEnded={() => setIsPlaying(false)} />}
      
      <div className="flex items-center gap-3 w-1/4">
        <AspectRatio ratio={1/1} className="w-14 h-14 rounded overflow-hidden bg-muted">
            <img src={currentTrack.albumArtUrl} alt={currentTrack.title} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '/placeholder.svg')} />
        </AspectRatio>
        <div>
          <h4 className="text-sm font-medium truncate text-foreground">{currentTrack.title}</h4>
          <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Shuffle size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <SkipBack size={20} />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={handlePlayPause}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-10 h-10"
          >\
            {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5"/>}
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <SkipForward size={20} />
          </Button>
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Repeat size={18} />
          </Button>
        </div>
        <div className="w-full flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">{formatTime(audioRef.current?.currentTime || 0)}</span>
            <Slider
                defaultValue={[0]}
                value={[progress]}
                max={100}
                step={1}
                onValueChange={handleSeek}
                className="flex-1 [&>span:first-child]:h-1 [&>span>span]:h-1 [&>span>span]:bg-primary [&>span:first-child]:bg-secondary"
            />
            <span className="text-muted-foreground">{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 w-1/4 justify-end">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-muted-foreground hover:text-foreground">
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}\
        </Button>
        <Slider
          defaultValue={[50]}
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 [&>span:first-child]:h-1 [&>span>span]:h-1 [&>span>span]:bg-primary [&>span:first-child]:bg-secondary"
        />
      </div>
    </footer>
  );
};\n\nexport default GlobalPlayerBar;