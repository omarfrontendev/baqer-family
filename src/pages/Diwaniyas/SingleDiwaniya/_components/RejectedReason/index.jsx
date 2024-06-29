import React, { useContext, useState } from "react";
import { ModalContext } from "../../../../../context/ModalContext";
import { useApi } from "../../../../../hooks/useApi";
import { MainButton, MainInput, Popup } from "../../../../../components";
import styles from './.module.scss';

const RejectedReason = ({  getList, id }) => {
  const { setIdModal } = useContext(ModalContext);
  const [reason, setReason] = useState("");
  const { loading, onRequest: onReject } = useApi(`/api/diwanNotExist`, "post");

  const onSubmit = async () => {
    try {
      const res = await onReject({
        diwan_id: id,
        status: true,
        reason,
      });
      res?.success && setIdModal("");
      res?.success && getList();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Popup>
      <h1 className={styles.title}>هل أنت متأكد أنك تريد إلغاء هذا الديوان</h1>
      <MainInput
        placeholder={"سبب الإلغاء"}
        type="text"
        name="reason"
        label={"سبب الإلغاء"}
        value={reason || ""}
        normal
        onChange={(e) => setReason(e.target.value)}
      />
      <div className={styles.buttons}>
        <MainButton
          loading={loading}
          disabled={loading}
          className={styles.delete}
          style={{ background: "#fb6e6e", color: "#FFF" }}
          onClick={onSubmit}
        >
          تأكيد الإلغاء
        </MainButton>
        <MainButton
          onClick={() => setIdModal("")}
          className={styles.close}
          style={{ background: "#ddd", color: "#333" }}
        >
          إغلاق
        </MainButton>
      </div>
    </Popup>
  );
};

export default RejectedReason;
