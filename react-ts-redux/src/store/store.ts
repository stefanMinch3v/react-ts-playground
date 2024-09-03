import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart-slice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

export type AppDispatch = typeof store.dispatch;

export type AppRootState = ReturnType<typeof store.getState>;