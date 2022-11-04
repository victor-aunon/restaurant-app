import { render, screen, fireEvent } from "@testing-library/react";

import { StateProvider } from "../../context/StateProvider";
import { AppState } from "../../context/initialState";
import { reducer } from "../../context/reducer";

import { CartIcon } from ".";
import { CartContainer } from "../cart";
import { Product } from "../../types/product";
import img from "../../assets/img/gyozas.png";

describe("CartItem Component", () => {
  const product: Product = {
    id: "1",
    title: "Gyozas",
    category: "Starters",
    imageURL: img,
    price: "6.50",
    quantity: 1,
  };

  const initialState: AppState = {
    user: null,
    cartItems: [product],
    cartShow: false,
    foodItems: [product],
  };

  test("Should render CartIcon and show there is 1 product in the cart", () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <CartIcon />
      </StateProvider>
    );
    const cartIconText = screen.getByText("1")
    expect(cartIconText).toBeDefined()
  });
  
  test("Should open CartContainer when clicking on CartIcon", () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <CartIcon />
        <CartContainer />
      </StateProvider>
    );
    const cartIconText = screen.getAllByText("1")[0]
    // eslint-disable-next-line testing-library/no-node-access
    const cartIcon = cartIconText.parentElement?.parentElement as HTMLElement
    fireEvent.click(cartIcon)

    // CartContainer
    const cartItemText = screen.getByText(product.title)
    expect(cartItemText).toBeDefined()
    const totalText = screen.getByText("Total")
    expect(totalText).toBeDefined()

  })
});
