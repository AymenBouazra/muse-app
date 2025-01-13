import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: null,
  videos: [], 
  context: 'musicList', 
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 50,
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
    setContext: (state, action) => {
      state.context = action.payload;
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
  },
});

export const {
  setCurrentTrack,
  setVideos,
  setContext,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
} = playerSlice.actions;

export default playerSlice.reducer;