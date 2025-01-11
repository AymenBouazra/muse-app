import { useState } from 'react';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import '../assets/css/player.css';
import YouTube from 'react-youtube';
import { Minimize2, Maximize2 } from 'lucide-react';
import { useMusicPlayer } from '../hooks/useMusicPlayer';

const Player = () => {
  // Use the custom hook for music player logic
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    handlePlayPause,
    onSeek,
    onVolumeChange,
    onPlayerReady,
    onPlayerStateChange,
    onPrevious,
    onNext,
  } = useMusicPlayer();

  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm transition-all duration-300`}>
      {currentTrack && (
        <div className="max-w-4xl mx-auto">
          {/* Minimize/Maximize Button */}
          <button
            onClick={toggleMinimize}
            className="absolute -top-8 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4 text-white" />
            ) : (
              <Minimize2 className="w-4 h-4 text-white" />
            )}
          </button>

          {/* Track Info (Hidden when minimized) */}
          {!isMinimized && (
            <>
              <span className="text-white text-center text-lg sm:text-xl font-bold mb-2 sm:mb-3 block">
                {currentTrack.name?.replace('&quot;', '').replace('&#39;', '') || ''}
              </span>
              <span className="text-white text-center text-xs sm:text-sm font-bold mb-3 sm:mb-4 block">
                {currentTrack.artist || ''}
              </span>
            </>
          )}

          {/* Progress Bar (Hidden when minimized) */}
          {(
            <ProgressBar currentTime={currentTime} duration={duration} onSeek={onSeek} />
          )}

          {/* Controls */}
          {<Controls
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            volume={volume}
            onVolumeChange={onVolumeChange}
            onPrevious={onPrevious}
            onNext={onNext}
            isMinimized={isMinimized}
          />}
        </div>
      )}

      {/* Hidden YouTube Player */}
      <YouTube
        videoId={currentTrack?.videoId}
        opts={{ height: '0', width: '0', playerVars: { autoplay: 1 } }}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
      />
    </div>
  )
};

export default Player;