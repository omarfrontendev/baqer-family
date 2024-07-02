import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './.module.scss';
import { PageHeader } from '../../../layout';
import { DeleteIcon } from '../../../icons';
import { MdModeEdit } from 'react-icons/md';
import { DeleteModal, MainLabel, MainSlider } from '../../../components';
import dayjs from 'dayjs';
import { ModalContext } from '../../../context/ModalContext';
import Cookies from "js-cookie";
import parse from "html-react-parser";

const SingleCongratulation = () => {

  const { idModal, setIdModal } = useContext(ModalContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { userPermission } = JSON.parse(Cookies.get("user"));
    const permission = userPermission.includes("congratulte");

    console.log(location?.state?.images);

    useEffect(() => {
        if(!location?.state?.data) {
            navigate("/congratulations");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
      <>
        <div className={`container`}>
          <div className={styles.page__header}>
            <PageHeader title={location?.state?.data?.title} backBtnStyle={{ right: 0 }} />
            {permission && (
              <div className={styles.header__btns}>
                <button
                  className={styles.header__btn}
                  onClick={() =>
                    setIdModal(
                      `delete-congratulation-${location?.state?.data?.id}`
                    )
                  }
                >
                  <DeleteIcon />
                </button>
                <button
                  onClick={() => {
                    navigate(`/congratulations/edit`, {
                      state: { data: location?.state?.data },
                    });
                  }}
                  className={styles.header__btn}
                >
                  <MdModeEdit />
                </button>
              </div>
            )}
          </div>
          <MainSlider
            images={[location?.state?.data?.image] || []}
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
              <div className="ql-editor" style={{ width: "100%" }}>
                {parse(location?.state?.data?.content)}
              </div>
            </div>
          </section>
        </div>
        {idModal === `delete-congratulation-${location?.state?.data?.id}` && (
          <DeleteModal
            body={{
              congratulate_id: location?.state?.data?.id,
            }}
            endpoint="deleteCongratulate"
            title="هل أنت متأكد أنك تريد حذف هذه التهنئة"
            getList={() => navigate("/congratulations")}
          />
        )}
      </>
    );
}

export default SingleCongratulation