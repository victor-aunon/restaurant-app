import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { StateProvider } from "../context/StateProvider";
import { AppState } from "../context/initialState";
import { reducer } from "../context/reducer";

import { CreateProduct } from ".";
import { categories } from "../utils/productsData";
import { Product } from "../types/product";
import { useStateValue } from "../context/StateProvider";
// Use * as xxxx when mocking a module/custom hook
import * as useProductImage from "../hooks/useProductImage";
import * as firebaseFunctions from "../utils/firebaseFunctions";

const products: Product[] = [
  {
    id: "1",
    title: "Gyozas",
    category: "Starters",
    imageURL: "../assets/img/gyozas.png",
    price: "6.50",
    quantity: 1,
  },
];

const FakeFoodItemsComponent = () => {
  const [{ foodItems }] = useStateValue();
  return (
    <>
      <p>{`Elements in foodItems: ${foodItems.length}`}</p>
      {foodItems.length > 1 && <p>{`${foodItems[1].title}`}</p>}
    </>
  );
};

// Mock firebaseFunctions used in CreateProduct component
jest.mock("../utils/firebaseFunctions");
const mockFirebaseFunction = firebaseFunctions as jest.Mocked<
  typeof firebaseFunctions
>;

// Mock useProductImage, implementation will be defined on each test
jest.mock("../hooks/useProductImage");
// Important! as jest.Mocked when using hooks
const mockUseProductImage = useProductImage as jest.Mocked<
  typeof useProductImage
>;

describe("CreateProduct Component page", () => {
  const initialState: AppState = {
    user: null,
    cartItems: [],
    cartShow: true,
    foodItems: products,
  };

  test("Should render CreateProduct and display an error if fields are empty", () => {
    mockUseProductImage.default.mockImplementation(() => ({
      imageAsset: "",
      setImageAsset: () => {},
      uploadImage: () => {},
      deleteImage: () => {},
    }));

    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <CreateProduct />
      </StateProvider>
    );

    // Title input
    const titleInput = screen.getByPlaceholderText("Write a title");
    expect(titleInput).toBeDefined();

    // Category select
    const categorySelect = screen.getByDisplayValue("Select category");
    expect(categorySelect).toBeDefined();
    categories.forEach(category => {
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        screen.getByRole("option", { name: category.name })
      );
      expect(
        screen.getByRole<HTMLOptionElement>("option", { name: category.name })
          .selected
      ).toBeTruthy();
    });

    // Image uploader
    const imageUploader = screen.getByLabelText(
      "Click here to upload your image"
    );
    expect(imageUploader).toBeDefined();

    // Price input
    const priceInput = screen.getByPlaceholderText("Price");
    expect(priceInput).toBeDefined();

    // Click on save and expect an error message
    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeDefined();
    fireEvent.click(saveButton);
    const errorMessage = screen.getByText("Required fields cannot be empty");
    expect(errorMessage).toBeDefined();
    expect(errorMessage.classList).toContain("text-red-800");
  });

  test("Save a product", async () => {
    mockFirebaseFunction.getProducts.mockImplementation(() => {
      return Promise.resolve(initialState.foodItems)
    }

    );
    mockFirebaseFunction.saveProduct.mockImplementation(productData => {
      initialState.foodItems = [...initialState.foodItems, productData];
      return Promise.resolve();
    });
    mockUseProductImage.default.mockImplementation(() => ({
      imageAsset: products[0].imageURL,
      setImageAsset: () => {},
      uploadImage: () => {},
      deleteImage: () => {},
    }));

    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <CreateProduct />
      </StateProvider>
    );

    // Title input
    const titleInput = screen.getByPlaceholderText("Write a title");
    userEvent.type(titleInput, "TestProduct");

    // Category select
    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Drinks" })
    );
    expect(
      screen.getByRole<HTMLOptionElement>("option", { name: "Drinks" }).selected
    ).toBeTruthy();

    // Image uploader
    // Since useProductImage is being mocked, we cannot simulate
    // userEvent.upload() the uploaded image URL is defined in imageAsset
    // returned value by mockUseProductImage
    const imageUploaded = screen.getByAltText("Uploaded");
    expect(imageUploaded).toBeDefined();
    expect(imageUploaded.getAttribute("src")).toBe(products[0].imageURL);

    // Price input
    const priceInput = screen.getByPlaceholderText("Price");
    userEvent.type(priceInput, "15.30");

    // Click on save and expect a success message
    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);
    const errorMessage = screen.getByText("Item saved successfully");
    expect(errorMessage).toBeDefined();
    expect(errorMessage.classList).toContain("text-emerald-800");

    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <FakeFoodItemsComponent />
      </StateProvider>
    );

    // Check that foodItems has been updated
    const foodItemsLength = screen.getByText("Elements in foodItems: 2");
    expect(foodItemsLength).toBeDefined();
    const foodItemTitle = screen.getByText("TestProduct")
    expect(foodItemTitle).toBeDefined()
  });
});
