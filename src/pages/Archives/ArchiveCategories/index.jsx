import React, { useContext, useEffect } from "react";
import { useApi } from "../../../hooks/useApi";
import { PageHeader } from "../../../layout";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { EmptyList, Error } from "../../../components";
import CategoryBox from "../_components/CategoryBox";
import CategoryForm from "../_components/CategoryForm";
import { ModalContext } from "../../../context/ModalContext";
import { IoMdAdd } from "react-icons/io";
import styles from "./.module.scss";

const ArchivesCategories = () => {
  const { t } = useTranslation();
  const {idModal, setIdModal } = useContext(ModalContext);

  // get diwaniyas categories
  const {
    data: categories,
    loading: categoriesLoading,
    onRequest: onGetCategories,
    error: categoryError,
  } = useApi("/api/viewArchiveCategory?current_page=1&per_page=10000", "get");

  useEffect(() => {
    onGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader title={t("Archives")} backHref="/" />
      <div className={`${styles.page} container`}>
        <button
          className={styles.add__btn}
          onClick={() => setIdModal("add-new-category")}
        >
          إضافة فئة جديدة <IoMdAdd />
        </button>
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
            categories?.data?.map((category, i) => (
              <CategoryBox
                key={i}
                category={category}
                onGetCategories={() => {
                  onGetCategories();
                }}
              />
            ))
          ) : (
            <EmptyList text="لا توجد فئات للديوانيات الآن، يمكنك إضافة فئة جديدة" />
          )}
        </div>
      </div>
      {idModal === "add-new-category" && (
        <CategoryForm onGetList={onGetCategories} />
      )}
    </>
  );
};

export default ArchivesCategories;
