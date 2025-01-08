/* eslint-disable react/prop-types */
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const Controls = ({
 isPlaying,
 onPlayPause,
 volume,
 onVolumeChange,
 onPrevious,
 onNext,
 isMinimized,
}) => {
 return (
  <div className="flex items-center justify-center space-x-4 sm:space-x-6">
   {/* Previous Button */}
   <button
    onClick={onPrevious}
    className={`p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${isMinimized ? 'p-1 -top-6 relative' : 'p-2 sm:p-2'}`}
   >
    <SkipBack className={`${isMinimized ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'} text-gray-700 dark:text-gray-200`} />
   </button>

   {/* Play/Pause Button */}
   <button
    onClick={onPlayPause}
    className={`p-2 sm:p-3 rounded-full bg-purple-500 hover:bg-purple-600 text-white ${isMinimized ? 'p-1 -top-6 relative' : 'p-2 sm:p-3'}`}
   >
    {isPlaying ? (
     <Pause className={`${isMinimized ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'}`} />
    ) : (
     <Play className={`${isMinimized ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'}`} />
    )}
   </button>

   {/* Next Button */}
   <button
    onClick={onNext}
    className={`p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${isMinimized ? 'p-1 -top-6 relative' : 'p-2 sm:p-2'}`}
   >
    <SkipForward className={`${isMinimized ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'} text-gray-700 dark:text-gray-200`} />
   </button>

   {/* Volume Control (Hidden when minimized) */}
   {!isMinimized && (
    <div className="flex items-center space-x-2">
     <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
     <input
      type="range"
      min={0}
      max={100}
      value={volume}
      onChange={(e) => onVolumeChange(Number(e.target.value))}
      className="w-16 sm:w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
     />
    </div>
   )}
  </div>
 );
};

export default Controls;