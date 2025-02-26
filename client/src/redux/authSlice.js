import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.userId = action.payload.userId; // Store the user's ID in the Redux store
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userId = null; // Reset the userId state when the user logs out
    },
  },
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
