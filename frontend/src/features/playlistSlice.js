import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../utils/http';

// Fetch playlist
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

// Add to playlist
export const addToPlaylist = createAsyncThunk(
  'playlist/addToPlaylist',
  async (track, { rejectWithValue }) => {
    try {
      const response = await http.post(`/playlist/add`, { track });
      return response.data; // Assume the response contains the updated playlist
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Remove from playlist
export const removeFromPlaylist = createAsyncThunk(
  'playlist/removeFromPlaylist',
  async (trackId, { rejectWithValue }) => {
    try {
      const response = await http.put(`/playlist/remove/${trackId}`);
      return response.data; // Assume the response contains the updated playlist
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
      // Fetch playlist
      .addCase(fetchplaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchplaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload; // Update the tracks array with the fetched playlist
      })
      .addCase(fetchplaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to playlist
      .addCase(addToPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload; // Update the tracks array with the new playlist
        console.log("Added to playlist:", state.tracks);
      })
      .addCase(addToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from playlist
      .addCase(removeFromPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload; // Update the tracks array with the updated playlist
        console.log("Removed from playlist:", state.tracks);
      })
      .addCase(removeFromPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default playlistSlice.reducer;
