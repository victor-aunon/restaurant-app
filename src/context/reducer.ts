import { Action } from "./reducerActions";
import { AppState } from "./initialState";

export enum actionType {
  SET_USER = "SET_USER",
  SET_FOOD_ITEMS = "SET_FOOD_ITEMS",
  SET_CART_SHOW = "SET_CART_SHOW",
  SET_CART_ITEMS = "SET_CART_ITEMS",
}

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    default:
      return state;
  }
};

export type ReducerType = typeof reducer;
