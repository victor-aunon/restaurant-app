import React, { useRef } from "react";
import { motion } from "framer-motion";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { useStateValue } from "../context/StateProvider";

// Components
import HomeContainer from "./HomeContainer";
import RowContainer from "./products/RowContainer";
import MenuContainer from "./MenuContainer";

const MainContainer = () => {
  const [{ foodItems }] = useStateValue();
  const rowContainerRef = useRef();

  function scroll(scrollOffset) {
    rowContainerRef.current.scrollBy({
      top: 0,
      left: scrollOffset,
      behavior: "smooth",
    });
  }

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center select-none">
      <HomeContainer />

      <section className="w-full mt-8">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-1 before:left-0 before:bg-gradient-to-tr from-red-300 to-red-600 transition-all ease-in-out duration-100">
            Favorites
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-red-300 flex items-center justify-center cursor-pointer hover:bg-red-500"
              onClick={() => scroll(-250)}
            >
              <MdChevronLeft className="text-xl text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-red-300 flex items-center justify-center cursor-pointer hover:bg-red-500"
              onClick={() => scroll(250)}
            >
              <MdChevronRight className="text-xl text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          ref={rowContainerRef}
          flag={true}
          data={foodItems?.filter(item =>
            ["starters", "maki", "sashimi"].includes(item.category)
          )}
        />
      </section>

      <MenuContainer />
    </div>
  );
};

export default MainContainer;
