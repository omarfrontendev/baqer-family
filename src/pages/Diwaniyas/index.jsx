import React, { Fragment, useContext, useEffect } from 'react';
import { PageHeader } from '../../layout';
import { useTranslation } from 'react-i18next';
import { DeleteModal, Error, MainSlider } from '../../components';
import styles from './.module.scss';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import Skeleton from 'react-loading-skeleton';
import { IoMdAdd } from 'react-icons/io';
import { ModalContext } from '../../context/ModalContext';
import CategoryForm from './CategoryForm';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

const Diwaniyas = () => {

  const { t } = useTranslation();
  const { setIdModal, idModal } = useContext(ModalContext);

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
        <PageHeader title={t("Diwaniyas")} />
        {SliderError ? (
          <Error msg={SliderError?.message} />
        ) : (
          <MainSlider
            loading={sliderLoading}
            images={slider?.data?.map((item) => item?.image)}
          />
        )}
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
          ) : (
            categories?.data?.map((diwaniya, i) => (
              <Fragment key={i}>
                <div
                  className={styles.box}
                  style={{
                    backgroundColor: diwaniya?.color,
                  }}
                >
                  <Link
                    to={`${diwaniya?.id}`}
                    className={styles.link}
                    key={i}
                  ></Link>
                  {diwaniya?.name}
                  <div className={styles.category__btns}>
                    <button
                    style={{color: diwaniya?.color || "#000"}}
                      className={styles.edit}
                      onClick={() =>
                        setIdModal(`edit-${diwaniya?.id}-category`)
                      }
                    >
                      <MdEdit />
                    </button>
                    <button
                    style={{color: diwaniya?.color || "#000"}}
                      className={styles.delete}
                      onClick={() =>
                        setIdModal(`delete-category-${diwaniya?.id}`)
                      }
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
                {idModal === `edit-${diwaniya?.id}-category` && (
                  <CategoryForm
                    categoryId={diwaniya?.id}
                    onGetList={onGetCategories}
                    defaultData={diwaniya}
                  />
                )}
                {idModal === `delete-category-${diwaniya?.id}` && (
                  <DeleteModal
                    body={{
                      category_id: diwaniya?.id,
                    }}
                    id={diwaniya?.id}
                    endpoint="deleteDiwanCategory"
                    title="هل أنت متأكد أنك تريد حذف هذه الفئة"
                    getList={onGetCategories}
                  />
                )}
              </Fragment>
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