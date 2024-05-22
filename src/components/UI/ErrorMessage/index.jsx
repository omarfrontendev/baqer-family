import React from 'react';
import styles from './.module.scss'

const ErrorMessage = ({ msg, style }) => {
  return (
    <p className={styles.msg} style={{ ...style }}>
      {msg}
    </p>
  );
}

export default ErrorMessage