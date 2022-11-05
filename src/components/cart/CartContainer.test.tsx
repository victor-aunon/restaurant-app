import { render, screen, fireEvent, within } from "@testing-library/react";

import { StateProvider } from "../../context/StateProvider";
import { AppState } from "../../context/initialState";
import { reducer } from "../../context/reducer";

import { CartContainer } from ".";
import { Product } from "../../types/product";
import img from "../../assets/img/gyozas.png";

describe("CartContainer Component", () => {
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
    cartShow: true,
    foodItems: [product],
  };

  test("Should render CartContainer component, sub-total, delivery and total price", () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <CartContainer />
      </StateProvider>
    );

    // CartItem
    const image = screen.getByRole("img");
    expect(image).toBeDefined();
    expect(image.getAttribute("src")).toBe(product.imageURL);
    expect(image.getAttribute("alt")).toBe(product.title);

    const name = screen.getByText(product.title);
    // eslint-disable-next-line testing-library/no-node-access
    const cartItem = name.parentElement as HTMLElement;
    expect(name).toBeDefined();

    const price = within(cartItem).getByText(
      `${parseFloat(product.price) * product.quantity} €`
    );
    expect(price).toBeDefined();

    // Sub-total
    const subTotalText = screen.getByText("Sub total");
    // eslint-disable-next-line testing-library/no-node-access
    const subTotalPrice = subTotalText.nextElementSibling;
    expect(subTotalPrice?.textContent).toBe(
      `${parseFloat(product.price) * product.quantity} €`
    );

    // Delivery
    const deliveryText = screen.getByText("Delivery");
    // eslint-disable-next-line testing-library/no-node-access
    const deliveryPrice = deliveryText.nextElementSibling;
    expect(deliveryPrice?.textContent).toBe(
      `${process.env.REACT_APP_DELIVERY_PRICE} €`
    );

    // Total
    const totalText = screen.getByText("Total");
    // eslint-disable-next-line testing-library/no-node-access
    const totalPrice = totalText.nextElementSibling;
    expect(totalPrice?.textContent).toBe(
      `${
        parseFloat(product.price) * product.quantity +
        parseFloat(process.env.REACT_APP_DELIVERY_PRICE ?? "3")
      } €`
    );
  });

  test("Should remove CartItem component if its product quantity is zero", () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <CartContainer />
      </StateProvider>
    );
    const removeItemButton = screen.getByTestId("remove-item-button")
    fireEvent.click(removeItemButton)

    const image = screen.queryByRole("img");
    expect(image).toBeNull();

    const addProductsText = screen.getByText("Add some products to your cart")
    expect(addProductsText).toBeDefined()
  })

  test("Should remove CartItem component if clear cart is clicked", () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <CartContainer />
      </StateProvider>
    );
    const clearCartButton = screen.getByText("Clear")
    fireEvent.click(clearCartButton)

    const image = screen.queryByRole("img");
    expect(image).toBeNull();

    const addProductsText = screen.getByText("Add some products to your cart")
    expect(addProductsText).toBeDefined()
  })
});
