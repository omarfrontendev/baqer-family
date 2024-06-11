import React, { useContext } from 'react';
import Popup from '../Popup';
import styles from './.module.scss';
import MainButton from '../MainButton';
import { ModalContext } from '../../../context/ModalContext';
import { useApi } from '../../../hooks/useApi';

const DeleteModal = ({ title, endpoint, getList, body }) => {
  const { setIdModal } = useContext(ModalContext);
  const { loading, onRequest: onDelete } = useApi(`/api/${endpoint}`, "post");

  const onSubmit = async () => {
    try {
      const res = await onDelete(body);
      res?.success && setIdModal("");
      res?.success && getList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Popup>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.buttons}>
        <MainButton
          loading={loading}
          disabled={loading}
          className={styles.delete}
          style={{ background: "#fb6e6e", color: "#FFF" }}
          onClick={onSubmit}
        >
          حذف
        </MainButton>
        <MainButton
          onClick={() => setIdModal("")}
          className={styles.close}
          style={{ background: "#ddd", color: "#333" }}
        >
          إلغاء
        </MainButton>
      </div>
    </Popup>
  );
};

export default DeleteModal