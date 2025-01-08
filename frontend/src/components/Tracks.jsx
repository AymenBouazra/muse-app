/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { PlayerContext } from '../utils/context';
import Track from './Track';

const Tracks = ({ videos }) => {
 const { currentTrack, handlePlayPause, isPlaying, toggleFavorite, favorites, playTrack } = useContext(PlayerContext);
 const onVideoClick = (videoId, title, channelTitle) => {
  playTrack({
   videoId,
   name: title,
   artist: channelTitle,
  });
 };

 return (
  <div className="space-y-2">
   {videos.length > 0 ? videos.map((video) => (
    <Track
     key={video.id.videoId}
     video={video}
     onPlay={onVideoClick}
     currentTrack={currentTrack?.videoId}
     isPlaying={isPlaying}
     handlePlayPause={handlePlayPause}
     toggleFavorite={toggleFavorite}
     isFavorite={favorites.some((fav) => fav.id.videoId === video.id.videoId)}
    />
   )) :
    <div className="flex items-center justify-center w-full h-full">
     <p className="text-center text-gray-400 text-sm">No music found</p>
     <p className="text-center text-gray-400 text-sm">Try searching for something</p>
     <p className="text-center text-gray-400 text-sm">or check back later</p>
    </div>
   }
  </div>
 );
};

export default Tracks;