"use client";
import React from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import ProductCard from "@/components/cards/ProductCard";
// import component 👇

//import styles 👇
export default function Products() {
  const list = [
    {
      title: "Orange",
      img: "https://dummyimage.com/600x400/c7c7c7/3a45e6",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://dummyimage.com/600x400/c7c7c7/3a45e6",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://dummyimage.com/600x400/c7c7c7/3a45e6",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://dummyimage.com/600x400/c7c7c7/3a45e6",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://dummyimage.com/600x400/c7c7c7/3a45e6",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://dummyimage.com/600x400/c7c7c7/3a45e6",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://dummyimage.com/600x400/c7c7c7/3a45e6",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://dummyimage.com/600x400/c7c7c7/3a45e6",
      price: "$12.20",
    },
  ];

  return (
    <></>
    // <div className="place-items-center gap-y-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
    //   {list.map((item, index) => (
    //     <ProductCard item={item} index={index} key={index} />
    //   ))}
    // </div>
  );
}
