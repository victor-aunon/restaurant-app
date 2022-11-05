import { render, screen, fireEvent } from "@testing-library/react";

import { StateProvider } from "../../context/StateProvider";
import { AppState } from "../../context/initialState";
import { reducer } from "../../context/reducer";

import { MenuProductCard } from ".";
import { Product } from "../../types/product";
import { useStateValue } from "../../context/StateProvider";
import img from "../../assets/img/gyozas.png";

const FakeCartItemsComponent = () => {
  const [{ cartItems }] = useStateValue();

  return <p>{`Elements in cartItems: ${cartItems.length}`}</p>;
};

describe("MenuProductCard Component", () => {
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

  test("Should render MenuProductCard component", () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <MenuProductCard item={product} key={product.id} />
      </StateProvider>
    );

    // MenuProductCard
    const image = screen.getByRole("img");
    expect(image).toBeDefined();
    expect(image.getAttribute("src")).toBe(product.imageURL);
    expect(image.getAttribute("alt")).toBe(product.title);

    const name = screen.getByText(product.title);
    expect(name).toBeDefined();
    const price = screen.getByText(product.price);
    expect(price).toBeDefined();
  });

  test("Should update cartItems when clicking on the cart icon", () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <FakeCartItemsComponent />
        <MenuProductCard item={product} key={product.id} />
      </StateProvider>
    );

    // Cart icon in MenuProductCard
    const cart = screen.getByTestId("product-card-cart");
    expect(cart).toBeDefined();
    fireEvent.click(cart);

    const cartItemsText = screen.getByText("Elements in cartItems: 1");
    expect(cartItemsText).toBeDefined();
  });
});
