// store.js
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import userReducer from './features/userSlice';
import searchReducer from './features/searchSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    user: userReducer,
    search: searchReducer,
  },
});