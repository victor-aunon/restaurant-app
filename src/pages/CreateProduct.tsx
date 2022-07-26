import { useState } from "react";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";

import { MdFastfood, MdCloudUpload, MdDelete, MdEuro } from "react-icons/md";

import { categories } from "../utils/productsData";
import { saveProduct, getProducts } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { useProductImage } from "../hooks";
import { Product } from "../types/product";

import Loader from "../components/Loader";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { imageAsset, setImageAsset, uploadImage, deleteImage } =
    useProductImage({
      setFields,
      setAlertStatus,
      setMessage,
      setIsLoading,
      hideSpinnerAndMessage,
    });
  const [, dispatch] = useStateValue();

  function hideSpinnerAndMessage() {
    setTimeout(() => {
      setFields(false);
      setIsLoading(false);
      setMessage("");
    }, 4000);
  }

  function clearData() {
    setTitle("");
    setImageAsset("");
    setPrice("");
  }

  const saveItem = () => {
    try {
      if (!title || !category || !price || !imageAsset) {
        setFields(true);
        setMessage("Required fields cannot be empty");
        setAlertStatus("danger");
        hideSpinnerAndMessage();
        return;
      }

      // Save the item data into firestore database
      setIsLoading(true);
      const data: Product = {
        id: `${Date.now()}`,
        title,
        imageURL: imageAsset,
        category,
        quantity: 1,
        price,
      };
      saveProduct(data);
      setIsLoading(false);
      setFields(true);
      setMessage("Item saved successfully");
      setAlertStatus("success");
      hideSpinnerAndMessage();
      clearData();
    } catch (error) {
      console.error(error);
      setFields(true);
      setMessage(`Error uploading the image. ${error}`);
      setAlertStatus("danger");
      hideSpinnerAndMessage();
    }
    fetchFoodItems();
  };

  const fetchFoodItems = () => {
    getProducts().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "text-red-800 bg-red-300"
                : "text-emerald-800 bg-emerald-300"
            }`}
          >
            {msg}
          </motion.p>
        )}

        {/* Title input */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            placeholder="Write a title"
            className="w-full h-full bg-transparent text-lg p-1 outline-none border-none text-textColor"
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Category dropdown */}
        <div className="w-full">
          <select
            name="category"
            id="category"
            onChange={e => setCategory(e.target.value)}
            className="w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer bg-white"
          >
            <option value="other" className="bg-white">
              Select category
            </option>
            {categories &&
              categories.map(cat => (
                <option
                  key={cat.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={cat.urlParamName}
                >
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* Upload image */}
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[225px] md:h-[420px] cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <label
                  htmlFor="uploadimage"
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="w-auto h-auto flex flex-col items-center justify-center cursor-pointer gap-1 text-gray-500 hover:text-gray-700">
                    <MdCloudUpload className="text-4xl" />
                    <p className=" ">Click here to upload your image</p>
                  </div>
                  <input
                    type="file"
                    name="uploadimage"
                    id="uploadimage"
                    accept="image"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  <img
                    src={imageAsset}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                    onClick={deleteImage}
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Price input */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdEuro className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={price}
            placeholder="Price"
            className="w-full h-full bg-transparent text-lg p-1 outline-none border-none text-textColor"
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold hover:drop-shadow-lg"
            onClick={saveItem}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
