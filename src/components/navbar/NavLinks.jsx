import React from "react";

const NavLinks = props => {

  const justify = props.justify ? props.justify : undefined;

  return (
    <nav>
      <ul className={`flex items-center gap-8 ${justify}`}>
        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
          Home
        </li>
        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
          Menu
        </li>
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
