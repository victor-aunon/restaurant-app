// Components
import { Logo } from "../components/header";
import { NavLinks } from "../components/header";
import { CartIcon } from "../components/header";
import { UserButton } from "../components/header";

const Header = () => {
  return (
    <header className="fixed w-full p-3 px-4 md:p-6 lg:px-16 md:px-5 select-none bg-primary z-10">
      {/* desktop and tablet */}
      <div className="hidden md:flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-6">
          <NavLinks />
          <CartIcon />
          <UserButton />
        </div>
      </div>
      {/* mobile */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center justify-between">
          <CartIcon />
          <Logo />
          <UserButton />
        </div>
        <NavLinks justify="justify-center" />
      </div>
    </header>
  );
};

export default Header;
