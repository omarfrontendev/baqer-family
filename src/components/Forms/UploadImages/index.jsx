import React from 'react';
import styles from './.module.scss';
import { FaCamera } from 'react-icons/fa';
import ErrorMessage from '../../UI/ErrorMessage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useFieldArray } from 'react-hook-form';
import Image from './Image';


const UploadImages = ({ images, error, control, name }) => {
  const { t } = useTranslation();
  // HANDEL IMAGES CHANGERS
  const { append, remove } = useFieldArray({
    control,
    name,
  });

  const imagesHandler = (image, type) => {
    if (type === "ADD") {
      append(image);
    } else if (type === "DELETE") {
      remove(image);
    }
  };

  return (
    <div className={styles.images__container}>
      <input
        type="file"
        accept="image/*"
        id="images-diwaniya"
        style={{ display: "none" }}
        onChange={(e) => {
          if (!e.target.files[0]?.type?.includes("image")) {
            toast.error(t("errors.mustBreImage"));
            return;
          }
          imagesHandler(e?.target?.files[0], "ADD");
        }}
      />
      <label htmlFor="images-diwaniya" className={styles.add__image__btn}>
        <FaCamera />
      </label>
      {images?.map((img, i) => (
        <Image
          key={i}
          imagesHandler={imagesHandler} 
          i={i} 
          img={img}
        />
      ))}
      {error && <ErrorMessage msg={"يجب إضافة صورة واحدة على الأقل"} />}
    </div>
  );
};

export default UploadImages