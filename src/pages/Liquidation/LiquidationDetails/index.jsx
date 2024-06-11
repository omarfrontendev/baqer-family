import React from "react";
import { PageHeader } from "../../../layout";
import styles from "./.module.scss";
import { DeleteIcon } from "../../../icons";
import { MainLabel, MainSlider } from "../../../components";
import slideImage from "../../../assets/business@2x.png";
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { TiLocation } from "react-icons/ti";
import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";

const LiquidationDetails = () => {
    const { t } = useTranslation();
    return (
      <div className={`container`}>
        <div className={styles.page__header}>
          <PageHeader title={"قنفة موديل ايكيا"} />
          <div className={styles.header__btns}>
            <button className={styles.header__btn}>
              <DeleteIcon />
            </button>
            <Link to="/liquidation/edit" className={styles.header__btn}>
              <MdModeEdit />
            </Link>
          </div>
        </div>
        <MainSlider
          image={slideImage}
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
          <h4 className={styles.title}>قنفة موديل ايكيا</h4>
          <div className={styles.details__info}>
            <MainLabel>05 نوفمبر 2022</MainLabel>
            <p>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
              العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها
              التطبيق.
            </p>
          </div>
        </section>
        <div className={styles.footer__btn}>
          <button className={styles.book__btn}>
            حـجـز
            <TiLocation size={20} />
          </button>
          <a
            target="_blank"
            className={styles.btn__blue}
            href={`http://maps.google.com/?q=122123231,122131221`}
            rel="noreferrer"
          >
            {t("location")}
            <TiLocation size={20} />
          </a>
          <a href={`tel:01121256454`} className={styles.contact__box}>
            {t("call")}
            <FaPhone size={20} />
          </a>
        </div>
      </div>
    );
};

export default LiquidationDetails;
