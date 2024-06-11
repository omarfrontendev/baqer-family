import React from 'react';
import styles from './.module.scss';

const MainLabel = ({ children, bgColor, textColor }) => {
  return (
    <div className={styles.label} style={{backgroundColor: bgColor}}>
      <span className={styles.text} style={{ color: textColor }}>
        {children}
      </span>
    </div>
  );
};

export default MainLabel;