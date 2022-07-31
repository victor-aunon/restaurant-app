import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { BiMinus, BiPlus } from "react-icons/bi";

import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

let items = [];

const CartItem = ({ item }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(item.quantity);

  function cartDispatch() {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [...items],
    });
  }

  function updateQuantity(action, id) {
    if (action === "add") {
      setQuantity(prevQuantity => prevQuantity + 1);
      items = cartItems.map(_item => {
        if (_item.id === id) _item.quantity++;
        return _item;
      });
    } else if (action === "remove") {
      if (quantity === 1) {
        items = cartItems.filter(_item => _item.id !== id);
        setQuantity(prevQuantity => prevQuantity - 1);
      } else {
        setQuantity(prevQuantity => prevQuantity - 1);
        items = cartItems.map(_item => {
          if (_item.id === id) _item.quantity--;
          return _item;
        });
      }
    }
    cartDispatch();
  }

  // Update the quantity when cartItems changes (adding product from MenuContainer)
  useEffect(() => {
    setQuantity(cartItems.filter(it => it.id === item.id)[0].quantity);
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-3">
      <img
        src={item.imageURL}
        alt={item.title}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      />
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          {item.price * quantity} €
        </p>
      </div>

      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQuantity("remove", item.id)}
        >
          <BiMinus className="text-gray-50 text-lg" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {quantity}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQuantity("add", item.id)}
        >
          <BiPlus className="text-gray-50 text-lg" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
