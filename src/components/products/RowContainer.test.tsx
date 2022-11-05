import { render, screen } from "@testing-library/react";

import { StateProvider } from "../../context/StateProvider";
import { AppState } from "../../context/initialState";
import { reducer } from "../../context/reducer";

import { RowContainer } from ".";
import { Product } from "../../types/product";
import img from "../../assets/img/gyozas.png";

describe("RowContainer Component", () => {
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
    foodItems: [],
  };

  test("Should show a messages indicating there are no products", () => {
    render(<RowContainer data={[]} flag={false} />);

    const noProductsText = screen.getByText("No products found 😢");
    expect(noProductsText).toBeDefined();
  });

  test("Should render a MenuProductCard for each product in data argument", () => {
    // MenuProductCard requires the StateProvider
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <RowContainer data={[product]} flag={false} />
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
});
