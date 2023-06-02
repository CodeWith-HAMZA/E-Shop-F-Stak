"use client";
import React from "react";
import { useCartStore } from "../store/cartStore";

const Register = () => {
  const value = useCartStore((state) => state.value);
  console.log(value);
  const customIncrement = useCartStore((state) => state.customIncrement);

  return (
    <div>
      <button
        onClick={() => {
          customIncrement(32);
        }}
      >
        customincrement
      </button>
      <div>value: {value}</div>
    </div>
  );
};

export default Register;
