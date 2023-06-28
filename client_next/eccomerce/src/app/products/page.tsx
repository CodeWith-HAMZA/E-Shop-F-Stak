import ProductFilterPanel from "./ProductFilterPanel";
import Products from "./Products";
interface Props {
  searchParams: object;
  params: object;
}
const AllProducts: React.FunctionComponent<Props> = ({
  searchParams,
  params,
}: Props) => {
  console.log(searchParams);
  return (
    // @ts-ignore
    <Products productsCategory="all" productsFilterParams={searchParams}>
      <ProductFilterPanel />
    </Products>
  );
};

export default AllProducts;
