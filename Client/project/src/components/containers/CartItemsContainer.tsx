import React, { ReactNode } from "react";

interface CartItemsContainerProps {
  children: ReactNode;
}

export default function CartItemsContainer({
  children,
}: CartItemsContainerProps) {
  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {children}
        </ul>
      </div>
    </div>
  );
}
