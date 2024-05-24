import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./.module.scss"; // Make sure to create and use appropriate CSS module

const MainSlider = ({ image }) => {


  return (
    <Swiper
      slidesPerView={1}
      cssMode={false} // Enable Swiper native transitions for better control
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {Array(6)
        .fill("")
        .map((_, i) => (
          <SwiperSlide key={i}>
            <div className={`${styles.slider__content} slider__content`}>
              <img
                className={styles.slider__img}
                src={image}
                alt="slider_image"
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default MainSlider;
