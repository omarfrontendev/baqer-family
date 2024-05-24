import React from 'react';
import styles from './.module.scss';

const DetailsBox = ({ title, value }) => {
  return (
    <div className={styles.details__container}>
        <div className={styles.box}>
            {title}
        </div>
        <p className={styles.text}>{value}</p>
    </div>
  )
}

export default DetailsBox