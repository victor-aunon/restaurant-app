import img1 from "../assets/img/gyozas.png";
import img2 from "../assets/img/takoyaki.png";
import img3 from "../assets/img/maki-california.png";
import img4 from "../assets/img/temaki.png";

import { HeroProduct } from "../types/heroProduct";
import { ProductCategory } from "../types/productCategory";

export const heroProductsData: HeroProduct[] = [
  {
    id: 1,
    name: "Gyozas",
    description: "Pork and vegetables",
    price: "6.25",
    imgSrc: img1,
  },
  {
    id: 2,
    name: "Takoyaki",
    description: "Fried octopus ball",
    price: "6.75",
    imgSrc: img2,
  },
  {
    id: 3,
    name: "Maki California",
    description: "Surimi and avocado",
    price: "8.50",
    imgSrc: img3,
  },
  {
    id: 4,
    name: "Temaki",
    description: "Salmon temaki",
    price: "4.00",
    imgSrc: img4,
  },
];

export const categories: ProductCategory[] = [
  { id: 1, name: "Starters", urlParamName: "starters" },
  { id: 2, name: "Nigiri", urlParamName: "nigiri" },
  { id: 3, name: "Maki", urlParamName: "maki" },
  { id: 4, name: "Temaki", urlParamName: "temaki" },
  { id: 5, name: "Sashimi", urlParamName: "sashimi" },
  { id: 6, name: "Tempura", urlParamName: "tempura" },
  { id: 7, name: "Drinks", urlParamName: "drinks" },
];
