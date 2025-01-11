import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import axios from 'axios';
import {
  setVideos,
  setCurrentTrack,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
} from '../features/playerSlice';

export const useMusicPlayer = () => {
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  // Select state from Redux store
  const { currentTrack, videos, isPlaying, currentTime, duration, volume } = useSelector(
    (state) => state.player
  );

  // Fetch videos from YouTube API
  const fetchVideos = async () => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        relatedToVideoId: '7ghhRHRP6t4',
        part: 'id,snippet',
        type: 'video',
        maxResults: 8,
      },
      headers: {
        'x-rapidapi-key': 'e0edd28e50msh9cf119170b61c3ep150d6ajsn4a430688035b',
        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      dispatch(setVideos(response.data.items)); // Update videos in Redux store
    } catch (error) {
      console.error(error);
    }
  };

  // Play a track
  const playTrack = (trackDetails) => {
    dispatch(setCurrentTrack(trackDetails)); // Set current track in Redux store
    dispatch(setIsPlaying(true)); // Set playing state to true
    playerRef.current.setVolume(volume); // Set volume
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      playerRef.current.setVolume(volume);
      dispatch(setIsPlaying(!isPlaying)); // Toggle playing state in Redux store
    }
  };

  // Handle seeking
  const onSeek = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      dispatch(setCurrentTime(time)); // Update current time in Redux store
    }
  };

  // Handle volume change
  const onVolumeChange = (newVolume) => {
    dispatch(setVolume(newVolume)); // Update volume in Redux store
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  // Handle player ready event
  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    dispatch(setDuration(playerRef.current.getDuration())); // Set duration in Redux store
    playerRef.current.setVolume(volume);
  };

  // Handle player state change
  const onPlayerStateChange = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      dispatch(setIsPlaying(true)); // Set playing state to true
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      dispatch(setIsPlaying(false)); // Set playing state to false
    }
  };

  // Handle previous track
  const onPrevious = () => {
    if (playerRef.current) {
      const index = videos.findIndex(
        (video) => playerRef.current.getVideoData().video_id === video.id.videoId
      );
      if (index > 0) {
        const previousTrack = videos[index - 1];
        playerRef.current.loadVideoById(previousTrack.id.videoId);
        dispatch(
          setCurrentTrack({
            name: previousTrack.snippet.title,
            artist: previousTrack.snippet.channelTitle,
            videoId: previousTrack.id.videoId,
          })
        ); // Set previous track in Redux store
      }
      playerRef.current.setVolume(volume);
    }
  };

  // Handle next track
  const onNext = () => {
    if (playerRef.current) {
      const index = videos.findIndex(
        (video) => playerRef.current.getVideoData().video_id === video.id.videoId
      );
      if (index < videos.length - 1) {
        const nextTrack = videos[index + 1];
        playerRef.current.loadVideoById(nextTrack.id.videoId);
        dispatch(
          setCurrentTrack({
            name: nextTrack.snippet.title,
            artist: nextTrack.snippet.channelTitle,
            videoId: nextTrack.id.videoId,
          })
        ); // Set next track in Redux store
      }
      playerRef.current.setVolume(volume);
    }
  };

  // Update progress every second
  useEffect(() => {
    const updateProgress = () => {
      if (playerRef.current && isPlaying) {
        dispatch(setCurrentTime(playerRef.current.getCurrentTime())); // Update current time in Redux store
      }
    };

    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return {
    playerRef,
    currentTrack,
    videos,
    isPlaying,
    currentTime,
    duration,
    volume,
    fetchVideos,
    playTrack,
    handlePlayPause,
    onSeek,
    onVolumeChange,
    onPlayerReady,
    onPlayerStateChange,
    onPrevious,
    onNext,
  };
};