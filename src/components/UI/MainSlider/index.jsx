import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import DefaultCover from '../../../assets/DefaultCover.png';
import "swiper/css";
import "swiper/css/pagination";
import styles from "./.module.scss";
import Skeleton from "react-loading-skeleton";

const MainSlider = ({ images, height, breakpoints, loading }) => {
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
                className={`${styles.slider__content} slider__content`}
                style={{ height }}
              >
                <img
                  className={styles.slider__img}
                  src={img || DefaultCover}
                  alt="slider_image"
                />
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default MainSlider;
