import {
  setDoc,
  doc,
  getDocs,
  query,
  collection,
  orderBy,
} from "firebase/firestore";

import { firestore } from "../firebase.config";

import { Product } from "../types/product";

// Saving new item
export const saveProduct = async (data: Product) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// Fetch items
export const getProducts = async (): Promise<Product[]> => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map(doc => doc.data() as Product);
};
