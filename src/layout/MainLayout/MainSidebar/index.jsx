import React from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./.module.scss";
import { Logo } from "../../../components";

const MainSidebar = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar__content}>
      <button className={styles.close__btn} onClick={onClose}>
        <IoClose />
      </button>
      <div className={styles.logo}>
        <Logo style={{ width: "120px", margin: "50px auto" }} noSubtitle />
      </div>
      <nav>
        <ul className={styles.list}>
          <li onClick={onClose}>
            <Link to="/">{t("mainPage")}</Link>
          </li>
          <li onClick={onClose}>
            <Link to="/profile">{t("profile")}</Link>
          </li>
          <li onClick={onClose}>
            <Link to="/">{t("familyArchive")}</Link>
          </li>
          <li onClick={onClose}>
            <Link to="/inquiries">{t("Inquiries")}</Link>
          </li>
          <li onClick={onClose}>
            <button
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("user");
                navigate("/login");
              }}
            >
              {t("logout")}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainSidebar;
