import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { FaShoppingBasket } from "react-icons/fa";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

// Components
import CartItem from "./cart/CartItem";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const deliveryPrice = Number(process.env.REACT_APP_DELIVERY_PRICE);

  function showCart() {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  }

  // Update total price
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (accum, item) => accum + item.quantity * item.price,
      0
    );
    setSubtotal(totalPrice);
    setTotal(totalPrice + deliveryPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-[7rem] right-0 w-full md:w-[375px] h-[calc(100vh-7rem)] bg-white drop-shadow-md flex flex-col "
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* Bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-xl flex flex-col">
          <div className="w-full h-[340px] md:h-full px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* Show cart items */}
            {cartItems.map(item => (
              <CartItem key={`${item.id}-cart-item`} item={item} />
            ))}
          </div>
          {/* Cart total */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub total</p>
              <p className="text-gray-400 text-lg">{subtotal} €</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">{deliveryPrice} €</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">{total}€</p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-red-400 to-red-500 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check out
              </motion.button>
            ) : (
              <div className="w-full p-2 text-center rounded-full bg-gradient-to-tr from-red-400 to-red-500 text-gray-50 text-lg my-2 hover:shadow-lg">
                Login to check out
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <FaShoppingBasket className="text-textColor text-6xl md:text-5xl" />
          <p className="text-xl text-textColor font-semibold">
            Add some products to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
