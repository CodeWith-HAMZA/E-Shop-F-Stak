import { Product } from "@/types/Product";
// import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";
interface Props extends Product {}

const ProductCard: React.FC<Props> = ({
  id,
  title,
  description,
  category,
  imageUrls,
  stock,
  price,
}: Props) => {
  const router = useRouter();
  const Rating = 4;
  const gotoProductDetails = () => {
    // * Going To Product Details
    router.push(`/products/${category}/${id}`);
  };

  return (
    <>
      <li
        className="cursor-pointer"
        onClick={gotoProductDetails as (e: any) => void}
      >
        <div className="block group overflow-hidden ">
          <img
            src={imageUrls[0]}
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
            <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
              {title}
            </h3>
            <p className="text-xs text-gray-500">{description}</p>

            <p className="mt-2">
              <span className="sr-only"> Regular Price </span>

              <span className="tracking-wider text-gray-900">Rs: {price} </span>
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

// <div className="card w-96 bg-base-100 shadow-xl">
//   <figure>
//     <img src={imageUrls[0]} alt="Shoes" />
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">
//       Shoes!
//       <div className="badge badge-secondary">NEW</div>
//     </h2>
//     <p>If a dog chews shoes whose shoes does he choose?</p>
//     <div className="card-actions justify-end">
//       <div className="badge badge-outline">Fashion</div>
//       <div className="badge badge-outline">Products</div>
//     </div>
//   </div>
// </div>

export default ProductCard;
