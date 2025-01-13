import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../utils/http';

export const fetchplaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(`/playlist`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToPlaylist = createAsyncThunk(
  'playlist/addToPlaylist',
  async (track, { rejectWithValue }) => {
    try {
      const response = await http.post(`/playlist/add`, { track });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromPlaylist = createAsyncThunk(
  'playlist/removeFromPlaylist',
  async (trackId, { rejectWithValue }) => {
    try {
      const response = await http.put(`/playlist/remove/${trackId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    tracks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchplaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchplaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload; 
      })
      .addCase(fetchplaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload; 
        console.log("Added to playlist:", state.tracks);
      })
      .addCase(addToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload; 
        console.log("Removed from playlist:", state.tracks);
      })
      .addCase(removeFromPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default playlistSlice.reducer;
