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
import Cookies from 'js-cookie';
import parse from "html-react-parser";

const OccasionDetails = () => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { userPermission } = JSON.parse(Cookies.get("user"));
  const permission = userPermission.includes("occasion");

  useEffect(() => {
    if(!location?.state?.data) {
      navigate("/occasions");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state?.data]);


  return (
    <>
      <div className={`container`}>
        <div className={styles.page__header}>
          <PageHeader title={location?.state?.data?.title} backBtnStyle={{ right: "0" }} />
          {permission && (
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
          )}
        </div>
        <MainSlider
          images={
            location?.state?.data?.images?.map((item) => item?.image) || []
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
          <h4 className={styles.title}>{location?.state?.data?.title}</h4>
          <div
            className={styles.details__info}
            style={{ flexDirection: "column", alignItems: "start" }}
          >
            <MainLabel>
              {dayjs(location?.state?.data?.date)
                .locale("ar")
                .format("DD  MMMM  YYYY")}
            </MainLabel>
            <div className="ql-editor" style={{ width: "100%" }}>
              {parse(location?.state?.data?.content)}
            </div>
          </div>
        </section>
        <div className={styles.footer__btn}>
          <a
            target="_blank"
            className={styles.btn__blue}
            href={`http://maps.google.com/?q=${location?.state?.data?.lat},${location?.state?.data?.long}`}
            rel="noreferrer"
          >
            {t("location")}
            <TiLocation size={20} />
          </a>
          <a
            href={`tel:${location?.state?.data?.phone}`}
            className={styles.contact__box}
          >
            {location?.state?.data?.phone}
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
          getList={() => navigate("/occasions")}
        />
      )}
    </>
  );
};

export default OccasionDetails;
