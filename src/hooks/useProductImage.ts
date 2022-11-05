import { useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "../firebase.config";

interface useProductImageProps {
  setFields: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertStatus: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hideSpinnerAndMessage: VoidFunction;
}

export default function useProductImage(setFunctions: useProductImageProps) {
  const {
    setFields,
    setAlertStatus,
    setMessage,
    setIsLoading,
    hideSpinnerAndMessage,
  } = setFunctions;
  const [imageAsset, setImageAsset] = useState("");

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Show the spinner
    setIsLoading(true);
    if (e.target.files === null) return;
    const imageFile = e.target.files[0];

    // Upload to firestore
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      snapshot => {
        // const uploadProgress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      error => {
        console.error(error);
        setFields(true);
        setMessage(`Error uploading the image. ${error}`);
        setAlertStatus("danger");
        hideSpinnerAndMessage();
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMessage("Image uploaded successfully");
          setAlertStatus("success");
          hideSpinnerAndMessage();
        });
      }
    );
  };

  const deleteImage = () => {
    // Show the spinner
    setIsLoading(true);

    // Delete from firestore
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset("");
      setIsLoading(false);
      setFields(true);
      setMessage("Image deleted successfully");
      setAlertStatus("success");
      hideSpinnerAndMessage();
    });
  };

  return { imageAsset, setImageAsset, uploadImage, deleteImage };
}
