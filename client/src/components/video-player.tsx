import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2, Maximize } from "lucide-react";

interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl?: string;
  title: string;
}

export default function VideoPlayer({ thumbnailUrl, videoUrl, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const handlePlay = () => {
    if (!videoUrl) {
      // For now, just show the thumbnail with play overlay
      // In a real app, this would load and play the actual video
      return;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="relative overflow-hidden bg-black group">
      <div 
        className="relative aspect-video cursor-pointer"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={handlePlay}
      >
        {/* Video Thumbnail */}
        <img 
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Play Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Button
              size="icon"
              className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-black hover:scale-110 transition-all duration-200"
            >
              <Play className="h-8 w-8 ml-1" />
            </Button>
          </div>
        )}
        
        {/* Video Controls */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center space-x-4">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay();
                }}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              
              {/* Progress Bar */}
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white w-1/3 rounded-full"></div>
              </div>
              
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Volume2 className="h-5 w-5" />
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Preview Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-masterclass-accent text-white px-3 py-1 rounded-full text-sm font-medium">
            Preview
          </span>
        </div>
      </div>
    </Card>
  );
}
