/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Track from './Track';
import { useEffect } from 'react';
import { fetchplaylist } from '../features/playlistSlice';

const Tracks = ({ videos, playTrack }) => {
 const dispatch = useDispatch();
 const { currentTrack, isPlaying, setIsPlaying } = useSelector((state) => state.player);
 const { tracks } = useSelector((state) => state.playlist);

 const handlePlayPause = () => {
  dispatch(setIsPlaying(!isPlaying));
 };

 useEffect(() => {
  const getPlaylist = async () => {
   dispatch(fetchplaylist());
  };
  getPlaylist();
 }, [dispatch]);

 return (
  <div className="space-y-2">
   {videos?.map((video) => {
    return (
     <Track
      key={video.id.videoId}
      video={video}
      playTrack={playTrack}
      currentTrack={currentTrack?.videoId}
      isPlaying={isPlaying}
      handlePlayPause={handlePlayPause}
      isFavorite={tracks.some((fav) => fav.id.videoId === video.id.videoId)}
      videos={videos}
     />
    );
   })}
  </div>
 );
};

export default Tracks;