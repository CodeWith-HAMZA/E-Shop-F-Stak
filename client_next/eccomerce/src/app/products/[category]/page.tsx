import ProductCard from "@/components/server/ProductCard";
import Products from "@/components/server/Products";

import { Product } from "@/types/Product";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import dynamic from "next/dynamic";
import React, { Fragment } from "react";
interface Props {
  params: { category: string };
}
const page = ({ params }: Props) => {
  const { category } = params;
  // console.log(category);

  // const Products = dynamic(() => import("@/components/server/Products"), {
  //   ssr: true,
  // });

  return (
    <Fragment>
      <Products productCategory={category as string} />
    </Fragment>
  );
};

export default page;
