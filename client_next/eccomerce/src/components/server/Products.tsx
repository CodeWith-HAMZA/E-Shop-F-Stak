"use client";
import ProductCard from "@/components/server/ProductCard";

import { Product } from "@/types/Product";

import React, { Fragment } from "react";
interface Props {
  readonly productCategory: string;
}
const Products = ({ productCategory }: Props) => {
  const products: Product[] = [
    {
      id: "1",
      title: "T-Shirt",
      price: 19.99,
      description: "A comfortable and stylish t-shirt.",
      imageUrls: [
        "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      ],
      stock: 10,
      category: "Clothing",
    },
    {
      id: "2",
      title: "Smartphone",
      description: "A comfortable and stylish t-shirt.",
      price: 699.99,
      imageUrls: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
      stock: 5,
      category: "Electronics",
    },
    {
      id: "3",
      title: "Running Shoes",
      price: 89.99,
      description: "High-performance running shoes for athletes.",
      imageUrls: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
      stock: 8,
      category: "Footwear",
    },
    {
      id: "4",
      title: "Headphones",
      description: "A comfortable and stylish t-shirt.",
      price: 49.99,
      imageUrls: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
      stock: 15,
      category: "Electronics",
    },
    {
      id: "5",
      title: "Jeans",
      description: "A comfortable and stylish t-shirt.",
      price: 39.99,
      imageUrls: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
      stock: 20,
      category: "Clothing",
    },
    {
      id: "6",
      title: "Backpack",
      price: 29.99,
      imageUrls: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
      description: "A comfortable and stylish t-shirt.",
      stock: 12,
      category: "Accessories",
    },
    {
      id: "7",
      title: "Watch",
      description: "A comfortable and stylish t-shirt.",
      price: 149.99,
      imageUrls: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
      stock: 7,
      category: "Accessories",
    },
    {
      id: "8",
      title: "Sunglasses",
      description: "A comfortable and stylish t-shirt.",
      price: 79.99,
      imageUrls: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
      stock: 9,
      category: "Accessories",
    },
    {
      id: "9",
      title: "Gaming Console",
      description: "A comfortable and stylish t-shirt.",
      price: 399.99,
      imageUrls: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
      stock: 3,
      category: "Electronics",
    },
    {
      id: "10",
      title: "Hiking Boots",
      description: "A comfortable and stylish t-shirt.",
      price: 129.99,
      imageUrls: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
      stock: 6,
      category: "Footwear",
    },
  ];

  console.log(productCategory);
  return (
    <Fragment>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              {productCategory} Collection
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
            <div className={`space-y-4 block `}>
              <div>
                <label
                  htmlFor="SortBy"
                  className="block text-xs font-medium text-gray-700"
                >
                  Sort By
                </label>

                <select
                  id="SortBy"
                  className="mt-1 rounded border-gray-300 text-sm"
                >
                  <option>Sort By</option>
                  <option value="Title, DESC">Title, DESC</option>
                  <option value="Title, ASC">Title, ASC</option>
                  <option value="Price, DESC">Price, DESC</option>
                  <option value="Price, ASC">Price, ASC</option>
                </select>
              </div>

              <div>
                <p className="block text-xs font-medium text-gray-700">
                  Filters
                </p>

                <div className="mt-1 space-y-2">
                  <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                      <span className="text-sm font-medium">
                        {" "}
                        Availability{" "}
                      </span>

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
                        <span className="text-sm text-gray-700">
                          {" "}
                          0 Selected{" "}
                        </span>

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

                    <div className="border-t border-gray-200 bg-white">
                      <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700">
                          The highest price is $600
                        </span>

                        <button
                          type="button"
                          className="text-sm text-gray-900 underline underline-offset-4"
                        >
                          Reset
                        </button>
                      </header>

                      <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between gap-4">
                          <label
                            htmlFor="FilterPriceFrom"
                            className="flex items-center gap-2"
                          >
                            <span className="text-sm text-gray-600">$</span>

                            <input
                              type="number"
                              id="FilterPriceFrom"
                              placeholder="From"
                              className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
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
                              placeholder="To"
                              className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </details>

                  <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                      <span className="text-sm font-medium"> Colors </span>

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
                        <span className="text-sm text-gray-700">
                          {" "}
                          0 Selected{" "}
                        </span>

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
                            htmlFor="FilterRed"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterRed"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              Red
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterBlue"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterBlue"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              Blue
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterGreen"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterGreen"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              Green
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterOrange"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterOrange"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              Orange
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterPurple"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterPurple"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              Purple
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterTeal"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterTeal"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              Teal
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3  ">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-1 sm:bg-gray-red-300 w-full">
                {
                  products.map((product: Product): JSX.Element => {
                    return (
                      <>
                        <ProductCard
                          id={product.id}
                          stock={product.stock}
                          title={product.title}
                          description={product.description}
                          price={product.price}
                          imageUrls={product.imageUrls}
                          category={product.category}
                          //   {...product}
                        />
                      </>
                    );
                  }) as JSX.Element[]
                }
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Products;
