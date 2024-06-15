import React, { useContext } from 'react';
import { MainButton, Popup } from '../../../../components';
import styles from './.module.scss';
import { useTranslation } from 'react-i18next';
import { ModalContext } from '../../../../context/ModalContext';
import { useApi } from '../../../../hooks/useApi';

const BookModal = ({ type, id }) => {
  const { t } = useTranslation();
  const { setIdModal } = useContext(ModalContext);

  // Book product:=
  const {
    loading: submitting,
    onRequest: onBookProduct,
  } = useApi("/api/bookProduct", "post");

  const onSubmit = async () => {
    const res = await onBookProduct({
        product_id: id
    });
    if (res?.message.trim() === "تم ارسال طلبك من قبل"){
        setIdModal("");
    }
  }

  return (
    <Popup>
      <p className={styles.text}>
        هل تريد {t(type === "sale" ? "buy" : "booking")} هذا المنتج؟
      </p>
      <div className={styles.btns}>
        <MainButton onClick={onSubmit} disabled={submitting} loading={submitting}>
          {t(type === "sale" ? "buy" : "booking")}
        </MainButton>
        <MainButton
            onClick={() => setIdModal("")}
            style={{ backgroundColor: "#e95858" }}
        >
          {t("cancel")}
        </MainButton>
      </div>
    </Popup>
  );
};

export default BookModal