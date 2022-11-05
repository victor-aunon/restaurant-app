import { render, screen, fireEvent, within } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { StateProvider } from "../context/StateProvider";
import { AppState } from "../context/initialState";
import { reducer } from "../context/reducer";
import { Product } from "../types/product";
import { heroProductsData } from "../utils/productsData";

import { Home } from ".";

const products: Product[] = [
  {
    id: "1",
    title: "Gyozas",
    category: "starters",
    imageURL: "../assets/img/gyozas.png",
    price: "6.50",
    quantity: 1,
  },
  {
    id: "2",
    title: "Cola",
    category: "drinks",
    imageURL: "../assets/img/coca-cola.png",
    price: "2.50",
    quantity: 1,
  },
];

describe("Home Component page", () => {
  const initialState: AppState = {
    user: null,
    cartItems: [],
    cartShow: true,
    foodItems: products,
  };

  test("Should render hero, favorites and menu", () => {
    render(
      <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Home />
        </StateProvider>
      </Router>
    );

    // Hero section
    const heroContainer = screen.getByTestId("hero-container");
    heroProductsData.forEach(product => {
      // Product image
      expect(within(heroContainer).getByAltText(product.name)).toBeDefined();
      // Product name
      expect(within(heroContainer).getByText(product.name)).toBeDefined();
      // Product description
      expect(
        within(heroContainer).getByText(product.description)
      ).toBeDefined();
      // Product price
      expect(within(heroContainer).getByText(product.price)).toBeDefined();
    });

    // Favorites
    const favContainer = screen.getByTestId("favorites-row-container")
    const gyozasFavText = within(favContainer).getByText("Gyozas")
    expect(gyozasFavText).toBeDefined()
    const gyozasFavImg = within(favContainer).getByRole("img")
    expect(gyozasFavImg).toBeDefined()
    expect(gyozasFavImg.getAttribute("src")).toBe(products[0].imageURL)

    // Menu
    const menuContainer = screen.getByTestId("menu-row-container")
    const startersButton = screen.getByText("Starters")
    const drinksButton = screen.getByText("Drinks")

    // Find gyozas
    fireEvent.click(startersButton)
    const gyozasMenuText = within(menuContainer).getByText("Gyozas")
    expect(gyozasMenuText).toBeDefined()
    const gyozasMenuImg = within(menuContainer).getByRole("img")
    expect(gyozasMenuImg).toBeDefined()
    expect(gyozasMenuImg.getAttribute("src")).toBe(products[0].imageURL)

    // Find cola
    fireEvent.click(drinksButton)
    const colaMenuText = within(menuContainer).getByText("Cola")
    expect(colaMenuText).toBeDefined()
    const colaMenuImg = within(menuContainer).getByRole("img")
    expect(colaMenuImg).toBeDefined()
    expect(colaMenuImg.getAttribute("src")).toBe(products[1].imageURL)
  });
});
