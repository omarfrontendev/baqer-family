import React, { useContext, useEffect, useState } from "react";
import { PageHeader } from "../../layout";
import { useTranslation } from "react-i18next";
import { DeleteModal, EmptyList, Error, MainSlider } from "../../components";
import styles from "./.module.scss";
import DefaultCover from '../../assets/DefaultCover.png';
import { Link, useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../../icons";
import { IoMdAdd } from "react-icons/io";
import { useApi } from "../../hooks/useApi";
import Skeleton from "react-loading-skeleton";
import { ModalContext } from "../../context/ModalContext";
import BookModal from "./_compontent/BookModal";
import OrderBox from "./_compontent/OrderBox";
import ProductBox from "./_compontent/ProductBox";


const Liquidation = () => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // get Liquidation slider:=
  const {
    data: slider,
    loading: sliderLoading,
    onRequest: onGetSlider,
    error: SliderError,
  } = useApi("/api/viewProductSlider", "get");

  // get Products
  const {
    data: products,
    error: productsError,
    loading: productsLoading,
    onRequest: onGetProducts,
  } = useApi(`/api/view_product?current_page=1&per_page=10000`, "get");

  // get Notifications
  const {
    data: orders,
    onRequest: onGetOrders,
  } = useApi(`/api/product_orders`, "get");

  useEffect(() => {
    onGetSlider();
    onGetProducts();
    onGetOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <div className={`${styles.page} container`}>
        <PageHeader title={t("liquidation")} />
        {SliderError ? (
          <Error msg={SliderError?.message} />
        ) : (
          <MainSlider
            loading={sliderLoading}
            images={slider?.data?.map((item) => item?.image) || []}
          />
        )}
        {orders?.data?.length ? (
          <>
            <h4 className={styles.title}>طلبات الشراء</h4>
            <div className={styles.list}>
              {orders?.data.map((order, i) => (
                <OrderBox key={i} order={order} onGetOrders={onGetOrders} />
              ))}
            </div>
          </>
        ) : (
          ""
        )}
        <Link to="/liquidation/add" className={styles.header__btn}>
          {t("إضافة منتج")} <IoMdAdd />
        </Link>
        {productsLoading ? (
          <div className={styles.list}>
            {Array(10)
              ?.fill("")
              ?.map((_, i) => (
                <Skeleton
                  key={i}
                  width="100%"
                  height="147px"
                  borderRadius="4px"
                />
              ))}
          </div>
        ) : productsError ? (
          <Error msg={productsError?.message} />
        ) : products?.data?.length ? (
          <div className={styles.list}>
            {products?.data?.map((product) => (
              <ProductBox
                key={product?.id}
                onGetProducts={onGetProducts}
                product={product}
              />
            ))}
          </div>
        ) : (
          <EmptyList text="لا يوجد أي منتج، الآن يمكنك إضافة منتجك" />
        )}
      </div>
    </>
  );
};

export default Liquidation;
