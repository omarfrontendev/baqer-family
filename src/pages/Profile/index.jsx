import React from "react";
import Cookies from "js-cookie";
import styles from "./.module.scss";
import { MdAbc, MdArrowForwardIos, MdEdit, MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const userData = JSON.parse(Cookies.get("user"));
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.user__image}>
        <div className={styles.btns}>
          <button className={styles.back__btn} onClick={() => navigate(-1)}>
            <MdArrowForwardIos />
          </button>
          <Link to='/profile/edit' className={styles.edit}>
            <MdEdit />
          </Link>
        </div>
        <img
          src={
            //   userData?.profile_picture ||
            "https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png"
          }
          alt="user__image"
        />
        <h4 className={styles.user__name}>
          {userData?.name || `${userData?.first_name} ${userData?.second_name}`}
        </h4>
      </div>
      <div className={`${styles.page} container`}>
        <div className={styles.user__details}>
          <ul className={styles.list}>
            {/* Civil number */}
            <li className={styles.item}>
              <span className={`${styles.icon} ${styles.abc}`}>
                <MdAbc />
              </span>
              <div className={styles.details}>
                <span className={styles.label}>الرقم المدني</span>
                <span className={styles.value}>{userData?.civil_number}</span>
              </div>
            </li>
            {/* Email */}
            <li className={styles.item}>
              <span className={styles.icon}>
                <MdEmail />
              </span>
              <div className={styles.details}>
                <span className={styles.label}>البريد الإلكتروني</span>
                <span className={styles.value}>{userData?.email}</span>
              </div>
            </li>
            {/* Phone number */}
            <li className={styles.item}>
              <span className={styles.icon}>
                <FaPhoneAlt />
              </span>
              <div className={styles.details}>
                <span className={styles.label}>رقم الهاتف</span>
                <span className={styles.value}>{userData?.phone_number}</span>
              </div>
            </li>
            {/* Address */}
            <li className={styles.item}>
              <span className={styles.icon}>
                <FaLocationDot />
              </span>
              <div className={styles.details}>
                <span className={styles.label}>العنوان</span>
                <span className={styles.value}>
                  {userData?.residential_address}
                </span>
              </div>
            </li>
            {/* Address */}
            <li className={styles.item}>
              <span className={styles.icon}>
                <BsFillCalendarDateFill />
              </span>
              <div className={styles.details}>
                <span className={styles.label}>تاريخ الميلاد</span>
                <span className={styles.value}>
                  {dayjs(userData?.date_of_birth)
                    .locale("ar")
                    .format("DD  MMMM  YYYY")}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
