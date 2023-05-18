import ProductDetails from "@/components/client/ProductDetails";
import React, { Fragment, useState } from "react";
interface Props {
  params: { id: string };
}
const page = ({ params }: Props) => {
  const { id } = params;

  return (
    <Fragment>
      <ProductDetails />
    </Fragment>
  );
};

export default page;
