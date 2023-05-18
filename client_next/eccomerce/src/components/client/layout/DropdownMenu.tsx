import { MenuLink } from "@/types/MenuLinks";
import Link from "next/link";
import React, { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";
interface Props {
  icon?: JSX.Element;
  label?: string;
  menuLinks: MenuLink[];
}
const DropdownMenu: React.FC<Props> = ({
  icon,
  label,
  menuLinks,
}: Props): JSX.Element => {
  return (
    <>
      <label tabIndex={0} className="">
        {label ? label : ""} {icon ? icon : <></>}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {menuLinks.map(({ name, path }: MenuLink, idx) => (
          <Fragment key={idx}>
            {" "}
            <li>
              <Link href={`/products${path}`}>{name}</Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </>
  );
};

export default DropdownMenu;
