"use client";
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Product } from "@/types/Product";

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getOrders: builder.query<Product[], void>({
      query: (args: void) => `/products`,
    }),
    getOrderDetails: builder.query<Product, void>({
      query: (productId) => {
        console.log(productId);
        return `/products/${productId}`;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOrdersQuery, useGetOrderDetailsQuery } = productsApi;
