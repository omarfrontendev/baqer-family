import React, { useContext } from "react";
import styles from "./.module.scss";
import DefaultCover from "../../../../assets/DefaultCover.png";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../../../../icons";
import { ModalContext } from "../../../../context/ModalContext";
import { DeleteModal } from "../../../../components";

const Box = ({ diwaniya, onGetList, permission }) => {
  const navigate = useNavigate();
  const { idModal, setIdModal } = useContext(ModalContext);

  return (
    <>
      <div type="button" className={styles.box}>
        <div
          onClick={(e) => {
            navigate(`${diwaniya?.id}`, { state: { data: diwaniya } });
          }}
          className={styles.image__box}
        >
          <img
            src={diwaniya?.image || DefaultCover}
            alt={"Diwaniya_image"}
            className={styles.img}
          />
        </div>
        <h4
          onClick={(e) => {
            navigate(`${diwaniya?.id}`, { state: { data: diwaniya } });
          }}
          className={styles.title}
        >
          {diwaniya?.title}
        </h4>
        {permission && <div className={styles.btns}>
          <button
            style={{ display: "flex" }}
            onClick={() => {
              navigate(`edit`, { state: { data: diwaniya } });
            }}
          >
            <EditIcon />
          </button>
          <button
            type="button"
            className={styles.delete__btn}
            onClick={() => setIdModal(`delete-congratulation-${diwaniya?.id}`)}
          >
            <DeleteIcon />
          </button>
        </div>}
      </div>
      {idModal === `delete-congratulation-${diwaniya?.id}` && (
        <DeleteModal
          body={{
            congratulate_id: diwaniya?.id,
          }}
          endpoint="deleteCongratulate"
          title="هل أنت متأكد أنك تريد حذف هذه التهنئة"
          getList={onGetList}
        />
      )}
    </>
  );
};

export default Box;
