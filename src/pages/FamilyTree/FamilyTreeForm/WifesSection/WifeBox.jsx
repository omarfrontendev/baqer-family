import React from 'react';
import styles from './.module.scss';
import { useTranslation } from 'react-i18next';
import { FaTrashCan } from "react-icons/fa6";
import { useFieldArray } from 'react-hook-form';

const WifeBox = ({ item, control, i, gender }) => {
  const { t } = useTranslation();

  const { remove } = useFieldArray({
    control,
    name: "marry",
  });

  const dataHandler = (body, type) => {
    if (type === "DELETE") {
      remove(body);
    }
  };

  return (
    <div className={styles.wife__box}>
      <div className={styles.details__box}>
        <span>اسم {gender === "male" ? "الزوجة" : "الزوج"}: </span>
        <span className={styles.name}>{item?.name}</span>
      </div>
      <div className={styles.details__box}>
        <span>تم الانفصال:</span>
        <span className={`${item?.is_divorced === 1 ? "" : styles.error}`}>
          {t(item?.is_divorced ? "yes" : "no")}
        </span>
      </div>
      <div className={styles.details__box}>
        <span>على قيد الحياة:</span>
        <span className={`${item?.is_alive === 1 ? "" : styles.error}`}>
          {t(item?.is_alive ? "yes" : "no")}
        </span>
      </div>
      <div className={styles.details__box}>
        <span>{gender === "male" ? "ارملة:" : "ارمل:"}</span>
        <span className={`${item?.is_relict === 1 ? "" : styles.error}`}>
          {t(item?.is_relict ? "yes" : "no")}
        </span>
      </div>
      <button
        type="button"
        className={styles.delete__btn}
        onClick={() => dataHandler(i, "DELETE")}
      >
        <FaTrashCan />
      </button>
    </div>
  );
};

export default WifeBox