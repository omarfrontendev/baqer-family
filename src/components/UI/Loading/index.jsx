import React from 'react';
import styles from './.module.scss';

const Loading = ({ style }) => {
  return (
    <div style={{ ...style }} className={styles.loading__container}>
      <span className={styles.spinner}></span>
    </div>
  );
};

export default Loading