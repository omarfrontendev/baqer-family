import React from 'react';
import styles from './.module.scss';

const EmptyList = ({ text, style }) => {
  return (
    <div className={styles.text} style={{ ...style }}>
      {text}
    </div>
  );
}

export default EmptyList