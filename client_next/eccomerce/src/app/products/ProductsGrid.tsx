"use client";
import ProductCard from "@/components/public/server/ProductCard";
import { Product } from "@/types/Product";
import React, { Fragment, useEffect, useMemo } from "react";
import { useProductStore } from "../store/productStore";

interface Props {
  products: Product[];
}
const ProductsGrid: React.FC<Props> = ({ products }: Props): JSX.Element => {
  return (
    <>
      <div className="lg:col-span-3  ">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-1 sm:bg-gray-red-300 w-full">
          {products?.map((product: Product, idx: number) => (
            <Fragment key={idx}>
              <ProductCard {...product} />
            </Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductsGrid;
