import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/store/slices/UserSlice.ts";

export const Store = configureStore({
  reducer: {
    user: userReducer
  }
});

export type ApplicationState = ReturnType<typeof Store.getState>;
export type ApplicationDispatch = typeof Store.dispatch;
