import React from 'react'
import { IoClose } from "react-icons/io5";
import { Logo } from '../../../../components';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import styles from './.module.scss';

const Sidebar = ({ onClose }) => {

  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div className={styles.sidebar__content}>
      <button className={styles.close__btn} onClick={onClose}>
        <IoClose />
      </button>
      <div className={styles.logo}>
        <Logo style={{ fontSize: "50px" }} noSubtitle />
      </div>
      <nav>
        <ul className={styles.list}>
          <li onClick={onClose}>
            <Link to="/">{t("mainPage")}</Link>
          </li>
          <li onClick={onClose}>
            <Link to="/">{t("profile")}</Link>
          </li>
          <li onClick={onClose}>
            <Link to="/">{t("familyArchive")}</Link>
          </li>
          <li onClick={onClose}>
            <Link to="/">{t("Inquiries")}</Link>
          </li>
          <li onClick={onClose}>
            <button onClick={() => {
              Cookies.remove("token");
              Cookies.remove("user");
              navigate('/login');
            }}>{t("logout")}</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar