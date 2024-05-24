import React from "react";
import styles from "./.module.scss";
import { Link } from "react-router-dom";

const MainBox = ({ title, image, href }) => {
  return (
    <Link to={href} className={styles.box}>
      <img src={image} alt="section__image" className={styles.image} />
      <h5 className={styles.title}>{title}</h5>
    </Link>
  );
};

export default MainBox;
