import React, { useContext } from 'react';
import styles from './.module.scss';
import { ModalContext } from '../../../../context/ModalContext';
import { MainButton, Popup } from '../../../../components';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../../hooks/useApi';

const OrderBox = ({ order, onGetOrders }) => {
    const { idModal, setIdModal } = useContext(ModalContext);
    const { t } = useTranslation();

    // Book product:=
    const { loading: submitting, onRequest: onOrderAction } = useApi(
        "/api/product_action",
        "post"
    );

    const onSubmit = async (action) => {
        const res = await onOrderAction({
          order_id: order?.id,
          action,
        });
        console.log(res)
        if (res?.success) {
            setIdModal("");
            onGetOrders();
        }
    };

    return (
      <>
        <button
          onClick={() => setIdModal(`order-${order?.id}`)}
          className={styles.order__btn}
        >
          {order?.product?.name}
        </button>
        {idModal === `order-${order?.id}` && (
          <Popup>
            <p className={styles.text}>
              لقد قام المستخدم {order?.user?.first_name} بطلب{" "}
              {t(order?.product?.proccess_type === "sale" ? "buy" : "booking")}{" "}
              منتج {order?.user?.first_name}
            </p>
            <p className={styles.text}>
              {t("inputs.email")}:{" "}
              <a href={`mailto:${order?.user?.email}`}>{order?.user?.email}</a>
            </p>
            <p className={styles.text}>
              {t("inputs.phone")}:{" "}
              <a href={`tel:${order?.user?.phone_number}`}>
                {order?.user?.phone_number}
              </a>
            </p>
            <div className={styles.btns}>
              <MainButton
                onClick={() => onSubmit("accept")}
                disabled={submitting}
                loading={submitting}
              >
                {t("accept")}
              </MainButton>
              <MainButton
                onClick={() => onSubmit("reject")}
                disabled={submitting}
                loading={submitting}
                style={{ backgroundColor: "#e95858" }}
              >
                {t("reject")}
              </MainButton>
            </div>
          </Popup>
        )}
      </>
    );
};

export default OrderBox