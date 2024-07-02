import React from 'react';
import styles from '../../.module.scss'
import { FaCamera } from "react-icons/fa";
import { ErrorMessage } from '../../../../components';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


const UploadImage = ({ onChange, value, error, id, label }) => {

  const { t } = useTranslation();

  return (
    <div style={{ position: "relative" }}>
      <input
        type="file"
        accept="image/*"
        id={id}
        className={styles.upload__input}
        onChange={(e) => {
          if(!e.target.files[0]?.type?.includes("image")) {
            toast.error(t("errors.mustBreImage"));
            return
          }
          onChange(e?.target?.files[0]);
        }}
      />
      <label
        htmlFor={id}
        className={`${styles.upload__file} ${value ? styles.uploaded : ""}`}
      >
        {value && (
          <img
            className={styles.user__image}
            src={typeof(value) === "string" ? value : window.URL.createObjectURL(value || "") || ""}
            alt=""
          />
        )}
        <FaCamera />
      </label>
      <span className={styles.label__text}>{label}</span>
      {error && (
        <ErrorMessage
          msg={error}
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "-52px",
          }}
        />
      )}
    </div>
  );
};

export default UploadImage