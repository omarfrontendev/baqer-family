import React, { useContext } from 'react';
import styles from './.module.scss';
import DefaultCover from "../../../../../assets/DefaultCover.png";
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../../../../../icons';
import { DeleteModal } from '../../../../../components';
import { ModalContext } from '../../../../../context/ModalContext';

const DiwaniyaBox = ({ diwaniya, onGetList }) => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const navigate = useNavigate();

  return (
    <>
      <div
        type="button"
        className={styles.box}
      >
        <button
          className={styles.overlay}
          onClick={() => {
            navigate(`${diwaniya?.id}`, { state: { data: diwaniya } });
          }}
        ></button>
        <div className={styles.image__box}>
          <img
            src={diwaniya?.image || DefaultCover}
            alt={"Diwaniya_image"}
            className={styles.img}
          />
        </div>
        <h4 className={styles.title}>{diwaniya?.name}</h4>
        <div className={styles.btns}>
          <button
            style={{ display: "flex" }}
            onClick={() => {
              navigate(`/diwaniyas/edit/${diwaniya?.category_id}`, {
                state: { data: diwaniya },
              });
            }}
          >
            <EditIcon />
          </button>
          <button
            onClick={() => setIdModal(`delete-diwaniya-${diwaniya?.id}`)}
            type="button"
            className={styles.delete__btn}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      {idModal === `delete-diwaniya-${diwaniya?.id}` && (
        <DeleteModal
          body={{
            diwan_id: diwaniya?.id,
          }}
          endpoint="deleteDiwan"
          title="هل أنت متأكد أنك تريد حذف هذه الديوان"
          getList={onGetList}
        />
      )}
    </>
  );
};

export default DiwaniyaBox