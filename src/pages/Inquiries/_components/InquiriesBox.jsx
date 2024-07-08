import React from "react";
import { IoNotifications } from "react-icons/io5";
import styles from "./.module.scss";

const InquiriesBox = ({ content, date, name, phoneNumber, newPhoneNumber }) => {
  return (
    <div className={styles.box}>
      <div className={styles.box__header}>
        <IoNotifications />
        <h4 className={styles.title}>استفسار جديد</h4>
      </div>
      <p className={styles.text}>
        <span>اسم المستخدم:</span>
        {name}
      </p>
      <p className={styles.text}>
        <span>رقم الهاتف:</span>
        {phoneNumber}
      </p>
      <p className={styles.text}>
        <span>رقم الهاتف الإضافي:</span>
        {newPhoneNumber}
      </p>
      <p className={styles.text}>
        <span>:الاستفسار:</span>
        {content}
      </p>
      <span className={styles.date}>{date}</span>
    </div>
  );
};

export default InquiriesBox;
