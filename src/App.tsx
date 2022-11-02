import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Functions
import { actionType } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";
import { getProducts } from "./utils/firebaseFunctions";

// Components
import { Header } from "./layout";
import { Home, CreateProduct } from "./pages";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [, dispatch] = useStateValue();
  const params = useLocation();
  if (params.hash) {
    const element = document.querySelector(params.hash);
    if (element) element.scrollIntoView({ block: "start", behavior: "smooth" });
  }

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
            <Route path="/*" element={<Home />} />
            <Route path="/createProduct" element={<CreateProduct />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
