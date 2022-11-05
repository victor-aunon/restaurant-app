import { render, screen, fireEvent } from "@testing-library/react";

import { StateProvider } from "../../context/StateProvider";
import { AppState } from "../../context/initialState";
import { reducer } from "../../context/reducer";

import { CartItem } from ".";
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

  test("Should render CartItem component", () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <CartItem item={product} />
      </StateProvider>
    );
    const image = screen.getByRole("img");
    expect(image).toBeDefined();
    expect(image.getAttribute("src")).toBe(product.imageURL);
    expect(image.getAttribute("alt")).toBe(product.title);

    const name = screen.getByText(product.title);
    expect(name).toBeDefined();

    const price = screen.getByText(
      `${parseFloat(product.price) * product.quantity} €`
    );
    expect(price).toBeDefined();
  });

  test("Should increment product quantity when clicking on add button", () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <CartItem item={product} />
      </StateProvider>
    );
    const quantityText = screen.getByText(product.quantity)
    const addItemButton = screen.getByTestId("add-item-button")

    expect(addItemButton).toBeDefined()
    fireEvent.click(addItemButton)
    expect(quantityText.textContent).toBe("2")
  });

  test("Should decrement product quantity when clicking on add button", () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <CartItem item={product} />
      </StateProvider>
    );
    const quantityText = screen.getByText(product.quantity)
    const removeItemButton = screen.getByTestId("remove-item-button")

    expect(removeItemButton).toBeDefined()
    fireEvent.click(removeItemButton)
    expect(quantityText.textContent).toBe("1")
  });
});
