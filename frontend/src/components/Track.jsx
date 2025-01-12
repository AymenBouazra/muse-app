/* eslint-disable react/prop-types */
import { Play, Pause, ListPlus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToPlaylist, removeFromPlaylist } from '../features/playlistSlice';
import toast from 'react-hot-toast';

const Track = ({
  video,
  playTrack,
  currentTrack,
  isPlaying,
  handlePlayPause,
  isFavorite,
  videos
}) => {
  const dispatch = useDispatch();

  const togglePlay = () => {
    playTrack(
      {
        videoId: video.id.videoId,
        name: video.snippet.title,
        artist: video.snippet.channelTitle,
      },
      videos, // Pass the list of tracks
      'musicList' // Set the context
    );
    handlePlayPause();
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromPlaylist(video.id.videoId));
      toast.success('Removed from playlist');
    } else {
      dispatch(addToPlaylist(video));
      toast.success('Added to playlist');
    }
  };

  // Determine if the current track is being played
  const isCurrentTrackPlaying = currentTrack === video.id.videoId && isPlaying;

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg hover:bg-purple-900/20 transition-colors group ${isCurrentTrackPlaying ? 'bg-gray-800' : ''}`}>
      {/* Thumbnail and Play Button */}
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" onClick={togglePlay}>
        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
          className="w-full h-full object-cover rounded-md"
        />
        <button
          onClick={togglePlay}
          className={`absolute inset-0 flex items-center justify-center w-full h-full bg-black/50 rounded-md opacity-${isCurrentTrackPlaying ? '100' : '0'
            } group-hover:opacity-100 transition-opacity duration-300`}
        >
          {isCurrentTrackPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          )}
        </button>
      </div>

      {/* Track Title and Channel */}
      <div className="flex-1 mx-3 sm:mx-4 truncate">
        <h3 className="text-white font-medium text-sm sm:text-base truncate">{video.snippet.title}</h3>
        <h3 className="text-gray-400 text-xs sm:text-sm truncate">{video.snippet.channelTitle}</h3>
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
      >
        <ListPlus
          className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`}
        />
      </button>
    </div>
  );
};

export default Track;