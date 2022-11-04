import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export default function useUserMenu() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const url = useLocation()
  const navigate = useNavigate()

  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      // Push user info to the local storage
      localStorage.setItem("user", JSON.stringify(providerData[0]));
      return;
    }
    setIsMenu(!isMenu);
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });

    // Send user to home if in createProduct page
    if (url.pathname.includes("createProduct")) {
      navigate("/")
    }
  };

  return { user, login, logout, isMenu, setIsMenu };
}
