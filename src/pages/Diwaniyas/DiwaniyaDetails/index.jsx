import React, { useEffect } from "react";
import { PageHeader } from '../../../layout';
import styles from './.module.scss';
import { DeleteIcon } from '../../../icons';
import { MainLabel, MainSlider } from '../../../components';
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { TiLocation } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DefaultCover from "../../../assets/DefaultCover.png";
import dayjs from "dayjs";
import 'dayjs/locale/ar'; // Import Arabic locale



const DiwaniyaDetails = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const diwaniya = location?.state?.data;

  useEffect(() => {
    if (!diwaniya) navigate("/diwaniyas");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diwaniya]);

  return (
    <div className={`container`}>
      <div className={styles.page__header}>
        <PageHeader title={"ديوان ملا باقر"} />
        <div className={styles.header__btns}>
          <button className={styles.header__btn}>
            <DeleteIcon />
          </button>
          <Link to="/" className={styles.header__btn}>
            <MdModeEdit />
          </Link>
        </div>
      </div>
      <MainSlider
        images={
          diwaniya?.images?.map((item) => item?.image)?.length
            ? diwaniya?.images?.map((item) => item?.image)
            : [DefaultCover]
        }
        height="calc(100vh - 200px)"
        breakpoints={{
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
      />
      <section className={styles.details__section}>
        <h4 className={styles.title}>{diwaniya?.name}</h4>
        <div
          style={{ flexDirection: "column", alignItems: "start" }}
          className={styles.details__info}
        >
          <MainLabel>
            {dayjs(diwaniya?.created_at).locale("ar").format("DD  MMMM  YYYY")}
          </MainLabel>
          <p>{diwaniya?.description}</p>
        </div>
        <div className={styles.details__info}>
          <MainLabel bgColor="#EBEBEB">{t("diwaniyaDate")}</MainLabel>
          {diwaniya?.workDays?.map((day) => (
            <span>
              {day?.time} {t(day?.day)}
            </span>
          ))}
        </div>
        <div className={styles.details__info}>
          <MainLabel bgColor="#EBEBEB">{t("عنوان الديوان")}</MainLabel>
          <span>{diwaniya?.address}</span>
        </div>
      </section>
      <div className={styles.footer__btn}>
        <a
          target="_blank"
          className={styles.btn__blue}
          href={`http://maps.google.com/?q=${diwaniya?.lat},${diwaniya?.long}`}
          rel="noreferrer"
        >
          {t("location")}
          <TiLocation size={20} />
        </a>
        {/* <a href={`tel:01121256454`} className={styles.contact__box}>
          {t("call")}
          <FaPhone size={20} />
        </a> */}
      </div>
    </div>
  );
}

export default DiwaniyaDetails;