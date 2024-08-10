import React, { useState } from 'react'
import { MainButton, MainInput } from '../../../../components';
import { useTranslation } from 'react-i18next';
import Radio from '../../../Register/_components/Radio';
import styles from './.module.scss';
import { useFieldArray } from 'react-hook-form';

const AddWifeForm = ({ register, errors, control, gender }) => {
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [render, setRender] = useState(true);

  const { append, remove } = useFieldArray({
    control,
    name: "marry",
  });

  const dataHandler = (body, type) => {
    if (type === "ADD") {
      append({
        ...body,
        type: gender === "male" ? 2 : 1,
        marry_type: 1,
      });
    } else if (type === "DELETE") {
      remove(body);
    }
  };

  if (render)
    return (
      <div className={styles.form}>
        <MainInput
          placeholder={gender === "male" ? "اسم الزوجة" : "اسم الزوج"}
          type="text"
          name="wife-name"
          value={data?.name || ""}
          normal
          onChange={(e) =>
            setData({
              ...data,
              name: e?.target?.value,
            })
          }
        />

        <Radio
          normal
          onChange={(e) =>
            setData({
              ...data,
              is_divorced: +e,
            })
          }
          register={register}
          error={errors?.gender?.message}
          name={"is_divorced"}
          label={t("تم الانفصال ")}
          label_1={t("yes")}
          val_1="1"
          label_2={t("no")}
          val_2="2"
          id_1={"is_divorced__1__"}
          id_2={"is_divorced__2__"}
        />

        <Radio
          normal
          onChange={(e) =>
            setData({
              ...data,
              is_alive: +e,
            })
          }
          register={register}
          error={errors?.gender?.message}
          name={"is_alive"}
          label={t("على قيد الحياة")}
          label_1={t("yes")}
          val_1={"1"}
          label_2={t("no")}
          val_2="2"
        />

        <Radio
          normal
          onChange={(e) =>
            setData({
              ...data,
              is_relict: +e,
            })
          }
          register={register}
          error={errors?.is_relict?.message}
          name={"is_relict"}
          label={t(gender === "male" ? "ارملة" : "ارمل")}
          label_1={t("yes")}
          val_1={"1"}
          label_2={t("no")}
          val_2="2"
          id_1="is_relict_1__"
          id_2="is_relict_2__"
        />

        <MainButton
          onClick={() => {
            dataHandler(data, "ADD");
            setRender(false);
            setData(null);
            setTimeout(() => {
              setRender(true);
            }, 0);
          }}
          // disabled={data?.name !== "" || data?.is_alive !== "" || data?.is_divorced !== "" || data?.is_relict !== ""}
          style={{ width: "fit-content", margin: "0 auto 0 0" }}
        >
          أضف الزوجة
        </MainButton>
      </div>
    );

  return <div style={{ height: "381px" }}></div>;
};

export default AddWifeForm