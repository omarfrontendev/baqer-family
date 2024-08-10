import React, { useContext } from "react";
import { MainButton, MainInput, Popup } from "../../../../components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useApi } from "../../../../hooks/useApi";
import { ModalContext } from "../../../../context/ModalContext";
import { Hue, Saturation, useColor } from "react-color-palette";
import "react-color-palette/css";
import styles from "./.module.scss";

const CategoryForm = ({ categoryId, onGetList, defaultData }) => {
  const { t } = useTranslation();
  const { setIdModal } = useContext(ModalContext);
  const [color, setColor] = useColor("#561ecb");

  // ADD SCHEMA
  const schema = yup.object({
    name: yup.string("").required(t("errors.required")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultData
      ? {
          name: defaultData?.name,
        }
      : null,
    resolver: yupResolver(schema),
    mode: "all",
  });

  // add new category
  const { onRequest: onAddCategory, loading } = useApi(
    `/api/${categoryId ? "editDiwanCategory" : "addDiwanCategory"}`,
    "post"
  );

  const onSubmit = async (e) => {
    try {
      const res = await onAddCategory(
        categoryId
          ? {
              ...e,
              index_num: "0",
              category_id: categoryId,
              color: color?.hex,
            }
          : {
              ...e,
              index_num: "0",
              color: color?.hex,
            }
      );
      res?.success && setIdModal("");
      res?.success && onGetList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Popup>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form__content}>
        <div className={styles.content}>
          {/* Name */}
          <MainInput
            register={register}
            placeholder={t("اسم الفئة")}
            label="اسم الفئة"
            type="text"
            name="name"
            value={watch()?.name}
            error={errors?.name?.message}
            required
          />

          <div className={styles.custom__layout}>
            <div className={styles.saturation}>
              <Saturation height={100} color={color} onChange={setColor} />
            </div>
            <Hue color={color} onChange={setColor} />
          </div>
        </div>

        <MainButton
          style={{ backgroundColor: color?.hex }}
          loading={loading}
          disabled={loading}
          type="submit"
        >
          {categoryId ? t("edit") : t("add")}
        </MainButton>
      </form>
    </Popup>
  );
};

export default CategoryForm;
