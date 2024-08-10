import React from "react";
import { Popup } from "../../../../../../components";
import styles from "./.module.scss";

const DetailsModal = ({ details }) => {
  console.log(details);

  return (
    <Popup>
      <div className={styles.image__container}>
        <img
          src={
            details?.photo ||
            "https://up.yimg.com/ib/th?id=OIP.IKpJatzr_kSkN7k8VHXF6wHaGQ&pid=Api&rs=1&c=1&qlt=95&w=131&h=110"
          }
          alt=""
        />
        <h3 className={styles.name}>{details?.name}</h3>
        <div className={styles.details__list}>
          {/* gender */}
          <div className={styles.info__details}>
            <div className={styles.label}>الجنس:</div>
            <div className={styles.value}>
              {details?.type === "1" ? "ذكر" : "انثى"}
            </div>
          </div>
          {/* marry type */}
          <div className={styles.info__details}>
            <div className={styles.label}>الحالة الاجتماعية:</div>
            <div className={styles.value}>
              {details?.marry_type === "0"
                ? "غير متزوج"
                : details?.type === "1"
                ? "متزوج"
                : "متزوجة"}
            </div>
          </div>
          {/* is_divorced */}
          <div className={styles.info__details}>
            <div className={styles.label}>مطلق/مطلقة:</div>
            <div className={styles.value}>
              {details?.is_divorced === "0" ? "لا" : "نعم"}
            </div>
          </div>
          {/* is_relict */}
          <div className={styles.info__details}>
            <div className={styles.label}>ارمل/ارملة:</div>
            <div className={styles.value}>
              {details?.is_relict === "0" ? "لا" : "نعم"}
            </div>
          </div>
          {/* is_alive */}
          <div className={styles.info__details}>
            <div className={styles.label}>على قيد الحياة:</div>
            <div className={styles.value}>
              {details?.is_alive === "0" ? "لا" : "نعم"}
            </div>
          </div>
          {/* children */}
          <div className={styles.info__details}>
            <div className={styles.label}>الابناء:</div>
            <div className={styles.value}>
              <div className={styles.list}>
                {details?.children?.length
                  ? details?.children?.map((item) => (
                      <span key={item?.id}>{item?.name} - </span>
                    ))
                  : "لا يوجد"}
              </div>
            </div>
          </div>
          {/* wifes */}
          <div className={styles.info__details}>
            <div className={styles.label}>
              {details?.type === "1" ? "الزوجات:" : "الازواج"}
            </div>
            <div className={styles.value}>
              {details?.marry?.length
                ? details?.marry?.map((item) => (
                    <span key={item?.id}>{item?.name} - </span>
                  ))
                : "لا يوجد"}
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default DetailsModal;
