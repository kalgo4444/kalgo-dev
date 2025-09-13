import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/store/authSlice";
import news from "../features/user/main/store/newsSlice";

export const store = configureStore({
  reducer: {
    auth,
    news,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
