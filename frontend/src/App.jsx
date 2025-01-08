import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { PlayerContext } from './utils/context';
import YouTube from 'react-youtube';
import axios from 'axios';

const Login = React.lazy(() => import('./pages/auth/Login'));
const Layout = React.lazy(() => import('./pages/Layout'));
const ErrorPage = React.lazy(() => import('./pages/errors/Error404'));
const MusicList = React.lazy(() => import('./pages/MusicList'));
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Playlist = React.lazy(() => import('./pages/MyPlaylist'));
const Player = React.lazy(() => import('./components/Player'));
const SearchedList = React.lazy(() => import('./pages/SearchedList'));

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/music',
        element: <MusicList />,
      },
      {
        path: '/music/playlist/:id',
        element: <Playlist />,
      },
      {
        path: '/music/search',
        element: <SearchedList />
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [videos, setVideos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const playerRef = useRef(null);
  const [favorites, setFavorites] = useState([]); // Favorite tracks
  const [isMinimized, setIsMinimized] = useState(false); // Minimized state

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  // Fetch videos from the API
  const fetchVideos = async () => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        relatedToVideoId: '7ghhRHRP6t4',
        part: 'id,snippet',
        type: 'video',
        maxResults: '50',
      },
      headers: {
        'x-rapidapi-key': 'e0edd28e50msh9cf119170b61c3ep150d6ajsn4a430688035b',
        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setVideos(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const playTrack = (trackDetails) => {
    setCurrentTrack(trackDetails);
    setIsPlaying(true);
    playerRef.current.setVolume(volume)
  };

  const toggleFavorite = (video) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id.videoId === video.id.videoId);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id.videoId !== video.id.videoId);
      } else {
        return [...prevFavorites, video];
      }
    });
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      playerRef.current.setVolume(volume)
      setIsPlaying(!isPlaying);
    }
  };

  const onSeek = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      setCurrentTime(time);
    }
  };

  const onVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setDuration(playerRef.current.getDuration());
    playerRef.current.setVolume(volume)
  };

  const onPlayerStateChange = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  const updateProgress = () => {
    if (playerRef.current && isPlaying) {
      setCurrentTime(playerRef.current.getCurrentTime());
    }
  };

  const onPrevious = (trackDetails) => {
    if (playerRef.current) {
      const index = videos.findIndex(
        (video) => playerRef.current.getVideoData().video_id === video.id.videoId
      );
      if (index > 0) {
        const previousTrack = videos[index - 1];
        playerRef.current.loadVideoById(previousTrack.id.videoId);
        setCurrentTrack({
          name: previousTrack.snippet.title,
          artist: previousTrack.snippet.channelTitle,
          videoId: previousTrack.id.videoId,
        });
      }
      setCurrentTrack(trackDetails);
      playerRef.current.setVolume(volume)
    }
  };

  const onNext = () => {
    if (playerRef.current) {
      const index = videos.findIndex(
        (video) => playerRef.current.getVideoData().video_id === video.id.videoId
      );
      if (index < videos.length - 1) {
        const nextTrack = videos[index + 1];
        playerRef.current.loadVideoById(nextTrack.id.videoId);
        setCurrentTrack({
          name: nextTrack.snippet.title,
          artist: nextTrack.snippet.channelTitle,
          videoId: nextTrack.id.videoId,
        });
      }
      playerRef.current.setVolume(volume);
    }
  };
  const opts = {
    height: '0', // Hide the default YouTube player
    width: '0',
    playerVars: {
      autoplay: 1
    },
  };
  useEffect(() => {
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        opts,
        videos,
        searchResults,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        favorites,
        isMinimized,
        toggleMinimize,
        setSearchResults,
        playTrack,
        toggleFavorite,
        handlePlayPause,
        onSeek,
        onVolumeChange,
        onPlayerReady,
        onPlayerStateChange,
        onPrevious,
        onNext,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
        <Player />
      </Suspense>
    </PlayerContext.Provider>
  );
};

export default App;