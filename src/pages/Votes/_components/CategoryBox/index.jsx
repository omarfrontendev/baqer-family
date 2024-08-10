import React, { useContext } from "react";
import styles from "./.module.scss";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../../context/ModalContext";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { DeleteModal } from "../../../../components";
import CategoryForm from "../CategoryForm";

const CategoryBox = ({ diwaniya, onGetCategories }) => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles.box}
        style={{
          backgroundColor: diwaniya?.color,
        }}
      >
        <button
          onClick={() =>
            navigate(`${diwaniya?.id}`, {
              state: { data: diwaniya?.name },
            })
          }
          className={styles.link}
        ></button>
        {diwaniya?.name}
        <div className={styles.category__btns}>
          <button
            style={{ color: diwaniya?.color || "#000" }}
            className={styles.edit}
            onClick={() => setIdModal(`edit-${diwaniya?.id}-category`)}
          >
            <MdEdit />
          </button>
          <button
            style={{ color: diwaniya?.color || "#000" }}
            className={styles.delete}
            onClick={() => setIdModal(`delete-category-${diwaniya?.id}`)}
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
    </>
  );
};

export default CategoryBox;
