import ProductFilterPanel from "./ProductFilterPanel";
import Products from "./Products";

const page = async () => {
  return (
    <Products productsCategory="all">
      <ProductFilterPanel />
    </Products>
  );
};

export default page;
