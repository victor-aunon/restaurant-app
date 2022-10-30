import React from "react";
import { Link } from "react-router-dom";

interface NavLinksProps {
  justify?: string;
}

const NavLinks = (props: NavLinksProps) => {
  const justify = props.justify ? props.justify : undefined;

  return (
    <nav>
      <ul className={`flex items-center gap-8 ${justify}`}>
        <Link to={"/#home"}>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
            Home
          </li>
        </Link>
        <Link to={"/#menu"}>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
            Menu
          </li>
        </Link>
        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
          About us
        </li>
        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
          Service
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
