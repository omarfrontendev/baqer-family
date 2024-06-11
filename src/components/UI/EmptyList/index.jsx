import React from 'react';
import styles from './.module.scss';

const EmptyList = ({ text }) => {
  return <div className={styles.text}>{text}</div>;
}

export default EmptyList