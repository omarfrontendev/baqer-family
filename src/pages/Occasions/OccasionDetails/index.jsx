import React, { useContext, useEffect } from "react";
import { PageHeader } from "../../../layout";
import styles from "./.module.scss";
import { DeleteIcon } from "../../../icons";
import { DeleteModal, MainLabel, MainSlider } from "../../../components";
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { TiLocation } from "react-icons/ti";
import { FaPhone } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import 'dayjs/locale/ar'; // Import Arabic locale
import { ModalContext } from "../../../context/ModalContext";

const OccasionDetails = () => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if(!location?.state) {
      navigate("/occasions");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state]);


  return (
    <>
      <div className={`container`}>
        <div className={styles.page__header}>
          <PageHeader title={location?.state?.data?.title} />
          <div className={styles.header__btns}>
            <button
              className={styles.header__btn}
              onClick={(e) => {
                e.stopPropagation();
                setIdModal(`delete-occasion-${location?.state?.data?.id}`);
              }}
            >
              <DeleteIcon />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  `/occasions/edit/${location?.state?.data?.category_id}`,
                  {
                    state: { data: location?.state?.data },
                  }
                );
              }}
              className={styles.header__btn}
            >
              <MdModeEdit />
            </button>
          </div>
        </div>
        <MainSlider
          images={location?.state?.images || []}
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
          <h4 className={styles.title}>{location?.state?.data?.title}</h4>
          <div className={styles.details__info}>
            <MainLabel>
              {dayjs(location?.state?.date?.date)
                .locale("ar")
                .format("DD  MMMM  YYYY")}
            </MainLabel>
            <p>{location?.state?.data?.content}</p>
          </div>
        </section>
        <div className={styles.footer__btn}>
          {/* <button className={styles.book__btn}>
            حـجـز
            <TiLocation size={20} />
          </button> */}
          <a
            target="_blank"
            className={styles.btn__blue}
            href={`http://maps.google.com/?q=${location?.state?.date?.lat},${location?.state?.date?.long}`}
            rel="noreferrer"
          >
            {t("location")}
            <TiLocation size={20} />
          </a>
          <a
            href={`tel:${location?.state?.data?.phone}`}
            className={styles.contact__box}
          >
            {t("call")}
            <FaPhone size={20} />
          </a>
        </div>
      </div>
      {idModal === `delete-occasion-${location?.state?.data?.id}` && (
        <DeleteModal
          body={{
            occasion_id: location?.state?.data?.id,
          }}
          endpoint="deleteOccasion"
          title="هل أنت متأكد أنك تريد حذف هذه المناسبة؟"
          getList={() => navigate('/occasions')}
        />
      )}
    </>
  );
};

export default OccasionDetails;
