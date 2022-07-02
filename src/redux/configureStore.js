import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AppInfoSlice from "./AppInfoSlice";

const reducer = combineReducers({
    appInfo: AppInfoSlice,
});
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
