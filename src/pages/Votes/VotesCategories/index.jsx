import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./.module.scss";
import Skeleton from "react-loading-skeleton";
import { IoMdAdd } from "react-icons/io";
import Cookies from "js-cookie";
import { PageHeader } from "../../../layout";
import { EmptyList, Error, MainSlider } from "../../../components";
import { useApi } from "../../../hooks/useApi";
import { ModalContext } from "../../../context/ModalContext";
import CategoryForm from "../_components/CategoryForm";
import CategoryBox from "../_components/CategoryBox";

const VotesCategories = () => {
  const { t } = useTranslation();
  const { setIdModal, idModal } = useContext(ModalContext);
  const { userPermission } = JSON.parse(Cookies.get("user"));
  const permission = userPermission.includes("diwan");

  // get diwaniya slider:=
  const {
    data: slider,
    loading: sliderLoading,
    onRequest: onGetSlider,
    error: SliderError,
  } = useApi("/api/viewDiwanSlider", "get");

  // get diwaniyas categories
  const {
    data: categories,
    loading: categoriesLoading,
    onRequest: onGetCategories,
    error: categoryError,
  } = useApi("/api/viewDiwanCategory?current_page=1&per_page=10000", "get");

  useEffect(() => {
    onGetSlider();
    onGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader title={t("تصويت")} backHref="/" />
      <div className={`${styles.page} container`}>
        {SliderError ? (
          <Error msg={SliderError?.message} />
        ) : (
          <MainSlider
            loading={sliderLoading}
            images={slider?.data?.filter((item) => {
              if (item?.image) {
                return {
                  image: item?.image,
                  ...item,
                };
              }
            })}
            type="diwaniyas"
          />
        )}
        {permission && (
          <button
            className={styles.add__btn}
            onClick={() => setIdModal("add-new-category")}
          >
            إضافة فئة جديدة <IoMdAdd />
          </button>
        )}
        <div className={styles.list}>
          {categoriesLoading ? (
            Array(4)
              .fill("")
              .map((_, i) => (
                <Skeleton
                  width="100%"
                  height="87px"
                  borderRadius="8px"
                  key={i}
                />
              ))
          ) : categoryError ? (
            <Error msg={categoryError?.message} />
          ) : categories?.data?.length ? (
            categories?.data?.map((diwaniya, i) => (
              <CategoryBox
                key={i}
                diwaniya={diwaniya}
                onGetCategories={() => {
                  onGetCategories();
                  onGetSlider();
                }}
              />
            ))
          ) : (
            <EmptyList text="لا توجد فئات تصويت الآن، يمكنك إضافة فئة جديدة" />
          )}
        </div>
      </div>
      {idModal === "add-new-category" && (
        <CategoryForm onGetList={onGetCategories} />
      )}
    </>
  );
};

export default VotesCategories;
