import React from "react";
import { FaShoppingBasket } from "react-icons/fa";

function Cart() {
  return (
    <div className="relative flex items-center justify-center">
      <FaShoppingBasket className="text-textColor text-3xl md:text-2xl md:ml-1 cursor-pointer" />
      <div className="absolute -top-3.5 -right-3 w-5 h-5 md:w-5 md:h-5 rounded-full bg-cartNumBg flex items-center justify-center">
        <p className="text-white font-semibold">4</p>
      </div>
    </div>
  );
}

export default Cart;
