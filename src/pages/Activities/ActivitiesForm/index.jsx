import React from "react";
import { MainButton, MainInput, UploadImages } from "../../../components";
import { useTranslation } from "react-i18next";
import styles from "./.module.scss";

const ActivitiesForm = ({ onSubmit, control, register, formData, errors }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className={styles.form__content}>
      {/* Name */}
      <MainInput
        register={register}
        placeholder={t("اسم النشاط")}
        label="اسم النشاط"
        type="text"
        name="name"
        value={formData?.name}
        error={errors?.name?.message}
        required
      />

      {/* overview */}
      <MainInput
        register={register}
        placeholder={t("inputs.description")}
        type="textarea"
        name="description"
        value={formData?.description}
        error={errors?.description?.message}
        required
      />

      {/* Diwaniya image */}
      <UploadImages
        images={formData?.images || []}
        error={errors?.images?.message}
        control={control}
        name="images"
      />

      <MainButton type="submit">{t("add")}</MainButton>
    </form>
  );
};

export default ActivitiesForm;
