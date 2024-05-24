import React from 'react';
import styles from './.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading__container}>
      <span className={styles.spinner}></span>
    </div>
  );
}

export default Loading