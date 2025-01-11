import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user-data')) || null,
  token: localStorage.getItem('token') || null,
};

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
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;