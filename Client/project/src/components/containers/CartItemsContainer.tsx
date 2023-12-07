"use client";
import React, { ReactNode } from "react";

interface CartItemsContainerProps {
  children: ReactNode;
}

export default function CartItemsContainer({
  children,
}: CartItemsContainerProps) {
  return (
    <div className="mt-8 overflow-scroll border-red-500 h-[55vh] ">
      <div className="flow-root h-full">
        <ul role="list" className="-my-6 divide-y divide-gray-200 h-full">
          {children}
        </ul>
      </div>
    </div>
  );
}
