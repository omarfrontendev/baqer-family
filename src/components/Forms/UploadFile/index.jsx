import React from "react";
import styles from "./.module.scss";
import { FaCamera } from "react-icons/fa";
import ErrorMessage from "../../UI/ErrorMessage";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFieldArray } from "react-hook-form";
import { CgSoftwareUpload } from "react-icons/cg";
import { LuReplace } from "react-icons/lu";

const UploadImages = ({ file, error, control, name, setValue }) => {
  const { t } = useTranslation();
  // HANDEL IMAGES CHANGERS
  //   const { append, remove } = useFieldArray({
  //     control,
  //     name,
  //   });

  //   const imagesHandler = (image, type) => {
  //     if (type === "ADD") {
  //       append(image);
  //     } else if (type === "DELETE") {
  //       remove(image);
  //     }
  //   };

  return (
    <div className={styles.images__container}>
      <input
        type="file"
        id="images-diwaniya"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files[0]?.type?.includes("image")) {
            toast.error(t("errors.mustBreFile"));
            return;
          }
          setValue(name, e?.target?.files[0]);
        }}
      />
      <label htmlFor="images-diwaniya" className={`${styles.add__file__btn}`}>
        {file ? (
          <>
            <LuReplace />
            <span>{file?.name}</span>
          </>
        ) : (
          <>
            <CgSoftwareUpload />
            <span>ارفع الملف</span>
          </>
        )}
      </label>
      {/* {images?.map((img, i) => (
        <Image key={i} imagesHandler={imagesHandler} i={i} img={img} />
      ))} */}
      {error && <ErrorMessage msg={"يجب إضافة صورة واحدة على الأقل"} />}
    </div>
  );
};

export default UploadImages;
