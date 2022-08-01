import { motion } from "framer-motion";
import { FaShoppingBasket } from "react-icons/fa";

import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const MenuProductCard = ({ item }) => {
  const [{ cartItems }, dispatch] = useStateValue();

  function addToCart(item) {
    let items = [];
    const index = cartItems.findIndex(_item => _item.id === item.id);

    // If the item is in cartItems, update quantity, otherwise add it
    if (index > -1) {
      items = cartItems.map(_item => {
        if (_item.id === item.id) _item.quantity++;
        return _item;
      });
    } else {
      items = [...cartItems, item];
    }
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  }

  return (
    <div
      key={item.id}
      className="min-w-[275px] w-[275px] md:min-w-[300px] md:w-[300px] h-[12rem] my-12 bg-gray-100 rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg hover:bg-cardOverlay select-none flex flex-col items-center justify-between"
    >
      <div className="w-full flex items-center justify-between">
        <motion.img
          whileHover={{ scale: 1.2 }}
          src={item.imageURL}
          alt={item.title}
          className="max-w-[180px] max-h-[140px] object-cover -mt-8 ml-4 drop-shadow-xl"
          loading="lazy"
        />
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-10 h-10 mb-auto mt-2 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
          onClick={() => addToCart(item)}
        >
          <FaShoppingBasket className="text-white text-2xl" />
        </motion.div>
      </div>

      <div className="w-full flex flex-col items-end justify-end">
        <p className="text-textColor font-semibold text-base md:text-lg">
          {item.title}
        </p>
        <div className="flex items-center gap-8">
          <p className="text-lg text-headingColor font-semibold">
            {item.price}{" "}
            <span className="text-base text-red-600">
              {process.env.REACT_APP_CURRENCY_SYMBOL}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuProductCard;
