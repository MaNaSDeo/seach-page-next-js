// store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      products: productReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
