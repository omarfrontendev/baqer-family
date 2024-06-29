import React, { useState } from "react";
import styles from "./.module.scss";
import { DeleteIcon } from "../../../icons";
import deleteImage from "../../../utils/deleteImage";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const Image = ({ imagesHandler, i, img }) => {
  const [deleting, setDeleting] = useState(false);

  // remove image from Server
  const deleteImageFromServe = async (id, i) => {
    setDeleting(true);
    try {
      setDeleting(true);
      const res = await deleteImage(id);
      if (res?.success) {
        setDeleting(false);
        imagesHandler(i, "DELETE");
        toast.success(res?.message?.trim());
      }
    } catch (err) {
      console.log(err);
      setDeleting(false);
    }
    setDeleting(false);
  };

  // remove Image handler
  const deleteImageHandler = (img, i) => {

    if (img?.image) {
      deleteImageFromServe(img?.id, i);
    } else {
      imagesHandler(i, "DELETE");
    }
  };

  return (
    <div className={styles.image__box} key={i}>
      {deleting && <div className={styles.overlay}>
        <FaSpinner className={styles.spinner} />
        </div>}
      {!deleting && (
        <button
          type="button"
          className={styles.delete__img__btn}
          onClick={() => deleteImageHandler(img, i)}
        >
          <DeleteIcon />
        </button>
      )}
      <img
        key={i}
        className={styles.img}
        src={
          typeof img !== "string" && !img?.image
            ? window.URL.createObjectURL(img)
            : img?.image || img
        }
        alt="diwaniya__image"
      />
    </div>
  );
};

export default Image;
