"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useProductStore } from "../store/productStore";
import { useEffect, useReducer, useState } from "react";
import { Product } from "@/types/Product";
import { toast } from "react-hot-toast";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";
interface ProductsFilterParams {
  minPrice: number | "";
  maxPrice: number | "";
  orderBy: "asc" | "desc" | "";
}
interface State {
  isPriceRangeFilterActive: boolean;
  isCategoryFilterActive: boolean;
}

interface Action {
  type: "TOGGLE_PRICE_FILTER" | "TOGGLE_CATEGORY_FILTER";
}

const filterPanelTogglesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TOGGLE_PRICE_FILTER":
      return {
        ...state,
        isPriceRangeFilterActive: !state.isPriceRangeFilterActive,
      };
    case "TOGGLE_CATEGORY_FILTER":
      return {
        ...state,
        isCategoryFilterActive: !state.isCategoryFilterActive,
      };
    default:
      return state;
  }
};
const ProductFilterPanel = () => {
  const [state, dispatch] = useReducer(filterPanelTogglesReducer, {
    isPriceRangeFilterActive: false,
    isCategoryFilterActive: false,
  });
  const [SelectedCategory, setSelectedCategory] = useState("All");

  const handlePriceToggle = () => {
    dispatch({ type: "TOGGLE_PRICE_FILTER" });
  };
  const handleCategoryToggle = () => {
    dispatch({ type: "TOGGLE_CATEGORY_FILTER" });
  };
  const { products } = useProductStore((state) => state);
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<ProductsFilterParams>({
    defaultValues: {
      orderBy: "",
      minPrice: "",
      maxPrice: "",
    },
  });

  function objectToQueryString(obj: any): string {
    // * removing the fields, if it contains empty value/string like ''
    const newObj: any = Object.keys(obj).reduce((newObj: any, key) => {
      if (obj[key] !== "") {
        newObj[key] = obj[key];
      }
      return newObj;
    }, {});
    return new URLSearchParams(newObj).toString();
  }
  function validateMinMaxPrice({ ...minMaxPrices }, { ...minMaxPriceLimits }) {
    const { minPriceLimit, maxPriceLimit } = minMaxPriceLimits;
    const { minPrice, maxPrice } = minMaxPrices;
    if (!minPrice || !maxPrice) {
      toast.error("Price ranges are not clearly defined");
      return false;
    }
    if (minPrice < 0 || maxPrice < 0) {
      toast.error("Prices cannot be negative");
      return false;
    }
    if (minPrice > maxPrice) {
      console.log(minPrice, maxPrice);
      toast.error("Minimum price should be less than maximum price");
      return false;
    }
    if (minPrice < minPriceLimit || maxPrice > maxPriceLimit) {
      toast.error(
        `Price range should be between ${minPriceLimit} units and ${maxPriceLimit} units`
      );
      return false;
    }
    return true;
  }
  function onSubmit(data: ProductsFilterParams) {
    const { minPrice, maxPrice } = data;
    // if (state.isPriceRangeFilterActive) {
    if (
      !validateMinMaxPrice(
        { minPrice: Number(minPrice), maxPrice: Number(maxPrice) },
        { minPriceLimit: 2, maxPriceLimit: 100 }
      )
    ) {
      return;
    }
    console.log(objectToQueryString(data).toString());

    // }
    router.push(`/products/${getCategory()}?${objectToQueryString(data)}`);
    // console.log(`/products/${getCategory()}?${objectToQueryString(data)}`)
  }

  function getCategory() {
    if (SelectedCategory === "All" || SelectedCategory === "") {
      return "";
    }
    if (SelectedCategory) {
      return SelectedCategory;
    }
  }
  return (
    <form className={`space-y-4 block `} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="SortBy"
          className="block text-xs font-medium text-gray-700"
        >
          Order By
        </label>

        <select
          {...register("orderBy")}
          id="SortBy"
          className="mt-1 rounded border-gray-300 text-sm"
        >
          <option value={""}>Sort By</option>
          <option value="asc">Price, DESC</option>
          <option value="desc">Price, ASC</option>
        </select>
      </div>
      <div>
        <p className="block text-xs font-medium text-gray-700">Filters</p>

        <div className="mt-1 space-y-2">
          <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Availability </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700"> 0 Selected </span>

                <button
                  type="button"
                  className="text-sm text-gray-900 underline underline-offset-4"
                >
                  Reset
                </button>
              </header>

              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label
                    htmlFor="FilterInStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterInStock"
                      className="h-5 w-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      In Stock (5+)
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterPreOrder"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPreOrder"
                      className="h-5 w-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Pre Order (3+)
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterOutOfStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterOutOfStock"
                      className="h-5 w-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Out of Stock (10+)
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </details>

          <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Price </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200">
              <div className="flex items-center justify-between p-4">
                <div
                  className="bg-gray-100 rounded-full hover:bg-gray-200"
                  onClick={handlePriceToggle}
                >
                  {state.isPriceRangeFilterActive ? (
                    <BsToggleOn className="h-6 text-purple-500 w-8" />
                  ) : (
                    <BsToggleOff className="h-6 w-8 text-gray-500" />
                  )}
                </div>
              </div>

              <div
                className={`border-t border-gray-200 p-4 ${
                  !state.isPriceRangeFilterActive
                    ? "opacity-40 pointer-events-none"
                    : ""
                }`}
              >
                <div className="flex justify-between gap-4 ">
                  <label
                    htmlFor="FilterPriceFrom"
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-gray-600">$</span>

                    <input
                      type="number"
                      id="FilterPriceFrom"
                      {...register("minPrice")}
                      placeholder="From"
                      className="w-full py-2 rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                  </label>

                  <label
                    htmlFor="FilterPriceTo"
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-gray-600">$</span>

                    <input
                      type="number"
                      id="FilterPriceTo"
                      {...register("maxPrice")}
                      placeholder="To"
                      className="w-full py-2 rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                  </label>
                </div>
              </div>
            </div>
          </details>

          <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span className="text-sm font-medium">
                {" "}
                Available Categories{" "}
              </span>

              <span className="transition group-open:-rotate-180">
                <BiCategory />
              </span>
            </summary>

            <div className={` border-t border-gray-200 bg-white`}>
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700">
                  "{SelectedCategory}"{" "}
                </span>

                <div
                  className="bg-gray-100 rounded-full hover:bg-gray-200"
                  onClick={handleCategoryToggle}
                >
                  {state.isCategoryFilterActive ? (
                    <BsToggleOn className="h-6 text-purple-500 w-8" />
                  ) : (
                    <BsToggleOff className="h-6 w-8 text-gray-500" />
                  )}
                </div>
              </div>

              <ul
                className={`${
                  !state.isCategoryFilterActive
                    ? "opacity-40 pointer-events-none"
                    : ""
                } space-y-1 border-t border-gray-100  px-2 py-4 `}
              >
                {[
                  "All",
                  // @ts-ignore
                  ...new Set(
                    products.map((product: Product) => product.category)
                  ),
                ].map((category, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedCategory(category);
                    }}
                    className={`px-3 py-3 ${
                      category === SelectedCategory
                        ? "bg-violet-600 hover:bg-purple-700"
                        : "hover:bg-gray-200 bg-gray-100 "
                    } cursor-pointer  transition-all rounded-lg`}
                  >
                    <span
                      key={idx}
                      className={`text-md text-gray-700 ${
                        category === SelectedCategory ? "text-white" : ""
                      }`}
                    >
                      {category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>
      <button
        type="submit"
        disabled={
          !(state.isPriceRangeFilterActive || state.isCategoryFilterActive)
        }
        className={`${
          state.isCategoryFilterActive || state.isPriceRangeFilterActive
            ? ""
            : "opacity-30"
        }  bg-violet-600  text-white py-2 px-4 hover:bg-violet-700 transition-all hover:shadow-md rounded-md `}
      >
        Apply Filters
      </button>
    </form>
  );
};

export default ProductFilterPanel;
