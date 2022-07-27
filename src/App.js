import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { actionType } from "./context/reducer";

import { useStateValue } from "./context/StateProvider";
import { getProducts } from "./utils/firebaseFunctions";

import { Header, MainContainer, CreateContainer } from "./components";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchFoodItems() {
      await getProducts().then(data => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        });
      });
    }
    fetchFoodItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-full h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-24 md:mt-16 py-8 md:py-14 px-4 md:px-16 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
