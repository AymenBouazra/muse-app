import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import {
  setCurrentTrack,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setVideos,
  setContext,
} from '../features/playerSlice';
import axios from 'axios';

export const useMusicPlayer = () => {
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  // Select state from Redux store
  const { currentTrack, videos, context, isPlaying, currentTime, duration, volume } = useSelector(
    (state) => state.player
  );

  // Fetch videos from YouTube API (for MusicList)
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
  const playTrack = (trackDetails, videos, context) => {
    dispatch(setCurrentTrack(trackDetails)); // Set current track
    dispatch(setVideos(videos)); // Set the list of tracks
    dispatch(setContext(context)); // Set the context
    dispatch(setIsPlaying(true)); // Set playing state to true
    if (playerRef.current) {
      playerRef.current.loadVideoById(trackDetails.videoId); // Load the video
      playerRef.current.setVolume(volume); // Set volume
    }
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      dispatch(setIsPlaying(!isPlaying)); // Toggle playing state
    }
  };

  // Handle seeking
  const onSeek = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      dispatch(setCurrentTime(time)); // Update current time
    }
  };

  // Handle volume change
  const onVolumeChange = (newVolume) => {
    dispatch(setVolume(newVolume)); // Update volume
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  // Handle player ready event
  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    dispatch(setDuration(playerRef.current.getDuration())); // Set duration
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
    if (playerRef.current && videos.length > 0) {
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
        ); // Set previous track
      }
      playerRef.current.setVolume(volume);
    }
  };

  // Handle next track
  const onNext = () => {
    if (playerRef.current && videos.length > 0) {
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
        ); // Set next track
      }
      playerRef.current.setVolume(volume);
    }
  };

  // Update progress every second
  useEffect(() => {
    const updateProgress = () => {
      if (playerRef.current && isPlaying) {
        dispatch(setCurrentTime(playerRef.current.getCurrentTime())); // Update current time
      }
    };

    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return {
    playerRef,
    currentTrack,
    videos,
    context,
    isPlaying,
    currentTime,
    duration,
    volume,
    playTrack,
    fetchVideos,
    handlePlayPause,
    onSeek,
    onVolumeChange,
    onPlayerReady,
    onPlayerStateChange,
    onPrevious,
    onNext,
  };
};