"use client";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";

export interface DropDownMenuItem {
  readonly name: string;
  readonly path: string;
}

interface DropDown {
  readonly icon?: JSX.Element;
  readonly name?: string;
  readonly MenuLinks: DropDownMenuItem[];
  readonly width: string;
  menuContainerClasses?: string;
  menuListClasses: string;
}
interface Props extends DropDown {}

const links = [
  { href: "/account-settings", label: "Account settings" },
  { href: "/support", label: "Support" },
  { href: "/license", label: "License" },
  { href: "/sign-out", label: "Sign out" },
];

const MenuItem: React.FC<DropDownMenuItem> = ({ path, name }) => {
  return (
    <Fragment>
      <Link href={path}>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-gray-200" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              {/* {active ? (
        <MoveActiveIcon
        className="mr-2 h-5 w-5"
          aria-hidden="true"
        />
      ) : (
        <MoveInactiveIcon
          className="mr-2 h-5 w-5"
          aria-hidden="true"
          />
        )} */}
              {name}
            </button>
          )}
        </Menu.Item>
      </Link>
    </Fragment>
  );
};

export default function DropDownMenu({
  MenuLinks,
  width,
  icon,
  name,
  menuContainerClasses,
  menuListClasses,
}: Props) {
  return (
    <div className={`text-right left-0 relative ${menuContainerClasses}`}>
      <Menu as="div" className="relative  inline-block text-left">
        <Menu.Button className="">
          <span className="flex justify-start gap-1">
            {name} {icon}
          </span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute ${menuListClasses} mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="p-1 ">
              {MenuLinks.map(({ name, path }, idx) => (
                <MenuItem name={name} path={path} key={idx} />
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
