import React from 'react';
import styles from '../../.module.scss'
import { FaCamera } from "react-icons/fa";
import { ErrorMessage } from '../../../../components';


const UploadImage = ({ onChange, value, error, id, label }) => {
  return (
    <div style={{ position: "relative" }}>
      <input
        type="file"
        id={id}
        className={styles.upload__input}
        onChange={(e) => {
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
            src={value ? window.URL.createObjectURL(value || "") : ""}
            alt=""
          />
        )}
        <FaCamera />
      </label>
      <span className={styles.label__text}>{label}</span>
      {error && <ErrorMessage msg={error} style={{left: "50%", transform: "translateX(-50%)", bottom: "-52px"}} />}
    </div>
  );
};

export default UploadImage