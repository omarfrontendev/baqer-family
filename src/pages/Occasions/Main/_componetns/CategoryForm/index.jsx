import React, { useContext } from 'react';
import { MainButton, MainInput, Popup } from '../../../../../components';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../../../hooks/useApi';
import { ModalContext } from '../../../../../context/ModalContext';
import styles from './.module.scss';

const CategoryForm = ({ categoryId, onGetList, defaultData }) => {
  const { t } = useTranslation();
  const { setIdModal } = useContext(ModalContext);

  console.log(categoryId);
  console.log("categoryId");
  
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
          name: defaultData?.name
        }
      : null,
    resolver: yupResolver(schema),
    mode: "all",
  });

  // add new category
  const { onRequest: onAddCategory, loading } = useApi(
    `/api/${categoryId ? "editOccasionCategory" : "addOccasionCategory"}`,
    "post"
  );

  const onSubmit = async (e) => {
    try {
      const res = await onAddCategory(
        categoryId
          ? {
              ...e,
              order: "0",
              category_id: categoryId,
            }
          : {
              ...e,
              order: "0",
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
        <MainButton loading={loading} disabled={loading} type="submit">
          {categoryId ? t("edit") : t("add")}
        </MainButton>
      </form>
    </Popup>
  );
};

export default CategoryForm;