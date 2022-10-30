import { actionType } from "./reducer";
import { Product } from "../types/product";
import { UserInfo } from "firebase/auth";

interface SetUserAction {
  type: actionType.SET_USER;
  user: UserInfo | null;
}

interface SetFoodItems {
  type: actionType.SET_FOOD_ITEMS;
  foodItems: Product[];
}

interface SetCartShow {
  type: actionType.SET_CART_SHOW;
  cartShow: boolean;
}

interface SetCartItems {
  type: actionType.SET_CART_ITEMS;
  cartItems: Product[];
}

export type Action = SetUserAction | SetFoodItems | SetCartShow | SetCartItems;
