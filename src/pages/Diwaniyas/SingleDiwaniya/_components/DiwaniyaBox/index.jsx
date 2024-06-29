import React, { useContext } from 'react';
import styles from './.module.scss';
import DefaultCover from "../../../../../assets/DefaultCover.png";
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../../../../../icons';
import { DeleteModal } from '../../../../../components';
import { ModalContext } from '../../../../../context/ModalContext';
import { useTranslation } from 'react-i18next';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import RejectedReason from '../RejectedReason';

const DiwaniyaBox = ({ diwaniya, onGetList, permission }) => {
  const { idModal, setIdModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div type="button" className={styles.box}>
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
        {permission && <div className={styles.btns}>
          <button
            className={styles.cancel__btn}
            onClick={() => setIdModal(`cancel-diwaniya-${diwaniya?.id}`)}
          >
            {t("cancel")}
          </button>
          <button
            onClick={() => {
              navigate(`/diwaniyas/edit/${diwaniya?.category_id}`, {
                state: { data: diwaniya },
              });
            }}
            className={styles.edit__btn}
          >
            <MdEdit />
          </button>
          <button
            onClick={() => setIdModal(`delete-diwaniya-${diwaniya?.id}`)}
            type="button"
            className={styles.delete__btn}
          >
            <MdDeleteForever />
          </button>
        </div>}
      </div>
      {idModal === `delete-diwaniya-${diwaniya?.id}` && (
        <DeleteModal
          body={{
            diwan_id: diwaniya?.id,
          }}
          endpoint="deleteDiwan"
          title="هل أنت متأكد أنك تريد حذف هذا الديوان"
          getList={onGetList}
        />
      )}
      {idModal === `cancel-diwaniya-${diwaniya?.id}` && (
        <RejectedReason id={diwaniya?.id} getList={onGetList} />
      )}
    </>
  );
};

export default DiwaniyaBox