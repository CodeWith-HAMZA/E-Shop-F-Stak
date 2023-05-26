import React from "react";
import Products from "./Products";

const page = async () => {
  // fetch("", { cache: "no-cache" });
  return await (<Products productCategory="all" />);
};

export default page;
