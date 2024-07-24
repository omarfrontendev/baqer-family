import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import DefaultCover from '../../../assets/DefaultCover.png';
import "swiper/css";
import "swiper/css/pagination";
import styles from "./.module.scss";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const MainSlider = ({ images, height, breakpoints, loading, type }) => {

  const navigate = useNavigate();

  const NavigateToPage = (img) => {
    if (!type) return;
      if (type === "diwaniyas") {
        navigate(`/diwaniyas/${img?.category_id}/${img?.id}`, {
          state: { data: img },
        });
      } else {
        navigate(`/${type}/${img?.id}`, { state: { data: img } });
        return;
      }
  };

  return (
    <Swiper
      slidesPerView={1}
      cssMode={false}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={
        breakpoints || {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }
      }
      modules={[Pagination]}
      className="mySwiper"
    >
      {loading
        ? Array(4)
            ?.fill("")
            .map((_, i) => (
              <SwiperSlide key={i}>
                <div
                  className={`${styles.slider__content} slider__content`}
                  style={{ height }}
                >
                  <Skeleton borderRadius="8px" width={"100%"} height="100%" />
                </div>
              </SwiperSlide>
            ))
        : images.map((img, i) => (
            <SwiperSlide key={i}>
              <div
                onClick={() => NavigateToPage(img)}
                className={`${styles.slider__content} slider__content`}
                style={{ height, cursor: "pointer" }}
              >
                <img
                  className={styles.slider__img}
                  src={
                    typeof img === "string" ? img : img?.image || DefaultCover
                  }
                  alt="slider_image"
                />
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default MainSlider;
