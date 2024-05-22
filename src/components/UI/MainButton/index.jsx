import React from 'react';
import styles from './.module.scss'
import { Link } from 'react-router-dom';

const MainButton = ({ children, to, type, disabled }) => {
  if (type === "link")
    return (
      <Link to={to} className={styles.main__btn}>
        {children}
      </Link>
    );

  return (
    <button
      disabled={disabled}
      className={styles.main__btn}
      type={type || "button"}
    >
      {children}
    </button>
  );
};

export default MainButton