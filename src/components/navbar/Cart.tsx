import React, { useEffect } from "react";
import { FaShoppingBasket } from "react-icons/fa";

import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

function Cart() {
  const [{ cartShow, cartItems }, dispatch] = useStateValue();

  function showCart() {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  }

  useEffect(() => {
    // Save cartItems into de local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems])

  return (
    <div
      className="relative flex items-center justify-center"
      onClick={showCart}
    >
      <FaShoppingBasket className="text-textColor text-3xl md:text-2xl md:ml-1 cursor-pointer" />
      {cartItems && cartItems.length > 0 && (
        <div className="absolute -top-3.5 -right-3 w-5 h-5 md:w-5 md:h-5 rounded-full bg-cartNumBg flex items-center justify-center">
          <p className="text-white font-semibold">{cartItems.length}</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
