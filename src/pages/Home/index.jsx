import React, { useState } from 'react';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';
import { BlogBox, MainBox, MainSlider } from '../../components';
import { useTranslation } from 'react-i18next';
import { images } from './_components/images';
import imageSlider from '../../assets/slide@2x.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from './.module.scss';

const Home = () => {

    const { t } = useTranslation();
    const [openMenu, setOpenMenu] = useState(false);

    const sections = [
      {
        title: "شجرة العائلة الكريمة",
        href: "/",
      },
      {
        title: "الديوانيات",
        href: "/",
      },
      {
        title: "المناسبات",
        href: "/",
      },
      {
        title: "التهاني",
        href: "/",
      },
      {
        title: "الأخبار",
        href: "/",
      },
      {
        title: "تصفية",
        href: "/",
      },
      {
        title: "الأنشطة والفاعليات",
        href: "/",
      },
      {
        title: "تصويت",
        href: "/",
      },
      {
        title: "الدعم فني",
        href: "/",
      },
      {
        title: "أعمال حرة",
        href: "/free-business",
      },
    ];


  return (
    <div className={styles.page}>
      <Header onOpenMenu={() => setOpenMenu(true)} />
      <div
        className={`${styles.overlay} ${openMenu ? styles.opened : ""}`}
        onClick={() => setOpenMenu(false)}
      ></div>
      <div
        className={`${styles.sidebar__container} ${
          openMenu ? styles.opened : ""
        }`}
      >
        <Sidebar onClose={() => setOpenMenu(false)} />
      </div>
      <div className={`${styles.content} container`}>
        {/* <UserWidget /> */}
        <MainSlider image={imageSlider} />
        <section className={styles.section}>
          <h3 className={styles.title}>{t("sections")}</h3>
          <div className={`${styles.list} list`}>
            {sections?.map((section, i) => (
              <MainBox
                key={i}
                title={section?.title}
                image={images[i]}
                href={section.href}
              />
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <h3 className={styles.title}>آخر أخبار العائلة</h3>
          <Swiper
            slidesPerView={2.5}
            cssMode={false} // Enable Swiper native transitions for better control
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {Array(10)
              .fill("")
              .map((_, i) => (
                <SwiperSlide key={i}>
                  <BlogBox />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
}

export default Home