"use client";
import Drawer from "react-modern-drawer";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Button,
  Link as UILink,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

import ProfileDropdown from "./ProfileDropdown";
import "react-modern-drawer/dist/index.css";
import CartItemCard from "./CartItemCard";
import CartItemsContainer from "../containers/CartItemsContainer";
import { cartItemsDemo } from "@/types";
import useCartStore from "@/store/cart";

export default function TopNavBar() {
  const r = useRouter();
  const { items, addItem, decreaseQuantity, increaseQuantity, removeItem } =
    useCartStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const session = useSession(authOptions);
  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const cartItems = (
    <>
      <div className="flex items-start justify-between">
        <div
          className=" flex gap-3 text-lg font-medium text-gray-900 group "
          id="slide-over-title"
        >
          <span>Shopping cart</span>
          <Link
            href={"/cart"}
            className="group-hover:opacity-100 opacity-0 transition-all hover:text-purple-600"
          >
            Full View {">"}
          </Link>
        </div>
        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
          >
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Close panel</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <CartItemsContainer>
        {items.map((cartItem, index) => (
          <CartItemCard
            key={index}
            item={cartItem}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        ))}
        {/* More product-items in cart... */}
      </CartItemsContainer>
    </>
  );

  const cartFooter = (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>${subtotal}</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">
        Shipping and taxes calculated at checkout.
      </p>
      <div className="mt-6">
        <a
          href="#"
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Checkout
        </a>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          or
          <button
            onClick={toggleDrawer}
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  );
  return (
    <div>
      <Navbar shouldHideOnScroll className="shadow-lg py-2">
        <NavbarBrand>
          <p className="font-bold text-inherit">hohoho</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <UILink color="foreground" href="#">
              Features
            </UILink>
          </NavbarItem>
          <NavbarItem isActive>
            <UILink href="#" color="secondary" aria-current="page">
              Customers
            </UILink>
          </NavbarItem>
          <NavbarItem>
            <UILink color="foreground" href="#">
              Integrations
            </UILink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <div className="flex items-center space-x-4">
            <Input type="text" placeholder="Search..." className="w-52" />
            <Button color="secondary">Search</Button>

            <div
              className="relative group cursor-pointer"
              onClick={toggleDrawer}
            >
              <span className="text-gray-800 hover:text-purple-600">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4h16M2 6h4l3 13h10M6 6h10"
                  ></path>
                </svg>
              </span>

              {items.length ? (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  <span>{items.length}</span>
                </span>
              ) : null}
            </div>
          </div>
          {session.status === "unauthenticated" ? (
            <div className="">
              <NavbarItem className="hidden lg:flex">
                {" "}
                <NextLink href={"/auth/sign-in"} className="text-purple-600">
                  Login
                </NextLink>
              </NavbarItem>
              <NavbarItem>
                <button
                  onClick={() => {
                    r.push("/auth/sign-up");
                  }}
                >
                  Sign Up
                </button>
              </NavbarItem>
            </div>
          ) : (
            <button>
              {/* <CgProfile className="text-2xl opacity-80 hover:opacity-100 transition-all" /> */}
              <ProfileDropdown profileData={session.data} />
            </button>
          )}
        </NavbarContent>
      </Navbar>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="py-4 px-3"
        size={"23rem"}
        overlayColor={"#351F4A"}
      >
        {cartItems}
        {cartFooter}
      </Drawer>
    </div>
  );
}
