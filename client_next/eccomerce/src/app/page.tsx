import React, { Fragment, useEffect } from "react";

import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { store } from "./reduxToolkit/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./reduxToolkit/features/product/productSlice";
import Link from "next/link";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  );
}
