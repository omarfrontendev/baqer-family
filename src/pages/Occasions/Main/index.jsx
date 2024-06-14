import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteModal, EmptyList, Error, MainSlider } from "../../../components";
import styles from "./.module.scss";
import { PageHeader } from "../../../layout";
import { Link, useNavigate } from "react-router-dom";
import DefaultCover from "../../../assets/DefaultCover.png";
import { DeleteIcon, EditIcon } from "../../../icons";
import { IoMdAdd } from "react-icons/io";
import { useApi } from "../../../hooks/useApi";
import Skeleton from "react-loading-skeleton";
import { ModalContext } from "../../../context/ModalContext";
import CategoryForm from "./_componetns/CategoryForm";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import dayjs from "dayjs";
import 'dayjs/locale/ar'; // Import Arabic locale

const Occasions = () => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const [currentCat, setCurrentCat] = useState();
  const navigate = useNavigate();

  // get Occasion slider:=
  const {
    data: slider,
    loading: sliderLoading,
    onRequest: onGetSlider,
    error: SliderError,
  } = useApi("/api/viewOccasionSlider", "get");

  // get Occasion categories
  const {
    data: categories,
    loading: categoriesLoading,
    onRequest: onGetCategories,
    error: categoryError,
  } = useApi("/api/viewOccasionCategory?current_page=1&per_page=10000", "get");

  // get current Occasions
  const {
    data: occasions,
    loading: occasionsLoading,
    onRequest: onGetOccasions,
    error: occasionsError,
  } = useApi(
    `/api/viewOccasion?category_id=${currentCat}&current_page=1&per_page=10000`,
    "get"
  );

  useEffect(() => {
    onGetSlider();
    onGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set active category
  useEffect(() => {
    if (categories?.data) setCurrentCat(categories?.data[0]?.id);
  }, [categories?.data]);

  // get occasions
  useEffect(() => {
    currentCat && onGetOccasions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCat]);

  return (
    <>
      <div className={`${styles.page} container`}>
        <PageHeader title={t("Occasions")} />
        {SliderError ? (
          <Error msg={SliderError?.message} />
        ) : (
          <MainSlider
            loading={sliderLoading}
            images={slider?.data?.map((item) => item?.image) || []}
          />
        )}
        {/*    categories  */}
        <button
          className={styles.add__btn}
          onClick={() => setIdModal("add-new-category")}
        >
          إضافة فئة مناسبة جديدة <IoMdAdd />
        </button>
        <div className={styles.categories__box}>
          {categoriesLoading ? (
            Array(2)
              .fill("")
              .map((_, i) => (
                <Skeleton
                  width="200%"
                  height="100px"
                  borderRadius="8px"
                  key={i}
                />
              ))
          ) : categoryError ? (
            <Error msg={categoryError?.message} />
          ) : (
            categories?.data?.map((category) => (
              <button
                onClick={() => setCurrentCat(category?.id)}
                className={currentCat === category?.id ? styles.active : ""}
                key={category?.id}
              >
                {category?.name}
                <div className={styles.category__btns}>
                  <button
                    className={styles.edit}
                    onClick={() => setIdModal(`edit-${category?.id}-category`)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className={styles.delete}
                    onClick={() =>
                      setIdModal(`delete-category-${category?.id}`)
                    }
                  >
                    <MdDeleteForever />
                  </button>
                </div>
                {idModal === `edit-${category?.id}-category` && (
                  <CategoryForm
                    categoryId={category?.id}
                    onGetList={onGetCategories}
                    defaultData={category}
                  />
                )}
                {idModal === `delete-category-${category?.id}` && (
                  <DeleteModal
                    body={{
                      category_id: category?.id,
                    }}
                    id={category?.id}
                    endpoint="deleteOccasionCategory"
                    title="هل أنت متأكد أنك تريد حذف هذه الفئة"
                    getList={onGetCategories}
                  />
                )}
              </button>
            ))
          )}
        </div>
        <Link to={`/occasions/add/${currentCat}`} className={styles.add__btn}>
          {t("AddNewOccasions")} <IoMdAdd />
        </Link>
        {/* Occasions */}
        {occasionsLoading ? (
          <div className={styles.list}>
            {Array(4)
              .fill("")
              .map((_, i) => (
                <Skeleton
                  width="100%"
                  height="263px"
                  borderRadius="8px"
                  key={i}
                />
              ))}
          </div>
        ) : occasionsError ? (
          <Error msg={occasionsError?.message} />
        ) : occasions?.data?.length ? (
          <div className={styles.list}>
            {occasions?.data?.map((occasion, i) => (
              <div className={styles.box} key={i}>
                {idModal === `delete-occasion-${occasion?.id}` && (
                  <DeleteModal
                    body={{
                      occasion_id: occasion?.id,
                    }}
                    endpoint="deleteOccasion"
                    title="هل أنت متأكد أنك تريد حذف هذه المناسبة؟"
                    getList={onGetOccasions}
                  />
                )}
                <div
                  className={styles.image__box}
                  onClick={(e) => {
                    navigate(`${occasion?.id}`, { state: { data: occasion } });
                  }}
                >
                  <img
                    src={occasion?.image || DefaultCover}
                    alt={"Diwaniya_image"}
                    className={styles.img}
                  />
                </div>
                <h4
                  onClick={(e) => {
                    navigate(`${occasion?.id}`, { state: { data: occasion } });
                  }}
                  className={styles.title}
                >
                  {occasion?.title}
                </h4>
                <div
                  onClick={(e) => {
                    navigate(`${occasion?.id}`, { state: { data: occasion } });
                  }}
                  className={styles.date}
                >
                  {dayjs(occasion?.date).locale("ar").format("DD  MMMM  YYYY")}
                </div>
                <div className={styles.btns}>
                  <button
                    id="edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`edit/${currentCat}`, {
                        state: { data: occasion },
                      });
                    }}
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIdModal(`delete-occasion-${occasion?.id}`);
                    }}
                    className={styles.delete__btn}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyList text="لا توجد مناسبات، الآن يمكنك إضافة مناسباتك" />
        )}
      </div>
      {idModal === "add-new-category" && (
        <CategoryForm onGetList={onGetCategories} />
      )}
    </>
  );
};

export default Occasions;
