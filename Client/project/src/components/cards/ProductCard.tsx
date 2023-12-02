"use client";
import { Card, CardBody, Image, CardFooter } from "@nextui-org/react";
import { FC } from "react";
interface Props {
  item: object;
  index: number;
}

export default function ProductCard({ item, index }: Props) {
  return (
    <div>
      {" "}
      <Card
        shadow="sm"
        key={index}
        isPressable
        onPress={() => console.log("item pressed")}
      >
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={item.title}
            className="w-full object-cover h-[140px]"
            src={item.img}
          />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b>{item.title}</b>
          <p className="text-default-500">{item.price}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
