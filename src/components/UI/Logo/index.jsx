import React from 'react'
import styles from './.module.scss'

const Logo = ({ style, noSubtitle}) => {
  return (
    <>
      <div style={{ ...style }} className={styles.logo}>
        LOGO
      </div>
      {!noSubtitle && (
        <span className={styles.subtitle}>تطبيق خاص بعائلة باقر الكريمة</span>
      )}
    </>
  );
}

export default Logo