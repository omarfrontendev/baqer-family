import React, { useContext } from "react";
import styles from "./.module.scss";
import DefaultCover from "../../../../assets/DefaultCover.png";
import { ModalContext } from "../../../../context/ModalContext";
import BookModal from "../BookModal";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../../../../icons";
import { DeleteModal } from "../../../../components";
import { useTranslation } from "react-i18next";

const ProductBox = ({ product, onGetProducts }) => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div key={product?.id} to="details" className={styles.box}>
        <button
          className={styles.details__btn}
          onClick={() => {
            navigate(`${product?.id}`, { state: { data: product } });
          }}
        ></button>
        <div className={styles.image__box}>
          <img
            src={product?.image || DefaultCover}
            alt={"Diwaniya_image"}
            className={styles.img}
          />
        </div>
        <button
          className={styles.for__sale__btn}
          onClick={() => setIdModal(`book__product__${product?.id}`)}
        >
          {product?.proccess_type === "sale" ? t("forSale") : t("ToBorrow")}
        </button>
        <div className={styles.btns}>
          <button
            onClick={() => {
              navigate(`/liquidation/${product?.id}/edit`, {
                state: { data: product },
              });
            }}
          >
            <EditIcon />
          </button>
          <button
            className={styles.delete__btn}
            onClick={() => setIdModal(`delete-${product?.id}`)}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      {idModal === `book__product__${product?.id}` && (
        <BookModal id={product?.id} type={product?.proccess_type} />
      )}
      {idModal === `delete-${product?.id}` && (
        <DeleteModal
          body={{
            product_id: product?.id,
          }}
          endpoint="deleteProduct"
          title="هل أنت متأكد أنك تريد حذف هذا المنتج؟"
          getList={onGetProducts}
        />
      )}
    </>
  );
};

export default ProductBox;
