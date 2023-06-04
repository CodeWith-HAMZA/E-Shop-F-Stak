import ProductFilterPanel from "./ProductFilterPanel";
import Products from "./Products";
import ProductsContainer from "./ProductsContainer";

const page = async () => {
  return (
    <Products productsCategory="all">
      <ProductFilterPanel />
    </Products>
  );
};

export default page;
