import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { StateProvider } from "../../context/StateProvider";
import { AppState } from "../../context/initialState";
import { reducer } from "../../context/reducer";

import { UserButton } from ".";
import { UserInfo } from "firebase/auth";

import img from "../../assets/img/maki-vegan.png";
import userProfileImg from "../../assets/img/user_profile.png";

describe("UserButton Component", () => {
  const user: UserInfo = {
    uid: "1",
    displayName: "user",
    email: "",
    phoneNumber: "666666666",
    photoURL: img,
    providerId: "Google",
  };

  const admin: UserInfo = {
    uid: "1",
    displayName: "Admin",
    email: process.env.REACT_APP_ADMIN_MAIL ?? "",
    phoneNumber: "666666666",
    photoURL: img,
    providerId: "Google",
  };

  const initialState: AppState = {
    user,
    cartItems: [],
    cartShow: true,
    foodItems: [],
  };

  test("Should render UserButton component", () => {
    render(
      <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
          <UserButton />
        </StateProvider>
      </Router>
    );

    // UserButton
    const image = screen.getByRole("img");
    expect(image).toBeDefined();
    expect(image.getAttribute("src")).toBe(user.photoURL);
    expect(image.getAttribute("alt")).toBe(user.displayName);
  });

  test("Should not render new item menu option when clicking and other user than admin is logged in", () => {
    render(
      <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
          <UserButton />
        </StateProvider>
      </Router>
    );
    const image = screen.getByRole("img");
    fireEvent.click(image);

    const createItemButton = screen.queryByText("New item");
    expect(createItemButton).toBeNull();
  });

  test("Should render new item menu option when clicking and admin is logged in", () => {
    // Replace user with admin
    initialState.user = admin;
    render(
      <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
          <UserButton />
        </StateProvider>
      </Router>
    );
    const image = screen.getByRole("img");
    fireEvent.click(image);

    const createItemButton = screen.getByText("New item");
    expect(createItemButton).toBeDefined();
  });

  test("Should render default image when user logs out", () => {
    render(
      <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
          <UserButton />
        </StateProvider>
      </Router>
    );

    const image = screen.getByRole("img");
    fireEvent.click(image);

    // Now click on logout
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(image.getAttribute("src")).toEqual(userProfileImg);
    expect(image.getAttribute("alt")).toEqual("User profile");
  });
});
