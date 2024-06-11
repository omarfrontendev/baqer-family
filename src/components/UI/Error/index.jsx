import React from 'react';
import styles from './.module.scss';

const Error = ({ msg }) => {
  return <div className={styles.error}>{msg}</div>;
}

export default Error