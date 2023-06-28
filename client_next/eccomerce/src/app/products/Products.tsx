import api from "@/services/api";
import ProductsGrid from "./ProductsGrid";

interface Props {
  readonly productsCategory: string;
  children: JSX.Element;
  readonly productsFilterParams: { minPrice: string; maxPrice: string };
}
function capitalize(str: string): string {
  if (typeof str !== "string" || str.length === 0) {
    return str; // Return the input if it's not a string or empty
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
function parseSpaces(str: string) {
  var replacedString = str.replace(/%20/g, " ");
  return replacedString;
}

const fetchProducts = async (
  category: string,
  productsFilterParams: { minPrice: string; maxPrice: string }
) => {
  // if (typeof productsCategory === "string") return;
  const fetchByCategory: boolean = category.toLowerCase() !== "all";
  const { minPrice, maxPrice } = productsFilterParams;
  try {
    console.log(productsFilterParams);
    const { data } = await api.get(`/products/`, {
      params: {
        ...(fetchByCategory ? { category: decodeURIComponent(category) } : {}),
        ...(minPrice ? { minPrice: minPrice } : {}),
        ...(maxPrice ? { maxPrice: maxPrice } : {}),
      },
    });
    console.log(productsFilterParams);

    console.log(data);
    return data;
  } catch (err) {
    console.log(
      err,
      "An Error Occ  ured While Fetching Products On Client Side"
    );
  }
};

const Products = async ({
  productsCategory,
  children,
  productsFilterParams,
}: Props): Promise<JSX.Element> => {
  // const { products } = await fetchProducts(productsCategory);
  // const {
  //   getProductDetails,
  //   getProducts,
  //   products,
  //   totalResults,
  //   selectedCurrentProduct,
  // } = useProductStore((state) => state);
  const _products = await fetchProducts(productsCategory, productsFilterParams);

  return (
    <section className="pt-10">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            {capitalize(parseSpaces(productsCategory))} Collection
          </h2>

          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <div className={`mt-8 block`}>
          <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Filters & Sorting </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-4 w-4 rtl:rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          {children}
          <ProductsGrid products={_products?.products} />
        </div>
      </div>
    </section>
  );
};

export default Products;
