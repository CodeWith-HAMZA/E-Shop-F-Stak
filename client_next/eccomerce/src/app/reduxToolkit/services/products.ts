"use client";
// Need to use the React-specific entry point to import createApi
import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { Product } from "@/types/Product";

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: (args: void) => `/products`,
    }),
    getProductDetailsById: builder.query<Product, string>({
      query: (productId) => {
        console.log(productId);
        return `/products/${productId}`;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductDetailsByIdQuery } =
  productsApi;
