/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Track from './Track';
import {
 setCurrentTrack,
 setIsPlaying,
 toggleFavorite,
} from '../features/playerSlice';

const Tracks = ({ videos }) => {
 const dispatch = useDispatch();

 // Select state from Redux store
 const { currentTrack, isPlaying, favorites } = useSelector((state) => state.player);

 // Handle video click (play track)
 const onVideoClick = (videoId, title, channelTitle) => {
  dispatch(
   setCurrentTrack({
    videoId,
    name: title,
    artist: channelTitle,
   })
  );
  dispatch(setIsPlaying(true)); // Start playing
 };

 // Handle play/pause
 const handlePlayPause = () => {
  dispatch(setIsPlaying(!isPlaying)); // Toggle playing state
 };

 // Handle favorite toggle
 const handleToggleFavorite = (video) => {
  dispatch(toggleFavorite(video)); // Toggle favorite in Redux store
 };

 return (
  <div className="space-y-2">
   {videos?.length > 0 ? (
    videos?.map((video) => (
     <Track
      key={video.id.videoId}
      video={video}
      onPlay={onVideoClick}
      currentTrack={currentTrack?.videoId}
      isPlaying={isPlaying}
      handlePlayPause={handlePlayPause}
      toggleFavorite={handleToggleFavorite}
      isFavorite={favorites.some((fav) => fav.id.videoId === video.id.videoId)}
     />
    ))
   ) : (
    <div className="flex items-center justify-center w-full h-full">
     <p className="text-center text-gray-400 text-sm">No music found</p>
     <p className="text-center text-gray-400 text-sm">Try searching for something</p>
     <p className="text-center text-gray-400 text-sm">or check back later</p>
    </div>
   )}
  </div>
 );
};

export default Tracks;