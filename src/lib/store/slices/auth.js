import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogin: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      state.isLogin = true;
      state.user = action.payload.userResponse
      // state.user = action?.payload?.data
      //   ? action?.payload?.data
      //   : action?.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
      localStorage.removeItem("token");
    },
  },
});

export const { logout, loginHandler } = slice.actions;

export default slice.reducer;
