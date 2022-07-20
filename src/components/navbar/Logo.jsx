import React from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/img/logo.png";
import "../../assets/css/logo.css";

const Logo = () => {
  const restaurantName = process.env.REACT_APP_RESTAURANT_NAME;

  return (
    <Link to={"/"} className="flex items-center gap-2">
      <img src={logoImg} alt="Logo" className="w-12 object-cover pb-3" />
      <p className="text-headingColor text-3xl font-extrabold logo-text">
        {restaurantName}
      </p>
    </Link>
  );
};

export default Logo;
