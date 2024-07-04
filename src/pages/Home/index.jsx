import React, { useContext, useEffect, useState } from 'react';
import { BlogBox, EmptyList, Error, MainBox, MainSlider } from '../../components';
import { useTranslation } from 'react-i18next';
import { images } from './_components/images';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from './.module.scss';
import { ModalContext } from '../../context/ModalContext';
import { useApi } from '../../hooks/useApi';
import OccasionsModal from './_components/OccasionsModal';
import Skeleton from 'react-loading-skeleton';
import Cookies from "js-cookie";

const Home = () => {
  const { t } = useTranslation();
  const { setIdModal, idModal } = useContext(ModalContext);

  const sections = [
    {
      title: "شجرة العائلة الكريمة",
      href: "/",
    },
    {
      title: "الديوانيات",
      href: "/diwaniyas",
    },
    {
      title: "المناسبات",
      href: "/occasions",
    },
    {
      title: "التهاني",
      href: "/congratulations",
    },
    {
      title: "الأخبار",
      href: "/news",
    },
    {
      title: "تصفية",
      href: "/liquidation",
    },
    {
      title: "الأنشطة والفاعليات",
      href: "/activities",
    },
    {
      title: "تصويت",
      href: "/",
    },
    {
      title: "الدعم فني",
      href: "/tech-support",
    },
    {
      title: "أعمال حرة",
      href: "/free-business",
    },
  ];

  // get latest occasions:=
  const { onRequest: onGetOccasions, data: occasionsRes } = useApi(
    "/api/viewOccasionPopUp",
    "get"
  );

  // get Congratulations slider:=
  const {
    data: slider,
    loading: sliderLoading,
    onRequest: onGetSlider,
    error: SliderError,
  } = useApi("api/viewCongratulateSlider?current_page=1&per_page=10000", "get");

  // get news
  const {
    data: news,
    error: newsError,
    loading: newsLoading,
    onRequest: onGetNews,
  } = useApi(`/api/viewNews?current_page=1&per_page=10000`, "get");

  useEffect(() => {
    onGetSlider();
    onGetOccasions();
    onGetNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (occasionsRes?.success && !JSON.parse(Cookies.get("visitHome"))) {
      setIdModal("occasions-modal");
      Cookies.set("visitHome", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [occasionsRes?.success]);

  return (
    <>
      <div style={{ height: "40px" }}></div>
      <div className={styles.page}>
        <div className={`${styles.content} container`}>
          {/* Slider */}
          {SliderError ? (
            <Error msg={SliderError?.message} />
          ) : (
            <MainSlider
              loading={sliderLoading}
              images={slider?.data?.filter((item) => {
                if (item?.image) {
                  return {
                    image: item?.image,
                    ...item,
                  };
                }
              })}
              type="congratulations"
            />
          )}
          {/* Sections */}
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

          {/* News */}
          <section className={styles.section}>
            <h3 className={styles.title}>آخر أخبار العائلة</h3>
            <Swiper
              slidesPerView={1.5}
              cssMode={false} // Enable Swiper native transitions for better control
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                400: {
                  slidesPerView: 2.5,
                },
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
              {newsLoading ? (
                <div className={styles.list}>
                  {Array(10)
                    ?.fill("")
                    ?.map((_, i) => (
                      <SwiperSlide key={i}>
                        <Skeleton
                          width="100%"
                          height="348px"
                          borderRadius="4px"
                        />
                      </SwiperSlide>
                    ))}
                </div>
              ) : newsError ? (
                <Error msg={newsLoading?.message} />
              ) : news?.data?.length ? (
                <div className={styles.list}>
                  {news?.data?.map((singleNew, i) => (
                    <SwiperSlide key={i}>
                      <BlogBox singleNew={singleNew} />
                    </SwiperSlide>
                  ))}
                </div>
              ) : (
                <EmptyList text="لا يوجد أي أخبار في الوقت الراهن، الآن يمكنك إضافة الأخبار" />
              )}
            </Swiper>
          </section>
        </div>
      </div>
      {idModal === "occasions-modal" && occasionsRes?.data?.length ? (
        <OccasionsModal occasions={occasionsRes?.data} />
      ) : (
        ""
      )}
    </>
  );
}

export default Home