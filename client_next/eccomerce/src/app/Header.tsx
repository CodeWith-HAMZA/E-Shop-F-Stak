"use client";
import Link from "next/link";
import React from "react";
import SearchBar from "../components/public/client/SearchBar";
import { BsCart3, BsChevronDown } from "react-icons/bs";
import DropdownMenu from "../components/public/client/layout/DropdownMenu";
import { BiUserCircle } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { showToast } from "@/utilities/showToastNotification";
interface Link {
  path: string;
  content: string | JSX.Element;
}

interface Links extends Array<Link> {}

const links: Links = [
  { path: "/", content: "Home" },
  { path: "/about", content: "About" },
  { path: "/contact", content: "Contact Us" },
  { path: "/cart", content: <BsCart3 /> },
];

function Header() {
  const [PrevScrollPosition, setPrevScrollPosition] = React.useState<number>(0);
  const [scrollDirection, setScrollDirection] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    // * {{dispatching}} {{Fetching All Products With No Filters}} Through Action-Creator (Thunk)
     
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      console.log(currentScrollPos);
      if (PrevScrollPosition > currentScrollPos) {
        setScrollDirection("up");
      } else if (PrevScrollPosition < currentScrollPos) {
        setScrollDirection("down");
      }

      setPrevScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [PrevScrollPosition]);
  return (
    <header
      style={{ zIndex: 100 }}
      className={` ${
        scrollDirection === "up" ? "fixed" : "absolute"
      }  flex  md:block w-full bg- text-gray-600 bg-white body-font shadow-md`}
    >
      <div className=" container mx-auto flex p-5 md:flex-row items-center justify-between gap-2">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900   md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Tailblocks</span>
        </Link>
        <div>{/* <Searchbar /> */}</div>
        <nav className="md:ml-auto hidden md:flex gap-4 items-center text-base justify-center">
          <DropdownMenu
            MenuLinks={[
              {
                path: "/products",
                name: "All Products",
              },
              { path: "/products/men's clothing", name: "men's clothing" },
            ]}
            width="w-screen"
            // icon={<BiUserCircle className="h-5 w-5" />}
            name="Store"
            menuListClasses="right-0"
          />

          {links.map((link: Link, index) => {
            return (
              <Link href={link.path} key={index}>
                {link.content}
              </Link>
            );
          })}
        </nav>
        <DropdownMenu
          MenuLinks={[{ name: "My Profile", path: "/my-profile" }]}
          width="w-screen"
          menuListClasses="right-0"
          icon={
            <BiUserCircle className="h-6 w-6 mt-1 bg-gray-100 hover:bg-gray-200 rounded-full p-0.5 " />
          }
          // name="Store"
        />
      </div>
    </header>
  );
}

export default Header;
