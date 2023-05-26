"use client";
// Need to use the React-specific entry point to import createApi
import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { Product, ProductQueryFilters } from "@/types/Product";

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5500/api/v1",
    headers: {
      category: "",
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: Product[]; success: boolean; totalResults: number },
      ProductQueryFilters
    >({
      query: (queryParams) => ({
        url: `/products`,
        // method: "GET",
        // params: <ProductQueryFilters>{ ...queryParams },
        headers: {
          // headers
        },
      }),
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
