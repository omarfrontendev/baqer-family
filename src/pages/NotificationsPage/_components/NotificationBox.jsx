import React from 'react';
import { IoNotifications } from "react-icons/io5";
import styles from './.module.scss';

const NotificationBox = ({ title, content, date, type }) => {


    if (type === "diwan")
      return (
        <div className={styles.box}>
          <div className={styles.box__header}>
            <IoNotifications />
            <h4 className={styles.title}>{title}</h4>
          </div>
          <p className={styles.text}>{content}</p>
          <span className={styles.date}>{date}</span>
        </div>
      );
};

export default NotificationBox