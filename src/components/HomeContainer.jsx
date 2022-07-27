import React from "react";
import { RiEBike2Fill } from "react-icons/ri";

import { heroProductsData } from "../utils/productsData";

// Components
import SectionSVGBackground from "./hero/SectionSVGBackground";
import { ProductCard } from "./hero/ProductCard";

function HomeContainer() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-[85rem] sm:h-full mb-8"
      id="home"
    >
      {/* Left side */}
      <div className="py-2 flex flex-col items-start justify-start md:justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-red-100 px-3 py-2 rounded-full">
          <p className="text-base text-red-600 font-semibold">Bike delivery</p>
          <div className="w-9 h-9 bg-white rounded-full overflow-hidden p-1 shadow-xl">
            <RiEBike2Fill className="w-full h-full text-red-600" />
          </div>
        </div>
        <p className="text-5xl md:text-6xl leading-12 font-bold text-headingColor tracking-wide">
          The fastest delivery in{" "}
          <span className="text-red-600 text-6xl lg:text-7xl">Your City</span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          eveniet iste odio magnam dolor, molestiae tenetur sed quibusdam minima
          quaerat fugiat odit officia tempora blanditiis perferendis dolorem
          porro cum qui?
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-red-300 to-red-600 font-semibold w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg hover:text-slate-100 md:hover:scale-[1.2] transition-all ease-in-out duration-100"
        >
          Order now
        </button>
      </div>

      {/* Right side */}
      <div className="py-2 flex flex-1 items-start relative -mt-[27rem] md:mt-8">
        <SectionSVGBackground />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center px-4 xl:px-32 py-4 gap-4 flex-wrap">
          {heroProductsData &&
            heroProductsData.map(pr => (
              <ProductCard key={pr.id} product={pr} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default HomeContainer;
