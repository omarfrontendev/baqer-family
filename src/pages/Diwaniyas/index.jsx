import React, { useContext, useEffect } from 'react';
import { PageHeader } from '../../layout';
import { useTranslation } from 'react-i18next';
import { Error, MainSlider } from '../../components';
import styles from './.module.scss';
import { useApi } from '../../hooks/useApi';
import Skeleton from 'react-loading-skeleton';
import { IoMdAdd } from 'react-icons/io';
import { ModalContext } from '../../context/ModalContext';
import CategoryForm from './CategoryForm';
import CategoryBox from './CategoryBox';
import Cookies from 'js-cookie';

const Diwaniyas = () => {
  const { t } = useTranslation();
  const { setIdModal, idModal } = useContext(ModalContext);
    const { userPermission } = JSON.parse(Cookies.get("user"));
    const permission = userPermission.includes("diwan");


  // get diwaniya slider:=
  const { data: slider, loading: sliderLoading, onRequest: onGetSlider, error: SliderError } = useApi("/api/viewDiwanSlider", "get");

  // get diwaniyas categories
  const {
    data: categories,
    loading: categoriesLoading,
    onRequest: onGetCategories,
    error: categoryError
  } = useApi("/api/viewDiwanCategory?current_page=1&per_page=10000", "get");

  useEffect(() => {
    onGetSlider();
    onGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <div className={`${styles.page} container`}>
        <PageHeader title={t("Diwaniyas")} backHref="/" />
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
        {permission && <button
          className={styles.add__btn}
          onClick={() => setIdModal("add-new-category")}
        >
          إضافة فئة جديدة <IoMdAdd />
        </button>}
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
          ) : (
            categories?.data?.map((diwaniya, i) => (
              <CategoryBox
                key={i}
                diwaniya={diwaniya}
                onGetCategories={onGetCategories}
              />
            ))
          )}
        </div>
      </div>
      {idModal === "add-new-category" && (
        <CategoryForm onGetList={onGetCategories} />
      )}
    </>
  );
}

export default Diwaniyas