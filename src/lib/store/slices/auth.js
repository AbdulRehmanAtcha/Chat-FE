import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogin: false,
};
// authSlice.js
export const selectUser = (state) => state.auth.user;

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      state.isLogin = true;
      state.user = action.payload.userResponse
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
    },

  },
});

export const { logout, loginHandler } = slice.actions;

export default slice.reducer;
