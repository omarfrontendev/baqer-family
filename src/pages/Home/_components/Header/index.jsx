import React from 'react';
import { IoMenu } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import Logo from '../../../../components/UI/Logo';
import styles from './.module.scss';
import { Link } from 'react-router-dom';

const Header = ({ onOpenMenu }) => {
  return (
    <header className={`${styles.header} container`}>
      <div className={styles.content}>
        <button className={styles.menu__btn} onClick={onOpenMenu}>
          <IoMenu />
        </button>
        <Logo noSubtitle style={{ fontSize: "28px", lineHeight: "normal" }} />
        <Link to="/notification" className={styles.notification__link}>
          <IoIosNotifications />
        </Link>
      </div>
    </header>
  );
};

export default Header