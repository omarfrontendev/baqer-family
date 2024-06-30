import React from 'react';
import styles from './.module.scss';
import LogoImage from "../../../assets/logo.jpeg";

const Logo = ({ style, noSubtitle}) => {
  return (
    <>
      <div style={{ ...style }} className={styles.logo}>
        <img src={LogoImage} alt='logo' className={styles.logo__image} />
      </div>
      {!noSubtitle && (
        <span className={styles.subtitle}>تطبيق خاص بعائلة باقر الكريمة</span>
      )}
    </>
  );
}

export default Logo