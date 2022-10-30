import React, { useState } from "react";
import { motion } from "framer-motion";

import { categories } from "../utils/productsData";
import { useStateValue } from "../context/StateProvider";

// Components
import RowContainer from "./products/RowContainer";

const MenuContainer = () => {
  const [filter, setFilter] = useState("starters");
  const [{ foodItems }] = useStateValue();

  return (
    <section className="w-full" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-1 before:left-0 before:bg-gradient-to-tr from-red-300 to-red-600 mr-auto">
          Our menu
        </p>

        <div className="w-full flex items-center justify-center lg:justify-center gap-4 lg:gap-8 py-6 flex-wrap">
          {categories &&
            categories.map(category => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-red-600" : "bg-card"
                } w-24 min-w-[94px] h-[3.5rem] cursor-pointer rounded-xl drop-shadow-lg flex flex-col gap-3 items-center justify-center hover:bg-red-600`}
                onClick={() => setFilter(category.urlParamName)}
              >
                <p
                  className={`text-base ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } font-semibold group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter(item => item.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
