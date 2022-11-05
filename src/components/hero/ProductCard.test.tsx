import { render, screen } from "@testing-library/react";

import { ProductCard } from ".";
import { HeroProduct } from "../../types/heroProduct";
import img from "../../assets/img/gyozas.png";

describe("ProductCard Component", () => {
  const product: HeroProduct = {
    id: 1,
    name: "Gyozas",
    description: "Pork and vegetables",
    imgSrc: img,
    price: "6.50",
  };

  test("Should render ProductCard component", () => {
    render(<ProductCard product={product} />);
    const image = screen.getByRole("img");
    expect(image).toBeDefined();
    expect(image.getAttribute("src")).toBe(product.imgSrc);
    expect(image.getAttribute("alt")).toBe(product.name);

    const name = screen.getByText(product.name);
    expect(name).toBeDefined();

    const description = screen.getByText(product.description);
    expect(description).toBeDefined();

    const price = screen.getByText(product.price);
    expect(price).toBeDefined();
  });
});
