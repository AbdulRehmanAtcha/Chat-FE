import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import chats from "./slices/chats"
import { api } from "../../services/rtk";

export const store = configureStore({
  reducer: {
    auth,
    chats,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
