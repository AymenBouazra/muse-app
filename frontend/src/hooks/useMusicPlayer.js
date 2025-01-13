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

  const { currentTrack, videos, context, isPlaying, currentTime, duration, volume } = useSelector(
    (state) => state.player
  );

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
      dispatch(setVideos(response.data.items)); 
    } catch (error) {
      console.error(error);
    }
  };
  const playTrack = (trackDetails, videos, context) => {
    dispatch(setCurrentTrack(trackDetails)); 
    dispatch(setVideos(videos)); 
    dispatch(setContext(context)); 
    dispatch(setIsPlaying(true)); 
    if (playerRef.current) {
      playerRef.current.loadVideoById(trackDetails.videoId); 
      playerRef.current.setVolume(volume);
    }
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      dispatch(setIsPlaying(!isPlaying)); 
    }
  };

  const onSeek = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      dispatch(setCurrentTime(time)); 
    }
  };

  const onVolumeChange = (newVolume) => {
    dispatch(setVolume(newVolume));
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    dispatch(setDuration(playerRef.current.getDuration())); 
    playerRef.current.setVolume(volume);
  };

  const onPlayerStateChange = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      dispatch(setIsPlaying(true)); 
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      dispatch(setIsPlaying(false)); 
    }
  };

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
        ); 
      }
      playerRef.current.setVolume(volume);
    }
  };

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
        );
      }
      playerRef.current.setVolume(volume);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      if (playerRef.current && isPlaying) {
        dispatch(setCurrentTime(playerRef.current.getCurrentTime())); 
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