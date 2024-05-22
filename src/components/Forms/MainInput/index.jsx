import { useState } from "react";
import styles from "./.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const MainInput = ({
  name,
  label,
  placeholder,
  type,
  icon,
  register,
  required,
  error,
  defaultValue,
  value,
}) => {
  const [showPass, SetShowPass] = useState(false);

  if (type === "textarea")
    return (
      <div className={styles.input__container}>
        <div className={styles.input__box}>
          <textarea
            autoComplete=""
            id={name}
            {...register(`${name}`, {
              required: required ? false : `${label} is required!`,
            })}
            type={type}
            className={`${styles.input} ${styles.textarea} ${
              error ? styles.input__invalid : ""
            }`}
            placeholder={`${placeholder} ${required ? "*" : ""}`}
            defaultValue={defaultValue}
          />
          <label
            className={`${styles.label} ${value ? styles.focus : ""}`}
            htmlFor={name}
          >
            {placeholder} {required ? "*" : ""}
          </label>
          <label htmlFor={name} className={styles.icon}>
            {icon}
          </label>
        </div>
        <p className={styles.err__msg}>{error}</p>
      </div>
    );

  return (
    <div className={styles.input__container}>
      <div className={styles.input__box}>
        <input
          defaultValue={defaultValue}
          autoComplete=""
          id={name}
          {...register(`${name}`, {
            required: required ? false : `${label} is required!`,
          })}
          type={type === "password" ? (showPass ? "text" : "password") : type}
          className={`${styles.input} ${error ? styles.input__invalid : ""} ${
            !icon ? styles.no__icon : ""
          }`}
          placeholder={`${placeholder} ${required ? "*" : ""}`}
        />
        <label
          className={`${styles.label} ${value ? styles.focus : ""}`}
          htmlFor={name}
        >
          {placeholder} {required ? "*" : ""}
        </label>
        <label htmlFor={name} className={styles.icon}>
          {icon}
        </label>
        {type === "password" && (
          <button
            type="button"
            className={styles.eyeIcon}
            onClick={() => SetShowPass((prev) => !prev)}
          >
            {showPass ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      <p className={styles.err__msg}>{error}</p>
    </div>
  );
};

export default MainInput;
