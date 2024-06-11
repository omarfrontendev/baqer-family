import React from 'react';
import styles from './.module.scss'
import { Link } from 'react-router-dom';

const MainButton = ({ children, to, type, disabled, loading, style, onClick }) => {
  if (type === "link")
    return (
      <Link to={to} className={styles.main__btn}>
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick && onClick}
      disabled={disabled}
      className={styles.main__btn}
      type={type || "button"}
      style={{ ...style }}
    >
      {loading ? <span className={styles.spinner}></span> : children}
    </button>
  );
};

export default MainButton