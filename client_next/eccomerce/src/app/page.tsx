"use client";
import Image from "next/image";
import { Fragment } from "react";
import {
  useGetProductDetailsByIdQuery,
  useGetProductsQuery,
} from "./reduxToolkit/services/products";
import { FetchArgs } from "@reduxjs/toolkit/dist/query";

export default function Home() {
  const query = useGetProductsQuery();
  const { data } = useGetProductDetailsByIdQuery("2");
  console.log(query.isLoading, query.isFetching);
  // if (query.isFetching) {
  //   return "FETACHING";
  // }
  // if (query.isLoading) {
  //   return "Loading...";
  // }

  return (
    <Fragment>
      Hero Section
      {data?.title}
      {/* {query.data?.map((elem) => (
        <h1>{elem.title}</h1>
      ))} */}
    </Fragment>
  );
}
