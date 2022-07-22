import React from "react";

export const ProductCard = props => {
  const { id, imgSrc, name, description, price } = props.product;
  return (
    <div
      key={id}
      className="lg:w-[190px] min-w-[190px] min-h-[170px] flex flex-col items-center justify-center p-4 bg-cardOverlay backdrop-blur-md rounded-3xl drop-shadow-xl"
    >
      <img src={imgSrc} alt="Gyozas" className="w-40 -mt-10 lg:-mt-20" />
      <p className="text-xl font-semibold text-textColor mt-2">{name}</p>
      <p className="text-xs md:text-sm text-gray-500 my-3">{description}</p>
      <p className="text-base font-semibold text-headingColor">
        {price}
        <span className="text-base text-red-600"> €</span>
      </p>
    </div>
  );
};