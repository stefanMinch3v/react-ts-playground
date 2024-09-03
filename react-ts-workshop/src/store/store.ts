import { configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./session-slice";

export const store = configureStore({
  reducer: {
    session: sessionSlice.reducer
  }
});

export type AppDispatch = typeof store.dispatch;

export type AppRootState = ReturnType<typeof store.getState>;