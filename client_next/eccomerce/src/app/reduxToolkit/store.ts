"use client";

import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/products";
import cartSlice from "./features/cart/cartSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    [productsApi["reducerPath"]]: productsApi.reducer,
    shoppingCart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

// Setup listeners for automatic refetching and cache invalidation
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
