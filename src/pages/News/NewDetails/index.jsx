import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./.module.scss";
import { PageHeader } from "../../../layout";
import { DeleteIcon } from "../../../icons";
import { MdModeEdit } from "react-icons/md";
import { DeleteModal, MainLabel, MainSlider } from "../../../components";
import dayjs from "dayjs";
import { ModalContext } from "../../../context/ModalContext";

const SingleCongratulation = () => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.data) {
      navigate("/news");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`container`}>
        <div className={styles.page__header}>
          <PageHeader title={location?.state?.data?.title} />
          <div className={styles.header__btns}>
            <button
              className={styles.header__btn}
              onClick={() =>
                setIdModal(`delete-news-${location?.state?.data?.id}`)
              }
            >
              <DeleteIcon />
            </button>
            <button
              onClick={() => {
                navigate(`/news/edit`, {
                  state: { data: location?.state?.data },
                });
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
      </div>
      {idModal === `delete-news-${location?.state?.data?.id}` && (
        <DeleteModal
          body={{
            news_id: location?.state?.data?.id,
          }}
          endpoint="deleteNews"
          title="هل أنت متأكد أنك تريد حذف هذه التهنئة"
          getList={() => navigate('/news')}
        />
      )}
    </>
  );
};

export default SingleCongratulation;
