import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import { api } from "../../services/rtk";

export const store = configureStore({
  reducer: {
    auth,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
