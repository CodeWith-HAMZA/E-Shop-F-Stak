"use client";
import ProductCard from "@/components/public/server/ProductCard";
import { Product } from "@/types/Product";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  readonly productsCategory: string;
  children: JSX.Element;
}
function capitalize(str: string): string {
  if (typeof str !== "string" || str.length === 0) {
    return str; // Return the input if it's not a string or empty
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

// const fetchProducts = async (productsCategory: string) => {
//   // if (typeof productsCategory === "string") return;
//   const fetchByCategory: boolean = productsCategory.toLowerCase() !== "all";

//   const res = await fetch(
//     `http://localhost:5500/api/v1/products/${
//       fetchByCategory ? `?category=${productsCategory}` : ""
//     }`,
//     {
//       method: "GET",
//     }
//   );
//   const data = await res.json();
//   console.log("wah reh wah", data);

//   return data;
// };

const Products = async ({
  productsCategory,
  children,
}: Props): Promise<JSX.Element> => {
  // const { products } = await fetchProducts(productsCategory);
  useEffect(() => {
    const fetchByCategory: boolean = productsCategory.toLowerCase() !== "all";
    // dispatch(setProducts({ wah: "harami" }) as any);
  }, []);

  return (
    <section className="pt-10">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            {capitalize(productsCategory)} Collection
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
          <div className="lg:col-span-3  ">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-1 sm:bg-gray-red-300 w-full">
              {[].map((product: Product, idx: number) => (
                <Fragment key={idx}>
                  <ProductCard {...product} />
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
