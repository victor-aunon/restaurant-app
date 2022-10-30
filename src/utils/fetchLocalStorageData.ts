import { Product } from "../types/product";
import {UserInfo} from "firebase/auth"

// Get user info from the local storage if it is available
export const fetchUser = () : UserInfo => {
  const userInfoJson = localStorage.getItem("user");
  return userInfoJson !== null ? JSON.parse(userInfoJson) : {};
};

// Get cart items from the local storage if it is available
export const fetchCart = () : Product[] => {
  const cartItemsJson = localStorage.getItem("cartItems");
  return cartItemsJson !== null ? JSON.parse(cartItemsJson) : [];
};
