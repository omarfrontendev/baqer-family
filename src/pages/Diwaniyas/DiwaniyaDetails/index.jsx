import React, { useContext, useEffect } from "react";
import { PageHeader } from '../../../layout';
import styles from './.module.scss';
import { DeleteIcon } from '../../../icons';
import { DeleteModal, MainLabel, MainSlider } from '../../../components';
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { TiLocation } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultCover from "../../../assets/DefaultCover.png";
import dayjs from "dayjs";
import 'dayjs/locale/ar'; // Import Arabic locale
import { ModalContext } from "../../../context/ModalContext";
import Cookies from "js-cookie";

const DiwaniyaDetails = () => {

  const { idModal, setIdModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const diwaniya = location?.state?.data;
  const { userPermission } = JSON.parse(Cookies.get("user"));
  const permission = userPermission.includes("diwan");

  useEffect(() => {
    if (!diwaniya) navigate(`/diwaniyas/${diwaniya?.category_id}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diwaniya]);

  return (
    <>
      <div className={`container`}>
        <div className={styles.page__header}>
          <PageHeader title={diwaniya?.name} backBtnStyle={{ right: 0 }} />
          {permission && <div className={styles.header__btns}>
            <button
              className={styles.header__btn}
              onClick={() => setIdModal(`delete-diwaniya-${diwaniya?.id}`)}
            >
              <DeleteIcon />
            </button>
            <button
              onClick={() => {
                navigate(`/diwaniyas/edit/${diwaniya?.category_id}`, {
                  state: { data: diwaniya },
                });
              }}
              className={styles.header__btn}
            >
              <MdModeEdit />
            </button>
          </div>}
        </div>
        <MainSlider
          images={
            diwaniya?.images?.map((item) => item?.image)?.length
              ? diwaniya?.images?.map((item) => item?.image)
              : [DefaultCover]
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
          <h4 className={styles.title}>{diwaniya?.name}</h4>
          <div
            style={{ flexDirection: "column", alignItems: "start" }}
            className={styles.details__info}
          >
            <MainLabel>
              {dayjs(diwaniya?.created_at)
                .locale("ar")
                .format("DD  MMMM  YYYY")}
            </MainLabel>
            <p>{diwaniya?.description}</p>
          </div>
          <div className={styles.details__info}>
            <MainLabel bgColor="#EBEBEB">{t("diwaniyaDate")}</MainLabel>
            {diwaniya?.workDays?.map((day) => (
              <span>
                {day?.time} {t(day?.day)}
              </span>
            ))}
          </div>
          <div className={styles.details__info}>
            <MainLabel bgColor="#EBEBEB">{t("عنوان الديوان")}</MainLabel>
            <span>{diwaniya?.address}</span>
          </div>
        </section>
        <div className={styles.footer__btn}>
          <a
            target="_blank"
            className={styles.btn__blue}
            href={`http://maps.google.com/?q=${diwaniya?.lat},${diwaniya?.long}`}
            rel="noreferrer"
          >
            {t("location")}
            <TiLocation size={20} />
          </a>
        </div>
      </div>
      {idModal === `delete-diwaniya-${diwaniya?.id}` && (
        <DeleteModal
          body={{
            diwan_id: diwaniya?.id,
          }}
          endpoint="deleteDiwan"
          title="هل أنت متأكد أنك تريد حذف هذه الديوان"
          getList={() => navigate("/diwaniyas")}
        />
      )}
    </>
  );
}

export default DiwaniyaDetails;