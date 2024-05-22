import React from 'react';
import { ErrorMessage } from '../../../../components';
import styles from '../../.module.scss';

const Radio = ({
  style,
  register,
  error,
  name,
  label,
  label_1,
  val_1,
  label_2,
  val_2,
  id_1,
  id_2
}) => {
  return (
    <div className={`${styles.radio__box} ${error ? styles.invalid : ""}`} style={{ ...style }}>
      <div>{label}</div>
      <div className={styles.gender__labels}>
        <div>
          <label htmlFor={id_1 || val_1}>{label_1}</label>
          <input
            {...register(name, `${name} is required!`)}
            type="radio"
            id={id_1 || val_1}
            name={name}
            value={val_1}
          />
        </div>
        <div>
          <label htmlFor={id_2 || val_2}>{label_2}</label>
          <input
            {...register(name, `${name} is required!`)}
            type="radio"
            id={id_2 || val_2}
            name={name}
            value={val_2}
          />
        </div>
      </div>
      {error && <ErrorMessage msg={error} />}
    </div>
  );
};

export default Radio;