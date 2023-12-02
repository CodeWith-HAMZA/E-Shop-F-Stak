import React from "react";

export default function CartItemCard() {
  return (
    <>
      <li className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href="#">Throwback Hip Bag</a>
              </h3>
              <p className="ml-4">$90.00</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">Salmon</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="flex items-center">
              <span>Qty: &nbsp;</span>
              <button
                type="button"
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                -
              </button>
              <p className="text-gray-500 mx-2"> 1 </p>
              <button
                type="button"
                className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                +
              </button>
            </div>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
