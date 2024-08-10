import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import styles from "./.module.scss";
import { ModalContext } from "../../../../context/ModalContext";
import CategoryForm from "../CategoryForm";
import { DeleteModal } from "../../../../components";

const CategoryBox = ({ category, onGetCategories }) => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles.box}
        style={{
          backgroundColor: category?.color,
        }}
      >
        <button
          onClick={() =>
            navigate(`${category?.id}`, {
              state: { data: category?.name },
            })
          }
          className={styles.link}
        ></button>
        {category?.name}
        <div className={styles.category__btns}>
          <button
            style={{ color: category?.color || "#000" }}
            className={styles.edit}
            onClick={() => setIdModal(`edit-${category?.id}-category`)}
          >
            <MdEdit />
          </button>
          <button
            style={{ color: category?.color || "#000" }}
            className={styles.delete}
            onClick={() => setIdModal(`delete-category-${category?.id}`)}
          >
            <MdDeleteForever />
          </button>
        </div>
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
          endpoint="deleteArchiveCategory"
          title="هل أنت متأكد أنك تريد حذف هذه الفئة"
          getList={onGetCategories}
        />
      )}
    </>
  );
};

export default CategoryBox;
