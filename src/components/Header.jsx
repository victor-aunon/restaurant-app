import React from "react";

// Components
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import Cart from "./navbar/Cart";
import UserButton from "./navbar/UserButton";

const Header = () => {

  return (
    <header className="fixed w-full p-3 px-4 md:p-6 lg:px-16 md:px-5 select-none">
      {/* desktop and tablet */}
      <div className="hidden md:flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-6">
          <NavLinks />
          <Cart />
          <UserButton />
        </div>
      </div>
      {/* mobile */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center justify-between">
          <Cart />
          <Logo />
          <UserButton />
        </div>
        
        <NavLinks justify="justify-center"/>
      </div>
    </header>
  );
};

export default Header;
