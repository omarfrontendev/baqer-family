import React, { useState } from 'react';
import { MainButton, Popup } from '../../../components';
import styles from './.module.scss';
import { RiRadioButtonFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';

const ChooseLayoutPopup = () => {

  const [value, setValue] = useState(1);
  const navigate = useNavigate();

  const { onRequest, loading } = useApi("/api/set_default_page", "post"); 

  const onSubmit = async () => {
    try {
      const res = await onRequest({
        default_page: +value,
      });
      if (res?.success) navigate("/");
    }catch(err) {
      console.log(err)
    }
  }
 
  return (
    <Popup>
      <h4 className={styles.title}>اختر الصفحة الرئيسية الافتراضية</h4>
      <label className={styles.label}>
        <p>شجرة العائلة</p>
        <input
          onChange={(e) => setValue(e?.target?.value)}
          type="radio"
          name="option"
          value={1}
          defaultChecked={value === 1}
          className={styles.input}
        />
        <RiRadioButtonFill className={styles.checkbox} />
      </label>
      <br />
      <label className={styles.label}>
        <p>واجهة الأقسام الرئيسية</p>
        <input
          onChange={(e) => setValue(e?.target?.value)}
          type="radio"
          name="option"
          value={2}
          defaultChecked={value === 2}
          className={styles.input}
        />
        <RiRadioButtonFill className={styles.checkbox} />
      </label>
      <MainButton
        style={{ borderRadius: "50px", margin: "24px auto 0" }}
        onClick={onSubmit}
        loading={loading}
        disabled={loading}
      >
        تأكيد
      </MainButton>
    </Popup>
  );
}

export default ChooseLayoutPopup