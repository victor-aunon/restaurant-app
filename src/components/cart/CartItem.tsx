import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { BiMinus, BiPlus } from "react-icons/bi";

import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { Product } from "../../types/product";

let items: Product[] = [];

interface CartItemProps {
  item: Product;
}

type QuantityAction = "add" | "remove";

const CartItem = ({ item }: CartItemProps) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(item.quantity);

  function cartDispatch() {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [...items],
    });
  }

  function updateQuantity(action: QuantityAction, id: Product["id"]) {
    if (action === "add") {
      setQuantity(prevQuantity => prevQuantity + 1);
      items = cartItems.map((it: Product) => {
        if (it.id === id) it.quantity++;
        return it;
      });
    } else if (action === "remove") {
      if (quantity === 1) {
        items = cartItems.filter((it: Product) => it.id !== id);
        setQuantity(prevQuantity => prevQuantity - 1);
      } else {
        setQuantity(prevQuantity => prevQuantity - 1);
        items = cartItems.map((it: Product) => {
          if (it.id === id) it.quantity--;
          return it;
        });
      }
    }
    cartDispatch();
  }

  // Update the quantity when cartItems changes (adding product from MenuContainer)
  useEffect(() => {
    setQuantity(
      () => cartItems.filter((it: Product) => it.id === item.id)[0].quantity
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {parseFloat(item.price) * quantity} €
        </p>
      </div>

      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQuantity("remove", item.id)}
          data-testid="remove-item-button"
        >
          <BiMinus className="text-gray-50 text-lg" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {quantity}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQuantity("add", item.id)}
          data-testid="add-item-button"
        >
          <BiPlus className="text-gray-50 text-lg" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
