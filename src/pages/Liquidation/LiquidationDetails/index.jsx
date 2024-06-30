import React, { useContext, useEffect } from "react";
import { PageHeader } from "../../../layout";
import styles from "./.module.scss";
import { DeleteIcon } from "../../../icons";
import { DeleteModal, MainLabel, MainSlider, UserNameAndImage } from "../../../components";
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { TiLocation } from "react-icons/ti";
import { FaPhone } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import BookModal from "../_compontent/BookModal";
import { ModalContext } from "../../../context/ModalContext";
import Cookies from 'js-cookie';

const LiquidationDetails = () => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const { state } = useLocation();
  const product = state?.data;
  const navigate = useNavigate();
  const { userPermission } = JSON.parse(Cookies.get("user"));
  const permission = userPermission.includes("product");

  console.log(product?.user);

  useEffect(() => {
    if(!product) {
      navigate("/liquidation");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);


  return (
    <>
      <div className={`container`}>
        <div className={styles.page__header}>
          <PageHeader title={product?.name} />
          {permission && (
            <div className={styles.header__btns}>
              <button
                className={styles.header__btn}
                onClick={() => setIdModal(`delete-modal`)}
              >
                <DeleteIcon />
              </button>
              <button
                className={styles.header__btn}
                onClick={() => {
                  navigate(`/liquidation/${product?.id}/edit`, {
                    state: { data: product },
                  });
                }}
              >
                <MdModeEdit />
              </button>
            </div>
          )}
        </div>
        <MainSlider
          images={product?.images}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <section className={styles.details__section}>
            <h4 className={styles.title}>{product?.name}</h4>
            <div className={styles.details__info}>
              <MainLabel>
                {dayjs(product?.created_at)
                  .locale("ar")
                  .format("DD  MMMM  YYYY")}
              </MainLabel>
              <p>{product?.description}</p>
            </div>
            <div className={styles.details__info}>
              <MainLabel>quantity</MainLabel>
              <div>{product?.quantity}</div>
            </div>
            <div className={styles.details__info}>
              <MainLabel>
                {product?.proccess_type === "sale"
                  ? t("forSale")
                  : t("ToBorrow")}
              </MainLabel>
            </div>
          </section>
          <UserNameAndImage
            name={product?.user?.name}
            img={product?.user?.profile_picture}
          />
        </div>
        <div className={styles.footer__btn}>
          <button
            className={styles.book__btn}
            onClick={() => setIdModal(`book__product__${product?.id}`)}
          >
            حـجـز
            <TiLocation size={20} />
          </button>
          <a
            target="_blank"
            className={styles.btn__blue}
            href={`http://maps.google.com/?q=${product?.lat},${product?.long}`}
            rel="noreferrer"
          >
            {t("location")}
            <TiLocation size={20} />
          </a>
          <a
            href={`tel:${product?.owner_phone}`}
            className={styles.contact__box}
          >
            {t("call")}
            <FaPhone size={20} />
          </a>
        </div>
      </div>
      {idModal === `book__product__${product?.id}` && (
        <BookModal id={product?.id} type={product?.proccess_type} />
      )}
      {idModal === `delete-modal` && (
        <DeleteModal
          body={{
            product_id: product?.id,
          }}
          endpoint="deleteProduct"
          title="هل أنت متأكد أنك تريد حذف هذا المنتج؟"
          getList={() => navigate("/liquidation")}
        />
      )}
    </>
  );
};

export default LiquidationDetails;
