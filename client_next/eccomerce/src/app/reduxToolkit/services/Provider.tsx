"use client";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { AppInitialProps } from "next/app";
import { ReactNode } from "react";
import { productsApi } from "./products";
interface Props {
  children: ReactNode;
}
const Provider: React.FC<Props> = ({ children }: Props) => (
  <ApiProvider api={productsApi}>{children}</ApiProvider>
);

export default Provider;
