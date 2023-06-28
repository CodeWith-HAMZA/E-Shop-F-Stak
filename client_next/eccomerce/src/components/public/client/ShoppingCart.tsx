"use client";
import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";
import React, { Fragment } from "react";

const ShoppingCart: React.FC = () => {
  const {
    cartItems,
    subTotal,
    decreaseQuantity,
    increaseQuantity,
    removeItemFromCart,
    clearCart,
  } = useCartStore((state) => state);

  function handleDecreaseQuantity(productId: string) {
    console.log(productId);
    decreaseQuantity(productId);
  }

  function handleIncreaseQuantity(productId: string) {
    console.log(productId);
    increaseQuantity(productId);
  }

  function handleDeleteItem(productId: string) {
    console.log(productId);
    removeItemFromCart(productId);
  }
  function handleClearCart() {
    clearCart();
  }
  return (
    <Fragment>
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.length ? (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={item.images[0].url}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() => handleDecreaseQuantity(item._id)}
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-purple-500 hover:text-purple-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        {item.quantity}
                        <span
                          onClick={() => handleIncreaseQuantity(item._id)}
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-purple-500 hover:text-purple-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">Price: {item["price"]} $</p>
                        <p className="text-sm">Stock: ({item["stock"]})</p>

                        <svg
                          onClick={() => handleDeleteItem(item._id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-8 w-8 cursor-pointer duration-150 hover:text-red-400"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                Bucket is Empty Now!{" "}
                <Link
                  href={"/"}
                  className="text-purple-600 hover:text-purple-500"
                >
                  Shop And Fill
                </Link>
              </>
            )}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${subTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  ${subTotal.toFixed(2)}{" "}
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-6 w-full rounded-md bg-purple-500 py-1.5 font-medium text-purple-50 hover:bg-purple-600"
            >
              Check out
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShoppingCart;
