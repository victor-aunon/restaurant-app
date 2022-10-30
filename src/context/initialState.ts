import { Product } from "../types/product";
import { UserInfo } from "firebase/auth";

export interface AppState {
  user: UserInfo | null;
  foodItems: Product[];
  cartShow: boolean;
  cartItems: Product[];
}

export const initialState: AppState = {
  user: null,
  foodItems: [],
  cartShow: false,
  cartItems: [],
};
