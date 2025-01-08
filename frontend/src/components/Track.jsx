/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Play, Pause, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
const Track = ({ video, onPlay, currentTrack, isPlaying, handlePlayPause, toggleFavorite, isFavorite }) => {
 const [showLyrics, setShowLyrics] = useState(false);
 const [lyrics, setLyrics] = useState('');

 const togglePlay = (id) => {
  console.log({ id, currentTrack });
  onPlay(id, video.snippet.title, video.snippet.channelTitle);
  handlePlayPause();
 };

 const toggleLyrics = async (title, artist) => {
  const response = await axios.get(`https://api.lyrics.ovh/v1/${'Adele'}/${'Hello'}`);
  const lyrics = response.data.lyrics;
  lyrics ? (
   setLyrics(lyrics),
   setShowLyrics(true)
  ) :
   setLyrics(lyrics);
 };

 return (
  <div
   className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-900/20 transition-colors group"
  >
   {/* Thumbnail and Play Button */}
   <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
    onClick={() => togglePlay(video.id.videoId)}
   >
    {/* Thumbnail */}
    <img
     src={video.snippet.thumbnails.high.url}
     alt={video.snippet.title}
     className="w-full h-full object-cover rounded-md"
    />
    {/* Play/Pause Button */}
    <button
     onClick={() => togglePlay(video.id.videoId)}
     className={`absolute inset-0 flex items-center justify-center w-full h-full bg-black/50 rounded-md opacity-${currentTrack === video.id.videoId && isPlaying ? '100' : '0'} group-hover:opacity-100 transition-opacity duration-300`}
    >
     {currentTrack === video.id.videoId && isPlaying ? (
      <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
     ) : (
      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
     )}
    </button>
   </div>

   {/* Track Title and Channel */}
   <div className="flex-1 mx-3 sm:mx-4 truncate">
    <h3 className="text-white font-medium text-sm sm:text-base truncate">
     {video.snippet.title}
    </h3>
    <h3 className="text-gray-400 text-xs sm:text-sm truncate">
     {video.snippet.channelTitle}
    </h3>
   </div>

   {/* Favorite Button */}
   <button
    onClick={() => toggleFavorite(video)}
    className="p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
   >
    <Heart
     className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`}
    />
   </button>

   {/* Lyrics Button */}
   <button
    onClick={() => toggleLyrics(video.snippet.title, video.snippet.channelTitle)}
    className="p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
   >
    {showLyrics ? (
     <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
    ) : (
     <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
    )}
   </button>

   {/* Lyrics Accordion */}
   {lyrics ? (
    <div className="col-span-full mt-2 text-gray-400 text-sm">
     <p>Lyrics for {'"' + video.snippet.title + '"'} will appear here.</p>
    </div>
   ) : <>
    {`${lyrics}`}</>}
  </div>
 );
};

export default Track;