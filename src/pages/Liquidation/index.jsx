import React, { useEffect } from "react";
import { PageHeader } from "../../layout";
import { useTranslation } from "react-i18next";
import { Error, MainSlider } from "../../components";
import styles from "./.module.scss";
import DefaultCover from '../../assets/DefaultCover.png';
import { Link, useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../../icons";
import { IoMdAdd } from "react-icons/io";
import { useApi } from "../../hooks/useApi";
import Skeleton from "react-loading-skeleton";

const Liquidation = () => {
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

  useEffect(() => {
    onGetSlider();
    onGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
      <Link to="/liquidation/add" className={styles.header__btn}>
        {t("AddNewLiquidation")} <IoMdAdd />
      </Link>
      {productsLoading ? (
        <div className={styles.list}>
          {Array(5)
            ?.fill("")
            ?.map((_, i) => (
              <Skeleton
                key={i}
                width="100%"
                height="213px"
                borderRadius="4px"
              />
            ))}
        </div>
      ) : productsError ? (
        <Error msg={productsError?.message} />
      ) : (
        <div className={styles.list}>
          {products?.data?.map((product) => (
            <button key={product?.id} to="details" className={styles.box}>
              <div className={styles.image__box}>
                <img
                  src={product?.image || DefaultCover}
                  alt={"Diwaniya_image"}
                  className={styles.img}
                />
              </div>
              <button className={styles.for__sale__btn}>
                {product?.view_status === "1" ? t("forSale") : t("ToBorrow")}
              </button>
              <div className={styles.btns}>
                <button 
                  onClick={() => {
                    navigate(`/liquidation/${product?.id}/edit`, {
                      state: { data: product },
                    });
                  }} 
                  to="/liquidation/edit">
                  <EditIcon />
                </button>
                <button className={styles.delete__btn}>
                  <DeleteIcon />
                </button>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Liquidation;
