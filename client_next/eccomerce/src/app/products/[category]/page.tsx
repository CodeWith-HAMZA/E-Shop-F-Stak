// "use client";
import React, { Fragment } from "react";
import Products from "../Products";
import ProductFilterPanel from "../ProductFilterPanel";
import { notFound } from "next/navigation";
interface Props {
  params: { category: string };
}
const page = ({ params }: Props) => {
  const { category } = params;
  // console.log(category);

  // const { isLoading, isError, data } = useGetProductsQuery();
 
  // const Products = dynamic(() => import("@/components/server/Products"), {
  //   ssr: true,
  // });
  console.log(category);
  // return notFound()
  return (
      // @ts-ignore
      <Products productsCategory={category}>
      <ProductFilterPanel />
    </Products>
  );
};

export default page;
