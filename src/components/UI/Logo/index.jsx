import React from 'react';
import styles from './.module.scss';
import LogoImage from "../../../assets/logo.jpeg";
import { Link } from 'react-router-dom';

const Logo = ({ style, noSubtitle}) => {
  return (
    <>
      <Link to='/' style={{ ...style }} className={styles.logo}>
        <img src={LogoImage} alt='logo' className={styles.logo__image} />
      </Link>
      {!noSubtitle && (
        <span className={styles.subtitle}>تطبيق خاص بعائلة باقر الكريمة</span>
      )}
    </>
  );
}

export default Logo