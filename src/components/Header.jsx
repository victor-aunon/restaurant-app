import React from "react";
import { FaShoppingBasket } from "react-icons/fa";

import Logo from "../assets/img/logo.png";
import UserImg from "../assets/img/user_profile.png";

const Header = () => {
    return (
        <header className="fixed w-screen p-6 px-16 select-none">
            {/* desktop and tablet */}
            <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img
                        src={Logo}
                        alt="Sushi Logo"
                        className="w-14 object-cover pb-3"
                    />
                    <p className="text-headingColor text-4xl font-extrabold logo-text">
                        SUSHIMANIA
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <ul className="flex items-center gap-8">
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

                    <div className="relative flex items-center justify-center">
                        <FaShoppingBasket className="text-textColor text-3xl ml-6 cursor-pointer" />
                        <div className="absolute -top-3.5 -right-4 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-white font-semibold"></p>
                        </div>
                    </div>

                    <img
                        src={UserImg}
                        className="w-8 min-w-[40px] h-8 min-h-[40px] drop-shadow-xl ml-4 cursor-pointer"
                        alt="User profile"
                    />
                </div>
            </div>
            {/* mobile */}
            <div className="flex md:hidden"></div>
        </header>
    );
};

export default Header;
