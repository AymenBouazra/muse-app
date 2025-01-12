import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../utils/http';
const initialState = {
  user: JSON.parse(localStorage.getItem('user-data')) || null,
  token: localStorage.getItem('token') || null,
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (url, { rejectWithValue }) => {
    try {
      const response = await http.get(url); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user-data', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user-data');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(getUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.loading = false;
          state.tracks = action.payload;
        })
        .addCase(getUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
      }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;