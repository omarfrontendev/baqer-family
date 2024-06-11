import React from "react";
import {
  DatePicker,
  MainButton,
  MainInput,
  UploadImages,
} from "../../../components";
import { useTranslation } from "react-i18next";
import styles from "./.module.scss";

const CongratulationsForm = ({
  onSubmit,
  control,
  register,
  formData,
  errors,
  submitting,
  edit,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className={styles.form__content}>
      {/* Name */}
      <MainInput
        register={register}
        placeholder={t("اسم التهنئة")}
        label="اسم التهنئة"
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

      {/* dates */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <DatePicker
            control={control}
            name="start_date"
            error={errors?.start_date?.message}
            date={formData?.start_date}
            type="بداية التهنئة"
          />
        </div>
        <div style={{ flex: 1 }}>
          <DatePicker
            control={control}
            name="end_date"
            error={errors?.end_date?.message}
            date={formData?.end_date}
            type="نهاية التهنئة"
          />
        </div>
      </div>

      {/* Diwaniya image */}
      <UploadImages
        images={formData?.images || []}
        error={errors?.images?.message}
        control={control}
        name="images"
      />

      <MainButton loading={submitting} disabled={submitting} type="submit">
        {t(edit ? "edit" : "add")}
      </MainButton>
    </form>
  );
};

export default CongratulationsForm;
