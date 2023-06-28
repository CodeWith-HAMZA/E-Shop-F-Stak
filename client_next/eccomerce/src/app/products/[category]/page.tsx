// "use client";
import React, { Fragment } from "react";
import Products from "../Products";
import ProductFilterPanel from "../ProductFilterPanel";
import { notFound } from "next/navigation";
interface Props {
  params: { category: string };
}
const ProductsByCategory: React.FunctionComponent<Props> = (props) => {
  // ts-@ignore
  const { category } = props.params;

  // console.log(category);

  // const { isLoading, isError, data } = useGetProductsQuery();

  // const Products = dynamic(() => import("@/components/server/Products"), {
  //   ssr: true,
  // });
  console.log(category);
  // return notFound()
  return (
    // @ts-ignore
    <Products productsCategory={category} productsFilterParams={props.params}>
      <ProductFilterPanel />
    </Products>
  );
};

export default ProductsByCategory;
