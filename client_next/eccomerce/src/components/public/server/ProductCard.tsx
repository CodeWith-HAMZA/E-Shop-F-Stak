import { store } from "@/app/reduxToolkit/store";
import { Product } from "@/types/Product";
import Link from "next/link";
// import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";
interface Props extends Product {}

const ProductCard: React.FC<Props> = ({
  _id,
  name,
  description,
  category,
  images,
  stock,
  price,
}: Props) => {
  const Rating = 4;
  // store.getState().shoppingCart.items
  return (
    <Link href={`/products/${category}/${_id}`}>
      <li className="cursor-pointer">
        <div className="block group overflow-hidden ">
          <img
            src={images?.[0]?.url}
            alt=""
            id="ProductImage"
            className="w-full object-cover transition duration-500 group-hover:scale-105 "
            style={{ height: "17rem" }}
          />

          <div className="relative bg-white mt-3 p-1">
            <p className="flex gap-1 pl-2 my-1 ">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  style={{
                    color: index + 1 > Rating ? "#d2d2d2" : "#f9b300",
                  }}
                />
              ))}
            </p>
            Category: <span className="text-xs text-gray-500"> {category}</span>
            <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
              {name}
            </h3>
            <p className="text-xs text-gray-500">{description}</p>
            <p className="mt-2">
              <span className="sr-only"> Regular Price </span>

              <span className="tracking-wider text-gray-900">Rs: {price} </span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default ProductCard;
