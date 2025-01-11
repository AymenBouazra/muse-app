import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTrack: null,
  videos: [],
  searchResults: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 50,
  favorites: [], // Add favorites state
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    toggleFavorite: (state, action) => {
      const video = action.payload;
      const isFavorite = state.favorites.some((fav) => fav.id.videoId === video.id.videoId);
      if (isFavorite) {
        state.favorites = state.favorites.filter((fav) => fav.id.videoId !== video.id.videoId);
      } else {
        state.favorites.push(video);
      }
    },
  },
});

export const {
  setCurrentTrack,
  setVideos,
  setSearchResults,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleFavorite,
} = playerSlice.actions;

export default playerSlice.reducer;