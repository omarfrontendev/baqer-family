import React, { useContext } from 'react'
import { MainButton, Popup } from '../../../../components'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from './.module.scss';
import { ModalContext } from '../../../../context/ModalContext';
import parse from "html-react-parser";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OccasionsModal = ({ occasions }) => {
  const { setIdModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Popup>
      <h3 className={styles.title}>{t("Occasions")}</h3>
      <Swiper
        slidesPerView={1}
        cssMode={false}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {occasions?.map((occasion) => (
          <SwiperSlide key={occasion?.id}>
            <div className={styles?.occasion__box}>
              <img
                src={occasion?.image}
                alt="occasions_image"
                className={styles.occasion__image}
                onClick={() => {
                  navigate(`/occasions/${occasion?.id}`, {
                    state: { data: occasion },
                  });
                  setIdModal("");
                }}
              />
              <h4 className={styles.occasion__title}>{occasion?.title}</h4>
              <div
                className={`ql-editor ${styles.occasion__text}`}
                style={{ width: "100%" }}
              >
                {parse(occasion.content)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <MainButton
        onClick={() => setIdModal("")}
        style={{ borderRadius: "50px", margin: "10px auto 0" }}
      >
        إغلاق
      </MainButton>
    </Popup>
  );
};

export default OccasionsModal