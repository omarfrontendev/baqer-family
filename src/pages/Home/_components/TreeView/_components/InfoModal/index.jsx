import React from 'react';
import { Popup } from '../../../../../../components';
import styles from './.module.scss';

const InfoModal = () => {

    const details = [
      {
        color: "#0d49c3",
        label: "ذكر",
      },
      {
        color: "#f137a6",
        label: "انثى",
      },
      {
        color: "#000",
        label: "متوفى",
      },
      {
        color: "#b4b4b4",
        label: "ارمل/ارملة",
      },
      {
        color: "#795547",
        label: "مطلق/مطلقة",
      },
    ];

  return (
    <Popup>
      <h3 className={styles.title}>مفتاح شجرة العائلة</h3>
      <div className={styles.details}>
        {details?.map((item, i) => (
          <div className={styles.single} key={i}>
            <span style={{ background: item?.color }} className={styles.bullets}></span>
            <span className={styles.label}>{item?.label}</span>
          </div>
        ))}
      </div>
    </Popup>
  );
}

export default InfoModal