import ProductDetails from "@/components/public/client/ProductDetails";
import React, { Fragment, useState } from "react";
interface Props {
  params: { id: string };
}
const page = async ({ params }: Props) => {
  const { id } = params;
  const res = await fetch(`http://localhost:5500/api/v1/products/${id}`);
  const { product } = await res.json();
  console.log(product);

  return (
    <Fragment>
      <ProductDetails product={product} />
    </Fragment>
  );
};

export default page;
